'use strict';

//Panel Component Tests
describe('panel', function() {
    // Load Module & Templates
    beforeEach(module('ngRoute'));
    beforeEach(module('blt_view', function($provide){
        $provide.value( 'views', [{ "path": "/test", "route": { "template": '<blt-panel id="fixedDiv" data-position="top" data-fixed="true"><div panel-content>Panel Content</div></blt-panel>'}, "animation": "fade"}]);
    }));
    beforeEach(module('blt_panel',function($provide){
        $provide.factory('BltApi', function() {
            var subscriptions = {};
            var factory = {};
            factory.subscribe = sinon.spy(subscribe);
            factory.publish = sinon.spy(publish);
            factory.subscriptions = subscriptions;
            function subscribe( name, callback ) {
                // Save subscription if it doesn't already exist
                if ( !subscriptions[name] ) {
                    subscriptions[name] = [];
                }
                // Add callback to subscription
                subscriptions[name].push(callback);
                console.log('Subscribed: ', name);
            }
            function publish( name, msg ) {
                // Save the subscription as an empty array if it was not previously saved
                if ( !subscriptions[name] ) {
                   subscriptions[name] = [];
                }
                // Send message in a callback
                subscriptions[name].forEach(function( cb ) {
                   cb(msg);
                });
                console.log('Published: ' + name + '\n', msg);
            }
            return factory;
        });
    }));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var factory;
    var api;
    var timeout;


    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, viewFactory, BltApi, $timeout) {
        element = angular.element('<blt-panel id="{{id}}" data-position="{{position}}" data-fixed="{{fixed}}"></blt-panel>');

        outerScope = $rootScope;
        compile = $compile;
        
        compile(element)(outerScope);
        outerScope.$digest();
        factory = viewFactory;
        api = BltApi;
        timeout = $timeout;
        api.subscribe.reset();
        api.publish.reset();
    }));

    describe("will bind on create", function() {
        it('should open on button click', function() {
            var mySpy = sinon.spy();
            element = angular.element('<div ng-controller="TestController as ctrl"><blt-panel id="testPanel"><div ng-controller="InnerController"class="panel-content">Panel Content</div></blt-panel><button ng-click="ctrl.open()">Open</button></div>');
            outerScope.$apply(function() {
                outerScope.TestController = function() {
                    var ctrl = this;
                    ctrl.open = function() {
                        console.log('open called');
                        api.publish('testPanel', 'open');
                    }
                };
                outerScope.InnerController = mySpy;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            console.log(api);
            element[0].children[1].click();
            //Fore timeouts in panel.module to execute 
            timeout.flush();
            expect(sinon.assert.calledOnce(mySpy));
        });
        
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
            element = angular.element('<blt-view></blt-view>');
            compile(element)(outerScope);
            outerScope.$digest();

            console.log(element);

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