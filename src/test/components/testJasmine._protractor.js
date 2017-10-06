describe('tests', function() {
    it('go to demo app', function() {
        browser.get('http://localhost:9000/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/');
    });
    
    it('Checkbox should have class "fa-check-square" after pressing enter', function() {
        var username = element(by.css('input[type="text"]'));
        var password = element(by.css('input[type="password"]'));
        username.sendKeys('admin');
        password.sendKeys('password');
        password.sendKeys(protractor.Key.ENTER);
        var enter = element(by.css('.btn-solid-submit'));
        enter.click();

        var menu = element.all(by.css('.appbar-section')).get(0).all(by.css('button'));
        menu.click();
        var menuItem = element(by.css('.menu')).all(by.css('.menu-item')).get(3);
        menuItem.click();

        var checkbox = element(by.css('input[type="checkbox"]'));
        checkbox.sendKeys(protractor.Key.ENTER);
        
        expect(element.all(by.css('.checkbox-radio-icon')).get(6).getAttribute('class')).toMatch('fa-check-square');
    });

    it('should pause', function() {
        browser.pause(5859);
    });
});
