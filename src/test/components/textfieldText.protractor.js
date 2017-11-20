// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('textfield e2e tests - type \'text\'', function () {
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


    it('inputted text actually shows up in field - STUB', function() {

    });

    it('label text actually shows up in field - STUB', function() {

    });

    it('autofocus will select textfield on pageload - STUB ', function() {

    });

    it('test change - STUB ', function() {

    });

    it('disabled won\'t allow text to be added to input - STUB', function() {

    });

    it('can\'t type in more than maxlength - STUB', function() {

    });

    it('can\'t type in less than minlength - STUB', function() {

    });

    it('test validate & pattern - STUB', function() {

    });

    it('test CSS required - STUB', function() {

    });

    it('test autocorrect - STUB', function() {

    });

    it('test autocomplete - STUB', function() {

    });

    it('test tabindex - STUB', function() {

    });

    it('test spellcheck - STUB', function() {

    });

    it('can type in all special characters - STUB', function() {

    });


});