const puppeteer = require("puppeteer");

const pkg = async (pkgName) =>{
    let url = `https://www.npmjs.com/package/${pkgName}`;
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    //it will wait till no more than two network connections are active at the moment , basically it can be used to load a page completely
    await page.goto(url , {waitUntil:"networkidle2"});
    // To run those queries which we ran in browser's console to select out certain value.
    const  data = await page.evaluate(() => {
        let packageVersion = document.querySelector('p[class="f2874b88 fw6 mb3 mt2 truncate black-80 f4"]').innerText;
        let actualPackageName = document.querySelector('span[class="_50685029 truncate"]').innerText;
        return {
            packageVersion, actualPackageName
        };
    });
    await browser.close();
    return data;
};


module.exports = pkg;