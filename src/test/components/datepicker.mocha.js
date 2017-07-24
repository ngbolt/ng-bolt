'use strict';

describe('datepicker', function () {
    //Load Module & Templates
    beforeEach(module('blt_datepicker'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;

    //Do This Before Each Test
    beforeEach(inject(function ($compile, $rootScope) {
        element = angular.element('<form novalidate><blt-datepicker data-model="value" data-name="datepicker" data-label="{{label}}" data-autofocus="autofocus" data-change="change" data-format="{{format}}"' +
            'data-first-view="{{firstView}}" data-last-view="{{lastView}}" data-max="maxDate" data-min="minDate" data-required="required" data-disabled="disabled" data-tabindex="tabindex"></blt-datepicker></form>')

        outerScope = $rootScope.$new();
        compile = $compile;
        compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();
    }));

    //Test Group
    describe("will bind on create", function(){
        //Test
        it('should have model value of July 19, 2017', function () {
            const value = 'July 19, 2017';
            outerScope.$apply(function () {
                outerScope.value = value;
            });
            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            expect(ngModel.$modelValue).to.equal(new Date(value).getTime());
        });

        //Test
        it('should have a name', function () {
            const value = "Bob"
            element = angular.element('<form novalidate><blt-datepicker data-model="value" data-name="{{name}}" data-label={{label}}</blt-datepicker></form>');

            outerScope.$apply(function () {
                outerScope.name = value;
            });

            compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].children[0].children[0].children[1].name).to.equal(value);
        });

        //Test
        it('should not have a name', function () {
            element = angular.element('<form novalidate><blt-datepicker data-model="value" data-name="{{name}}" data-label={{label}}</blt-datepicker></form>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[1].name).to.equal('');
        });

        //Test
        it('should have a label', function () {
            const value = "Descriptive Label";
            outerScope.$apply(function () {
                outerScope.label = value
            });

            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL");
            expect(element[0].children[0].children[0].children[0].innerText).to.equal(value);
        });

        //Test
        it('should not have a label', function () {
            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL");
            expect(element[0].children[0].children[0].children[0].innerText).to.equal('');
        });

        //Test -> This test makes no sense. While data-autofocus="true" successfully adds the autofocus attribute to a child of blt-datepicker, the autofocus attribute is added to a span. 
        //Since the autofocus attribute can only be used with button, input, keygen, select, and textarea elements the blt-datepicker will not be focused on page load.
        it('should have autofocus', function () {
                outerScope.$apply(function () {
                    outerScope.autofocus = true;
                });
                expect(element[0].children[0].children[0].children[2].attributes.getNamedItem("autofocus").value).to.equal('true');
            });

        //Test
        it('should not have autofocus', function () {
            expect(element[0].children[0].children[0].children[2].attributes.getNamedItem("autofocus")).to.equal(null);
        });

        /*
        //Test -> Chnage Unit Test Does Not Work
        it('should call chnageFn on change', function () {
            element = angular.element('<form ng-controller="TestDateController as ctrl" novalidate name="myForm"><blt-datepicker data-model="ctrl.value" data-name="datepicker" data-label={{ctrl.label}} data-change="ctrl.onChange()" </blt-datepicker></form>');

            function changeFn() {
                console.log("Change");
            }

            console.log("Timeout");
            var mySpy = sinon.spy(changeFn);

            outerScope.$apply(function () {
                outerScope.TestDateController = function () {
                    var ctrl = this;
                    ctrl.label = "Select Date"
                    ctrl.onChange = mySpy;
                    ctrl.value;
                };
            });

            compile(element)(outerScope);
            outerScope.$digest();

            console.log(element);

            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            var ngController = angular.element(element[0].children[0].children[0].children[1]).controller("ngController");

            console.log(ngController.value);

            //Simulate user selecting date
            //Click Span to open date picker
            element[0].children[0].children[0].children[2].click();
            //Select Year
            element[0].children[0].children[0].children[5].children[0].children[1].children[0].click();
            //Select Month
            element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
            //Select Date
            element[0].children[0].children[0].children[5].children[0].children[1].children[1].children[0].click();
            //Select hour
            element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
            //Select minute
            element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();

            console.log(ngController.value);

            // console.log(ngModel);
            console.log(ngController);
            expect(sinon.assert.calledOnce(mySpy));
        });
        */

        //Test
        it('should have "MMMM yyyy" format', function () {
            const value = 'MMMM yyyy';
            const date = new Date("July 19, 2017");
            outerScope.$apply(function () {
                outerScope.format = value;
                outerScope.value = date;
            });
            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            expect(ngModel.$$scope.format).to.equal(value);
            expect(element[0].children[0].children[0].children[2].innerText).to.equal('July 2017\n    ');
        });

        //Test -> Rewrite
        it('should have hours as first view', function () {
            const date = new Date("July 19, 2017");
            const value = "hours";
            outerScope.$apply(function () {
                outerScope.firstView = value;
                outerScope.value = value;
            });
            element[0].children[0].children[0].children[2].click();
            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            expect(ngModel.$$scope.firstView).to.equal(value);
        });

        //Test -> Rewrite
        it('should have year as last view', function () {
            const value = "month";
            outerScope.$apply(function () {
                outerScope.lastView = value;
            });
            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            expect(ngModel.$$scope.lastView).to.equal(value);
        });

        //Test
        it('should have max-date', function () {
            const value = 'July 19, 2017';
            outerScope.$apply(function () {
                outerScope.maxDate = value;
                outerScope.value = value;
            });

            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            //Set value past max date. This will cause the model value to be set to undefined.
            ngModel.$setViewValue(new Date('July 20,2017').getTime());
            ngModel.$render();

            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('max').value).to.equal((new Date(value).getTime()).toString());
            expect(ngModel.$modelValue).to.equal(undefined);
        });

        //Test
        it('should not have max-date by default', function () {
            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('max').value).to.equal('');
        });

        //Test
        it('should have min-date', function () {
            const value = 'July 19, 2017';
            outerScope.$apply(function () {
                outerScope.minDate = value;
                outerScope.value = value;
            });

            var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
            //Set value before min date. This will cause the model value to be set to undefined.
            ngModel.$setViewValue(new Date('July 18,2017').getTime());
            ngModel.$render();

            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('min').value).to.equal((new Date(value).getTime()).toString());
            expect(ngModel.$modelValue).to.equal(undefined);
        });

        //Test
        it('should not have min-date by default', function () {
            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('min').value).to.equal('');
        });

        //Test
        it('should be required', function () {
            outerScope.$apply(function () {
                outerScope.required = true;
            });
            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('required').value).to.equal('required');
        });

        //Test
        it('should not be required by default', function () {
            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('required')).to.equal(null);
        });

        it('should be disabled', function () {
            outerScope.$apply(function () {
                outerScope.disabled = true;
            });

            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('disabled').value).to.equal('disabled');
        });

        //Test
        it('should not be disabled by default', function () {
            expect(element[0].children[0].children[0].children[1].attributes.getNamedItem('disabled')).to.equal(null);
        });

        //Test
        it('should have tab index of 1', function () {
            const value = 1;
            outerScope.$apply(function () {
                outerScope.tabindex = value;
            });

            expect(element[0].children[0].children[0].children[2].attributes.getNamedItem('tabindex').value).to.equal(value.toString());
        });

        //Test 
        it('should have tab index of 0 by default', function () {
            expect(element[0].children[0].children[0].children[2].attributes.getNamedItem('tabindex').value).to.equal('0');
        });
    });
})