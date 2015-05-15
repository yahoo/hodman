Hodman
======

Selenium object library including page-objects.

[![Build Status](https://img.shields.io/travis/yahoo/hodman.svg)](http://travis-ci.org/yahoo/hodman)
[![Coveralls Coverage](https://img.shields.io/coveralls/yahoo/hodman.svg)](https://coveralls.io/r/yahoo/hodman)
[![Code Climate Grade](https://img.shields.io/codeclimate/github/yahoo/hodman.svg)](https://codeclimate.com/github/yahoo/hodman)

[![NPM version](https://badge.fury.io/js/hodman.svg)](https://www.npmjs.com/package/hodman)
[![NPM License](https://img.shields.io/npm/l/hodman.svg)](https://www.npmjs.com/package/hodman)

[![NPM](https://nodei.co/npm/hodman.png?downloads=true&stars=true)](https://www.npmjs.com/package/hodman)
[![NPM](https://nodei.co/npm-dl/hodman.png?months=3&height=2)](https://www.npmjs.com/package/hodman)

[![Coverage Report](https://img.shields.io/badge/Coverage_Report-Available-blue.svg)](http://yahoo.github.io/hodman/coverage/lcov-report/)
[![API Documentation](https://img.shields.io/badge/API_Documentation-Available-blue.svg)](http://yahoo.github.io/hodman/docs/)

[![Gitter Support](https://img.shields.io/badge/Support-Gitter_IM-yellow.svg)](https://gitter.im/preceptorjs/support)

**Table of Contents**
* [Installation](#installation)
* [Getting Started](#getting-started)
* [Usage](#usage)
    * [Page-Objects](#page-objects)
        * [BaseObject](#baseobject)
        * [ViewObject](#viewobject)
        * [PanelObject](#panelobject)
        * [PageObject](#pageobject)
        * [GenericPageObject](#genericpageobject)
    * [Driver-Adapter](#driver-adapter)
    * [Sychronous and asynchronous](#sychronous-and-asynchronous)
* [API-Documentation](#api-documentation)
* [Tests](#tests)
* [Project Naming](#project-naming)
* [Third-party libraries](#third-party-libraries)
* [License](#license)


##Installation

Install this module with the following command:
```shell
npm install hodman
```

Add the module to your ```package.json``` dependencies:
```shell
npm install --save hodman
```
Add the module to your ```package.json``` dev-dependencies:
```shell
npm install --save-dev hodman
```

Require the module in your source-code:
```javascript
var hodman = require('hodman');
```

##Getting Started

The following example sets-up the page-object system and creates an example page-object for a login page.

```javascript
var taxi = require('taxi');
var hodman = require('hodman');

// Initialize the selenium client. In this case, it is "taxi". 
var driver = taxi('http://127.0.0.1:4444/wd/hub', 
                    { browserName: 'firefox' },  // With firefox
                    { mode: taxi.MODE_SYNC }); // In sync-mode

// Create driver-adapter for the page-objects to have a consistent interface 
// for all supported selenium clients.
var driverAdapter = new hodman.driverAdapters.Taxi(driver);

// Assign the driver-adapter to the page-object sub-system
hodman.BaseObject.DRIVER_ADAPTER = driverAdapter;

// Setup path for screenshots
hodman.BaseObject.SCREENSHOT_PATH = __dirname + "/screens";

// Use "preceptor" to remove all of the configuration above from your code 
// and make this transparent for any testing environment.

// Create a page-object...

/**
 * @class LoginPage
 * @extends PageObject
 */
var LoginPage = hodman.PageObject.extend(

	// Constructor (optional)
	function () {
	
		// ... Some setup
		
		// Overwrite constructor if you need additional parameters.
		// You can use the initialize method for initialization purposes. 
		// No need to overwrite the constructor for that.

		// Call parent constructor after general setup. 
		// The initialize method will be called in parent constructor.
		this.__super(); 
		
		// ... Possibly something else
	},
	
	// Prototype
	{
		initialize: function () {
		
			// Make sure to always call the parent method even if there is non at the time 
			// of creation. The sub-system will take care of it and create an empty 
			// function if needed. This will make sure that this page-object will 
			// pick up any new futures which require initialization.
			this.__super(); 

			// Setup selectors (css-selectors) and assign them a name that should be used 
			// throughout the page-object.
			
			// Should the selector change in the future, then only this block needs to change.
			this.setSelectors({
				"usernameInput": ".login-username",
				"passwordInput": ".login-password",
				"rememberMeCheck": ".remember-me"
			});

			// Any page-object can have load-selectors which are selectors for element that 
			// are needed for the page to be "loaded". Should the Page-object will check 
			// for these elements to appear on the page before claiming success on
			this.addLoadSelectors(["usernameInput"]);
		},
		
		/**
		 * Logs the user in
		 *
		 * @param {string} username
		 * @param {string} password
		 * @param {boolean} [rememberMe=false]
		 * @return {LoginPage}
		 */
		login: function (username, password, rememberMe) {
			
			// Chainable call to set username and password
			this.setUsername(username).setPassword(password);
			
			// Try to limit the use of control-structures as much as possible since they 
			// add complexity to the page-objects (and tests). Make it as linear as possible.
			// You don't really want to start testing the test system.
			if (rememberMe) {
				this.checkRememberMe();
			}
			
			// Return the page-object itself if the method doesn't return anything 
			// to make the function chainable
			return this;
		},
		
		/**
		 * Sets a username
		 *
		 * @param {string} username
		 * @return {LoginPage} 
		 */
		setUsername: function (username) {
		
			// Clear any username already set
			this.clearUsername();
			
			// Set the value for username
			this.getElement('usernameInput').sendKeys(username);
			
			// Again, return "this"
			return this;
		},
		
		/**
		 * Clears any username entered
		 *
		 * @return {LoginPage}
		 */
		clearUsername: function () {
			this.getElement('usernameInput').clear();
			return this;
		},
		
		// ... some other methods
	},
	
	// Static - Copied to the constructor
	{
		
		// Define static methods here. These methods will be assigned to the constructor and 
		// therefore can be called then directly on the constructor itself.
		// 
		// For example:
		// LoginPage.navigateTo();
		
		// ...
	}
```

##Usage

Hodman currently supplied two types of objects:
* Page-Objects - Objects that abstract the implementation details of websites
* Driver Adapters - Adapters for the page-objects to support multiple Selenium client libraries

Objects for RESTful API access and storage objects for reusable models is still a WIP.

###Page-Objects

Selenium gives low-level access to DOM elements, but that means that with any code-change on the front-end will trigger changes to the tests or the test-code. Already with a couple of tests, this will soon become very work intensive as front-end development in general is moving fast. Maintaining tests this way will get very soon insurmountable.

Page-objects were defined to get around this problem, and is a design-pattern to abstract the low-level implementation of a website into objects exposing services (not DOM-elements). The tests then will only use these services exposed by the page-object instead of using low-level access to the DOM. Should the DOM structure change, then only the page-object needs to be modified and all the tests should run without a problem thereafter. This is the ideal case, and there are many rules you can abide-to to make this a reality.
This pattern was introduced by Martin Fowler quite a while ago, and the Selenium project picked it up to be used with Selenium tests. See the following urls for more information on this topic:

* [Autonomous View / Window Driver - Martin Fowler](http://martinfowler.com/eaaDev/WindowDriver.html)
* [Page-Object Pattern - Martin Fowler](http://martinfowler.com/bliki/PageObject.html)
* [Page-Object Pattern - Selenium Project](https://code.google.com/p/selenium/wiki/PageObjects)

The page-object pattern was defined at a time where static websites were standard. Nowadays, websites are much more complex than they used to be, especially with the advent of Single-page applications. In these websites, whole DOM trees are representing one component (i.e. autocomplete) instead of a single element. Also, alerts, prompts, and confirms are not used anymore and might be represented as "Overlays" in the DOM of a page, composed of multiple DOM elements. There are many more examples like these, but all of them have one thing in common: they use multiple DOM elements to represent one "component" or "view".
For these more modern application, this module implements additional "page-objects".

####Term
The term page-object does not anymore really mean a whole page but rather the pattern itself. I will refer to ```PageObject``` for a page-object of a whole page.

####Objects
All objects use ```preceptor-core```'s ```Base```-object to create inheritance. See the ```preceptor-core``` module page for more information.

####Context and scope
Every page-object has its own scope which might be the whole document, or it might be a specific DOM-element with its sub DOM-elements.

There are two methods to access the context and scope of a page-object (see API documentation for more information):
* ```getContext``` - Gets the context of the current page-object
* ```getAdapter``` - Gets the driver-adapter for low-level Selenium access

####BaseObject

This page-object is the base-class of all page-objects and should not be used directly. However, this object implements a whole suite of methods for all following page-objects. 

These methods have the following themes:
* Selector management
* Loaders
* Client accessors
* Screenshot management
* Utility

#####Selector Management

The selector management methods are used to limit the usage of DOM selectors all over the page-object. Should you need to access a DOM element then add it to the selector manager using an identifier. This identifier will then be used in the rest of the page-object to access the DOM-element. Should the selector change, then only this one line in the page-object needs to be changed and none of the other lines of code. Again, this is to reduce maintenance.
These management methods only support CSS selectors since this is the preferred method of accessing DOM-elements. Front-end engineers are most likely familiar with this type of selector, and they are much more flexible and maintainable since they are generally relative.

Here is a short list of all selector management methods (see the API documentation for more information):
* ```getSelectors``` - Gets a list of already defined selectors
* ```setSelectors``` - Sets a list of selectors with identifier and selector (key-value pair)
* ```getSelector``` - Determines the selector of a specific identifier
* ```hasSelector``` - Checks if a selector was defined

You can set selectors in the ```initialize``` method:
```javascript
initialize: function () {
	this.__super(); // Call parent
		
	this.setSelectors({
		"usernameInput": ".login-username", // <key>: <css-selector>
		"passwordInput": ".login-password",
		"rememberMeCheck": ".remember-me"
	});
}
```

####Loaders

Loader methods take a selector identifier, and they make sure that the element exists on the page. For example, when you click on the "Login" button of a ```LoginPage```, after a successful login, the browser is redirected to a dashboard-page with the page-object ```DashboardPage```. For this a ```login``` method on the ```LoginPage``` object will fill-in the login information and will click on the submit button, returning the newly created page-object ```LoginPage```. However, the ```LoginPage``` must make sure that it is loaded by checking the loading selectors, possibly timing out with an error when these elements are not found. This will make sure that the test-code is not filled with sleeps, spin-assertions, or even control-structures that would increase the complexity of the tests. Loader methods will add a huge amount of self-testing to the page-objects, simplifying the tests overall.

Here is a short list of all loader methods (see the API documentation for more information):
* ```verifyIsLoaded``` - Verifies that the page-object is loaded. By default, this will check all load-selectors but it can be overwritten to check even more. This method is called automatically after initialization but can also be called manually afterwards.
* ```addLoadSelector``` - Adds a single load-selector
* ```addLoadSelectors``` - Adds a range of load-selectors


You can add the loading selectors right after declaring the selectors:
```javascript
initialize: function () {
	this.__super(); // Call parent
		
	this.setSelectors({
		"usernameInput": ".login-username", // <key>: <css-selector>
		// ...
	});
	
	// Makes sure that "usernameInput" is there before completing the initialization process.
	this.addLoadSelectors(["usernameInput"]);
}
```

####Client Accessors

The client accessors will give access to the DOM elements by providing the selector identifier - you cannot use a css selector directly for these methods.

Here is a short list of all client-accessor methods (see the API documentation for more information):
* ```getElement``` - Gets the low-level selenium element for a selector identifier
* ```hasElement``` - Checks if the DOM-element for the selector identifier exists
* ```waitForElements``` - Waits for elements to appear in the DOM

####Screenshot Management

The page-objects expose a couple of features to simplify taking screenshots of whole pages or sub-components of a page. This can ideally be used with projects like Kobold to check for visual regressions.

To take a screenshot (or parts of the screen) within a page-object, simply call the ```capture``` method. At this point, this is the only method that is inherently asynchronous as it uses some low-level methods that required asynchronicity. To simplify this, the capture method returns a **Promise**.

In some cases, you might want to black-out some areas of the screenshot to make sure that the visual regression testing framework doesn't fail on things that are known to change from test to test. For example, creation date labels are areas of the screen that will change from test to test as the time will change; mocking this data might add just too much complexity to the tests. A better way might be just to black-out that area so that it is consistently black for every visual-regression test-run.
The capture method uses the ```blackOut``` method to determine the coordinates that need to be blacked. One can supply static coordinates or one could supply selector identifiers to determine the coordinates of the DOM-element dynamically.

Here an example:
```javascript
/**
 * @class OrderDetailsPage
 * @extends PageObject
 */
var OrderDetailsPage = hodman.PageObject.extend(
	{
		initialize: function () {
			this.__super(); // Call parent
		
			this.setSelectors({
				// ...
				"creationDateLabel": ".order.creation-date",
				// ...
			});
	
			// ...
		},
		
		/**
		 * List of blackout coordinates for the current page-object
		 *
		 * @return {object[]} With format [{ x:<int>, y:<int>, width:<int>, height:<int> }]
		 */
		blackOut: function () {
			return [
				// Fixed coordinates
				{ x:10, y:15, width:200, height:100 },
				
				// Flexible coordinates of a DOM-element, determined 
				// just before the screenshot is taken
				this.getFrame("searchField") 
			];
		}
	}
);
```
Then, in the test you can capture the view:
```javascript
testsuite("Order Details", function () {
	
	// ...
	
	test('appearance', function (done) {
	
		// Take screenshot of order-detail context, black-out areas defined 
		// in "blackOut", and save the file into the screenshot directory 
		// with the name of this test.
		this.orderPage.capture(this.test.fullTitle()).then(function () {
			// Success
			done();
		}, function (err) {
			// Failure
			done(err);
		});
		// Unfortunately, this is what needs to be done when tests need to 
		// be asynchronous when using asynchronous calls within the test
	});
	
	// ...
});
```

Here is a short list of all screenshot related methods (see the API documentation for more information):
* ```getFrame``` - Gets the coordinates of a DOM-element by supplying the selector identifier.
* ```blackOut``` - Supplies a list of coordinates that should be blacked-out. ```capture``` calls this method when taking a screenshot.
* ```capture``` - Takes a screenshot of the current context, applying any black-out defined. Should the context be smaller than the whole document, then the screenshot gets clipped to the borders of the context.

#####Utility
The page-objects add some utility methods to simplify Selenium testing in general. Here is a short list of all these methods (see the API documentation for more information):
* ```waitUntil``` - This function repeatedly calls the supplied callback-function until it returns true or the timeout is triggered. It uses an additional timeout to reduce the polling, but minimizes with it the wait time. This method can be used instead of static ```sleep```s to check if an element is available or not. It is more flexible and stable as a static ```sleep```. This is also sometimes called a spin-method or combined with assertions as Spin-Assert.

####ViewObject
Currently, the ```ViewObject``` inherits directly from the ```BaseObject``` and doesn't add any additional features. This might change in the future, and should therefore be used instead of ```BaseObject```.

####PanelObject
The ```PanelObject``` inherits from the ```ViewObject``` and is context aware, meaning that it can determine its own context. For example, a page-object has a table that can be determined by a ```getTableView``` method. This method selects a DOM-element in its own template (for example Handlebars template), an element holding the table DOM-tree in a sub-element with the tag "table". However, the page-object doesn't (and shouldn't) have an understanding of the implementation details of the table-view and can therefore not select the root element of the ```TableView```. A ```PanelObject``` can define a ```SELECTOR``` on the constructor to find its own root DOM-element.

For example, you have the following handlebars template for an ```OrderPage``` page-object:
```html
...
<div class="order-list">
	{{view table content=rows}}
</div>
...
```

The table object has this view-structure:
```html
...
<table class="table-view">
	<tr>
		...
	</tr>
</table>
...
```

The ```OrderPage`` page-object exposes the table-view as follows:
```javascript
/**
 * @class OrderPage
 * @extends PageObject
 */
var OrderPage = hodman.PageObject.extend(
	{
		initialize: function () {
			this.__super(); // Call parent
		
			this.setSelectors({
				// ...
				// Selects the element in the current view since the 
				// OrderPage should not know anything about how the 
				// table is implemented
				"table": ".order-list", 
				// ...
			});
	
			// ...
		},
		
		/**
		 * Gets the table-view
		 *
		 * @return {TableView]
		 */
		getTableView: function () {
			return new TableView(this.getElement('table'));
		}
	}
);
```

The ```TableView``` needs now to make sure that the context is on the correct DOM-element since it should be on the "table" tag instead of the parent "div":
```javascript
/**
 * @class OrderPage
 * @extends PanelObject
 */
var OrderPage = hodman.PanelObject.extend(

	// On prototype
	{
		initialize: function () {
			this.__super(); // Call parent
		
			this.setSelectors({
				// ...
				// Selects the element in the current view since the 
				// OrderPage should not know anything about how the 
				// table is implemented
				"table": "table.table-view", 
				// ...
			});
	
			// ...
		},
		
		/**
		 * Gets the table-view
		 *
		 * @return {TableView]
		 */
		getTableView: function () {
			// Getting element with the selector identifier
			return new TableView(this.getElement('table'));
		}
	},
	
	// Defined on the constructor - no need for an instance
	{
		SELECTOR: "div.page-content"
	}
);
```
When the initializer is executed, the ```PanelObject``` will check if there is a SELECTOR defined and uses that selector to select the right DOM-element from the current context, which could be already a sub-section of a page.

####PageObject
```PageObject```s are specific to whole pages that required urls.
Every ```PageObject``` can have a couple of properties defined on the constructor to change its behavior:
* ```BASE``` - Base-url of the page. Set this property directly on the ```PageObject``` itself to use it as base-url for all ```PageObject```s.
* ```URL``` - Base-url relative resource locator of the page.
* ```EXPECTED_URL``` - Regex of the expected url. The ```PageObject``` validates that this url is reached when the page-object is created. Should no ```EXPECTED_URL``` be given, then the ```URL``` with ```BASE``` will be used instead. This parameter is a great way to test redirects.

It also adds some utility methods to the constructor (see the API documentation for more information):
* ```getBaseUrl``` - Gets the base-url of the ```PageObject```
* ```getUrl``` - Gets the relative path of the url
* ```getNavigationUrl``` - Gets the complete url, combining ```BASE``` and ```URL```
* ```getExpectedUrl``` - Gets the ```EXPECTED_URL``` or ```getNavigationUrl``` if no ```EXPECTED_URL``` is given.

The ```PageObject``` inherits from the ```PanelObject``` and therefore also supports a modified context. By default, the whole body is used, but by defining a ```SELECTOR``` one could exclude headers and navigation bars from the ```PageObject``` context since they might implement in their own ```ViewObject``` or ```PanelObject```.

```javascript
/**
 * @class OrderPage
 * @extends PageObject
 */
var OrderPage = hodman.PageObject.extend(
	{
		// ...
	},
	
	{
		URL: "/orders"
	}
);
```

You can navigate to this page with:
```javascript
setup(function () {
	// Navigate to the page and wait some time if needed 
	// since we know the page is slow
	this.ordersPage = OrderPage.navigate(3000);
});
```

####GenericPageObject
This object inherits also from ```PanelObject``` and is very similar to the ```PageObject```. However, it was created to be used for ad-hoc page-objects and checking its url. For example, you could use this to test opening external links -  you don't necessarily want to create page-objects but still want to test it. ```navigationUrl``` and ```expectedUrl``` can be directly supplied to the constructor for this object, making sure that you don't have to extend the object. This is currently the only Object that doesn't need to be extended to be used.

####Sychronous and asynchronous
This Selenium pattern library currently only supports synchronous Selenium clients. Making these available for asynchronous Selenium clients is a todo item.
However, reconsider using synchronous Selenium clients as they simplify your testing-code immensely; the asynchronous behavior of Node can be confusing, having no benefit since the testing script will always have only one user at the same time - it is not a server.
I am in good company with this since Jason Huggins, the creator of Selenium and co-founder of SauceLabs, also advocates for [synchronous node Selenium testing](https://gist.github.com/hugs/9156094).

###Driver-Adapter

The driver-adapter will give the page-objects a consistent way of accessing low-level Selenium elements and functions.

The following adapters for Selenium clients are available:
* ```taxi``` (https://github.com/preceptorjs/taxi)
* ```cabbie``` (https://github.com/ForbesLindesay/taxi / https://github.com/marcelerz/cabbie)

Hodman exposes all standard driver-adapter with ```hodman.driverAdapters```:

```javascript
var taxi = require('taxi');
var hodman = require('hodman');

var driver = taxi('http://127.0.0.1:4444/wd/hub', 
                    { browserName: 'firefox' },  // With firefox
                    { mode: taxi.MODE_SYNC }); // In sync-mode

var driverAdapter = new hodman.driverAdapters.Taxi(driver);
```

Should your favorite Selenium client not be available, then please request it in the issues tab or implement your own adapter by using the exposed abstract ```DriverAdapter``` object as base-class:

```javascript
var hodman = require('hodman');

// Inherit from DriverAdapter
var SeleniumClientAdapter = hodman.DriverAdapter.extend(

    { // Prototype methods
    
       // Implementation
       
    }
);
````
Most of the methods needs to be overwritten as they trigger an error by default to make the developer aware of a missing feature. See the API-documentation for details.

To initialize the page-object system, you need to assign the adapter to the BaseObject.DRIVER_ADAPTER property. From that point on, all page-objects will use the supplied driver-adapter to access the browser DOM.

```javascript
hodman.BaseObject.DRIVER_ADAPTER = driverAdapter;
```

##API-Documentation

Generate the documentation with following command:
```shell
npm run docs
```
The documentation will be generated in the ```docs``` folder of the module root.

##Tests

Run the tests with the following command:
```shell
npm run test
```
The code-coverage will be written to the ```coverage``` folder in the module root.

##Project Naming
A hodman is mason's laborer who carries bricks, mortar, and cement, helping its master to get the work done. Each part of this project could be considered a brick that is built on top of each other.

##Third-party libraries

The following third-party libraries are used by this module:

###Dependencies
* pngjs-image: https://github.com/yahoo/pngjs-image
* preceptor-core: https://github.com/yahoo/preceptor-core
* promise: https://github.com/then/promise
* sleep.js: https://github.com/h2non/sleep.js
* underscore: http://underscorejs.org

###Dev-Dependencies
* chai: http://chaijs.com
* coveralls: https://github.com/cainus/node-coveralls
* istanbul: https://github.com/gotwarlost/istanbul
* mocha: https://github.com/visionmedia/mocha
* yuidocjs: https://github.com/yui/yuidoc

###Optional-Dependecies:
* taxi: https://github.com/preceptorjs/taxi
* cabbie-alpha: https://github.com/ForbesLindesay/cabbie / https://github.com/marcelerz/cabbie

##License

The MIT License

Copyright 2014-2015 Yahoo Inc.
