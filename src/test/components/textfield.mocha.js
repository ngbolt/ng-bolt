/**
 * Created by sms97 on 8/3/2017.
 */
'use strict';
describe('Textfield', function() {

    beforeEach(function () {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });

    beforeEach(module('blt_core', function ($provide) {
        $provide.value('config', {defaultLogLevel: "error", debug: true});
    }));

    beforeEach(module('truncate'));
    beforeEach(module('blt_textfield'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;

    beforeEach(inject(function ($rootScope, $compile) {
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


    describe('will bind on create', function () {

        beforeEach(inject(function ($rootScope, $compile) {
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

        it('text should be the default ', function() {
            expect(element[0].children[0].children[0].children[1].type).to.equal('text');
        });

        it('should have name even without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-name')).to.equal(true);
        });

        it('should have label even without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-label')).to.equal(true);
        });

        it('should NOT have minlength without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-minlength')).to.equal(false);
        });

        it('should NOT have maxlength without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-maxlength')).to.equal(false);
        });

        it('should NOT have min without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-min')).to.equal(false);
        });

        it('should NOT have max without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-max')).to.equal(false);
        });

        it('should NOT have rows without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-rows')).to.equal(false);
        });

        it('should NOT have validate without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-validate')).to.equal(false);
        });

        it('should NOT have required without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-required')).to.equal(false);
        });

        it('should NOT have autofocus without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-autofocus')).to.equal(false);
        });

        it('should NOT have autocomplete without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-autocomplete')).to.equal(false);
        });

        it('should NOT have autocorrect without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-autocorrect')).to.equal(false);
        });

        it('should NOT have spellcheck without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-spellcheck')).to.equal(false);
        });

        it('should NOT have disabled without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-disabled')).to.equal(false);
        });

        it('should NOT have tabindex without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-tabindex')).to.equal(false);
        });

        it('should NOT have step without setting a value', function () {
            expect(element[0].children[0].hasAttribute('data-step')).to.equal(false);
        });

    });

    describe('test type text', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="text"' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid text', function() {
            const valueToTest = 'va^lid T3xt';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-text');
        });

    });

    describe('test type password', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="password"' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid password', function() {
            const valueToTest = 'p@55wORD!';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-password');
        });

        /*it('should not accept invalid password', function() {
            const valueToTest = 'FILL ME OUT';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].classList.value).include('ng-invalid-password');
         });*/

    });

    describe('test type tel', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="tel"' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid tel', function() {
            const valueToTest = '123-456-7890';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-tel');
        });

        /*it('should not accept invalid tel', function() {
            const valueToTest = 'FILL ME OUT';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].classList.value).include('ng-invalid-tel');
         });*/

    });

    describe('test type email', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="email"' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid email', function() {
            const valueToTest = 'brazdollz123@gmail.com';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-email');
        });

        it('should not accept invalid email', function() {
            const valueToTest = 'invalid email';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].classList.value).include('ng-invalid-email');
         });

    });

    describe('test type number', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="number"' +
                'data-max ="12" ' +
                'data-min ="0" ' +
                'data-step ="2" ' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid number', function() {
            const valueToTest = 12341234;

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-number');
        });

        /*it('should not accept invalid number', function() {
            const valueToTest = 'FILL ME OUT';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].classList.value).include('ng-invalid-number');
         });*/

        it('should have max with its value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-max')).to.equal('12');
        });

       it('should have min with its value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-min')).to.equal('0');
        });

        it('should have step with its value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-step')).to.equal('2');
        });

    });

    describe('test type url', function() {
        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="url"' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid url', function() {
            const valueToTest = 'https://www.myspace.com';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-url');
        });

        it('should not accept invalid url', function() {
            const valueToTest = 'ww.merspace.com';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].classList.value).include('ng-invalid-url');
        });

    });

    describe('test type textarea', function() {
        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="textarea"' +
                'data-rows ="10" ' +
                '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid textarea', function() {
            const valueToTest = 'can \n have \n multiple \n rows';

            outerScope.$apply(function() {
                outerScope.value = valueToTest;
            });

            expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());
            expect(element[0].classList.value).include('ng-valid-textarea');
        });

        it('should have rows with its value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-rows')).to.equal('10');
        });

    });

    describe('test non-type specific text bound attributes', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="{{type}}" ' +
                'data-pattern="{{pattern}}" ' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
            outerScope.$digest();
        }));

        it('should accept name', function() {
            const valueToTest = 'Look at me - I am the name now';

            outerScope.$apply(function() {
                outerScope.name = valueToTest;
            });

            expect(element[0].children[0].getAttribute('data-name')).equal(valueToTest.toString());
        });

        it('should accept label', function() {
            const valueToTest = 'Look at me - I am the label now';

            outerScope.$apply(function() {
                outerScope.label = valueToTest;
            });

            expect(element[0].children[0].getAttribute('data-label')).equal(valueToTest.toString());
        });

        it('should accept pattern', function() {
            const valueToTest = '^s';

            outerScope.$apply(function() {
                outerScope.pattern = valueToTest;
            });

            expect(element[0].children[0].getAttribute('data-pattern')).equal(valueToTest.toString());
        });

    });

    describe('test non-type specific one way attributes', function() {

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-minlength="1" ' +
                'data-maxlength="10" ' +
                'data-required="true" ' +
                'data-autofocus="true" ' +
                'data-autocomplete="true" ' +
                'data-autocorrect="true" ' +
                'data-spellcheck="true" ' +
                'data-disabled="false" ' +
                'data-tabindex="2" ' +
            '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
            outerScope.$digest();
        }));

        it('should accept minlength', function() {
            expect(element[0].children[0].getAttribute('data-minlength')).equal('1');
        });

        it('should accept maxlength', function() {
            expect(element[0].children[0].getAttribute('data-maxlength')).equal('10');
        });

        it('should accept required', function() {
            expect(element[0].children[0].getAttribute('data-required')).equal('true');
        });

        it('should accept autofocus', function() {
            expect(element[0].children[0].getAttribute('data-autofocus')).equal('true');
        });

        it('should accept autocomplete', function() {
            expect(element[0].children[0].getAttribute('data-autocomplete')).equal('true');
        });

        it('should accept autocorrect', function() {
            expect(element[0].children[0].getAttribute('data-autocorrect')).equal('true');
        });

        it('should accept spellcheck', function() {
            expect(element[0].children[0].getAttribute('data-spellcheck')).equal('true');
        });

        it('should accept disabled', function() {
            expect(element[0].children[0].getAttribute('data-disabled')).equal('false');
        });

        it('should accept tabindex', function() {
            expect(element[0].children[0].getAttribute('data-tabindex')).equal('2');
        });

    });

});

