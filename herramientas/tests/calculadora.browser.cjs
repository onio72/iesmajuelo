/* PLAYWRIGHT_MODULE can point to an existing Playwright installation. */
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.resolve(__dirname, '../..');
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
      await page.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:')?route.continue():route.abort());
      const resource = process.argv[2] || 'bach/fi2/t01/fuerza_grav_plano/';
      await page.goto(`http://127.0.0.1:${server.address().port}/iesmajuelo/${resource}`);
      await page.locator('[data-calculadora-comun]').waitFor({state:'attached'});
      const statement = page.locator('#statement');
      assert.ok((await statement.innerText()).includes('masa'));
      assert.equal(await page.locator('#fields input').count(),8);
      await page.locator('#v_dx').focus();
      await page.locator('#calcopen').click();
      const calc = page.locator('[data-calculadora-comun]');
      await calc.locator('input').fill('2,5e-8');
      await calc.getByRole('button',{name:'Calcular resultado',exact:true}).click();
      assert.equal(await calc.locator('input').inputValue(),'2.5e-8');
      await calc.getByRole('button',{name:'Copiar resultado al campo',exact:true}).click();
      assert.equal(await page.locator('#v_dx').inputValue(),'2.5e-8');
      await page.locator('#calcopen').click();
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
      assert.equal(await page.locator('#calcopen').evaluate(e=>e===document.activeElement),true);
      await page.locator('#check').click();
      assert.ok((await page.locator('#feedback').innerText()).includes('Respuestas correctas'));
      await page.locator('#next').click();
      assert.equal(await page.locator('#v_dx').inputValue(),'');
      assert.deepEqual(errors,[]);
      console.log(`PASS ${resource} ${width}px: enunciado, 8 campos, cálculo, EXP, copia, error, movimiento, Escape y nuevo ejercicio`);
      await page.close();
    }
  } finally {if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
