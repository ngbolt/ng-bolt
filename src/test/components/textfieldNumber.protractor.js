// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('textfield e2e tests - test type \'number\'', function () {
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


    it('can\'t go above max - STUB', function() {

    });

    it('can\'t go below min - STUB', function() {

    });

    it('steps by required amount - STUB', function() {

    });

    it('able to increment by step amount- STUB', function() {

    });

    it('test step decrement by step amount- STUB', function() {

    });

    it('can\'t input non-number - STUB', function() {

    });

    it('can input decimal - STUB', function() {

    });

    it('can input negative sign - STUB', function() {

    });

    it('can\'t input negative in wrong place - STUB', function() {

    });

    it('can\'t input multiple negatives in right place - STUB', function() {

    });

    it('can\'t input multiple decimals - STUB', function() {

    });


});