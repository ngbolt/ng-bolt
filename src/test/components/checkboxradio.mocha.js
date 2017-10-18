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

            // Nested Test Group - Required Attributes
            describe('required attributes', function() {

                // Test
                it('should have a type', function () {
                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('type')).to.equal('checkbox');
                });

                // Test
                it('should have a label', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "Hello world.";
                    });

                    var cSpan = element[0].children[0].children[0].children[1].children[1];

                    expect(cSpan.innerHTML).to.equal('Hello world.');
                });

                // Test
                it('should not have a label', function () {
                    var cSpan = element[0].children[0].children[0].children[1].children[1];

                    expect(cSpan).to.equal(undefined);
                });

                // Test
                it('should be checked/model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.model = "crModel";
                    });

                    var cSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(cSpan.classList.value.split(' ')).that.include('fa-check-square');
                });

                // Test
                it('should not be checked/no model value set', function () {
                    var cSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(cSpan.classList.value.split(' ')).that.does.not.include('fa-check-square');
                });

                // Test
                it('should have a name', function () {
                    outerScope.$apply(function () {
                        outerScope.name = "crName";
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('name')).to.equal('crName');
                });

                // Test
                it('should not have a name', function () {
                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('name')).to.equal('');
                });
            });

            // Nested Test Group - Optional Attributes
            describe('optional attributes', function() {

                // Test
                it('should autofocus on page load', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                });

                // Test 
                it('should not autofocus on page load (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = false;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('false');
                });

                // Test
                it('should not autofocus on page load (attribute not included)', function () {
                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.hasAttribute('autofocus')).to.equal(false);
                });

                // Test
                it('should be required', function () {
                    outerScope.$apply(function () {
                        outerScope.required = "true";
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('required')).to.equal('required');
                });


                // Test
                it('should have tabindex set', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have tabindex disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = -1;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('tabindex')).to.equal('-1');
                });

                // Test
                it('should be disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });

                it('should not be disabled (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = false;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.hasAttribute('disabled')).to.equal(false);
                });

                it('should not be disabled (attribute not included)', function () {
                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.hasAttribute('disabled')).to.equal(false);
                });
            });
        });

        // Nested Test Group
        describe('Radio type', function() {

            beforeEach(function() {
                outerScope.$apply(function (){
                    outerScope.type = "radio";
                });
            });

            // Nested Test Group - Required Attributes
            describe('required attributes', function() {

                // Test
                it('should have a type', function () {
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('type')).to.equal('radio');
                });

                // Test
                it('should have a label', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "crLabel";
                    });

                    var rSpan = element[0].children[0].children[0].children[1].children[1];

                    expect(rSpan.innerHTML).to.equal('crLabel');
                });

                // Test
                it('should not have a label', function () {
                    var rSpan = element[0].children[0].children[0].children[1].children[1];

                    expect(rSpan).to.equal(undefined);
                });

                // Test
                it('should be selected (model and value equal)', function () {
                    outerScope.$apply(function () {
                        outerScope.model = "crValue";
                        outerScope.value = "crValue";
                    });

                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                });

                // Test
                it('should not be selected (model and value unequal)', function () {
                    outerScope.$apply(function () {
                        outerScope.model = "crModel";
                        outerScope.value = "crValue";
                    });

                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-circle');
                });

                // Test
                it('should not be selected (model set but no value)', function () {
                    outerScope.$apply(function () {
                        outerScope.model = "crModel";
                    });

                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-circle');
                });

                // Test
                it('should not be selected (value set but no model)', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "crValue";
                    });

                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-circle');
                });
            });

            // Nested Test Group - Optional Attributes
            describe('optional attributes', function() {

                // Test
                it('should have a value', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "crValue";
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('value')).to.equal('crValue');
                });

                // Test
                it('should not have a value', function () {
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('value')).to.equal('');
                });

                // Test
                it('should have a name', function () {
                    outerScope.$apply(function () {
                        outerScope.name = "crName";
                    });
                    
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('name')).to.equal('crName');
                });

                // Test
                it('should not have a name', function () {
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('name')).to.equal('');
                });

                // Test
                it('should autofocus on page load', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                });

                // Test
                it('should not autofocus on page load (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = false;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('false');
                });

                // Test
                it('should not autofocus on page load (attribute not included)', function () {
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.hasAttribute('autofocus')).to.equal(false);
                });

                // Test
                it('should be required', function () {
                    outerScope.$apply(function () {
                        outerScope.required = "true";
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                });


                // Test
                it('should have tabindex set', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have tabindex disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = -1;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('tabindex')).to.equal('-1');
                });

                // Test
                it('should be disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should not be disabled (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = false;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.hasAttribute('disabled')).to.equal(false);
                });

                // Test
                it('should not be disabled (attribute not included)', function () {
                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.hasAttribute('disabled')).to.equal(false);
                });
            });
        });
    });
    
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

                    // Don't need value attribute for checkbox
                    outerScope.value = null;
                });

                var checkSpy = sinon.spy(outerScope, "changeFn");
            
                var e = new KeyboardEvent('keyup', {
                    keyCode: 13
                });

                var cInput = element[0].children[0].children[0].children[0];

                //cInput.dispatchEvent(e);
                //cInput.dispatchEvent(new Event('change'));

                var inpEl = angular.element(cInput);
                inpEl.attr('checked', true).triggerHandler('change');
                
                timeout.flush();

                console.log(element[0]);

                expect(sinon.assert.calledOnce(checkSpy));
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

                var radioSpy = sinon.spy(outerScope, "changeFn");
                var rInput = element[0].children[0].children[0].children[0];
                
                var e = new KeyboardEvent('keyup', {
                    keyCode: 13
                });
                
                rInput.dispatchEvent(e);

                timeout.flush();

                expect(sinon.assert.calledOnce(radioSpy));
            }); 
        });
    });
    
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

            // Nested Test Group - Combinations with Autofocus
            describe('combinations with autofocus', function() {

                //Test
                it('should have autofocus, required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test 
                it('should have autofocus, required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus and required', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('required')).to.equal('required');
                });

                // Test
                it('should have autofocus and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = '0';
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Combinations with Required
            describe('combinations with required', function() {

                // Test
                it('should have required, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = '0';
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Other Combinations
            describe('other combinations', function() {

                // Test
                it('should have all attributes', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('autofocus')).to.equal('true');
                    expect(cInput.getAttribute('required')).to.equal('required');
                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = '0';
                        outerScope.disabled = true;
                    });

                    var cInput = element[0].children[0].children[0].children[0];

                    expect(cInput.getAttribute('tabindex')).to.equal('0');
                    expect(cInput.getAttribute('disabled')).to.equal('disabled');
                });
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

            // Nested Test Group - Combinations with Autofocus
            describe('combinations with autofocus', function() {

                // Test
                it('should have autofocus, required, value and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = '0';
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus, required, value and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, required, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = '0';
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test 
                it('should have autofocus, value, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, required and value', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.value = "rModel";
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                });

                // Test
                it('should have autofocus, required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus, required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test 
                it('should have autofocus, value and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus, value and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.value = "rModel";
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus and required', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                });

                // Test 
                it('should have autofocus and value', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.value = "rModel";
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                });

                // Test
                it('should have autofocus and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Combinations with Required
            describe('combinations with required', function() {
                // Test
                it('should have required, value, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0]

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test 
                it('should have required, value and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have required, value and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have required, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have required and value', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.value = "rModel";
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                });

                // Test
                it('should have required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test 
                it('should have required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Combinations with Value
            describe('combinations with value', function() {

                // Test
                it('should have value, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test 
                it('should have value and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0]

                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have value and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "rModel";
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Other Combinations 
            describe('other combinations', function() {

                // Test
                it('should have all attributes', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.value = "rModel";
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];
                    var rSpan = element[0].children[0].children[0].children[1].children[0];

                    expect(rInput.getAttribute('autofocus')).to.equal('true');
                    expect(rInput.getAttribute('required')).to.equal('required');
                    expect(rSpan.classList.value.split(' ')).to.include('fa-dot-circle-o');
                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var rInput = element[0].children[0].children[0].children[0];

                    expect(rInput.getAttribute('tabindex')).to.equal('0');
                    expect(rInput.getAttribute('disabled')).to.equal('disabled');
                });
            });
        });
    });
});