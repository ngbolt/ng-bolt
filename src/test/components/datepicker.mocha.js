'use strict';

describe('datepicker', function () {
    //Load Module & Templates

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
    
    beforeEach(module('blt_datepicker'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var timeout;

    //Do This Before Each Test
    beforeEach(inject(function ($compile, $rootScope, $timeout) {
        element = angular.element('<form novalidate><blt-datepicker ' +
            'data-model="value" ' +
            'data-name="datepicker" ' +
            'data-label="Select Date" ' +
            'data-autofocus="autofocus" ' +
            'data-change="onChange()" ' +
            'data-format="{{format}}"' +
            'data-first-view="{{firstView}}" ' +
            'data-last-view="{{lastView}}" ' +
            'data-max="maxDate" ' +
            'data-min="minDate" ' +
            'data-required="required" ' +
            'data-disabled="disabled" ' +
            'data-tabindex="tabindex">'+
            '</blt-datepicker></form>'
        );

        outerScope = $rootScope.$new();
        compile = $compile;
        compile(element)(outerScope);

        innerScope = element.isolateScope();

        outerScope.$digest();

        timeout = $timeout;


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

        it('should log error when data-model is not specified', function() {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<form><blt-datepicker data-label="Date" data-name="Datepicker"></form></blt-datepicker>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[1].value).to.equal('');
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
        }); 

        //Test
        it('should have a name', function () {
            const value = "Bob";
            element = angular.element('<form><blt-datepicker data-name="{{name}}" data-label="Date" data-model="value"></blt-datepicker></form>');
            outerScope.$apply(function () {
                outerScope.name = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].children[0].children[0].children[1].name).to.equal(value);
        });

        //Test
        it('should log error when data-name is not specified', function () {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<form><blt-datepicker data-label="Date" data-model="value"></form></blt-datepicker>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[1].name).to.equal('');
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
        });

        //Test
        it('should have a label', function () {
            const value = "Descriptive Label";
            element = angular.element('<form><blt-datepicker data-name="Datepicker" data-label="{{label}}" data-model="value"></blt-datepicker></form>');
            outerScope.$apply(function () {
                outerScope.label = value
            });
            compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL");
            expect(element[0].children[0].children[0].children[0].innerText).to.equal(value);
        });

        //Test
        it('should log error when data-label is not specified', function () {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<form><blt-datepicker data-name="Datepicker" data-model="value"></form></blt-datepicker>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL");
            expect(element[0].children[0].children[0].children[0].innerText).to.equal('');
            mySpy.restore();
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

        //Test
        it('should call changeFn on change', function () {
            function changeFn() {
                // Do Something
                console.log("Change");
            }
            var mySpy = sinon.spy(changeFn);
            outerScope.$apply(function () {
                outerScope.onChange = mySpy;
            });
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
            timeout.flush(0);
            expect(sinon.assert.calledOnce(mySpy));
        });

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

        describe('Test that require datepicker to be added to document', function() {
            beforeEach(function() {
                var topElement = document.getElementsByTagName("form")[0];
                var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
                if(topElement === undefined) {
                    document.firstElementChild.appendChild(element[0].parentNode);
                    topElement = document.getElementsByTagName("form")[0];
                    topElement.setAttribute("style", "display: none;")
                }
            });

            //Test
            it('should have hours as first view', function () {
                const value = "hours";
                outerScope.$apply(function () {
                    outerScope.name="datepicker";
                    outerScope.firstView = value;
                });
                //Re-compile element since data-first-view attribute has '@' binding
                compile(element)(outerScope);
                outerScope.$digest();
                var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
                
                //Open date dicker. First view to appear should be hours
                element[0].children[0].children[0].children[2].click();
                
                expect(ngModel.$$scope.firstView).to.equal(value);
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal(value);
            });

            it('should have years as first view by default', function () {
                const value = "year";
                outerScope.$apply(function () {
                    outerScope.name="datepicker";
                });
                //Re-compile element since data-first-view attribute has '@' binding
                compile(element)(outerScope);
                outerScope.$digest();
                var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
                
                //Open date dicker. First view to appear should be hours
                element[0].children[0].children[0].children[2].click();

                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal(value);
            });

            //Test
            it('should have month as last view', function () {
                const value = "month";
                outerScope.$apply(function () {
                    outerScope.name="datepicker";
                    outerScope.lastView = value;
                });
                //Re-compile element since data-last-view attribute has '@' binding
                compile(element)(outerScope);
                outerScope.$digest();
                var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");

                //Click Span to open date picker
                element[0].children[0].children[0].children[2].click();
                //Year view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('year');
                element[0].children[0].children[0].children[5].children[0].children[1].children[0].click();
                //Month view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('month');
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
                //Select Month closing datepicker
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
                //Force all pending tasks to execute
                timeout.flush();

                expect(ngModel.$$scope.lastView).to.equal(value);
                //Expect element[0].children[0].children[0].children[5] (i.e datepicker overlay) to be undefined 
                expect(element[0].children[0].children[0].children[5]).to.equal(undefined);
            });

            it('should have minutes as last view by default', function () {
                outerScope.$apply(function () {
                    outerScope.name="datepicker";
                });
                compile(element)(outerScope);
                outerScope.$digest();
                var ngModel = angular.element(element[0].children[0].children[0].children[1]).controller("ngModel");
                //Click Span to open date picker
                element[0].children[0].children[0].children[2].click();
                //Year view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('year');
                element[0].children[0].children[0].children[5].children[0].children[1].children[0].click();
                //Month view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('month');
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
                //Date view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('date');
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].children[0].click();
                //Hours view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('hours');
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
                //Minutes view should be displayed
                expect(element[0].children[0].children[0].children[5].children[0].attributes.getNamedItem('ng-switch-when').value).to.equal('minutes');
                //Select minute closing date picker
                element[0].children[0].children[0].children[5].children[0].children[1].children[1].click();
                //Force all pending tasks to execute
                timeout.flush();
                //Expect element[0].children[0].children[0].children[5] (i.e datepicker overlay) to be undefined 
                expect(element[0].children[0].children[0].children[5]).to.equal(undefined);
            });
        });
    });
});