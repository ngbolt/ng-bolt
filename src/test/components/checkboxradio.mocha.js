'use strict';

// Checkbox / Radio Component Tests
describe('checkboxradio', function() {
    // Load Module & Templates
    beforeEach(module('blt_checkboxradio'));
    beforeEach(module('templates'));

    var element;
    var outerScope;
    var innerScope;

    // Do This Before Each Test
    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<blt-checkbox-radio data-name="checkbox" data-label="{{label}}" data-model="value"></blt-checkbox-radio>');

        outerScope = $rootScope;
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

            expect(element[0].children[0].children[0].children[1].children[1].innerHTML).to.equal('Hello world.');
        });

        // Test
        it('should have a label', function() {
            expect(element[0].children[0].children[0].children[1].children[1]).to.equal(undefined);
        });

        // Test
        it('should be checked', function() {
            outerScope.$apply(function() {
                outerScope.value = true;
            });

            expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).that.include('fa-check-square');
        });

        // Test
        it('should not be checked', function() {
            outerScope.$apply(function() {
                outerScope.value = false;
            });

            expect(element[0].children[0].children[0].children[1].children[0].classList.value.split(' ')).that.does.not.include('fa-check-square');
        });
    });
});