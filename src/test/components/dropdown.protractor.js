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
        var  username  =  element.all(by.css('input[type="text"]')).get(0);
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
    });

    beforeEach(function() {
        browser.get('http://localhost:9000/form-controls');
    });
    /*
    it('dropdown should be focused on page load',  function () {
        var dropdown = element(by.css('select[autofocus="true"]'));
        var dropdownIn = browser.executeScript("return arguments[0].innerHTML;", dropdown);
        var browserIn = browser.executeScript("return arguments[0].innerHTML;", browser.driver.switchTo().activeElement());
        //expect(browser.driver.switchTo().activeElement().getId()).to.equal(dropdown.getId());
        //expect(browser.driver.switchTo().activeElement()).to.equal(dropdown.getWebElement());
        expect(dropdownIn).to.eventually.equal(browserIn);
    }); 
    */
    it('all three dropdown types should be disabled', function() {
        var disDrop = element(by.css('button[disabled="disabled"]'));
        var disDropSel = element(by.css('select[disabled="disabled"]'));
        var disDropSrch = element(by.css('input[disabled="disabled"]'));
        expect(disDrop.isEnabled()).to.eventually.be.false;
        expect(disDropSel.isEnabled()).to.eventually.be.false;
        expect(disDropSrch.isEnabled()).to.eventually.be.false;
    });

    it('select and search dropdowns should be required', function() {
        var dropSel = element(by.css('select[required="required"]'));
        var dropSrch = element.all(by.css('input[name="dropdownSearchTest"]')).get(0);
        var selectMsg = element.all(by.css('.dropdown-error-hide.dropdown-error-required')).get(0);
        var searchMsg = element.all(by.css('.dropdown-error-hide.dropdown-error-required')).get(1);
        expect(selectMsg.isDisplayed()).to.eventually.be.false;
        expect(searchMsg.isDisplayed()).to.eventually.be.false;
        dropSel.sendKeys(protractor.Key.TAB);
        dropSrch.sendKeys(protractor.Key.TAB);
        expect(selectMsg.isDisplayed()).to.eventually.be.true;
        expect(searchMsg.isDisplayed()).to.eventually.be.true;
    });

    it('select and searchable have no tabindex', function() {
        var dropReg = element.all(by.css('button[name="dropdownTest"]')).get(0);
        var dropSel = element(by.css('select[required="required"]'));
        var dropSrch = element.all(by.css('input[name="dropdownSearchTest"]')).get(0);
        dropReg.sendKeys(protractor.Key.TAB);
        var ddSelIH = browser.executeScript("return arguments[0].innerHTML;", dropSel);
        var ddSrchIH = browser.executeScript("return arguments[0].innerHTML;", dropSrch);
        var browserFoc = browser.executeScript("return arguments[0].innerHTML;", browser.driver.switchTo().activeElement());
        expect(ddSelIH).to.eventually.not.equal(browserFoc);
        expect(ddSrchIH).to.eventually.not.equal(browserFoc);
    });

    it('change function for select should be triggered', function() {
        // Helper function to select a dropdown option
        var selectDropdownbyNum = function ( element, optionNum ) {
            if (optionNum){
              var options = element.all(by.tagName('option'))   
                .then(function(options){
                  options[optionNum].click();
                });
            }
          }; 

        var dropSlCh = element.all(by.css('select.dropdown-input')).get(2);
        selectDropdownbyNum(dropSlCh, 2);
        var chAlert = browser.switchTo().alert();
        expect(chAlert.getText()).to.eventually.equal('Changed');
        chAlert.accept();
    }); 

    it('shows label for select and search', function()  {
        var selLab = element.all(by.css('.dropdown-label')).get(2);
        var srchLab = element.all(by.css('.dropdown-label')).get(3);
        var selText = 'Disabled Dropdown Select';
        var srchText = 'Disabled Dropdown Search';

        expect(selLab.getText()).to.eventually.equal(selText);
        expect(srchLab.getText()).to.eventually.equal(srchText);
    }); 
});