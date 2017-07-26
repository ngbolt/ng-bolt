'use strict';

// Classificationbar Component Tests
describe('classificationbar', function() {
    // Define modules usually created during the gulp build process (need to load blt_core module).
    beforeEach(function() {
        angular.module('blt_config', []);
        angular.module('blt_dataRoutes', []);
        angular.module('blt_appProfile', []);
        angular.module('blt_appViews', []);
    });
    
    // Load Module & Templates
    
    // blt_core module needs to be loaded for data-validate attribute to work (data-validate makes used of blt-validate directive). Provide BltApi with a config object.
    beforeEach(module('blt_core', function($provide){
        $provide.value('config', { defaultLogLevel: "warn", debug: true });
    })); 

    beforeEach(module('blt_classificationbar'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;
    var api;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile, BltApi) {
        outerScope = $rootScope;
        compile = $compile;
        api = BltApi;
    }));

    //Test Group
    describe("will bind on create", function() {
        //Test
        it("should have classification", function() {
            const value = "unclassified";
            element = angular.element('<blt-classificationbar data-classification="{{classification}}"></blt-classificationbar>');
            outerScope.$apply(function() {
                outerScope.classification = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].classList.value.split(" ")).that.include("classification-bar-"+value);
            expect(element[0].children[0].children[0].innerText).to.equal(value.toUpperCase());
        });

        //Test
        it('should log error if no classification specified', function() {
            element = angular.element('<blt-classificationbar></blt-classificationbar>');
            compile(element)(outerScope);
            var mySpy = sinon.spy(api, 'error');
            outerScope.$digest();       
            expect(sinon.assert.calledOnce(mySpy));
            expect(sinon.assert.calledWith(mySpy,"Missing required attribute: 'classification'"));
            mySpy.restore();
        });

        //Test
        it('should log error if classification is not unclassified, confidential, secrete, top-secret', function() {
            var mySpy = sinon.spy(api,'error');
            const value = "Not Supported";
            element = angular.element('<blt-classificationbar data-classification="{{classification}}"></blt-classificationbar>');
            outerScope.$apply(function() {
                outerScope.classification = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
        })

        //Test
        it("should have custom text", function() {
            const value = "Custom Text For UNCLASSIFIED Content";
            element = angular.element('<blt-classificationbar data-classification="unclassified" data-custom-text="{{text}}"></blt-classificationbar>');
            outerScope.$apply(function() {
                outerScope.text = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(element[0].children[0].children[0].innerText).to.equal(value);
        });

        it('should log error if custom text does not reference classification', function() {
            const value = "Custom Text";
            var mySpy = sinon.spy(api,'error');
            element = angular.element('<blt-classificationbar data-classification="unclassified" data-custom-text="{{text}}"></blt-classificationbar>');
            outerScope.$apply(function() {
                outerScope.text = value;
            });
            compile(element)(outerScope);
            outerScope.$digest();
            expect(sinon.assert.calledOnce(mySpy));
            mySpy.restore();
        });

        //Test
        it('should not have custom text', function() {
            element = angular.element('<blt-classificationbar data-classification="unclassified"></blt-classificationbar>');
            compile(element)(outerScope);
            outerScope.$digest();       
            expect(element[0].children[0].children[0].innerText).to.equal("UNCLASSIFIED");
        });

        //Nested Test Group
        describe("verbosity tests",function(){
            //Test
            it('should have message corresponding to verbosity 2', function() {
                const value = 2;
                element = angular.element('<blt-classificationbar data-classification="unclassified" data-verbosity="{{verbosity}}"></blt-classificationbar>');
                outerScope.$apply(function() {
                    outerScope.verbosity = value;
                });
                compile(element)(outerScope);
                outerScope.$digest();   
                expect(element[0].children[0].children[0].innerText.split(":")[0]).to.equal("This page contains dynamic content - Highest Possible Classification");
            });

            //Test
            it('should have message corresponding to verbosity 1', function() {
                const value = 1;
                element = angular.element('<blt-classificationbar data-classification="unclassified" data-verbosity="{{verbosity}}"></blt-classificationbar>');
                outerScope.$apply(function() {
                    outerScope.verbosity = value;
                });
                compile(element)(outerScope);
                outerScope.$digest();
                expect(element[0].children[0].children[0].innerText.split(":")[0]).to.equal("Highest Possible Classification");
            });
            
            //Test  
            it('should have message corresponding to verbosity 0 (default)', function() {
                const value = 0;
                element = angular.element('<blt-classificationbar data-classification="unclassified" data-verbosity="{{verbosity}}"></blt-classificationbar>');
                outerScope.$apply(function() {
                    outerScope.verbosity = value;
                });
                compile(element)(outerScope);
                outerScope.$digest();   
                expect(element[0].children[0].children[0].innerText).to.equal("UNCLASSIFIED");
            });

            it('should log warning is verbosity is not 0, 1, or 2',function() {
                var mySpy = sinon.spy(api,"warn");
                const value = 3;
                element = angular.element('<blt-classificationbar data-classification="unclassified" data-verbosity="{{verbosity}}"></blt-classificationbar>');
                outerScope.$apply(function() {
                    outerScope.verbosity = value;
                });
                compile(element)(outerScope);
                outerScope.$digest();
                expect(sinon.assert.calledOnce(mySpy));
                mySpy.restore();
            })
        });
    });
});