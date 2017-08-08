'use strict';
describe('Textfield api.error and api.warn messages', function() {

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

		describe('test api error called on line  in textfield module', function() {

			// set up whatever you need to make api error get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="Namey McName" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'error');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api error should have been called', function() {
				expect(api.error).to.be.calledWithExactly('missing label attribute for blt-text-field. See: '
					+ window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api error called on line 295 in textfield module', function() {

			// set up whatever you need to make api error get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-label="Labelly McLabel" ' +
                    'data-type="number" ' +
  				'></blt-textfield></form>');

				sinon.spy(api, 'error');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api error should have been called', function() {
				expect(api.error).to.be.calledWithExactly('missing name attribute for blt-text-field. See: '
					+ window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api error called on line 327 in textfield module', function() {

			// set up whatever you need to make api error get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="Namey McName" ' +
                    'data-label="Labelly McLabel" ' +
                    'data-type="number" ' +
                    'data-minlength="-1" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'error');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api error should have been called', function() {
				expect(api.error).to.be.calledWithExactly('attribute data-minlength must be a non-negative integer, ' +
					'is -1 instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api warn called on line 361 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="Namey McName" ' +
                    'data-label="Labelly McLabel" ' +
                    'data-type="text" ' +
                    'data-step="2" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-step can only be used when data-type " +
					"is a number, data-type is 'text' instead. See: " + window.location +
					"/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 316 in textfield module', function() {
			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="Look at me - I am the name now" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-rows="1" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("Attribute data-rows should be used in " +
					"conjunction with type 'textarea', type is currently set to 'number'" +
					" . blt-text-field [name=Look at me - I am the name now]. See: " +
					"" + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 368 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-step="-2" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly('attribute data-step must be a non-negative integer, is -2' +
					' instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api warn called on line 377 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="text" ' +
                    'data-min="1"' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-min can only be used when data-type is a number, " +
                    "data-type is 'text' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 383 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="text" ' +
                    'data-max="1"' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-max can only be used when data-type is a " +
                    "number, data-type is 'text' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 394 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-min="AAA"' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-min must be a number, is 'AAA' instead. " +
                    "See: " + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 403 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-min="15"' +
                    'data-max="1"' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				console.log
				expect(api.warn).to.be.calledWithExactly("attribute data-max must be a greater than data-min, " +
					"data-min is 15 data-max is 1. Ignoring data-max. See: " + window.location + "/blt." +
					"textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 408 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-max="AAA" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-max must be a number, is AAA" +
					" instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

		describe('test api warn called on line 352 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-maxlength="-12" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly('attribute data-maxlength must be a non-negative ' +
					'integer, is -12 instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api warn called on line 347 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-maxlength="1" ' +
                    'data-minlength="100" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly('attribute data-maxlength cannot be less than ' +
					'data-minlength, data-minlength is 100 data-maxlength is 1. See: '
                + window.location + '/blt.textfield.bltTextfield.html');
			});

		});

		describe('test api warn called on line 344 in textfield module', function() {

			// set up whatever you need to make api warn get called
			beforeEach(inject(function($rootScope, $compile) {
				element = angular.element('<form><blt-textfield ' +
                    'data-model="value" ' +
                    'data-name="name" ' +
                    'data-label="label" ' +
                    'data-type="number" ' +
                    'data-maxlength="-1" ' +
				'></blt-textfield></form>');

				sinon.spy(api, 'warn');
				outerScope = $rootScope;
				$compile(element)(outerScope);
				innerScope = element.isolateScope();
				outerScope.$digest();
			}));

			it('api warn should have been called', function() {
				expect(api.warn).to.be.calledWithExactly("attribute data-maxlength must be a non-negative " +
					"integer, is -1 instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
			});

		});

});

