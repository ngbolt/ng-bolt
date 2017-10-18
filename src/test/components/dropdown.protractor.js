// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('dropdown tests', function () {
    it('go to demo app form controls', function () {
        browser.get('http://localhost:9000/form-controls');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).to.eventually.eq('http://localhost:9000/form-controls');
    });

    it('dropdown should automatically be focused', function() {
        this.timeout(0);
        var  username  =  element(by.css('input[type="text"]'));
        var  password  =  element(by.css('input[type="password"]'));
        username.sendKeys('admin');
        password.sendKeys('password');
        password.sendKeys(protractor.Key.ENTER);
        var  enter  =  element(by.css('.btn-solid-submit'));
        enter.click();
        var dropdown = element(by.css('select.dropdown-input'));
        dropdownIn = browser.executeScript("return arguments[0].innerHTML;", dropdown)
        var browserIn = browser.executeScript("return arguments[0].innerHTML;", browser.driver.switchTo().activeElement());
        expect(dropdownIn).toEqual(browserIn);
        //expect(dropdown.getInnerHTML()).toEqual(browser.driver.switchTo().activeElement().getInnerHTML());
        // Find fix online for protractor's innerHTML property: https://github.com/angular/protractor/blob/master/CHANGELOG.md
    });
})