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
        element = angular.element('<form><blt-dropdown data-name="{{name}}" data-label="{{label}}" data-model="value" data-options="options" data-type="{{type}}" data-autofocus="autofocus" data-required="required" data-tabindex="tabindex" data-disabled="disabled" data-change="changeFn()"></blt-dropdown></form>');

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
                outerScope.$apply(function() {
                    outerScope.type = "dropdown";
                });
            });

            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {});
                
                expect(element[0].children[0]
                    .children[0].children[0].children[0].className).to.include('dropdown dropdown-dropdown');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "ddName";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('name')).to.equal('ddName');
            });
            
            // Test
            it('should not have a name', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('name')).to.equal('');
            });

            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddlabel"; 
                });

                //Button html includes the label, white space, and following span tag, so we must ensure that the label is included 
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].innerHTML.includes('ddlabel')).to.equal(true);
            });
            
            // Test
            it('should not have a label', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].innerHTML.trim()).to.equal('<span class="dropdown-icon fa fa-caret-down"></span>')
            });

            // Test
            it('should have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown 1";
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });
                
                // Since model value is set, the button html will contain its value (according to line 11 in dropdown.template.html)
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].innerHTML).to.include('dropdown 1');
            }); 

            // Test 
            it('should not have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddLabel"
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                //In contrast with the previous test, since there is no model defined then the button includes the given label name
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].innerHTML.includes('ddLabel')).to.equal(true);
            });

            // Test
            it('should have a list of options (array of options)', function() {
                outerScope.$apply(function() {
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];

                for (var i = 0; i < 3; i++) {
                    // Have to get rid of ↵ and extra white space added to individual options during creation of the list
                    optArray.push(String(toList.children[i].children[0].innerHTML).replace(/[\n\r]/g, '').trimRight());
                }
                
                // Convert arrays to strings in order to compare them
                expect(optArray.toString()).to.equal(outerScope.options.toString());
            });

            // Test
            it('should have a list of options (map of options)', function() {
                outerScope.$apply(function() {
                    outerScope.options = {
                        dropdown1: "Dropdown 1",
                        dropdown2: "Dropdown 2",
                        dropdown3: "Dropdown 3"
                    }
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];
                var mapToArray = [];
            
                // Create array of the values in our options array so that we may later compare them to the input options
                for (var prop in outerScope.options) {
                    mapToArray.push(outerScope.options[prop]);
                }

                for (var j = 0; j < 3; j++) {
                    // Have to get rid of extra white space added to individual optiosn during creation of the list
                    optArray.push(String(toList.children[j].children[0].innerHTML).trimRight());
                }

                //Convert arrays to string in order to compare them
                expect(optArray.toString()).to.equal(mapToArray.toString());
            });
            
            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                });
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true');
            });
            
            // Test
            it('should not have autofocus on pageload (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('false');
            });  
                
            // Test 
            it('should not have autofocus on page load (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].hasAttribute('autofocus')).to.equal(false);
            });
                
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('-1');
            });

            // Test
            it('should be disabled', function () {
                outerScope.$apply(function () {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should not be disabled (attribute set to false)', function () {
                outerScope.$apply(function () {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });

            // Test
            it('should not be disabled (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].hasAttribute('disabled')).to.equal(false);
            });
        });

        //Nested Test Group - Select
        describe('type select', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "select";
                });
            });

            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].tagName).to.equal('SELECT');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "ddName";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('name')).to.equal('ddName');
            });

            // Test
            it('should not have a name', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('name')).to.equal('');
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
            it('should not have a label', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('');
            });
            
            // Test
            it('should have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown 1";
                    outerScope.options = ["dropdown 1", "dropdown 2", "dropdown 3"];
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].children[1].getAttribute('selected')).to.equal('selected');
            });

            // Test
            it('should not have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.options = ["dropdown 1", "dropdown 2", "dropdown 3"];
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].children[1].hasAttribute('selected')).to.equal(false);
            });

            // Test
            it('should have a list of options (array of options)', function() {
                outerScope.$apply(function() {
                    outerScope.type = "select";
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];

                for (var i = 1; i < 4; i++) {
                    optArray.push(String(toList.children[i].innerHTML));
                }

                // Convert to arrays to strings in order to compare them
                expect(optArray.toString()).to.equal(outerScope.options.toString()); 
            });
            
            // Test
            it('should have a list of options (map of options)', function() {
                outerScope.$apply(function() {
                    outerScope.options = {
                        dropdown1: "Dropdown 1",
                        dropdown2: "Dropdown 2",
                        dropdown3: "Dropdown 3"
                    }
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];
                var mapToArray = [];
            
                // Create array of the values in our options array so that we may later compare them to the input options
                for (var prop in outerScope.options) {
                    mapToArray.push(outerScope.options[prop]);
                }

                for (var j = 1; j < 4; j++) {
                    // Have to get rid of extra white space added to individual options during creation of the list
                    optArray.push(String(toList.children[j].innerHTML));
                }
                
                //Convert arrays to string in order to compare them
                expect(optArray.toString()).to.equal(mapToArray.toString());
            });
            
            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('true');
            });
            
            // Test
            it('should not have autofocus on pageload (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('false');
            });

            // Test
            it('should not have autofocus on pageload (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('autofocus')).to.equal(false);
            });

            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel*');
            });
            
            // Test
            it('should not be required (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.required = false;
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });

            // Test
            it('should not be required (attribute not included)', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });
            
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('0');
            });

            //Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('-1');
            });

            //Test
            it('should be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('disabled')).to.equal('disabled');
            });

            //Test
            it('should not be disabled (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('disabled')).to.equal(false);
            });

            //Test
            it('should not be disabled (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('disabled')).to.equal(false);
            });
        });

        //Nested Test Group - searchable
        describe('type searchable', function() {  
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "searchable";
                });
            });
                        
            // Test
            it('should have a type', function() {
                outerScope.$apply(function() {
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].tagName).to.equal('INPUT');
            });

            // Test
            it('should have a name', function() {
                outerScope.$apply(function() {
                    outerScope.name = "ddName";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('name')).to.equal('ddName');
            });

            // Test
            it('should not have a name', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('name')).to.equal('');
            });

            // Test
            it('should have a label', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });

            // Test
            it('should not have a label', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('');
            })

            // Test 
            it('should have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.value = 'dropdown 1';
                    outerScope.label = 'ddLabel';
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                // With searchable, the placeholder in the input is set to the label if there is a label set and not a model value
                // So with this test, it suffices to set a label and model value and verify that the DOM has no placeholder value (in this case, an empty string)
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('placeholder')).to.equal('');
            });

            // Test
            it('should not have a model value set', function() {
                outerScope.$apply(function() {
                    outerScope.label = 'ddLabel';
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('placeholder')).to.equal('ddLabel');
            });

            // Test
            it('should have a list of options (array of options)', function() {
                outerScope.$apply(function() {
                    outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];

                for (var i = 1; i < 4; i++) {
                    // Have to get rid extra white space added to individual options during creation of the list
                    optArray.push(String(toList.children[i].children[0].innerHTML).trim());
                }

                // Convert to arrays to strings in order to compare them
                expect(optArray.toString()).to.equal(outerScope.options.toString()); 
            });
            
            // Test
            it('should have a list of options (map of options)', function() {
                outerScope.$apply(function() {
                    outerScope.options = {
                        dropdown1: "Dropdown 1",
                        dropdown2: "Dropdown 2",
                        dropdown3: "Dropdown 3"
                    }
                });

                // Shortcut variable to gain easier access to the list tag that contains the options
                var toList = element[0].children[0].children[0].children[0].children[0].children[1]; 

                var optArray = [];
                var mapToArray = [];
            
                // Create array of the values in our options array so that we may later compare them to the input options
                for (var prop in outerScope.options) {
                    mapToArray.push(outerScope.options[prop]);
                }

                for (var j = 1; j < 4; j++) {
                    // Have to get rid of extra white space added to individual options during creation of the list
                    optArray.push(String(toList.children[j].children[0].innerHTML).trim());
                }
                
                // Convert arrays to string in order to compare them
                expect(optArray.toString()).to.equal(mapToArray.toString());
            });
            
            // Test
            it('should have autofocus on pageload', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('true');
            });   
                
            // Test
            it('should not have autofocus on pageload (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('false');
            });

            // Test
            it('should not have autofocus on pageload (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('autofocus')).to.equal(false);
            });
            
            // Test
            it('should be required', function() {
                outerScope.$apply(function() {
                    outerScope.required = true;
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel*');
            });

            // Test
            it('should not be required (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddLabel";
                    outerScope.required = false;
                });
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });

            it('should not be required (attribute not included)', function() {
                outerScope.$apply(function() {
                    outerScope.label = "ddLabel";
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[0].innerHTML).to.equal('ddLabel');
            });
 
            // Test
            it('should have tabindex set', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have tabindex disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = -1;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('-1');
            });

            // Test
            it('should be disabled', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should not be disabled (attribute set to false)', function() {
                outerScope.$apply(function() {
                    outerScope.disabled = false;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('disabled')).to.equal(false);
            });

            // Test 
            it('should not be disabled (attribute not included)', function() {
                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].hasAttribute('disabled')).to.equal(false);
            });
        });
    });

    /*
    // Test Group
    describe('will update on change', function() {

        describe('type dropdown', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "dropdown"
                    outerScope.options = ["dropdown1", "dropdown2"];
                });
            });

            // Test
            it('should fire alert on change', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown1";
                    outerScope.changeFn = function() {
                        alert("Model changed");
                        console.log("Model changed");
                    }
                });

                //var spy = sinon.spy(changeFn());

                //element[0].children[0].children[0].children[0].children[0].children[1].children[1].children[0].click();

                console.log(element[0].children[0].children[0].children[0]);

                //expect(sinon.assert(spy.calledOnce));
            });
        });

    });
    */

    // Test Group
    describe('will bind on create - attribute combinations', function() {

        // Nested test group
        describe('type dropdown', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    // include required attributes
                    outerScope.label = "ddLabel";
                    outerScope.value = "ddModel";
                    outerScope.name = "ddName";
                    outerScope.options = ["dropdown1", "dropdown2", "dropdown3"];
                    outerScope.type = "dropdown";
                });
            });

            // Test
            it('should have all attributes', function () {
                outerScope.$apply(function () {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true')
                    && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0')
                    && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have autofocus and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true')
                    && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have autofocus and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('autofocus')).to.equal('true')
                    && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('tabindex')).to.equal('0')
                    && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].getAttribute('disabled')).to.equal('disabled');
            });
        });

        // Nested test group
        describe('type select', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    // include required attributes
                    outerScope.label = "ddLabel";
                    outerScope.value = "ddModel";
                    outerScope.name = "ddName";
                    outerScope.options = ["dropdown1", "dropdown2", "dropdown3"];
                    outerScope.type = "select";
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

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('true')
                 && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('required')).to.equal('required')
                 && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('0')
                 && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('disabled')).to.equal('disabled');
            });
            
            // Test
            it('should have autofocus, required, and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.required = true;
                    outerScope.tabindex = 0;
                })

                expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('autofocus')).to.equal('true')
                 && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('required')).to.equal('required')
                 && expect(element[0].children[0]
                    .children[0].children[0].children[0].children[0].children[1].getAttribute('tabindex')).to.equal('0')
            });
        });
    });
});