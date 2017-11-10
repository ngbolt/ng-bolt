'use strict';

// Dropdown Component Tests
describe('dropdown', function() {

    // Define modules usually created during the gulp build process (need to load blt_core module).
    beforeEach(function() {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });

    // blt_core module needs to be loaded for data-validate attribute to work (data-validate makes used of blt-validate directive). 
    // Provide BltApi with a config object.
    beforeEach(module('blt_core', function($provide){
        $provide.value('config', { defaultLogLevel: "error", debug: true });
    })); 

    // Load Module & Templates
    beforeEach(module('blt_dropdown'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var timeout;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, $timeout) {
        
        element = angular.element(
            '<form><blt-dropdown ' +
            'data-name="{{name}}" ' +
            'data-label="{{label}}" ' +
            'data-model="value" ' +
            'data-options="options" ' +
            'data-type="{{type}}" ' +
            'data-autofocus="autofocus" ' +
            'data-required="required" ' +
            'data-tabindex="tabindex" ' +
            'data-disabled="disabled" ' +
            'data-change="changeFn()"> ' +
            '</blt-dropdown></form>'
        );

        outerScope = $rootScope;
        $compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();

        timeout = $timeout;
    }));

    // Test Group
    describe('will bind on create', function() {

        // Nested Test Group - Dropdown
        describe('type dropdown', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "dropdown";
                });
            });

            // Nested Test Group - Required Attributes
            describe('required attributes', function() {

                // Test
                it('should have a type', function () {
                    var dropDiv = element[0].children[0].children[0].children[0].children[0]

                    expect(dropDiv.className).to.include('dropdown dropdown-dropdown');
                });

                // Test
                it('should have a name', function () {
                    outerScope.$apply(function () {
                        outerScope.name = "ddName";
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('name')).to.equal('ddName');
                });

                // Test
                it('should not have a name', function () {
                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('name')).to.equal('');
                });

                // Test
                it('should have a label', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddlabel";
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    //Button html includes the label, white space, and following span tag, so we must ensure that the label is included 
                    expect(dropButton.innerHTML.includes('ddlabel')).to.equal(true);
                });

                // Test
                it('should not have a label', function () {
                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.innerHTML.trim()).to.equal('<span class="dropdown-icon fa fa-caret-down"></span>')
                });

                // Test
                it('should have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "dropdown 1";
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    // Since model value is set, the button html will contain its value (according to line 11 in dropdown.template.html)
                    expect(dropButton.innerHTML).to.include('dropdown 1');
                });

                // Test 
                it('should not have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddLabel"
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    //In contrast with the previous test, since there is no model defined then the button includes the given label name
                    expect(dropButton.innerHTML.includes('ddLabel')).to.equal(true);
                });

                // Test
                it('should have a list of options (array of options)', function () {
                    outerScope.$apply(function () {
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    // Shortcut variable to gain easier access to the list tag that contains the options
                    var toList = element[0].children[0].children[0].children[0].children[0].children[1];

                    var optArray = [];

                    for (var i = 0; i < 3; i++) {
                        // Have to get rid of ↵ and extra white space added to individual options during creation of the list
                        optArray.push(String(toList.children[i].children[0].innerHTML).replace(/[\n\r]/g, '').trimRight());
                    }

                    var strArray = optArray.toString();
                    var origStrArr = outerScope.options.toString();

                    // Convert arrays to strings in order to compare them
                    expect(strArray).to.equal(origStrArr);
                });

                // Test
                it('should have a list of options (map of options)', function () {
                    outerScope.$apply(function () {
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

                    var strArray = optArray.toString();
                    var mapStrArr = mapToArray.toString();

                    //Convert arrays to string in order to compare them
                    expect(strArray).to.equal(mapStrArr);
                });
            });

            // Nested Test Group - Non-required Attributes
            describe('non-required attributes', function() {

                // Test
                it('should have autofocus on pageload', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('autofocus')).to.equal('true');
                });

                // Test
                it('should not have autofocus on pageload (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = false;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('autofocus')).to.equal('false');
                });

                // Test 
                it('should not have autofocus on page load (attribute not included)', function () {
                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.hasAttribute('autofocus')).to.equal(false);
                });

                // Test
                it('should have tabindex set', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have tabindex disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = -1;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('tabindex')).to.equal('-1');
                });

                // Test
                it('should be disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = true;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should not be disabled (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = false;
                    });

                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.hasAttribute('disabled')).to.equal(false);
                });

                // Test
                it('should not be disabled (attribute not included)', function () {
                    var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropButton.hasAttribute('disabled')).to.equal(false);
                });
            });

            // Nested Test Group - Attribute Functionality 
            // This group will test the expected functionality of each attribute in a browser setting
            describe('expected attribute functionality', function() {

                
            });
        });

        // Nested Test Group - Select
        describe('type select', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "select";
                });
            });

            // Nested Test Group - Required Attributes
            describe('required attributes', function() {

                // Test
                it('should have a type', function () {
                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.tagName).to.equal('SELECT');
                });

                // Test
                it('should have a name', function () {
                    outerScope.$apply(function () {
                        outerScope.name = "ddName";
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('name')).to.equal('ddName');
                });

                // Test
                it('should not have a name', function () {
                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('name')).to.equal('');
                });

                // Test
                it('should have a label', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddlabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddlabel');
                });

                // Test
                it('should not have a label', function () {
                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('');
                });

                // Test
                it('should have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.value = "dropdown 1";
                        outerScope.options = ["dropdown 1", "dropdown 2", "dropdown 3"];
                    });

                    var dropOption = element[0].children[0].children[0].children[0].children[0].children[0].children[1].children[1];

                    expect(dropOption.getAttribute('selected')).to.equal('selected');
                });

                // Test
                it('should not have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.options = ["dropdown 1", "dropdown 2", "dropdown 3"];
                    });

                    var dropOption = element[0].children[0].children[0].children[0].children[0].children[0].children[1].children[1];

                    expect(dropOption.hasAttribute('selected')).to.equal(false);
                });

                // Test
                it('should have a list of options (array of options)', function () {
                    outerScope.$apply(function () {
                        outerScope.type = "select";
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    // Shortcut variable to gain easier access to the list tag that contains the options
                    var toList = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    var optArray = [];

                    for (var i = 1; i < 4; i++) {
                        optArray.push(String(toList.children[i].innerHTML));
                    }

                    var strArray = optArray.toString();
                    var origStrArr = outerScope.options.toString();

                    // Convert the arrays to strings in order to compare them
                    expect(strArray).to.equal(origStrArr);
                });

                // Test
                it('should have a list of options (map of options)', function () {
                    outerScope.$apply(function () {
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

                    var strArray = optArray.toString();
                    var mapStrArr = mapToArray.toString();

                    //Convert arrays to string in order to compare them
                    expect(strArray).to.equal(mapStrArr);
                });
            });

            // Nested Test Group - Non-required Attributes
            describe('non-required attributes', function() {

                // Test
                it('should have autofocus on pageload', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                });

                // Test
                it('should not have autofocus on pageload (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = false;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('false');
                });

                // Test
                it('should not have autofocus on pageload (attribute not included)', function () {
                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.hasAttribute('autofocus')).to.equal(false);
                });

                // Test
                it('should be required', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel*');
                });

                // Test
                it('should not be required (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.required = false;
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel');
                });

                // Test
                it('should not be required (attribute not included)', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel');
                });

                // Test
                it('should have tabindex set', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                });

                //Test
                it('should have tabindex disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = -1;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('tabindex')).to.equal('-1');
                });

                //Test
                it('should be disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });

                //Test
                it('should not be disabled (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = false;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.hasAttribute('disabled')).to.equal(false);
                });

                //Test
                it('should not be disabled (attribute not included)', function () {
                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.hasAttribute('disabled')).to.equal(false);
                });
            });
        });

        // Nested Test Group - searchable
        describe('type searchable', function() {  
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "searchable";
                });
            });

            // Nested Test Group - Required Attributes
            describe('required attributes', function() {

                // Test
                it('should have a type', function () {
                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.tagName).to.equal('INPUT');
                });

                // Test
                it('should have a name', function () {
                    outerScope.$apply(function () {
                        outerScope.name = "ddName";
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('name')).to.equal('ddName');
                });

                // Test
                it('should not have a name', function () {
                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('name')).to.equal('');
                });

                // Test
                it('should have a label', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel');
                });

                // Test
                it('should not have a label', function () {
                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('');
                });

                // Test 
                it('should have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.value = 'dropdown 1';
                        outerScope.label = 'ddLabel';
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    // With searchable, the placeholder in the input is set to the label if there is a label set and not a model value
                    // So with this test, it suffices to set a label and model value and verify that the DOM has no placeholder value (in this case, an empty string)
                    expect(dropInput.getAttribute('placeholder')).to.equal('');
                });

                // Test
                it('should not have a model value set', function () {
                    outerScope.$apply(function () {
                        outerScope.label = 'ddLabel';
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('placeholder')).to.equal('ddLabel');
                });

                // Test
                it('should have a list of options (array of options)', function () {
                    outerScope.$apply(function () {
                        outerScope.options = ['dropdown 1', 'dropdown 2', 'dropdown 3'];
                    });

                    // Shortcut variable to gain easier access to the list tag that contains the options
                    var toList = element[0].children[0].children[0].children[0].children[0].children[1];

                    var optArray = [];

                    for (var i = 1; i < 4; i++) {
                        // Have to get rid extra white space added to individual options during creation of the list
                        optArray.push(String(toList.children[i].children[0].innerHTML).trim());
                    }

                    var strArray = optArray.toString();
                    var origStrArr = outerScope.options.toString();

                    // Convert to arrays to strings in order to compare them
                    expect(strArray).to.equal(origStrArr);
                });

                // Test
                it('should have a list of options (map of options)', function () {
                    outerScope.$apply(function () {
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

                    var strArray = optArray.toString();
                    var mapStrArr = mapToArray.toString();

                    // Convert arrays to string in order to compare them
                    expect(strArray).to.equal(mapStrArr);
                });
            });

            // Nested Test Group - Non-required Attributes
            describe('non-required attributes', function() {

                // Test
                it('should have autofocus on pageload', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                });

                // Test
                it('should not have autofocus on pageload (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = false;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('false');
                });

                // Test
                it('should not have autofocus on pageload (attribute not included)', function () {
                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.hasAttribute('autofocus')).to.equal(false);
                });

                // Test
                it('should be required', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel*');
                });

                // Test
                it('should not be required (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddLabel";
                        outerScope.required = false;
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel');
                });

                it('should not be required (attribute not included)', function () {
                    outerScope.$apply(function () {
                        outerScope.label = "ddLabel";
                    });

                    var dropLabel = element[0].children[0].children[0].children[0].children[0].children[0].children[0];

                    expect(dropLabel.innerHTML).to.equal('ddLabel');
                });

                // Test
                it('should have tabindex set', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have tabindex disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = -1;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('tabindex')).to.equal('-1');
                });

                // Test
                it('should be disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should not be disabled (attribute set to false)', function () {
                    outerScope.$apply(function () {
                        outerScope.disabled = false;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.hasAttribute('disabled')).to.equal(false);
                });

                // Test 
                it('should not be disabled (attribute not included)', function () {
                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.hasAttribute('disabled')).to.equal(false);
                });
            });
        });
    });

    
    // Test Group
    describe('will update on change', function() {

        describe('type dropdown', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "dropdown";
                    outerScope.options = ["dropdown1", "dropdown2"];
                });
            });

            // Test
            it('should fire change function', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown1";
                    outerScope.changeFn = function () {
                        console.log("Model changed:", outerScope.value);
                    }
                });
                
                // Create a spy for the change function
                var dropdownSpy = sinon.spy(outerScope, "changeFn");
                
                var drop2 = element[0].children[0].children[0].children[0].children[0].children[1].children[1].children[0];

                // Simulate a mouse click on the 'dropdown2' option so that the change function is called
                drop2.click();

                // Need to flush all of the pending tasks, including the change function's call
                timeout.flush();

                // Expect that the change function is called once
                expect(sinon.assert.calledOnce(dropdownSpy));
            });
        });
        
        describe('type select', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "select";
                    outerScope.options = ["dropdown1", "dropdown2"];
                });
            });

            // Test
            it('should fire change function', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown1";
                    outerScope.changeFn = function() {
                        console.log("Model changed:", outerScope.value);
                    }
                });

                // Create a spy for the change function
                var selectSpy = sinon.spy(outerScope, "changeFn");

                var drop2 = element[0].children[0].children[0].children[0].children[0].children[0].children[1];
                
                // Click simulation doesn't work for this type of dropdown, must use selectedIndex and trigger change manually
                drop2.selectedIndex = 2;
                drop2.dispatchEvent(new Event('change'));

                // Need to flush all of the pending tasks, including the change function's call
                timeout.flush();

                expect(sinon.assert.calledOnce(selectSpy));
            });
        });
        
        describe('type searchable', function() {

            beforeEach(function() {
                outerScope.$apply(function() {
                    outerScope.type = "searchable";
                    outerScope.options = ["dropdown1", "dropdown2"];
                });
            });

            // Test
            it('should fire change function', function() {
                outerScope.$apply(function() {
                    outerScope.value = "dropdown1";
                    outerScope.changeFn = function() {
                        console.log("Model changed:", outerScope.value);
                    }
                });

                // Create a spy for the change function
                var searchSpy = sinon.spy(outerScope, "changeFn");

                // Create a mouseup event to be used on an option in the dropdown
                var e = new MouseEvent('mouseup');

                var drop2 = element[0].children[0].children[0].children[0].children[0].children[1].children[2].children[0];

                // Simulate the mouseup event on the "dropdown2" option
                drop2.dispatchEvent(e);

                // Need to flush all of the pending tasks, including the change function's call
                timeout.flush();

                // Expect that change function was called once
                expect(sinon.assert.calledOnce(searchSpy));
            });
        });
    });
    

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

                var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                expect(dropButton.getAttribute('autofocus')).to.equal('true');
                expect(dropButton.getAttribute('tabindex')).to.equal('0');
                expect(dropButton.getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have autofocus and tabindex', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.tabindex = 0;
                });

                var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                expect(dropButton.getAttribute('autofocus')).to.equal('true');
                expect(dropButton.getAttribute('tabindex')).to.equal('0');
            });

            // Test
            it('should have autofocus and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.autofocus = true;
                    outerScope.disabled = true;
                });

                var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                expect(dropButton.getAttribute('autofocus')).to.equal('true');
                expect(dropButton.getAttribute('disabled')).to.equal('disabled');
            });

            // Test
            it('should have tabindex and disabled', function() {
                outerScope.$apply(function() {
                    outerScope.tabindex = 0;
                    outerScope.disabled = true;
                });

                var dropButton = element[0].children[0].children[0].children[0].children[0].children[0];

                expect(dropButton.getAttribute('tabindex')).to.equal('0');
                expect(dropButton.getAttribute('disabled')).to.equal('disabled');
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

            // Nested Test Group - Combinations with Autofocus
            describe('combinations with autofocus', function() {

                // Test
                it('should have autofocus, required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus and required', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('required')).to.equal('required');
                });

                // Test
                it('should have autofocus and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
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

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
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

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('autofocus')).to.equal('true');
                    expect(dropSelect.getAttribute('required')).to.equal('required');
                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var dropSelect = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropSelect.getAttribute('tabindex')).to.equal('0');
                    expect(dropSelect.getAttribute('disabled')).to.equal('disabled');
                });
            });
        });

        // Nested test group
        describe('type searchable', function() {
            
            beforeEach(function() {
                outerScope.$apply(function() {
                    // include required attributes
                    outerScope.label = "ddLabel";
                    outerScope.value = "ddModel";
                    outerScope.name = "ddName";
                    outerScope.options = ["dropdown1", "dropdown2", "dropdown3"];
                    outerScope.type = "searchable";
                });
            });

            // Nested Test Group - Combinations with Autofocus
            describe('combinations with autofocus', function() {

                // Test
                it('should have autofocus, required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = '0';
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test 
                it('should have autofocus, tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus, required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have autofocus and required', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('required')).to.equal('required');
                });

                // Test
                it('should have autofocus and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.tabindex = 0;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have autofocus and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
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

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });

                // Test
                it('should have required and tabindex', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                });

                // Test
                it('should have required and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.required = true;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });
            });

            // Nested Test Group - Other Combinations
            describe('other combinations', function () {

                // Test
                it('should have all attributes', function () {
                    outerScope.$apply(function () {
                        outerScope.autofocus = true;
                        outerScope.required = true;
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('autofocus')).to.equal('true');
                    expect(dropInput.getAttribute('required')).to.equal('required');
                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });

                //Test
                it('should have tabindex and disabled', function () {
                    outerScope.$apply(function () {
                        outerScope.tabindex = 0;
                        outerScope.disabled = true;
                    });

                    var dropInput = element[0].children[0].children[0].children[0].children[0].children[0].children[1];

                    expect(dropInput.getAttribute('tabindex')).to.equal('0');
                    expect(dropInput.getAttribute('disabled')).to.equal('disabled');
                });
            });
        });
    });
});