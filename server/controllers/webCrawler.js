const puppeteer = require('puppeteer');

const handleScrap = (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      const addaptReq = req.body.name.replace(' ', '%20');
      const url = `https://www.pexels.com/search/${addaptReq}/`;

      await page.goto(url);
      const img = await page.evaluate(() =>
        document
          .querySelector('a.js-photo-link img')
          .getAttribute('data-tiny-src')
      );
      res.json(img);
      await browser.close();
    } catch {
      const img = await page.evaluate(() =>
        document
          .querySelector('a.sponsored-photos__photo__link')
          .getAttribute('style')
      );
      res.json(img.slice(22, img.length - 1));
      await browser.close();
    }
  })();
};

module.exports = {
  handleScrap
};
