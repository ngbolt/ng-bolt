'use strict';

// Dropdown Component Tests
describe('dropdown', function() {
    // Load Module & Templates
    beforeEach(module('blt_dropdown'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<form><blt-dropdown data-name="{{name}}" data-label="{{label}}" data-model="value" data-options="options" data-type="{{type}}" data-autofocus="{{autofocus}}" data-required="{{required}}" data-tabindex="{{tabindex}}" data-disabled="disabled"></blt-dropdown></form>');

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();
    }));

    // Test Group
    describe('will bind on create', function() {

        //Nested Test Group - Dropdown
        describe('type dropdown', function() {

            beforeEach(function() {
                outerScope.type = "dropdown";
            });

            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {});

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[1].className).to.equal('dropdown-options-floating');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "ddName";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].name).to.equal('ddName');
            });
            /*
            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddlabel"; 
                });
                //expect(element[0].children.[0]
                  //  .)
            });

            // Test
            it('should have a list of options when of type dropdown', function() {
                outerScope.$apply(function() {
                    outerScope.type = "dropdown";
                    outerScope.options = ['foo', 'bar', 'foo bar'];
                });
                console.log(element[0].children[0]);
                //expect(element[0].children[0]
                //  .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-autofocus")).to.equal('true');
            });
            */

            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = "true";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute("blt-autofocus")).to.equal('true');
            });
            
            // Test
            it('should not have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = "false";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute("blt-autofocus")).to.equal('false');
            });            
                
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute("blt-tabindex")).to.equal('0');
            });

            // Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute("blt-tabindex")).to.equal('-1');
            });

            // Test
            it('should be disabled', function () {
                outerScope.$apply(function () {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute("disabled")).to.equal('disabled');
            });

            // Test
            it('should not be disabled', function () {
                outerScope.$apply(function () {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].hasAttribute("disabled")).to.equal(false);
            });
            
            /*
            // Test
            it('should have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.model = "ddModel";
                });
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].innerHTML).to.equal('ddModel');
            }); */
        });

        //Nested Test Group - Select
        describe('type select', function() {
            
            beforeEach(function() {
                outerScope.type = "select";
            });

            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].tagName).to.equal('SELECT');
            });

            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddlabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddlabel');
            });

            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = "true";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-autofocus")).to.equal('true');
            });
            
            // Test
            it('should not have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = "false";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-autofocus")).to.equal('false');
            });

            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel*');
            });
            /*
            // Test
            it('should not be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "false";
                    outerScope.label = "ddLabel";
                });
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });
            */
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-tabindex")).to.equal('0');
            });

            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-tabindex")).to.equal('-1');
            });

            it('should be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("disabled")).to.equal('disabled');
            });

            it('should not be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute("disabled")).to.equal(false);
            });
        });

        //Nested Test Group - searchable
        describe('type searchable', function() {  
            
            beforeEach(function() {
                outerScope.type = "searchable";
            });
                        
            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].tagName).to.equal('INPUT');
            });

            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = "true";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-autofocus")).to.equal('true');
            });    
            
            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = "true";
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel*');
            });
 
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute("blt-tabindex")).to.equal('0');
            });
        });
    });
});