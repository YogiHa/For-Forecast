const assert = require('assert').strict;
const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const driver = new Builder().forBrowser('chrome').build();
driver.get('http://localhost:3000/#');

describe('Landing', () => {
  it('Should load the home page and get title', async () => {
    const title = await driver.getTitle();
    expect(title).to.equal('For Forecast');
  });

  it('Should check whether the options icon is loaded, and open sign-in modal', async () => {
    await driver.sleep(100);
    await driver.findElement({ id: 'settings' }).click();
    await driver.sleep(150);
  });
});

describe('Auth', () => {
  it('Should send login form', async () => {
    await driver.findElement({ id: 'sign_in' }).click();
    await driver.sleep(300);
    await driver.findElement({ id: 'email' }).sendKeys('test@selenium.com');
    await driver.sleep(100);
    await driver.findElement({ id: 'password' }).sendKeys('testsel');
    await driver.sleep(100);
    await driver.findElement({ id: 'signin_button' }).click();
    await driver.sleep(3000);
  });
  it('Should register in case that selenium not have profile already', async () => {
    await driver.findElement({ id: 'settings' }).click();
    await driver.findElement(By.id('sign_out')).then(
      () => {
        console.log('user registered');
      },
      async err => {
        console.log('not registerd');
        await driver.findElement({ id: 'register' }).click();
        await driver.sleep(100);
        await driver.findElement({ id: 'firstName' }).sendKeys('selenium');
        await driver.sleep(100);
        await driver.findElement({ id: 'lastName' }).sendKeys('test');
        await driver.sleep(100);
        await driver.findElement({ id: 'email' }).sendKeys('test@selenium.com');
        await driver.sleep(100);
        await driver.findElement({ id: 'password' }).sendKeys('testsel');
        await driver.sleep(100);
        await driver.findElement({ id: 'register_button' }).click();
        await driver.sleep(3000);
        await driver.findElement({ id: 'settings' }).click();
        await driver.sleep(100);
      }
    );
  });
  it('Should confirm selenium first name in UI response', async () => {
    expect(await driver.findElement({ id: 'fav_nav' }).getText()).to.equal(
      "SELENIUM'S FAVORITES"
    );
  });
});

describe('Usage', () => {
  it('Should log Tel-Aviv current and tomorrow forecast', async () => {
    await driver.sleep(2500);
    let current = await driver.findElement({ id: 'current_temp' }).getText();
    let future = await driver.findElement({ id: 'future_temp' }).getText();
    console.log(`current forcast: ${current}, tomorrow: ${future}`);
  });

  it('Should switch degree unit', async () => {
    await driver.sleep(200);
    await driver.findElement({ id: 'toggle_button' }).click();
    await driver.sleep(300);
  });

  it('Should Search "mad" and API autoComplete to Madrid', async () => {
    await driver.sleep(300);
    await driver.findElement({ id: 'search_input' }).sendKeys('mad');
    await driver.sleep(3500);
    await driver.findElement({ id: 'filtered' }).click();
    await driver.sleep(1500);
  });

  it('Should add Madrid to favorites', async () => {
    await driver.sleep(300);
    await driver.findElement({ id: 'fav_button' }).click();
    await driver.sleep(300);
  });

  it('Should get selenium geo location forecast and add to favorite', async () => {
    await driver.sleep(300);
    await driver.findElement({ id: 'geo_nav' }).click();
    await driver.sleep(3000);
    let current = await driver.findElement({ id: 'current_temp' }).getText();
    let future = await driver.findElement({ id: 'future_temp' }).getText();
    console.log(`geo forcast: ${current}, tomorrow: ${future}`);
    await driver.findElement({ id: 'fav_button' }).click();
    await driver.sleep(1500);
  });
});
describe('Navigation', () => {
  it('Should navigate to favorites page', async () => {
    await driver.sleep(1500);
    await driver.findElement({ id: 'fav_nav' }).click();
    await driver.sleep(500);
  });
  it('Should delete from favorites using trash icon', async () => {
    await driver.sleep(500);
    await driver.findElement({ id: 'delete_icon' }).click();
    await driver.sleep(350);
  });
  it('Should get Madrid forecast again, and delete from favorites', async () => {
    await driver.sleep(200);
    await driver.findElement({ id: 'reload_icon' }).click();
    await driver.sleep(6000);
    await driver.findElement({ id: 'fav_button' }).click();
    await driver.sleep(300);
    await driver.findElement({ id: 'fav_nav' }).click();
    await driver.sleep(2000);
    expect(
      await driver.findElement({ id: 'empty_favorites' }).getText()
    ).to.equal('You have not saved any location yet.');
  });
  after(() => driver.quit());
});
