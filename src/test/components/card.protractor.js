// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// Chai's expect().to.exist style makes default jshint unhappy.
// jshint expr:true

describe('card e2e test', function() {
    beforeEach(function() {
        browser.get('http://localhost:8080/');
        browser.waitForAngular();
        browser.executeScript(function(){
            var compile = angular.injector(['ng']).get('$compile');
            var rootScope = angular.injector(['ng']).get('$rootScope');
            var element = angular.element('<div class="grid-block card-example-container">'+
                '<div class="card">' +
                '  <div class="card-content">' +
                '    <div class="card-secondary card-wrapper">' +
                '      <span class="font-icon fa fa-file"></span>' +
                '    </div>' +
                '    <div class="card-primary">' +
                '      <header class="card-header">' +
                '        <h2 class="card-title">Basic Card</h2>' +
                '        <p class="card-caption">Card Id#</p>' +
                '      </header>' +
                '      <div class="card-body">' +
                '        <p class="card-text">Some text here</p>' +
                '        <p class="card-text">Some more text here.</p>' +
                '        <hr class="spacer"></hr>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '  <footer class="card-footer edge-top">' +
                '    <div class="card-actions justify-left">' +
                '      <button class="card-btn-icon"><span class="fa fa-star"></span></button>' +
                '    </div>' +
                '    <div class="card-actions">' +
                '      <button class="card-btn-submit">Open</button>' +
                '    </div>' +
                '  </footer>' +
                '</div>');
            compile(element)(rootScope);
            rootScope.$digest();
           document.getElementsByClassName('view')[0].appendChild(element[0]);
        });
    });

    it('should add padding when .card-wrapper is used on .card-header', function() { 
       var headerElement = element.all(by.css('.card-header')).get(0);
       browser.executeScript(function() {
           document.getElementsByClassName('card-header')[0].classList += ' card-wrapper';
       });

        expect(headerElement.getCssValue("padding-top")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-bottom")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-left")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-right")).to.be.eventually.equal('8px');
    });

    it('should add padding when .card-wrapper is used on .card-secondary ', function() { 
       var headerElement = element.all(by.css('.card-secondary ')).get(0);
       browser.executeScript(function() {
           document.getElementsByClassName('card-secondary ')[0].classList += ' card-wrapper';
       });

        expect(headerElement.getCssValue("padding-top")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-bottom")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-left")).to.be.eventually.equal('8px');
        expect(headerElement.getCssValue("padding-right")).to.be.eventually.equal('8px');
    });

    

    it('should remove all padding when .card-collapse is used on .card-body', function() { 
       var headerElement = element.all(by.css('.card-body')).get(0);
       
       browser.executeScript(function() {
           document.getElementsByClassName('card-body')[0].classList += ' card-collapse';
       });
        expect(headerElement.getCssValue("padding-top")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-bottom")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-left")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-right")).to.be.eventually.equal('0px');
    });
});