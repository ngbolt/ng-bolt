'use strict'; 
describe('textfield', function() { 

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

	describe('will bind on create', function() {
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

		it('should have name even without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-name')).to.equal(true);
		});

		it('should have label even without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-label')).to.equal(true);
		});

		it('should have type even without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-type')).to.equal(true);
		});

		it('should have pattern even without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-pattern')).to.equal(true);
		});

		it('should NOT have minlength without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-minlength')).to.equal(false);
		});

		it('should NOT have maxlength without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-maxlength')).to.equal(false);
		});

		it('should NOT have min without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-min')).to.equal(false);
		});

		it('should NOT have max without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-max')).to.equal(false);
		});

		it('should NOT have rows without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-rows')).to.equal(false);
		});

		it('should NOT have validate without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-validate')).to.equal(false);
		});

		it('should NOT have required without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-required')).to.equal(false);
		});

		it('should NOT have autofocus without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-autofocus')).to.equal(false);
		});

		it('should NOT have autocomplete without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-autocomplete')).to.equal(false);
		});

		it('should NOT have autocorrect without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-autocorrect')).to.equal(false);
		});

		it('should NOT have spellcheck without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-spellcheck')).to.equal(false);
		});

		it('should NOT have disabled without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-disabled')).to.equal(false);
		});

		it('should NOT have tabindex without setting a value', function() {
			expect(element[0].children[0].hasAttribute('data-tabindex')).to.equal(false);
		});

		it('should NOT have step without setting a value', function() {
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
            outerScope.$apply(function() {
                outerScope.value = 'FILL ME OUT';
            });
            expect(element[0].classList.value).include('ng-valid-text');
        });

		/*it('should not accept invalid text', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
		 });
		 expect(element[0].classList.value).include('ng-invalid-text');
		 });*/

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
            outerScope.$apply(function() {
                outerScope.value = 'FILL ME OUT';
            });
            expect(element[0].classList.value).include('ng-valid-password');
        });

		/*it('should not accept invalid password', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
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
            outerScope.$apply(function() {
                outerScope.value = 234-234-1234;
            });
            expect(element[0].classList.value).include('ng-valid-tel');
        });

		/*it('should not accept invalid tel', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
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
            outerScope.$apply(function() {
                outerScope.value = 'sdfsdf@sdfsdf.com';
            });
            expect(element[0].classList.value).include('ng-valid-email');
        });

		/*it('should not accept invalid email', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
		 });
		 expect(element[0].classList.value).include('ng-invalid-email');
		 });*/

    });

    describe('test type number', function() {
        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="number"' +
                'data-max="100" ' +
                'data-min="-100" ' +
                'data-step="2" ' +
                '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid number', function() {
            outerScope.$apply(function() {
                outerScope.value = -123123.123123;
                console.log(element[0]);
            });
            expect(element[0].classList.value).include('ng-valid-number');

        });

		/*it('should not accept invalid number', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
		 });
		 expect(element[0].classList.value).include('ng-invalid-number');
		 });*/

        it('should have max(number-type specific)', function() {
            expect(element[0].children[0].hasAttribute('data-max')).to.equal(true);
        });

        it('should have max\'s value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-max')).to.equal('100');
        });

        it('should have min(number-type specific)', function() {
            expect(element[0].children[0].hasAttribute('data-min')).to.equal(true);
        });

        it('should have min\'s value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-min')).to.equal('-100');
        });

        it('should have step(number-type specific)', function() {
            expect(element[0].children[0].hasAttribute('data-step')).to.equal(true);
        });

        it('should have step\'s value showing up on the DOM', function() {
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
            outerScope.$apply(function() {
                outerScope.value = 'https://www.google.com';
            });
            expect(element[0].classList.value).include('ng-valid-url');
        });

		/*it('should not accept invalid url', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
		 });
		 expect(element[0].classList.value).include('ng-invalid-url');
		 });*/

    });

    describe('test type textarea', function() {
        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<form><blt-textfield ' +
                'data-model="value" ' +
                'data-name="{{name}}" ' +
                'data-label="{{label}}" ' +
                'data-type="textarea"' +
                'data-rows="10" ' +
                '></blt-textfield></form>');

            outerScope = $rootScope;
            $compile(element)(outerScope);

            innerScope = element.isolateScope();
        }));

        it('should accept valid textarea', function() {
            outerScope.$apply(function() {
                outerScope.value = "dsfsdfsdf \n \n sdfsdf";
            });
            expect(element[0].classList.value).include('ng-valid-textarea');
        });

		/*it('should not accept invalid textarea', function() {
		 outerScope.$apply(function() {
		 outerScope.value = FILL ME OUT;
		 });
		 expect(element[0].classList.value).include('ng-invalid-textarea');
		 });*/

        it('should have rows(text area-type specific)', function() {
            expect(element[0].children[0].hasAttribute('data-rows')).to.equal(true);
        });
        it('should have rows\'s value showing up on the DOM', function() {
            expect(element[0].children[0].getAttribute('data-rows')).to.equal('10');
        });
    });

});

