'use strict';

// Checkbox / Radio Component Tests
describe('checkboxradio', function() {
    // Load Module & Templates
    beforeEach(module('blt_checkboxradio'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var timeout;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, $timeout) {
        element = angular.element(
            '<blt-checkbox-radio ' +
            'data-name="{{name}}" ' +
            'data-label="{{label}}" ' +
            'data-model="model" ' +
            'data-type="{{type}}" ' +
            'data-value="{{value}}" ' +
            'data-autofocus="autofocus" ' +
            'data-disabled="disabled" ' +
            'data-required="required" ' +
            'data-tabindex="tabindex" ' +
            'data-change="changeFn">' +
            '</blt-checkbox-radio>'
        );

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();

        timeout = $timeout;
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

            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
            });
            

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
            
            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
            });
            

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
    /* Change tests do not work yet
    // Test Group
    describe('will update after change', function() {

        // Nested Test Group
        describe('Checkbox type', function() {
            
            beforeEach(function() {
                outerScope.$apply(function () {
                    outerScope.type = "checkbox";
                });
            });

            // Test
            it('should change model with change function', function() {
                outerScope.$apply(function () {
                    outerScope.changeFn = function() {
                        console.log("Toggled, model:", outerScope.model);
                    }
                    outerScope.model = 'crModel';
                });
                
                var e = new KeyboardEvent('keyup', {
                    which: 32
                });
                
                element[0].children[0].children[0].children[0].dispatchEvent(e);
                console.log(element[0].children[0].children[0].children[0]);
                
                timeout.flush();

                console.log(element[0].children[0].children[0].children[1].children[0]);
                console.log(outerScope.model);
            }); 
        });

        // Nested Test Group
        describe('Radio type', function() {
            
            beforeEach(function() {
                outerScope.$apply(function () {
                    outerScope.type = "radio";
                });
            });

            // Test
            it('should change model with change function', function() {
                outerScope.$apply(function () {
                    outerScope.changeFn = function() {
                        console.log("Toggled, model:", outerScope.model);
                    }
                    outerScope.model = 'crModel';
                    outerScope.value = 'crModel';
                });
                
                var e = new KeyboardEvent('keyup', {
                    keyCode: 13
                });
                
                element[0].children[0].children[0].children[0].dispatchEvent(e);
                
                timeout.flush();

                console.log(element[0].children[0].children[0].children[1].children[0]);
                console.log(outerScope.model);
            }); 
        });
    });
    */
    // Test Group
    describe('will bind on create - attribute combinations', function() {

        // Nested test group
        describe('Checkbox type', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    // include required attributes
                    outerScope.type = "checkbox";
                    outerScope.label = "cLabel";
                    outerScope.model = "cModel";
                    outerScope.name = "cName";
                });
            });

            // Test
            it('should have all attributes', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            //Test
            it('should have autofocus, required and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });
            
            // Test 
            it('should have autofocus, required and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have autofocus, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have autofocus and required', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
            });
            
            // Test
            it('should have autofocus and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = '0';
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have autofocus and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have required, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have required and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.tabindex = '0';
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have required and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = '0';
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
        });

        // Nested test group
        describe('Radio type', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    // include required attributes
                    outerScope.type = "radio";
                    outerScope.label = "rLabel";
                    outerScope.model = "rModel";
                    outerScope.name = "rName";
                });
            });
            
            // Test
            it('should have all attributes', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have autofocus, required, value and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = '0';
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });
            
            // Test
            it('should have autofocus, required, value and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
           
            // Test
            it('should have autofocus, required, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.tabindex = '0';
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test 
            it('should have autofocus, value, tabindex and disabled', function() {
                outerScope.$apply(function(){
                    outerScope.autofocus = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have autofocus, required and value', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.value = "rModel";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
            });
            
            // Test
            it('should have autofocus, required and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });
            
            // Test
            it('should have autofocus, required and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test 
            it('should have autofocus, value and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have autofocus, value and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.value = "rModel";
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have autofocus, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have autofocus and required', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
            });
            
            // Test 
            it('should have autofocus and value', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.value = "rModel";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
            });

            // Test
            it('should have autofocus and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                });
                
                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have autofocus and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have required, value, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test 
            it('should have required, value and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });
            
            // Test
            it('should have required, value and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.value = "rModel";
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have required, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have required and value', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.value = "rModel";
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
            });
            
            // Test
            it('should have required and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });
            
            // Test 
            it('should have required and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('required')).to.equal('required');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have value, tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test 
            it('should have value and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.value = "rModel";
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have value and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.value = "rModel";
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).to.include('fa-dot-circle-o');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
                expect(element[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            })
        });
    });
});