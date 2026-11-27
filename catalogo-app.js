
const DATA = {
  "root": {
    "title": "Inicio",
    "items": [
      {
        "id": "eso",
        "title": "ESO",
        "icon": "🎒",
        "desc": "Educación Secundaria Obligatoria"
      },
      {
        "id": "bach",
        "title": "Bachillerato",
        "icon": "🎓",
        "desc": "Ciencias y Tecnología"
      },
      {
        "id": "fpb2",
        "title": "FPB2",
        "icon": "🛠️",
        "desc": "Formación Profesional Básica"
      },
      {
        "id": "tools",
        "title": "Herramientas",
        "icon": "🧪",
        "desc": "Simuladores y Utilidades"
      },
      {
        "id": "cdd",
        "title": "CDD",
        "icon": "💻",
        "desc": "Competencia Digital Docente"
      },
      {
        "id": "equipo",
        "title": "Equipo Directivo",
        "icon": "📋",
        "desc": "Gestión y Calendario"
      },
      {
        "id": "departamento",
        "title": "Departamento",
        "icon": "🏫",
        "desc": "Organización Interna"
      },
      {
        "id": "otros",
        "title": "Otros",
        "icon": "✨",
        "desc": "Recursos Variados"
      }
    ]
  },
  "eso": {
    "title": "ESO",
    "items": [
      {
        "id": "fq2",
        "title": "FQ 2º ESO",
        "icon": "🧪",
        "desc": "Física y Química"
      },
      {
        "id": "fr2",
        "title": "Francés 2º ESO",
        "icon": "🇫🇷",
        "desc": "Francés · Transit 2"
      },
      {
        "id": "mat2",
        "title": "Matemáticas 2º ESO",
        "icon": "📐",
        "desc": "Matemáticas"
      },
      {
        "id": "fq3",
        "title": "FQ 3º ESO",
        "icon": "⚗️",
        "desc": "Física y Química"
      },
      {
        "id": "fq4",
        "title": "FQ 4º ESO",
        "icon": "⚛️",
        "desc": "Física y Química"
      }
    ]
  },
  "bach": {
    "title": "Bachillerato",
    "items": [
      {
        "id": "fq1",
        "title": "FQ 1º Bach",
        "icon": "📚",
        "desc": "Física y Química"
      },
      {
        "id": "fi2",
        "title": "Física 2º Bach",
        "icon": "🌌",
        "desc": "Preparación PAU/EBAU"
      },
      {
        "url": "https://onio72.github.io/iesmajuelo/apuntes/fi2/index.html",
        "title": "Apuntes FI2",
        "icon": "📝",
        "desc": "Temas 1 al 5"
      }
    ]
  },
  "fr2": {
    "title": "Francés 2º ESO",
    "groups": []
  },
  "mat2": {
    "title": "Matemáticas 2º ESO",
    "groups": []
  },
  "fq2": {
    "title": "FQ 2º ESO",
    "groups": []
  },
  "fq3": {
    "title": "FQ 3º ESO",
    "groups": []
  },
  "fq4": {
    "title": "FQ 4º ESO",
    "groups": []
  },
  "fq1": {
    "title": "FQ 1º Bach",
    "groups": []
  },
  "fi2": {
    "title": "Física 2º Bach",
    "groups": []
  },
  "fpb2": {
    "title": "FPB 2",
    "groups": []
  },
  "tools": {
    "title": "Herramientas",
    "groups": []
  },
  "cdd": {
    "title": "CDD",
    "groups": []
  },
  "equipo": {
    "title": "Equipo Directivo",
    "groups": []
  },
  "departamento": {
    "title": "Departamento",
    "groups": []
  },
  "otros": {
    "title": "Otros",
    "groups": []
  }
};
const PATHS = {"root":"","eso":"eso","bach":"bach","fq1":"bach/fq1","fi2":"bach/fi2","fq2":"eso/fq2","fq3":"eso/fq3","fq4":"eso/fq4","fr2":"eso/fr2","mat2":"eso/mat2","fpb2":"fpb2","tools":"tools","cdd":"cdd","equipo":"equipo","departamento":"departamento","otros":"otros"};
const PARENT = {"eso":"root","bach":"root","fq2":"eso","fq3":"eso","fq4":"eso","fr2":"eso","mat2":"eso","fq1":"bach","fi2":"bach","fpb2":"root","tools":"root","cdd":"root","equipo":"root","departamento":"root","otros":"root"};
const ROOT = '/iesmajuelo/';
const TYPES = [['guiado','Aprendizaje guiado'],['practica','Práctica y evaluación interactiva'],['simulacion','Simulaciones y visualizaciones conceptuales'],['deduccion','Deducciones y desarrollos matemáticos'],['laboratorio','Laboratorios virtuales y herramientas científicas']];
const OTHER = [['repositorio','Repositorios y documentación'],['planificacion','Planificación y organización'],['procesos','Procesos y procedimientos'],['documentacion','Gestión documental'],['evaluacion','Evaluación y seguimiento'],['ocio','Ocio y entretenimiento']];
const esc = x => String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sectionUrl = id => ROOT+(PATHS[id]?PATHS[id]+'/':'');
const allLinks = g => g.sections ? g.sections.flatMap(s=>s.links.map(l=>({...l,subgroup:s.name}))) : (g.links||[]);
const catalogIds=Object.keys(DATA).filter(id=>!DATA[id].items);
const errors=new Set(); let current='root', view='temas', searching=false, loading=true;
function readSection(){const rel=decodeURIComponent(location.pathname).slice(ROOT.length).replace(/(?:^|\/)index\.html$/,'').replace(/\/$/,'');return Object.keys(PATHS).find(k=>PATHS[k]===rel)||'root'}
function navigateTo(id){if(!DATA[id])return;const u=new URL(sectionUrl(id),location.origin);u.searchParams.set('_catalogo',Date.now());location.assign(u.href)}
function goBack(){navigateTo(PARENT[current]||'root')}
function jumpToStack(i){navigateTo(stack()[i])}
function stack(){let a=[],id=current;while(id){a.unshift(id);id=PARENT[id]}return a}
function validate(c,id){if(c.version!==1||!Array.isArray(c.groups))throw Error('Formato');const urls=new Set(),valid=new Set([...TYPES,...OTHER].map(t=>t[0]));for(const g of c.groups){if(typeof g.name!=='string'||Array.isArray(g.links)===Array.isArray(g.sections))throw Error('Grupo');for(const l of allLinks(g)){if(typeof l.name!=='string'||typeof l.url!=='string'||!/^https:\/\//.test(l.url)||urls.has(l.url)||!valid.has(l.didactica))throw Error('Recurso '+l.name);urls.add(l.url)}}return c.groups}
async function load(id){try{const r=await fetch(sectionUrl(id)+'recursos.json?_catalogo='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);DATA[id].groups=validate(await r.json(),id);errors.delete(id)}catch(e){errors.add(id);console.error(id,e)}}
const links=ls=>'<div class="links-grid">'+ls.map(l=>'<a class="link-item" target="_blank" rel="noopener" href="'+esc(l.url)+'"'+(l.description?' title="'+esc(l.description)+'"':'')+'>'+esc(l.name)+'</a>').join('')+'</div>';
const count=n=>'<span class="fi2-count">'+n+' recursos</span>';
function sub(s){return '<details class="fi2-section"><summary><span>'+esc(s.name)+'</span>'+count(s.links.length)+'</summary>'+links(s.links)+'</details>'}
function topic(name,n,body){return '<details class="fi2-topic"><summary><span>'+esc(name)+'</span>'+count(n)+'</summary><div class="fi2-topic-body">'+body+'</div></details>'}
function theme(g){let sections=g.sections;if(current==='fi2'&&g.name==='Vibraciones y ondas'&&!sections){let i=g.links.findIndex(l=>l.name==='Propagación de un pulso transversal · 25 partículas');if(i>=0)sections=[{name:'Movimiento armónico simple',links:g.links.slice(0,i)},{name:'Ondas',links:g.links.slice(i)}]}const headings={'Campo gravitatorio':'Tema 1 · Campo gravitatorio','Vibraciones y ondas':'Tema 2 · Vibraciones y ondas','Interacción electromagnética':'Tema 3 · Interacción electromagnética'};return topic(current==='fi2'?(headings[g.name]||g.name):g.name,allLinks(g).length,sections?sections.map(sub).join(''):links(g.links))}
function switchView(v){if(v==='temas'||v==='funciones'){view=v;render()}}
function renderGroups(groups){const flat=groups.flatMap(allLinks),admin=['cdd','equipo','departamento','otros'].includes(current),types=admin?OTHER:TYPES;const selector='<div class="fi2-view-switch" role="group" aria-label="Clasificación"><button type="button" aria-pressed="'+(view==='temas')+'" onclick="switchView(\'temas\')">'+(admin?'Por ámbitos':'Por temas')+'</button><button type="button" aria-pressed="'+(view==='funciones')+'" onclick="switchView(\'funciones\')">'+(admin?'Por función':'Por función didáctica')+'</button></div>';return selector+'<div class="fi2-accordion">'+(view==='temas'?groups.map(theme).join(''):types.map(([id,name])=>[name,flat.filter(l=>l.didactica===id)]).filter(x=>x[1].length).map(([name,ls])=>topic(name,ls.length,links(ls))).join(''))+'</div>'}
function enableAccordion(){const a=document.querySelector('.fi2-accordion');if(!a)return;a.addEventListener('toggle',e=>{const t=e.target;if(!(t instanceof HTMLDetailsElement)||!t.open)return;const cls=t.classList.contains('fi2-topic')?'fi2-topic':'fi2-section';t.parentElement.querySelectorAll(':scope > .'+cls).forEach(o=>{if(o!==t)o.open=false})},true)}
function render(){if(searching)return;const d=DATA[current];document.getElementById('backBtn').classList.toggle('hidden',current==='root');document.getElementById('breadcrumbs').innerHTML=stack().map((id,i)=>'<span class="breadcrumb-item" onclick="jumpToStack('+i+')">'+esc(DATA[id].title)+'</span>').join('<span class="breadcrumb-sep">/</span>');let html='<div class="view-container">';if(d.items){html+='<div class="grid">'+d.items.map(i=>'<a class="card" style="text-decoration:none;color:inherit" href="'+esc(i.url||sectionUrl(i.id))+'"'+(i.id?' onclick="event.preventDefault();navigateTo(\''+i.id+'\')"':'')+'><div class="card-icon">'+esc(i.icon)+'</div><h2>'+esc(i.title)+'</h2><p>'+esc(i.desc)+'</p></a>').join('')+'</div>'}else{html+='<h1 class="resource-section-title">'+esc(d.title)+'</h1>';html+=loading&&!d.groups.length?'<p role="status">Cargando recursos…</p>':errors.has(current)?'<p role="alert">No se pudo actualizar el catálogo. <button onclick="location.reload()">Reintentar</button></p>':renderGroups(d.groups)}document.getElementById('app').innerHTML=html+'</div>';enableAccordion()}
function handleSearch(){const q=document.getElementById('searchInput').value.trim().toLocaleLowerCase('es');searching=q.length>=2;if(!searching){render();return}const found=catalogIds.flatMap(id=>DATA[id].groups.flatMap(g=>allLinks(g).filter(l=>[l.name,g.name,l.subgroup,DATA[id].title].some(x=>String(x||'').toLocaleLowerCase('es').includes(q))).map(l=>({...l,name:l.name+' · '+DATA[id].title}))));document.getElementById('breadcrumbs').textContent='Resultados de: '+q;document.getElementById('app').innerHTML='<div class="view-container"><p role="status">'+found.length+' recursos'+(loading?' · actualizando catálogos…':'')+(errors.size?' · algunos catálogos no disponibles':'')+'</p>'+links(found)+'</div>'}
async function init(){current=readSection();loading=true;render();if(catalogIds.includes(current)){await load(current);if(searching)handleSearch();else render()}await Promise.all(catalogIds.filter(id=>id!==current).map(load));loading=false;if(searching)handleSearch();else render()}
window.addEventListener('DOMContentLoaded',init);window.addEventListener('pageshow',e=>{if(e.persisted)init()});
