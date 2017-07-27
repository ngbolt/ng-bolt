'use strict';

//Modal Component Tests
describe('modal', function() {
    // Load Module & Templates
    beforeEach(module('blt_modal'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, $injector) {
        element = angular.element('<blt-modal id="{{id}}" data-size="{{size}}" data-flip="{{flip}}"></blt-modal>');
        outerScope = $rootScope;
        compile = $compile;
        compile(element)(outerScope);
        outerScope.$digest();
    }));

    // Test Group
    describe('will bind on create', function() {
        //Test
        it('should have an id', function() {
            const value = 123456;
            outerScope.$apply(function() {
                outerScope.id = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem('id').value).to.equal(value.toString());
        });

        it('should not have an id by default', function() {
            element = angular.element('<blt-modal></blt-modal>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem('id')).to.equal(null);
        });

        it('should have size', function() {
            const value = "medium";
            outerScope.$apply(function() {
                outerScope.size = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(' ')).that.include("modal-medium");
        });

        it('should have default size of small', function(){
            element = angular.element('<blt-modal></blt-modal>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(' ')).that.include('modal-small');
        });

        it('should be a flippable modal', function() {
            outerScope.$apply(function() {
                outerScope.flip = true;
            });
            compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].classList.value.split(' ')).that.include("modal-flip");
        });

        it('should not be a flipable modal by default', function() {
            element = angular.element('<blt-modal></blt-modal>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].classList.value.split(' ')).that.does.not.include("modal-flip");
        });

        it('should log error if data-size="full-screen" and data-flip="true"',function() {
            var mySpy = sinon.spy(console, "error");
            outerScope.$apply(function() {
                outerScope.flip = true;
                outerScope.size = "full-screen";
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(sinon.assert.calledOnce(mySpy));
            expect(sinon.assert.calledWith(mySpy, "You can not use the flip animation on full-screen modals."));
            mySpy.restore();
        });
    });
});