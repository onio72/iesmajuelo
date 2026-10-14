/* Canvas projection fallback for browsers without a usable WebGL context. */
window.createEducationalRenderer = function (THREE, options) {
  try { return new THREE.WebGLRenderer(options); }
  catch (error) { console.info('Vista 3D compatible mediante Canvas 2D.', error.message); }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D no está disponible');
  let width = 1, height = 1, ratio = 1, lastFrame = -Infinity;
  const point = new THREE.Vector3(), normal = new THREE.Vector3();
  const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3();
  const light = new THREE.Vector3(0.4, 0.7, 1).normalize();
  canvas.dataset.renderer = 'canvas-3d';
  canvas.setAttribute('aria-label', 'Escena 3D interactiva, modo compatible');
  function project(v, object, camera) {
    v.applyMatrix4(object.matrixWorld).project(camera);
    return [(v.x + 1) * width / 2, (1 - v.y) * height / 2, v.z];
  }
  return {
    domElement: canvas, shadowMap: {},
    setPixelRatio(value) { ratio = Math.min(value, 1.5); },
    setSize(w, h, updateStyle = true) {
      width = Math.max(w, 1); height = Math.max(h, 1);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      if (updateStyle) { canvas.style.width = width + 'px'; canvas.style.height = height + 'px'; }
      lastFrame = -Infinity;
    },
    dispose() {},
    render(scene, camera) {
      const now = performance.now();
      if (now - lastFrame < 50) return;
      lastFrame = now;
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
      camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalAlpha = 1;
      ctx.fillStyle = scene.background?.isColor ? '#' + scene.background.getHexString() : '#f5f8fc';
      ctx.fillRect(0, 0, width, height);
      const items = [];
      scene.traverseVisible(object => {
        const geometry = object.geometry;
        if (object.isSkinnedMesh) object.skeleton.update();
        if (object.isSprite && object.material.map?.image) {
          const v = object.getWorldPosition(new THREE.Vector3()).project(camera);
          const world = object.getWorldScale(new THREE.Vector3());
          const distance = object.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
          const scale = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance);
          items.push({ z: v.z, image: object.material.map.image, x: (v.x + 1)*width/2, y: (1-v.y)*height/2, w: world.x*scale, h: world.y*scale });
          return;
        }
        if (!geometry?.attributes.position || !(object.isMesh || object.isLine)) return;
        const position = geometry.attributes.position, index = geometry.index;
        const count = index ? index.count : position.count;
        const get = (i, out) => {
          const vertex = index ? index.getX(i) : i;
          if (object.getVertexPosition) object.getVertexPosition(vertex, out);
          else out.fromBufferAttribute(position, vertex);
          return out;
        };
        const materialAt = offset => {
          if (!Array.isArray(object.material)) return object.material;
          const group = geometry.groups.find(g => offset >= g.start && offset < g.start + g.count);
          return object.material[group?.materialIndex || 0];
        };
        const start = geometry.drawRange.start || 0;
        const end = Math.min(count, start + geometry.drawRange.count);
        const step = object.isMesh ? 3 : object.isLineSegments ? 2 : 1;
        for (let j = start; j + (object.isMesh ? 2 : 1) < end; j += step) {
          const material = materialAt(j);
          if (!material || material.visible === false || material.opacity === 0) continue;
          get(j, va); get(j+1, vb);
          let shade = 1;
          if (object.isMesh) {
            get(j+2, vc);
            if (!material.isMeshBasicMaterial) {
              normal.crossVectors(point.subVectors(vb, va), new THREE.Vector3().subVectors(vc, va)).normalize().transformDirection(object.matrixWorld);
              shade = 0.62 + 0.38 * Math.abs(normal.dot(light));
            }
          }
          const a = project(va, object, camera), b = project(vb, object, camera);
          const c = object.isMesh ? project(vc, object, camera) : null;
          const vertices = c ? [a,b,c] : [a,b];
          if (vertices.some(p => !Number.isFinite(p[0]) || p[2] < -1 || p[2] > 1)) continue;
          const color = material.color || new THREE.Color(0x777777);
          const rgb = color.clone().multiplyScalar(shade);
          items.push({z: vertices.reduce((n,p) => n+p[2],0)/vertices.length, vertices, color:'#'+rgb.getHexString(), alpha: material.transparent ? material.opacity : 1, line: !c});
        }
      });
      items.sort((a,b) => b.z-a.z);
      for (const item of items) {
        ctx.globalAlpha = item.alpha ?? 1;
        if (item.image) {ctx.drawImage(item.image, item.x-item.w/2, item.y-item.h/2, item.w, item.h);continue;}
        ctx.beginPath();ctx.moveTo(item.vertices[0][0],item.vertices[0][1]);
        for(let i=1;i<item.vertices.length;i++)ctx.lineTo(item.vertices[i][0],item.vertices[i][1]);
        if(item.line){ctx.strokeStyle=item.color;ctx.lineWidth=1;ctx.stroke();}
        else{ctx.closePath();ctx.fillStyle=item.color;ctx.fill();}
      }
      ctx.globalAlpha = 1;
    }
  };
};
