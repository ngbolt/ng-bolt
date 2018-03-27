// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('dropdown tests', function () {
    before(function() {
        browser.get('http://localhost:9000/');
        this.timeout(0);
        var  username  =  element.all(by.css('input[type="text"]')).get(0);
        var  password  =  element(by.css('input[type="password"]'));
        username.sendKeys('admin');
        password.sendKeys('password');
        password.sendKeys(protractor.Key.ENTER);
        var  enter  =  element(by.css('.btn-solid-submit'));
        enter.click();
        var  menu  =  element.all(by.css('.appbar-section')).get(0).all(by.css('button'));
        menu.click();
        var  menuItem  =  element(by.css('.menu')).all(by.css('.menu-item')).get(3);
        menuItem.click();
    });

    beforeEach(function() {
        browser.get('http://localhost:9000/form-controls');
    });

    it('checkbox should have class "fa-check-square" after pressing space',  function () {
        var checkbox = element(by.css('input[type="checkbox"]'));
        checkbox.sendKeys(protractor.Key.SPACE);    // Space works on checkboxes in Firefox, but not Enter
        expect(element.all(by.css('.checkbox-radio-input')).get(7).all(by.css('span')).get(0).getAttribute('class')).to.eventually.include('fa-check-square');
    });

    it('shows labels for checkbox and radio', function() {
        var radLabel = element.all(by.css('.checkbox-radio-label')).get(1);
        var checkLabel = element.all(by.css('.checkbox-radio-label')).get(7);
        var radText = 'radio1';
        var checkText = 'Check me';

        expect(radLabel.getText()).to.eventually.equal(radText);
        expect(checkLabel.getText()).to.eventually.equal(checkText);
    });

    it('change function is triggered for radio', function() {
        var chRadio = element.all(by.css('.checkbox-radio-input-hidden')).get(6);
        var alertText = 'Changed';

        chRadio.sendKeys(protractor.Key.SPACE);
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
        var chAlert = browser.switchTo().alert();

        expect(chAlert.getText()).to.eventually.equal(alertText);
        chAlert.accept();
    });
    
    it('change function is triggered for checkbox', function() {
        var chCheck = element.all(by.css('.checkbox-radio-input-hidden')).get(8);
        var alertText = 'Changed';

        chCheck.sendKeys(protractor.Key.SPACE);
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
        var chAlert = browser.switchTo().alert();

        expect(chAlert.getText()).to.eventually.equal(alertText);
        chAlert.accept(); 
    }); 
});