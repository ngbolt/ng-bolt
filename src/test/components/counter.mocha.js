'use strict';

// Counter Component Tests
describe('counter', function () {
    
    //Load Module & Templates
    beforeEach(module('blt_counter'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;


    // Do This Before Each Test
    beforeEach(inject(function ($rootScope, $compile) {

        element = angular
            .element('<form novalidate><blt-counter data-name="counter" data-label="{{label}}" data-autofocus="autofocus" data-required="req" data-max="max" data-min="min" data-select-on-focus="selectOnFocus"'
            + 'data-left-icon="{{left}}" data-right-icon="{{right}}" data-size="size" data-validate="customValidator" data-disabled="disabled" data-model="value" data-change="changeFn()" data-tabindex=index></blt-counter></form>');

        outerScope = $rootScope.$new();
        compile = $compile;
        compile(element)(outerScope);

        innerScope = element.isolateScope();
        outerScope.$digest();
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
        it('should not have a name', function () {
            element = angular.element('<form novalidate><blt-counter data-name="{{name}}" data-label="{{label}}" data-model="value"></blt-counter></form>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].children[0].name).to.equal("");
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

        /*
        //Test ->  Chnage Unit Test Does Not Work
        it('should call changeFn on change', function () {
            //Define change function and spy
            var changeFunction = function () {
                // Do Something
                console.log("Change Function Called");
            };
            var mySpy = sinon.spy(changeFunction);

            element = angular.element('<div ng-controller="CounterTestController as ctrl"> <form name="ctrl.myForm" class="form" novalidate>' +
                '<blt-counter data-name="counter" data-label="test" data-model="ctrl.value" data-change="ctrl.onChange()">'+
                '</blt-counter></form></div>');

            //Set scope variables
            outerScope.$apply(function () {
                outerScope.CounterTestController = function () {
                    var ctrl = this;
                    ctrl.onChange = mySpy;
                    ctrl.value;
                }
                compile(element)(outerScope);
            });

            var ngModel = angular.element(element[0].children[0].children[0].children[0].children[1].children[0]).controller("ngModel");
            var ngController = angular.element(element[0].children[0].children[0].children[0].children[1].children[0]).controller("ngController");
            ngModel.$setViewValue(3);
            expect(sinon.assert.calledOnce(mySpy));
        });
        */

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
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('max').value).to.equal("5");
        });

        //Test
        it('should not have a max value', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('max')).to.equal(null);
        });

        // Test
        it('should have min value of 1', function () {
            outerScope.$apply(function () {
                outerScope.min = 1;
            });
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('min').value).to.equal("1");
        });

        // Test
        it('should not have min value', function () {
            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('min')).to.equal(null);
        });

        /*
        // Test -> Dont think the size attribute actually works
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

        /*
        // Test -> Validate Attribute Does Not Work on Counter
        it('should call custom validator', function () {
            function testValidationFunction(modelValue, viewValue) {
                if (viewValue <= 5) {
                    return true;
                } else {
                    return false;
                }
            }
            var mySpy = sinon.spy(testValidationFunction);
            outerScope.$apply(function () {
                outerScope.customValidator = {
                    name: 'test', // The name of your custom validator object
                    type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
                    msg: "Value should be <= 5.", // The error message if invalid
                    validationFn: mySpy
                };
            });
            var ngModel = angular.element(element[0].children[0].children[0].children[0].children[0]).controller('ngModel');
            ngModel.$setViewValue(5);
            expect(sinon.assert.calledOnce(mySpy));
        });
        */

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
        it('should select contnets of counter on focus', function () {
            const value = 123456;
            var fragment;
            var selectedValue;
            var topElement;
            outerScope.$apply(function () {
                outerScope.selectOnFocus = true;
            });

            //Set content of counter to value
            element[0].children[0].children[0].children[0].children[0].value = value;
            fragment = element[0].parentNode;

            //Add form containing bltCounter to document so we can uses document.getSelection
            document.firstElementChild.appendChild(fragment);

            //Ensure element is not already in focus
            element[0].children[0].children[0].children[0].children[0].blur();
            //Focus element causing contents to be selected
            element[0].children[0].children[0].children[0].children[0].focus();

            //Store selected text in variable
            selectedValue = document.getSelection().toString();

            //Remove form from document
            topElement = document.getElementsByTagName("form")[0];
            document.firstElementChild.removeChild(topElement);
            expect(selectedValue).to.equal(value.toString());
        });

        // Test
        it('should not select contnets of counter on focus', function () {
            const value = 123456;
            var fragment;
            var selectedValue;
            var topElement;
            outerScope.$apply(function () {
                outerScope.selectOnFocus = false;
            });

            //Set content of counter to value
            element[0].children[0].children[0].children[0].children[0].value = value;
            fragment = element[0].parentNode;

            //Add form containing bltCounter to document so we can uses document.getSelection
            document.firstElementChild.appendChild(fragment);

            //Ensure element is not already in focus 
            element[0].children[0].children[0].children[0].children[0].blur();
            //Focus element, contents will not be selected
            element[0].children[0].children[0].children[0].children[0].focus();

            //Store selected text in variable
            selectedValue = document.getSelection().toString();

            //Remove form from document
            topElement = document.getElementsByTagName("form")[0];
            document.firstElementChild.removeChild(topElement);
            expect(selectedValue).to.equal('');
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
    });
});