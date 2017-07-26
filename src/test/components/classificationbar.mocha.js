'use strict';

// Classificationbar Component Tests
describe('classificationbar', function() {
    // Load Module & Templates
    beforeEach(module('blt_classificationbar'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;
    var compile;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        outerScope = $rootScope;
        compile = $compile;
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
        it('should not have classification', function() {
            element = angular.element('<blt-classificationbar></blt-classificationbar>');
            compile(element)(outerScope);
            outerScope.$digest();       
            expect(element[0].children[0].children[0].innerText).to.equal("");
        });

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
            it("should have message corresponding to verbosity 2", function() {
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
            it("should have message corresponding to verbosity 1", function() {
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
            it("should have message corresponding to verbosity 0 (default)", function() {
                const value = 0;
                element = angular.element('<blt-classificationbar data-classification="unclassified" data-verbosity="{{verbosity}}"></blt-classificationbar>');
                outerScope.$apply(function() {
                    outerScope.verbosity = value;
                });
                compile(element)(outerScope);
                outerScope.$digest();   
                expect(element[0].children[0].children[0].innerText).to.equal("UNCLASSIFIED");
            });
        });
    });
});