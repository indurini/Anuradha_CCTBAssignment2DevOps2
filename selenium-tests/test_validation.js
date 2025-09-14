const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testValidation() {
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://50.17.114.180/');

    // Leave fields empty and try submitting
    await driver.findElement(By.id('submit')).click();

    // Wait for validation or error message (customize this based on your form behavior)
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log('Validation Alert:', alertText);
    await alert.accept();

    console.log(' Test Passed: Validation triggered for empty fields');
  } catch (e) {
    console.log(' Test Failed:', e);
  } finally {
    await driver.quit();
  }
})();
