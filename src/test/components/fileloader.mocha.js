'use strict';
describe('fileloader', function () {

	// Define modules usually created during the gulp build process (need to load blt_core module).
	beforeEach(function() {
		angular.module('blt_config', []);
		angular.module('blt_dataRoutes', []);
		angular.module('blt_appProfile', []);
		angular.module('blt_appViews', []);
	});
	
	// Load Module & Templates
	
	// blt_core module needs to be loaded for data-validate attribute to work (data-validate makes used of blt-validate directive). Provide BltApi with a config object
	beforeEach(module('blt_core', function($provide){
		$provide.value('config', { defaultLogLevel: "error", debug: true });
	})); 
	
	beforeEach(module('blt_fileloader'));	
	beforeEach(module('templates'));

	var element;
	var outerScope;
	var innerScope;
	var compile;
	var timeout;
	var api;

	// Do This Before Each Test
	beforeEach(inject(function ($rootScope, $compile, $timeout, BltApi) {
		element = angular.element(
			'<form><blt-fileloader ' +
			'data-model="value" ' +
			'data-label="{{label}}" ' +
			'data-name="Fileloader" ' +
			'data-autofocus="autofocus" ' +
			'data-change="change()" ' + 
			'data-disabled="disabled" ' +
			'data-required="required" ' +
			'data-tabindex="tabindex" ' +
			'data-validate="validate">' +
			'</blt-fileloader></form>'
		);

		outerScope = $rootScope;
		compile = $compile;
		compile(element)(outerScope);

		innerScope = element.isolateScope();
		outerScope.$digest();

		timeout = $timeout;
		api = BltApi;
	}));

	//Test Group
	describe('will bind on create', function () {
		//Test
		it('should have model value', function() {
			const file = new File([""], "DescriptiveFilename.txt", {type: "text/plain", lastModified: new Date().getTime()});
			outerScope.$apply(function(){
				outerScope.value = file;
			});
			var ngModel = angular.element(element[0].children[0].children[0].children[1].children[0]).controller("ngModel");
			expect(ngModel.$modelValue).to.equal(file);
		});

		//Test
		it('should not have model value', function() {
			var ngModel = angular.element(element[0].children[0].children[0].children[1].children[0]).controller("ngModel");
			expect(ngModel.$modelValue).to.equal(undefined);
		});

		//Test
		it('should have a label', function() {
			const value = "Descriptive Label";
			element = angular.element('<form><blt-fileloader data-name="Fileloader" data-label={{label}}></blt-fileloader></form>');
			outerScope.$apply(function() {
				outerScope.label=value;
			});
			compile(element)(outerScope);
			outerScope.$digest();
			
			expect(element[0].children[0].children[0].children[0].innerText).to.equal(value);
		});

		it('should log error if label is not specified', function() {
			var mySpy = sinon.spy(api,'error')
			element = angular.element('<form><blt-fileloader data-name="Fileloader"W></blt-fileloader></form>');
			compile(element)(outerScope);
			outerScope.$digest();
			expect(sinon.assert.calledOnce(mySpy));
			mySpy.restore();
		});

		//Test
		it('should have default label of "Filename" if data-label attribute is specified but not given a value', function() {
			outerScope.$apply(function() {
				outerScope.label = "";
			}) 
			expect(element[0].children[0].children[0].children[0].innerText).to.equal("Filename");
		});

		//Test
		it('should have name', function() {
			const value = "Bob";
			element = angular.element('<form><blt-fileloader data-name="{{name}}" data-label="Filename"></blt-fileloader></form>');
			outerScope.$apply(function() {
				outerScope.name = value;
			});
			compile(element)(outerScope);
			outerScope.$digest();
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("name").value).to.equal(value);
		});

		//Test
		it('should log error if fileloader does not have a name', function() {
			var mySpy = sinon.spy(api,'error');
			element = angular.element('<form><blt-fileloader data-label="File"></blt-fileloader></form>');
			compile(element)(outerScope);
			outerScope.$digest();
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("name").value).to.equal("");
			expect(sinon.assert.calledOnce(mySpy));
			mySpy.restore();
		})

		//Test
		it('should have autofocus', function() {
			outerScope.$apply(function() {
				outerScope.autofocus=true;
			});
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem('autofocus').value).to.equal("true");
		});

		//Test
		it('should not have autofocus by default', function() {
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem('autofocus')).to.equal(null);
		});

		// Test -> Change Unit Test Does Not Work
		it('should call change function on change', function() {
			const orginal = new File([""], "DescriptiveFilename.txt", {type: "text/plain", lastModified: new Date().getTime()});
			const modified = new File([""], "DescriptiveFilename1.txt", {type: "text/plain", lastModified: new Date().getTime()+1});

			function onChange() {
				// Do Something
				console.log("Change Happened");
			}

			var mySpy = sinon.spy(onChange);

			outerScope.$apply(function() {
				outerScope.value = orginal;
				outerScope.change = mySpy;
			});

			var ngModel = angular.element(element[0].children[0].children[0].children[1].children[0]).controller("ngModel");

			ngModel.$setViewValue(modified);

			timeout.flush();
			expect(sinon.assert.calledOnce(mySpy));
		}); 

		//Test
		it('should be disabled', function() {
			outerScope.$apply(function() {
				outerScope.disabled = true;
			});
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("disabled").value).to.equal("disabled");
		});
		
		//Test 
		it('should be enabled by default', function() {
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("disabled")).to.equal(null);
		});

		//Test
		it('should be required', function() {
			outerScope.$apply(function() {
				outerScope.required = true;
			});
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("required").value).to.equal("required");
		});

		//Test
		it('should not be required by default', function() {
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("required")).to.equal(null);
		});

		//Test
		it('should have specified tab index', function() {
			const value = 123456;
			outerScope.$apply(function() {
				outerScope.tabindex = value;
			});
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("tabindex").value).to.equal(value.toString());
		});

		//Test
		it('should not have tab index by default', function() {
			expect(element[0].children[0].children[0].children[1].children[0].attributes.getNamedItem("tabindex")).to.equal(null);
		});


		// Validate Unit Test Does Not Work
		it('should validate on change', function() {
			const file = new File([""], "DescriptiveFilename.txt", {type: "text/plain", lastModified: new Date().getTime()});
			function validateFn(viewValue, modelValue) {
				// Do Something
				console.log("Validated");
				return true;
			};

			var mySpy = sinon.spy(validateFn);

			outerScope.$apply(function() {
                outerScope.validate = {
                    name: 'Descriptive Name', // The name of your custom validator object
                    type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
                    msg: 'Descriptive Error Message', // The error message if invalid
                    validationFn: mySpy // The function to run to determine validity
				};
			});
			compile(element)(outerScope);
			outerScope.$digest();
			
			//Reset spy since validation function is called twice during compilation
			mySpy.reset();
			
			var ngModel = angular.element(element[0].children[0].children[0].children[1].children[0]).controller("ngModel");
			ngModel.$setViewValue(file);
			
			//Force all pending tasks to execute
			timeout.flush();
			//Custom validator should be added to $validators pipeline
			expect(ngModel.$validators.hasOwnProperty(outerScope.validate.name)).to.be.true;
			expect(sinon.assert.calledOnce(mySpy));
		});
	});
});		