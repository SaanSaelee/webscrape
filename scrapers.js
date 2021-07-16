const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();
    
    const [el3] = await page.$x('//*[@id="a-autoid-9-announce"]/span[2]/span[1]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price});

    browser.close();
}


scrapeProduct('https://www.amazon.com/How-Not-Be-Wrong-Mathematical/dp/0143127535/ref=sxin_11_birs_cobar_search?cv_ct_cx=the+black+swan&dchild=1&keywords=the+black+swan&pd_rd_i=0143127535&pd_rd_r=cd50eb54-8689-4a6d-a339-05397bfba140&pd_rd_w=S5hT5&pd_rd_wg=ppU56&pf_rd_p=44a1f5ee-544c-43f1-978e-fa0c248654fb&pf_rd_r=QJHG31GWMTRXFV23R8K3&qid=1626411303&sr=1-1-99af414c-1b7d-42c2-a92c-89941e88149f');