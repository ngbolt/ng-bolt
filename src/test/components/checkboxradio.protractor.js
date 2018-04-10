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
        var checkbox = element.all(by.css('input[type="checkbox"]')).get(0);
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

    it('required message appears for required checkbox', function() {
        var checkbox = element.all(by.css('.checkbox-radio-icon.fa.fa-square')).get(0);
        var reqMessage = element.all(by.css('.checkbox-radio-error-hide.checkbox-radio-error-required')).get(0);

        expect(reqMessage.isDisplayed()).to.eventually.be.false;

        checkbox.click();
        var checkedbox = element.all(by.css('.checkbox-radio-icon.fa.fa-check-square')).get(0);
        checkedbox.click();

        expect(reqMessage.isDisplayed()).to.eventually.be.true;
    });

    it('disabled checkbox and radio are not enabled', function(){
        checkDis = element.all(by.css('input[disabled="disabled"]')).get(0);
        radDis = element.all(by.css('input[disabled="disabled"]')).get(1);

        expect(checkDis.isEnabled()).to.eventually.be.false;
        expect(radDis.isEnabled()).to.eventually.be.false;
    });

    it('radio and checkbox have no tabindex when tabindex = -1', function() {
        var radio = element.all(by.css('input[type="radio"]')).get(0);
        var check = element.all(by.css('input[type="checkbox"]')).get(0);
        var nextCheck = element.all(by.css('input[type="checkbox"]')).get(1);

        nextCheck.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.TAB));

        var radIH = browser.executeScript("return arguments[0].innerHTML;", radio);
        var checkIH = browser.executeScript("return arguments[0].innerHTML;", check);
        var browserFoc = browser.executeScript("return arguments[0].innerHTML;", browser.driver.switchTo().activeElement());

        expect(radIH).to.eventually.not.equal(browserFoc);
        expect(checkIH).to.eventually.not.equal(browserFoc);
    });
});