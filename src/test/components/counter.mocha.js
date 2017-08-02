'use strict';

// Counter Component Tests
describe('counter', function () {
    // Define modules usually created during the gulp build process (need to load blt_core module).
    beforeEach(function() {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });

    beforeEach(module('blt_core', function($provide){
        $provide.value('config', { defaultLogLevel: "error", debug: true });
    })); 

    //Load Module & Templates
    beforeEach(module('blt_counter'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var timeout;
    var api;


    // Do This Before Each Test
    beforeEach(inject(function ($rootScope, $compile, $timeout, BltApi) {

        element = angular
            .element('<form novalidate><blt-counter ' +
                'data-name="counter" ' +
                'data-label="{{label}}" ' +
                'data-autofocus="autofocus" ' +
                'data-required="req" ' +
                'data-max="max" ' +
                'data-min="min" ' +
                'data-select-on-focus="selectOnFocus"'  + 
                'data-left-icon="{{left}}" ' +
                'data-right-icon="{{right}}" ' +
                'data-size="size" ' +
                'data-validate="customValidator" ' +
                'data-disabled="disabled" ' +
                'data-model="value" ' +
                'data-change="changeFn()" ' +
                'data-tabindex=index> ' +
                '</blt-counter></form>'
            );

        outerScope = $rootScope.$new();
        compile = $compile;
        compile(element)(outerScope);

        innerScope = element.isolateScope();
        outerScope.$digest();
        timeout = $timeout;
        api = BltApi;
    }));

    // Test Group
    describe('will bind on create', function () {
        // Test
        it('should have model value of 5', function () {
            outerScope.$apply(function () {
                outerScope.value = 5;
            });
            expect(element[0].children[0].children[0].children[0].children[0].valueAsNumber).to.equal(5);
        });

        it('should throw error when compiling counter without model', function() {
            var errorThrown;
            element = angular.element('<form><blt-counter data-name="counter"></blt-counter></form>');
            compile(element)(outerScope);
            assert.throws(outerScope.$digest, Error);
        });

        // Test
        it('should have a name', function () {
            element = angular.element('<form novalidate><blt-counter data-name="{{name}}" data-label="{{label}}" data-model="value"></blt-counter></form>');
            outerScope.$apply(function () {
                outerScope.name = "Bob";
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].children[0].name).to.equal("Bob");
        });

        // Test
        it('should log error when counter does not have a name', function () {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<form novalidate><blt-counter data-name="{{name}}" data-label="{{label}}" data-model="value"></blt-counter></form>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].children[0].name).to.equal("");
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
        });

        // Test
        it('should have autofocus', function () {
            outerScope.$apply(function () {
                outerScope.autofocus = true;
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('autofocus').value).to.equal("true");
        });

        // Test
        it('should not have autofocus by default', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('autofocus')).to.equal(null);
        });

        // Test
        it('should be disabled', function () {
            outerScope.$apply(function () {
                outerScope.disabled = true;
            });
            expect(element[0].children[0].children[0].children[0].children[0].classList.value.split(' ')).that.include("counter-disabled");
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('disabled').value).to.equal("disabled");
        });

        // Test
        it('should not be disabled by default', function () {
            expect(element[0].children[0].children[0].children[0].children[0].classList.value.split(' ')).that.does.not.include("counter-disabled");
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('disabled')).to.equal(null);
        });
        
        // Test
        it('should have a label', function () {
            outerScope.$apply(function () {
                outerScope.label = "Hello world.";
            });
            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL");
            expect(element[0].children[0].children[0].children[0].innerHTML).to.equal("Hello world.");
        });

        // Test
        it('should not have a label by default', function () {
            expect(element[0].children[0].children[0].children[0].tagName).to.not.equal("LABEL");
        });

        // Test        
        it('should have max value of 5', function () {
            outerScope.$apply(function () {
                outerScope.max = 5;
                outerScope.value = 3;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            
            var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller("ngModel");
            //If value is set be beyond max, value should be set to max value
            ngModel.$setViewValue(10);
            
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('max').value).to.equal("5");
            expect(ngModel.$modelValue).to.equal(outerScope.max);
        });
        
        //Test
        it('should not have a max value', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('max')).to.equal(null);
        });
        
        // Test
        it('should have min value of 1', function () {
            outerScope.$apply(function () {
                outerScope.min = 1;
                outerScope.value = 2;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            
            var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller("ngModel");
            //If value is set be below mine, value should be set to min value
            ngModel.$setViewValue(-1);
            
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('min').value).to.equal("1");
            expect(ngModel.$modelValue).to.equal(outerScope.min);
        });
        
        // Test
        it('should not have min value', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('min')).to.equal(null);
        });

        /*
        // Test -> Size attribute does not work for counters
        it('should have size', function () {
        });
        */

        // Test
        it('should have custom left icon', function () {
            outerScope.$apply(function () {
                outerScope.left = "fa-minus";
            });
            expect(element[0].children[0].children[0].children[0].children[2].classList.value.split(' ')).that.include("fa-minus");
        });

        // Test
        it('should have default left icon', function () {
            element = angular.element('<form novalidate><blt-counter data-name="counter" data-label="{{label}}" data-model="value"></blt-counter></form>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].children[2].classList.value.split(' ')).that.include("fa-chevron-left");
        });

        // Test
        it('should have custom right icon', function () {
            outerScope.$apply(function () {
                outerScope.right = "fa-plus";
            });
            expect(element[0].children[0].children[0].children[0].children[3].classList.value.split(' ')).that.include("fa-plus");
        });

        // Test
        it('should have default right icon', function () {
            element = angular.element('<form novalidate><blt-counter data-name="counter" data-label="{{label}}" data-model="value"></blt-counter></form>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].children[3].classList.value.split(' ')).that.include("fa-chevron-right");
        });

        // Test
        it('should call custom validator', function () {
            function testValidationFunction(modelValue, viewValue) {
                //Do Something
                console.log('Validated');
                return true;
            }
            var mySpy = sinon.spy(testValidationFunction);
            outerScope.$apply(function () {
                outerScope.customValidator = {
                    name: 'Descriptive Name', // The name of your custom validator object
                    type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
                    msg: 'Descriptive Message', // The error message if invalid
                    validationFn: mySpy
                };
            });
            compile(element)(outerScope);
            outerScope.$digest();
            
            //Reset spy since validation function is called 2 time during compilation
            mySpy.reset();
            
            var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller('ngModel');
            ngModel.$setViewValue(5);
            
            //Expect customValidator to be added to $validators pipeline.
            expect(ngModel.$validators.hasOwnProperty(outerScope.customValidator.name)).to.be.true;
            //Expect customValidator to be called on change
            expect(sinon.assert.calledOnce(mySpy));
        });

        // Test  
        it('should be required', function () {
            outerScope.$apply(function () {
                outerScope.req = true;
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('required').value).to.equal('required');
        });

        // Test
        it('should not be required', function () {
            outerScope.$apply(function () {
                outerScope.req = false;
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('required')).to.equal(null);
        });


        // Test
        it('should have tab index 123456', function () {
            const value = 123456;
            outerScope.$apply(function () {
                outerScope.index = value;
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('tabindex').value).to.equal(value.toString());
        });

        // Test
        it('should not have tab index', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('tabindex')).to.equal(null);
        })
        describe("",function(){
            beforeEach(function() {
                if(angular.isDefined(element)){
                    document.firstElementChild.appendChild(element[0].parentNode);
                }
                //Force all pending timeout tasks to execute
                timeout.flush();
            });

            afterEach(function() {
                var topElement = document.getElementsByTagName("form")[0];
                document.firstElementChild.removeChild(topElement);
            });
            
            // Test
            it('should call changeFn on change', function () {
                //Define change function and spy
                var changeFunction = function () {
                    // Do Something
                    console.log("Change Function Called!");
                };
                var mySpy = sinon.spy(changeFunction);

                //Set scope variables
                outerScope.$apply(function () {
                    outerScope.changeFn = mySpy;
                });

                var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller("ngModel");
                ngModel.$setViewValue(3);

                //Force all pending timeout tasks to execute
                timeout.flush();

                expect(sinon.assert.calledOnce(mySpy));
            });

            // Test        
            it('should select contnets of counter on focus', function () {
                const value = 123456;
                outerScope.$apply(function () {
                    outerScope.selectOnFocus = true;
                });

                //Set content of counter to value
                var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller('ngModel');
                ngModel.$setViewValue(value);
                ngModel.$render();

                //Ensure element is not already in focus 
                element[0].children[0].children[0].children[0].children[0].blur();
                //Focus element, contents will not be selecteds
                element[0].children[0].children[0].children[0].children[0].focus();
                console.log('Selected Text: ' + document.getSelection().toString());
                expect(document.getSelection().toString()).to.equal(value.toString());
            });

            // Test
            it('should not select contnets of counter on focus', function () {
                const value = 123456;
                outerScope.$apply(function () {
                    outerScope.selectOnFocus = false;
                });
                
                //Set content of counter to value
                var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller('ngModel');
                ngModel.$setViewValue(value);
                ngModel.$render();
                
                //Ensure element is not already in focus 
                element[0].children[0].children[0].children[0].children[0].blur();
                //Focus element, contents will not be selected
                element[0].children[0].children[0].children[0].children[0].focus();
                expect(document.getSelection().toString()).to.equal('');
            });
        });
    });
});