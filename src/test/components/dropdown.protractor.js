// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('dropdown tests', function () {
    it('go to demo app',  function () {
        browser.get('http://localhost:9000/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).to.eventually.eq('http://localhost:9000/');
    });

    it('go to form controls', function() {
        this.timeout(0);
        var  username  =  element(by.css('input[type="text"]'));
        var  password  =  element(by.css('input[type="password"]'));
        username.sendKeys('admin');
        password.sendKeys('password');
        password.sendKeys(protractor.Key.ENTER);
        var  enter  =  element(by.css('.btn-solid-submit'));
        enter.click();
        var  menu  =  element.all(by.css('.appbar-section')).get(0).all(by.css('button'));
        menu.click();
        var  menuItem  =  element(by.css('.menu')).all(by.css('.menu-item')).get(3);
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.eq('http://localhost:9000/form-controls');
    });
    /*
    it('dropdown should be focused on page load',  function () {
        browser.driver.navigate().refresh();
        browser.waitForAngular();
        var dropdown = element(by.css('select[autofocus="true"]'));
        dropdownIn = browser.executeScript("return arguments[0].innerHTML;", dropdown);
        var browserIn = browser.executeScript("return arguments[0].innerHTML;", browser.driver.switchTo().activeElement());
        //expect(browser.driver.switchTo().activeElement().getId()).to.equal(dropdown.getId());
        //expect(browser.driver.switchTo().activeElement()).to.equal(dropdown.getWebElement());
        expect(dropdownIn).to.eventually.equal(browserIn);
        // Find fix online for protractor's innerHTML property: https://github.com/angular/protractor/blob/master/CHANGELOG.md
    }); */
    
    it('all three dropdown types should be disabled', function() {
        var disDrop = element(by.css('button[disabled="disabled"]'));
        var disDropSel = element(by.css('select[disabled="disabled"]'));
        var disDropSrch = element(by.css('input[disabled="disabled"]'));
        expect(disDrop.isEnabled()).to.eventually.be.false;
        expect(disDropSel.isEnabled()).to.eventually.be.false;
        expect(disDropSrch.isEnabled()).to.eventually.be.false;
    });
});