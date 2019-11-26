const puppeteer = require('puppeteer');

const handleScrap = (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.pexels.com/search/${req.body.name.replace(' ', '%20')}/`
    );

    const img = await page.evaluate(() => {
      try {
        return document
          .querySelector('a.js-photo-link img')
          .getAttribute('data-tiny-src');
      } catch {
        let url = document
          .querySelector('a.sponsored-photos__photo__link')
          .getAttribute('style');
        return url.slice(22, url.length - 1);
      }
    });
    res.json(img);
    await browser.close();
  })();
};

module.exports = {
  handleScrap
};
