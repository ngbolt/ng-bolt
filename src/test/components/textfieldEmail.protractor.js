// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('textfield e2e tests - \'email\' type', function () {

    beforeEach(function() {
        browser.get('http://localhost:8080/');
        browser.waitForAngular();
        browser.executeScript(function(){
            var compile = angular.injector(['ng']).get('$compile');
            var rootScope = angular.injector(['ng']).get('$rootScope');
            var element = angular.element(
                '<form name="MyCtrl.myForm" class="form" novalidate>' +
                '<blt-textfield data-name="myFirstTextField"' +
                    'data-label="Text Field"' +
                    'data-model="MyCtrl.textField1">' +
                '</blt-textfield>' +
                '</form>'
            );
            compile(element)(rootScope);
            rootScope.$digest();
            document.getElementsByClassName('view')[0].appendChild(element[0]);
        });
    });


    it('can\'t input in improper email - STUB', function() {

    });


});