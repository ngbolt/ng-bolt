// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// Chai's expect().to.exist style makes default jshint unhappy.
// jshint expr:true

describe('list e2e test', function() {
    beforeEach(function() {
        browser.get('http://localhost:8080/');
        browser.waitForAngular();
        browser.executeScript(function(){
            var compile = angular.injector(['ng']).get('$compile');
            var rootScope = angular.injector(['ng']).get('$rootScope');
            var element = angular.element('<ul class="list">' +
                    '<li class="list-row">' +
                        '<p class="list-pending-msg">Pending</p>' +
                        '<div class="list-tile">' +
                          '<div class="list-content">' +
                            '<h2 class="list-title"> Item 1</h2>' +
                            '<p class="list-text">Description Text</p>' +
                          '</div>' +
                          '<div class="list-actions">' +
                            '<button class="list-btn-icon"><span class="fa fa-check"></span></button>' +
                            '<button class="list-btn-icon"><span class="fa fa-times"></span></button>' +
                          '</div>' +
                        '</div>' +
                    '</li>' +
                    '<li class="list-row">' +
                        '<div class="list-tile">' +
                          '<div class="list-content">' +
                            '<h2 class="list-title"> Item 2</h2>' +
                            '<p class="list-text">Description Text</p>' +
                          '</div>' +
                          '<div class="list-actions">' +
                            '<button class="list-btn-icon"><span class="fa fa-check"></span></button>' +
                            '<button class="list-btn-icon"><span class="fa fa-times"></span></button>' +
                          '</div>' +
                        '</div>' +
                      '</li>' +
                '</ul>' );
            compile(element)(rootScope);
            rootScope.$digest();
            document.getElementsByClassName('view')[0].appendChild(element[0]);
        });
    });


    it('should remove all padding when .list-collapse is used on .list', function() { 
       var headerElement = element.all(by.css('.list')).get(0);
       
       browser.executeScript(function() {
           document.getElementsByClassName('list')[0].classList += ' list-collapse';
       });
        expect(headerElement.getCssValue("padding-top")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-bottom")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-left")).to.be.eventually.equal('0px');
        expect(headerElement.getCssValue("padding-right")).to.be.eventually.equal('0px');
    });

    it('should hide elements when .list-pending is applied', function() {
        var headerElement = element.all(by.css('.list')).get(0);
        var listTitle = element.all(by.css('.list-title'));
        browser.executeScript(function() {
           document.getElementsByClassName('list')[0].classList += ' list-pending';
        });
        expect(listTitle.get(0).getCssValue('display')).to.be.eventually.equal('none');
        expect(listTitle.get(1).getCssValue('display')).to.be.eventually.equal('none');
        browser.pause(5859);
    });
});