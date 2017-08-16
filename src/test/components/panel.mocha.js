'use strict';

//Panel Component Tests
describe('panel', function() {
    // Load Module & Templates
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

    beforeEach(module('ngRoute'));
    
    beforeEach(module('blt_view', function($provide){
        $provide.value('views', [
            {
                "path": "/test1", 
                "route": { 
                    "template": '<blt-panel id="fixedDiv" data-position="top" data-fixed="true"><div panel-content>Panel Content</div><button blt-close="">Close</button></blt-panel>' +
                        '<button blt-open="fixedDiv1">Open</button>'
                }, 
                "animation": "fade"
            },
            {
                "path": "/test2", 
                "route": { 
                    "template": '<blt-panel id="fixedDiv" data-position="top" data-fixed="true"><div panel-content>Panel Content</div><button blt-close=""></button></blt-panel>' +
                        '<button blt-open="fixedDiv2">Open</button>'
                }, 
                "animation": "slide"
            }
        ]);
    }));
    
    beforeEach(module('blt_panel'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var factory;
    var api;
    var timeout;
    var location;


    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, viewFactory, BltApi, $timeout, $location) {
        element = angular.element('<blt-panel id="testPanel" data-position="{{position}}" data-fixed="{{fixed}}"></blt-panel>');

        outerScope = $rootScope;
        compile = $compile;
        
        compile(element)(outerScope);
        outerScope.$digest();
        factory = viewFactory;
        api = BltApi;
        timeout = $timeout;
        location = $location;
    }));

    describe("will bind on create", function() {
        it('should be opened when blt-open is called', function() {
            var mySpy = sinon.spy();
            element = angular.element('<blt-panel id="testPanel"><div ng-controller="InnerController"class="panel-content">Panel Content</div></blt-panel><button blt-open="testPanel">Open</button>');
            outerScope.$apply(function() {
                outerScope.InnerController = mySpy;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            element[1].click();
            //Force timeouts in panel.module to execute 
            timeout.flush();
            expect(sinon.assert.calledOnce(mySpy));
        });
        
        // Test    
        it('should have an id', function() {
            const value = 123456;
            element = angular.element('<blt-panel id="{{id}}"></blt-panel>');
            outerScope.$apply(function() {
                outerScope.id = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();

            expect(element[0].attributes.getNamedItem('id').value).to.equal(value.toString());
        });
            
        // Test    
        it('should log error if panel does not have an id', function() {
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<blt-panel></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem("id")).to.equal(null);
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
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
            element = angular.element('<blt-panel id="testPanel"></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(" ")).that.include("panel-right");
        });
        
        
        /* data-fixed attribute does not work 
        // Test 
        it('should be fixed', function(){
            element = angular.element('<blt-view id="testPanel"></blt-view>');
            compile(element)(outerScope);
            outerScope.$digest();

            api.switchViews("/test");

            expect();
        });
        
        // Test
        it('should not be fixed by default', function() {
            element = angular.element('<blt-panel id="testPanel"></blt-panel>');
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].attributes.getNamedItem("data-fixed")).to.equal(null);
        });
        */
    });
});