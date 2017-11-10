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

        it.only('inputted text actually shows up in field - STUB', function() {
            //var ptor = protractor.getInstance();
            //ptor.get('http://localhost:8000');
            //browser.get('http://localhost:9000/form-controls');
            //expect(browser.getTitle()).toEqual('ngBoltJS');
        });


        it('label text actually shows up in field - STUB', function() {

            //expect(element[0].children[0].children[0].children[0].innerHTML).to.equal('I am the label');
        });


        //it('autofocus will select textfield on pageload - STUB ', function() {
        //    console.log(element);
            // I'm not sure how to test this
            /*console.log(element);
            tOut.flush();
            console.log(element);
            expect(element[0].focus).to.be.called();*/
        //});

        //it('disabled won\'t allow text to be added to input - STUB', function() {
            // not sure how to test this - can't set innerHTML even when not disabled
            /*outerScope.$apply(function() {
                element[0].children[0].children[0].children[1].innerHTML = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            });
            console.log(element);
            expect(element[0].children[0].children[0].children[1].innerText).to.equal("");*/
        //});

        it('test validate & pattern - STUB', function() {

        });

        it('test CSS required - STUB', function() {

        });

        it('test step increment - STUB', function() {

        });

        it('test step decrement - STUB', function() {

        });
    });

});

