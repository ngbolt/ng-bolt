'use strict';
describe.only('Textfield still needs testing', function() {

    beforeEach(function() {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });

    beforeEach(module('blt_core', function($provide){
        $provide.value('config', { defaultLogLevel: "error", debug: true });
    }));

    beforeEach(module('truncate'));
    beforeEach(module('blt_textfield'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var tOut;

    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<form><blt-textfield ' +
            'data-model="value" ' +
            'data-name="{{name}}" ' +
            'data-label="{{label}}" ' +
        '></blt-textfield></form>');

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();
        outerScope.$digest();
    }));

    describe('misc tests', function() {
        beforeEach(inject(function($rootScope, $compile, $timeout) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="I am the label" ' +
                'data-autofocus="true" ' +
            '></blt-textfield></form>');

            tOut = $timeout;
            sinon.spy(element[0],'focus');
            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
            outerScope.$digest();
        }));


        it('label text actually shows up in input', function() {
            expect(element[0].children[0].children[0].children[0].innerHTML).to.equal('I am the label');
        });

        it('autofocus will select textfield on pageload - STUB ', function() {
            // I'm not sure how to test this
            /*console.log(element);
            tOut.flush();
            console.log(element);
            expect(element[0].focus).to.be.called();*/
        });

        it('disabled won\'t allow text to be added to input - STUB', function() {
            // not sure how to test this - can't set innerHTML even when not disabled
            /*outerScope.$apply(function() {
                element[0].children[0].children[0].children[1].innerHTML = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            });
            console.log(element);
            expect(element[0].children[0].children[0].children[1].innerText).to.equal("");*/
        });

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

