'use strict';

//Toggle Switch Tests
describe('toggleswitch', function() {
    // Load Module & Templates
    beforeEach(module('blt_toggleswitch'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element(
            '<blt-toggle-switch ' +
            'tabindex="0" ' +
            'data-model="value" ' +
            'data-disabled="disabled" ' +
            'data-label="{{label}}" ' +
            'data-tabindex="tabindex" ' +
            'data-justify="{{justify}}"> ' +
            '</blt-toggle-switch>');

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();
    }));

    // Test Group
    describe('will bind on create', function() {
        // Test
        it('should have a label', function() {
            outerScope.$apply(function() {
                outerScope.label = 'Hello world.';
            });
            expect(element[0].children[0].tagName).to.equal('LABEL') && expect(element[0].children[0].innerText).to.equal("\n    Hello world.\n");
        });

        // Test
        it('should not have a label', function() {
             expect(element[0].children[0].tagName).to.not.equal('LABEL');
        });

        // Test
        it('should be on', function() {
            outerScope.$apply(function() {
                outerScope.value = true;
            });
            expect(element[0].children[0].classList.value.split(' ')).that.include("toggle-switch-on");
        });

        // Test
        it('should not be on', function() {
            outerScope.$apply(function() {
                outerScope.value = false;
            });
            expect(element[0].children[0].classList.value.split(' ')).that.does.not.include("toggle-switch-on");
        });

        it('should be disabled', function() {
            outerScope.$apply(function() {
                outerScope.disabled = true;
            });
            expect(element[0].children[0].classList.value.split(' ')).that.include("toggle-switch-disabled");
        });

        it('should not be disabled', function() {
            outerScope.$apply(function() {
                outerScope.disabled = false;
            });

            expect(element[0].children[0].classList.value.split(' ')).that.does.not.include("toggle-switch-disabled");
        });

        it('should have tabindex set', function() {
            outerScope.$apply(function() {
                outerScope.tabindex = 0;
            });

            // Fill this in
        });

        it('should not have tabindex set', function() {
            outerScope.$apply(function() {
                outerScope.tabindex = -1;
            });

            // Fill this in
        });

        it('should be left justified', inject(function($compile) {
            outerScope.$apply(function() {
                outerScope.justify="left";
            });
            //Re-compile element so bltToggleSwitch.linkFn function will be called and apply the toggle-left class
            $compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].classList.value.split(' ')).that.include("toggle-left");
        }));
    
        it('should be right justified', inject(function($compile) {
            outerScope.$apply(function() {
                outerScope.justify="right";
            });
            //Re-compile element so bltToggleSwitch.linkFn function will be called and apply the toggle-right class
            $compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].classList.value.split(' ')).that.include("toggle-right");
        }));

        it('should not be right justified', function() {
            expect(element[0].classList.value.split(' ')).that.does.not.include("toggle-right");
        });

        it('should be center justified', inject(function($compile) {
            outerScope.$apply(function() {
                outerScope.justify="center";
            });
            //Re-compile element so bltToggleSwitch.linkFn function will be called and apply the toggle-center class
            $compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].classList.value.split(' ')).that.include("toggle-center");
        }));

        it('should not be right justified', function() {
            expect(element[0].classList.value.split(' ')).that.does.not.include("toggle-center");
        });
    });

    describe('attribute combinations', function(){
        
    });
});