/* PLAYWRIGHT_MODULE can point to an existing Playwright installation. */
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || process.argv[3] || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.resolve(__dirname, '../..');
const cases = {
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
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      const resource = process.argv[2] || 'bach/fi2/t01/fuerza_grav_plano/';
      const config = cases[resource]; assert.ok(config,'Falta configurar el recorrido de esta app');
      await page.route('**/*',route=>config.external || route.request().url().startsWith('http://127.0.0.1:')?route.continue():route.abort());
      await page.goto(`http://127.0.0.1:${server.address().port}/iesmajuelo/${resource}`);
      await page.locator('[data-calculadora-comun]').waitFor({state:'attached'});
      const statement = page.locator(config.statement);
      assert.ok((await statement.innerText()).length>30);
      assert.equal(await page.locator(config.fields).count(),config.count);
      assert.ok(await statement.isVisible());
      if(config.external) {
        await page.waitForFunction(()=>document.querySelector('#question-text mjx-container'));
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
      if(config.region)await page.locator(config.region).selectOption('middle');
      await page.locator(config.check).click();
      assert.ok((await page.locator(config.feedback).innerText()).length>5);
      await page.locator(config.next).click();
      if(config.input)assert.equal(await page.locator(config.input).inputValue(),'');
      else {
        assert.equal(await page.locator(config.fields).count(),config.count);
        assert.equal(await page.locator(config.fields+':disabled').count(),0);
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
