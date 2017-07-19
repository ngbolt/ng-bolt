'use strict';

// Checkbox / Radio Component Tests
describe('checkboxradio', function() {
    // Load Module & Templates
    beforeEach(module('blt_checkboxradio'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<blt-checkbox-radio data-name="{{name}}" data-label="{{label}}" data-model="model" data-type="{{type}}" data-value="{{value}}" data-autofocus="autofocus" data-disabled="disabled" data-required="required" data-tabindex="tabindex" data-change="changeFn"></blt-checkbox-radio>');

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();
    }));

    // Test Group
    describe('will bind on create', function() {

        // Nested Test Group
        describe('Checkbox type', function() {

            beforeEach(function() {
                outerScope.$apply(function (){
                    outerScope.type = "checkbox";
                });
            });
            
            // Test
            it('should have a type', function() {
                expect(element[0].children[0].children[0].children[0].getAttribute('type')).to.equal('checkbox');
            });

            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "Hello world.";
                });
                
                expect(element[0].children[0].children[0].children[1].children[1].innerHTML).to.equal('Hello world.');
            });

            // Test
            it('should not have a label', function() {
                expect(element[0].children[0].children[0].children[1].children[1]).to.equal(undefined);
            });

            // Test
            it('should be checked/model value set', function() {
                outerScope.$apply(function() {
                    outerScope.model = "crModel";
                });
                
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).that.include('fa-check-square');
            });

            // Test
            it('should not be checked/no model value set', function() {
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).that.does.not.include('fa-check-square');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "crName";
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('name')).to.equal('crName');
            });

            // Test
            it('should not have a name', function() {
                expect(element[0].children[0].children[0].children[0].getAttribute('name')).to.equal('');
            });

            // Test
            it('should autofocus on page load', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
            });

            // Test 
            it('should not autofocus on page load (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = false;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('false');
            });

            // Test
            it('should not autofocus on page load (attribute not included)', function() {
                expect(element[0].children[0].children[0].children[0].hasAttribute('autofocus')).to.equal(false);
            });

            /* 
            data-required is still not working correctly for checkbox or radio, as it cannot be found in the DOM when set to true. 
            It must first be fixed and those fixes must be merged into this branch before this test can be finished

            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('true');
            });
            */

            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('-1');
            });

            // Test
            it('should be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = true;
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            it('should not be disabled (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });

            it('should not be disabled (attribute not included)', function() {
                expect(element[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });
        });

        // Nested Test Group
        describe('Radio type', function() {

            beforeEach(function() {
                outerScope.$apply(function (){
                    outerScope.type = "radio";
                });
            });
            
            // Test
            it('should have a type', function() {
                expect(element[0].children[0].children[0].children[0].getAttribute('type')).to.equal('radio');
            });

            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "crLabel";
                });
                
                expect(element[0].children[0].children[0].children[1].children[1].innerHTML).to.equal('crLabel');
            });

            // Test
            it('should not have a label', function() {
                expect(element[0].children[0].children[0].children[1].children[1]).to.equal(undefined);
            });

            // Test
            it('should be selected (model and value equal)', function () {
                outerScope.$apply(function() {
                    outerScope.model = "crValue";
                    outerScope.value = "crValue";
                });
                
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
            });

            // Test
            it('should not be selected (model and value unequal)', function() {
                outerScope.$apply(function() {
                    outerScope.model = "crModel";
                    outerScope.value = "crValue";
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-circle');
            });

            // Test
            it('should not be selected (model set but no value)', function() {
                outerScope.$apply(function() {
                    outerScope.model = "crModel";
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-circle');
            });

            // Test
            it('should not be selected (value set but no model)', function() {
                outerScope.$apply(function() {
                    outerScope.value = "crValue";
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-circle');
            });

            // Test
            it('should have a value', function() {
                outerScope.$apply(function() {
                    outerScope.value = "crValue";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('value')).to.equal('crValue');
            });

            // Test
            it('should not have a value', function() {
                expect(element[0].children[0].children[0].children[0].getAttribute('value')).to.equal('');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "crName";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('name')).to.equal('crName');
            });

            // Test
            it('should not have a name', function() {
                expect(element[0].children[0].children[0].children[0].getAttribute('name')).to.equal('');
            });

            // Test
            it('should autofocus on page load', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
            });

            // Test
            it('should not autofocus on page load (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = false;
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('false');
            });

            // Test
            it('should not autofocus on page load (attribute not included)', function() {
                expect(element[0].children[0].children[0].children[0].hasAttribute('autofocus')).to.equal(false);
            });
            
            /* 
            data-required is still not working correctly for checkbox or radio, as it cannot be found in the DOM when set to true. 
            It must first be fixed and those fixes must be merged into this branch before this test can be finished

            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('true');
            });
            */

            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('-1');
            });

            // Test
            it('should be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should not be disabled (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });

            // Test
            it('should not be disabled (attribute not included)', function() {
                expect(element[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });
        });
    });

    /*
    // Test Group
    describe('will update after change', function() {

        // Nested Test Group
        describe('Checkbox type', function() {
            
            beforeEach(function() {
                outerScope.$apply(function (){
                    outerScope.type = "checkbox";
                });
            });

            it('should change model with change function', function() {
                outerScope.$apply(function () {
                    outerScope.model = 'crModel';
                    //outerScope.changeFn = function() {}

                });

                function clickFunction() {
                    element[0].children[0].children[0].children[0].click();
                }

                clickFunction;

                console.log(element[0].children[0].children[0].children[1]);
                 
            });            
        });
    });
    */
});