/* PLAYWRIGHT_MODULE can point to an existing Playwright installation. */
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || process.argv[3] || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.resolve(__dirname, '../..');
const cases = {
  'bach/fi2/t01/fuerza_gravitatoria/':{statement:'h1',fields:'input[type="number"]',count:9,input:'#q1Value',open:'#calc-open',external:true,workspace:'#fTotalMagnitude'},
  'bach/fi2/t01/campo_gravitatorio/':{statement:'h1',fields:'input[type="number"]',count:8,input:'#q1Value',open:'#calc-open',external:true,workspace:'#gTotalMagnitude'},
  'bach/fi2/t01/energia_potencial/':{statement:'h1',fields:'input[type="number"]',count:9,input:'#q1Value',open:'#calc-open',external:true,workspace:'#UTotalValue'},
  'bach/fi2/t01/potencial_gravitatorio/':{statement:'h1',fields:'input[type="number"]',count:8,input:'#q1Value',open:'#calc-open',external:true,workspace:'#VTotalValue'},
  'bach/fi2/t01/trabajo/':{statement:'h1',fields:'input[type="number"]',count:11,input:'#q1Value',open:'#calc-open',external:true,workspace:'#UTotalInitialValue'},
  'bach/fi2/t03/coulomb02/':{statement:'#chargeLabels',fields:'input[id^="input"]',count:5,input:'#inputDist',open:'#calc-open',check:'#btnCheck',feedback:'#feedback',next:'#btnNew',external:true,mathSelector:'#chargeLabels mjx-container'},
  'bach/fi2/t03/coulomb03/':{statement:'#charge-info',fields:'input[id^="ans-"]',count:7,input:'#ans-fx',open:'#calc-open',check:'#btn-verify',feedback:'#feedback-msg',next:'button[onclick="window.generateProblem()"]',external:true,mathSelector:'#charge-info mjx-container'},
  'bach/fi2/t01/momento_angular/':{statement:'header p',fields:'.control input',count:3,open:'#calc-open-header',simulation:true},
  'bach/fi2/t01/momento_angular_vectores/':{statement:'header .sub',fields:'.choice',count:7,open:'#calc-open-header',check:'#check',feedback:'#feedback',next:'#new',radios:true},
  'bach/fi2/t01/momento_fuerza/':{statement:'header .sub',fields:'.choice',count:7,open:'#calc-open-header',check:'#check',feedback:'#feedback',next:'#new',radios:true},
  'bach/fi2/t01/cuestteor01/':{statement:'#question-text',fields:'#options-container button',count:4,open:'#calc-open-header',check:'#options-container button:first-child',feedback:'#explanation-content',next:'#next-btn',external:true},
  'bach/fi2/t01/cuestteor02/':{statement:'#question-text',fields:'#options-container button',count:4,open:'#calc-open-header',check:'#options-container button:first-child',feedback:'#explanation-content',next:'#next-btn',external:true},
  'bach/fi2/t01/fuerza_grav_plano/':{statement:'#statement',fields:'#fields input',count:8,input:'#v_dx',open:'#calcopen',check:'#check',feedback:'#feedback',next:'#next'},
  'bach/fi2/t01/energia_potencial_grav_plano/':{statement:'#enunciado',fields:'#campos input',count:4,input:'#dx',open:'#calc',check:'#corregir',feedback:'#resultado',next:'#nueva'},
  'bach/fi2/t01/fuerza_grav_nula/':{statement:'#statement',fields:'#region option',count:5,input:'#xinput',open:'#calcopen',check:'#check',feedback:'#feedback',next:'#next',region:'#region'},
};
const server = http.createServer((req,res) => {
  const relative = decodeURIComponent(req.url.split('?')[0]).replace(/^\/iesmajuelo\//,'');
  let file = path.resolve(repo,relative || 'index.html');
  if (!file.startsWith(repo + path.sep)) {res.writeHead(403);res.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try {
    browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
    for (const width of [1280,390,320]) {
      const page = await browser.newPage({viewport:{width,height:900},hasTouch:width<500});
      const errors = []; page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url);});
      const resource = process.argv[2] || 'bach/fi2/t01/fuerza_grav_plano/';
      const config = cases[resource]; assert.ok(config,'Falta configurar el recorrido de esta app');
      await page.route('**/*',route=> {
        const url=route.request().url();
        // Rocket telemetry does not participate in simulation or calculator behavior.
        if(config.workspace && /rocket\.new|\/public\/dhws-data-injector\.js/.test(url))return route.fulfill({status:200,contentType:'text/javascript',body:''});
        return config.external || url.startsWith('http://127.0.0.1:')?route.continue():route.abort();
      });
      await page.goto(`http://127.0.0.1:${server.address().port}/iesmajuelo/${resource}`);
      await page.locator('[data-calculadora-comun]').waitFor({state:'attached'});
      const statement = page.locator(config.statement);
      assert.ok((await statement.innerText()).length>30);
      assert.equal(await page.locator(config.fields).count(),config.count);
      assert.ok(await statement.isVisible());
      if(config.external && !config.workspace) {
        await page.locator(config.mathSelector || '#question-text mjx-container').first().waitFor();
        assert.ok(await page.locator(config.fields).first().isVisible());
      }
      if(config.input)await page.locator(config.input).focus();
      await page.locator(config.open).click();
      const calc = page.locator('[data-calculadora-comun]');
      await calc.locator('input').fill('2,5e-8');
      await calc.getByRole('button',{name:'Calcular resultado',exact:true}).click();
      assert.equal(await calc.locator('input').inputValue(),'2.5e-8');
      if(config.input) {
        await calc.getByRole('button',{name:'Copiar resultado al campo',exact:true}).click();
        assert.equal(await page.locator(config.input).inputValue(),'2.5e-8');
        await page.locator(config.open).click();
      }
      await calc.locator('input').fill('1/0');
      await calc.locator('input').press('Enter');
      assert.match(await calc.getByRole('status').innerText(),/cero/);
      await calc.locator('input').fill('');
      for (const name of ['2',',','5','Exponente de diez','Restar','8','Calcular resultado']) await calc.getByRole('button',{name,exact:true}).click();
      assert.equal(await calc.locator('input').inputValue(),'2.5e-8');
      const head = calc.locator('.head');
      await head.focus();await head.press('ArrowLeft');await head.press('ArrowDown');
      const rect = await calc.locator('.box').boundingBox();
      assert.ok(rect.x>=0 && rect.x+rect.width<=width && rect.y>=0 && rect.y+rect.height<=900);
      if (width===1280) {
        await page.mouse.move(rect.x+90,rect.y+20);await page.mouse.down();await page.mouse.move(500,260);await page.mouse.up();
        const moved = await calc.locator('.box').boundingBox();assert.ok(Math.abs(moved.x-rect.x)>20);
      }
      await calc.locator('input').press('Escape');
      assert.equal(await page.locator(config.open).evaluate(e=>e===document.activeElement),true);
      if(config.workspace) {
        await page.locator('#q1Value').fill('5');
        await page.locator('#q1Value').dispatchEvent('change');
        await page.locator('#autoPlace').click();
        const result=await page.locator(config.workspace).innerText();
        assert.ok(result.length>0 && !/No calculado|NaN|Infinity/.test(result),result);
        await page.locator('#clearAll').click();
        assert.deepEqual(errors,[]);
        console.log(`PASS ${resource} ${width}px: campos, calculadora, EXP, copia, errores, movimiento, Escape, auto y limpiar`);
        await page.close();
        continue;
      }
      if(config.simulation) {
        assert.ok(await page.locator('#scene').isVisible());
        assert.ok(await page.locator('#scene').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v!==0)));
        assert.equal(await page.locator('#lval').innerText(),'12,00 kg·m²/s');
        await page.locator('#pause').click();
        assert.match(await page.locator('#pause').innerText(),/Reanudar/);
        await page.locator('#w').fill('-2');
        assert.equal(await page.locator('#lval').innerText(),'-16,00 kg·m²/s');
        assert.equal(await page.locator('#sense').innerText(),'Horario');
        await page.locator('#m').fill('3');
        await page.locator('#r').fill('1');
        assert.equal(await page.locator('#ival').innerText(),'3,00 kg·m²');
        assert.equal(await page.locator('#lval').innerText(),'-6,00 kg·m²/s');
        await page.locator('#w').fill('0');
        assert.equal(await page.locator('#sense').innerText(),'Sin giro');
        await page.locator('#extras').uncheck();
        await page.locator('#reset').click();
        assert.equal(await page.locator('#lval').innerText(),'12,00 kg·m²/s');
        assert.ok(await page.locator('#extras').isChecked());
        assert.match(await page.locator('#pause').innerText(),/Pausar/);
        assert.deepEqual(errors,[]);
        console.log(`PASS ${resource} ${width}px: calculadora, EXP, errores, teclado, simulación, parámetros, pausa y reinicio`);
        await page.close();
        continue;
      }
      if(config.region)await page.locator(config.region).selectOption('middle');
      if(config.radios) {
        assert.ok(await page.locator('#scene').isVisible());
        assert.ok(await page.locator('#scene polygon').count()>0);
        const before=await page.locator('#scene').innerHTML();
        await page.locator('#left').click();
        assert.notEqual(await page.locator('#scene').innerHTML(),before);
        await page.locator('#reset').click();
        await page.locator('label').filter({has:page.locator('input[name="exists"][value="si"]')}).click();
        await page.locator('label').filter({has:page.locator('input[name="axis"]')}).first().click();
        await page.locator('label').filter({has:page.locator('input[name="sense"]')}).first().click();
      }
      await page.locator(config.check).click();
      assert.deepEqual(errors,[]);
      assert.ok((await page.locator(config.feedback).innerText()).length>5);
      await page.locator(config.next).click();
      if(config.input)assert.equal(await page.locator(config.input).inputValue(),'');
      else {
        assert.equal(await page.locator(config.fields).count(),config.count);
        if(config.radios) {
          assert.equal(await page.locator('input[type=radio]:checked').count(),0);
          assert.equal(await page.locator('#counter').innerText(),'Ejercicio 2');
          assert.equal(await page.locator(config.feedback).innerText(),'');
        } else assert.equal(await page.locator(config.fields+':disabled').count(),0);
        await page.locator('[data-calculadora-comun] .launcher').click();
        assert.ok(await calc.locator('input').isVisible());
        await calc.locator('input').press('Escape');
      }
      assert.deepEqual(errors,[]);
      console.log(`PASS ${resource} ${width}px: enunciado, respuestas, cálculo, EXP, ${config.input?'copia, ':''}error, movimiento, Escape y nuevo ejercicio`);
      await page.close();
    }
  } finally {if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
