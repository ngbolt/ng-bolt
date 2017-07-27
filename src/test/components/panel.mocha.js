'use strict';

//Panel Component Tests
describe('panel', function() {
    // Load Module & Templates
    beforeEach(module('blt_panel'));
    beforeEach(module('blt_view'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var route;
    var location;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, $injector) {
        element = angular.element('<blt-panel id="{{id}}" data-position="{{position}}" data-fixed="{{fixed}}"></blt-panel>');

        outerScope = $rootScope;
        compile = $compile;
        
        compile(element)(outerScope);
        outerScope.$digest();

        route = $injector.get('ngRoute');
        location = $injector.get('$location');
        console.log(route);
        console.log(location);
    }));

    describe("will bind on create", function() {
        // Test    
        it('should have an id', function() {
            const value = 123456;
            outerScope.$apply(function() {
                outerScope.id = value;
            });

            expect(element[0].attributes.getNamedItem('id').value).to.equal(value.toString());
        });
            
        // Test    
        it('should not have an id by default', function() {
            element = angular.element('<blt-panel></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem("id")).to.equal(null);
        });
        
        // Test
        it('should have a position', function() {
            const value = "left";
            outerScope.$apply(function() {
                outerScope.position = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(" ")).that.include("panel-" + value);
        });
        
        // Test
        it('should have a position of right by default', function() {
            element = angular.element('<blt-panel></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(" ")).that.include("panel-right");
        });
        
        // Test
        it('should be fixed', function(){
            element = angular.element('<blt-view><blt-panel data-position="top" data-fixed="true"><div panel-content>Panel Content</div></blt-panel></blt-view>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem("data-fixed").value).to.equal("true");
        });
        
        // Test
        it('should not be fixed by default', function() {
            element = angular.element('<blt-panel></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem("data-fixed")).to.equal(null);
        });
    });
});