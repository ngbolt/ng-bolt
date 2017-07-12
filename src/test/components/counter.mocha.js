'use strict';

// Counter Component Tests
describe('counter', function() {
    //Load Module & Templates
    
    beforeEach(module('blt_counter'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var ngModel;
    

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        element = angular
        .element('<form><blt-counter data-name="counter" data-label="{{label}}" data-autofocus="{{autofocus}}" data-required="{{required}}" data-selectOnFocus="{{selectOnFocus}}"' 
            + 'data-max="{{max}}" data-min="{{min}}" data-size="{{size}}" data-left-icon="{{left}}" data-right-icon="{{right}}" data-validate="validator" data-disabled="disabled" data-model="value"></blt-counter></form>');

        outerScope = $rootScope.$new();
        $compile(element)(outerScope);

        innerScope = element.isolateScope();
        outerScope.$digest();
    }));

    // Test Group
    describe('will bind on create', function() {
        // Test
        it('should have a label', function() {
            outerScope.$apply(function() {
                outerScope.label = "Hello world.";
            });
            //console.log(element);
            expect(element[0].children[0].children[0].children[0].tagName).to.equal("LABEL") && (expect(element[0].children[0].children[0].children[0].innerHTML).to.equal("Hello world.*") || expect(element[0].children[0].children[0].children[0].innerHTML).to.equal("Hello world."));
        });

        // Test
        it('should not have a label', function() {
           //console.log(element);
            expect(element[0].children[0].children[0].children[0].tagName).to.not.equal("LABEL");
        });

        // Test
        it('should be 5', function() {
            outerScope.$apply(function() {
                outerScope.value = 5;
            });
            //console.log(element);
            expect(element[0].children[0].children[0].children[0].children[0].valueAsNumber).to.equal(5);
        });

        // Test
        it('should have a name', inject(function($compile) {
            element = angular.element('<form><blt-counter data-name="{{name}}" data-label="{{label}}" data-model="value"></blt-counter></form>');
            outerScope.$apply(function() {
                outerScope.name = "Bob";
            });
            $compile(element)(outerScope);
            outerScope.$digest();
            //console.log(element);
            expect(element[0].children[0].children[0].children[0].children[0].name).to.equal("Bob");
        }));

        it('should have autofocus', function() {
            outerScope.$apply(function() {
                outerScope.autofocus = true;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('blt-autofocus').value).to.equal("true");
        });

        it('should not have autofocus', function() {
            outerScope.$apply(function() {
                outerScope.autofocus = false;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('blt-autofocus').value).to.equal("false");
        });

        /////////////////////////////////Not Finished///////////////////////////////////////
        it('should have change function', function() {
            outerScope.$apply(function() {
                outerScope.change = function(){/*Do Something*/};
            });



            //console.log(element[0].children[0].children[0].children[0].children[0].attributes);

            expect();
        });
        ////////////////////////////////////////////////////////////////////////////////////

        it('should be disabled', function() {
            outerScope.$apply(function() {
                outerScope.disabled = true;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].classList.value.split(' ')).that.include("counter-disabled");
        });

        it('should bot be disabled', function() {
            outerScope.$apply(function() {
                outerScope.disabled = false;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].classList.value.split(' ')).that.does.not.include("counter-disabled");
        });

        it('should have max value of 5', function() {
            outerScope.$apply(function() {
                outerScope.max = 5;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('data-max').value).to.equal("5");
        });

        it('should have min value of 1', function() {
            outerScope.$apply(function() {
                outerScope.min = 1;
            });

           //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('data-min').value).to.equal("1");
        });

        /////////////////////////////////Dont think the size attribute actually works//////////////////////////////
        it('should have size', function() {
            outerScope.$apply(function() {
                outerScope.size = 2;
            });

           //console.log(element);

            expect();
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        it('should have custom left icon', function() {
            outerScope.$apply(function() {
                outerScope.left="fa-minus";
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[2].classList.value.split(' ')).that.include("fa-minus");
        });

        it('should have default left icon', inject(function($compile) {
            element = angular.element('<form><blt-counter data-name="counter" data-label="{{label}}" data-model="value"></blt-counter></form>');

            $compile(element)(outerScope);
            outerScope.$digest();

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[2].classList.value.split(' ')).that.include("fa-chevron-left");
        }));

        it('should have custom right icon', function() {
            outerScope.$apply(function() {
                outerScope.right="fa-plus";
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[3].classList.value.split(' ')).that.include("fa-plus");
        });

        it('should have default right icon', inject(function($compile) {
            element = angular.element('<form><blt-counter data-name="counter" data-label="{{label}}" data-model="value"></blt-counter></form>');

            $compile(element)(outerScope);
            outerScope.$digest();

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[3].classList.value.split(' ')).that.include("fa-chevron-right");
        }));

        it('should call validator on keypress', inject(function($compile) {
            var mySpy = sinon.spy();
            element = angular.element('<form><blt-counter data-name="counter" data-label="{{label}}" data-model="value"></blt-counter></form>');
            
            outerScope.$apply(function() {
                outerScope.validator = {
                    name: 'test', // The name of your custom validator object
                    type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
                    msg: "We're looking for 'Test'.", // The error message if invalid
                    validationFn: mySpy
                };
            });

            $compile(element)(outerScope);
            outerScope.$digest();

            expect();
        }));

        // it('should test a button', inject(function($compile) {
        //     var event, eventDown, eventUp = null;
        //     var mySpy = sinon.spy();
        //     element = angular.element('<button ng-click="clickFn()">Click Me</button>');


        //     $compile(element)(outerScope);
        //     outerScope.$digest();
            
        //     outerScope.$apply(function() {
        //         outerScope.clickFn = mySpy;
        //     });

        //     event = element[0].ownerDocument.createEvent("MouseEvent");
        //     event.initMouseEvent("click", true, true, element[0].ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, null);

        //     element[0].focus();

        //     element[0].dispatchEvent(event);

        //     expect(mySpy.callCount).to.equal(1);
        // }));

        it('should be required', function() {
            outerScope.$apply(function(){
                outerScope.required = true;
            });

            //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('blt-required').value).to.equal("true");
        });

        it('should not be required', function() {
            outerScope.$apply(function(){
                outerScope.required = false;
            });

           //console.log(element);

            expect(element[0].children[0].children[0].children[0].children[0].attributes.getNamedItem('blt-required').value).to.equal("false");
        });

        
        /////////////////////////////Not Sure Select On Focus Works//////////////////////////
        it('should be selected on focus', function() {
            outerScope.$apply(function() {
                outerScope.selectOnFocus = "false";
            });

            //console.log(element);

            expect();
        });
        ////////////////////////////////////////////////////////////////////////////////////
    });
});