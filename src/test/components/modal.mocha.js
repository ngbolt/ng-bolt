'use strict';

//Modal Component Tests
describe('modal', function() {
    // Load Module & Templates
    
    // Define modules usually created during the gulp build process (need to load blt_core module).
    beforeEach(function() {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });
    
    // blt_core module needs to be loaded for data-validate attribute to work (data-validate makes used of blt-validate directive). Provide BltApi with a config object.
    beforeEach(module('blt_core', function($provide){
        $provide.value('config', { defaultLogLevel: "error", debug: true });
    })); 

    beforeEach(module('blt_modal'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var api;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, BltApi) {
        element = angular.element('<blt-modal data-id="myModal" data-size="{{size}}" data-flip="{{flip}}"></blt-modal>');
        outerScope = $rootScope;
        compile = $compile;
        compile(element)(outerScope);
        outerScope.$digest();
        api = BltApi;
    }));

    // Test Group
    describe('will bind on create', function() {
        //Test
        it('should have an id', function() {
            const value = 123456;
            element = angular.element('<blt-modal data-id="{{id}}"></blt-modal>');
            outerScope.$apply(function() {
                outerScope.id = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem('data-id').value).to.equal(value.toString());
        });

        it('should log error when modal does not have an id', function() {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<blt-modal></blt-modal>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem('id')).to.equal(null);
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
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
            element = angular.element('<blt-modal data-id="myModal"></blt-modal>');
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
            element = angular.element('<blt-modal data-id="myModal"></blt-modal>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].classList.value.split(' ')).that.does.not.include("modal-flip");
        });

        it('should log error if data-size="full-screen" and data-flip="true"',function() {
            var mySpy = sinon.spy(api, "error");
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