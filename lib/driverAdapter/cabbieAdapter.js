// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var sleep = require('teddybear');

var DriverAdapter = require('./driverAdapter');

/**
 * @class CabbieAdapter
 * @extends DriverAdapter
 */
var CabbieAdapter = DriverAdapter.extend(

	{
		/**
		 * Initializes the driver-adapter
		 */
		initialize: function () {
			// Nothing by default
		},


		/**
		 * Get the driver
		 *
		 * @returns {Browser}
		 */
		getDriver: function () {
			return this.driver;
		},


		/**
		 * Gets the current url of the session window
		 *
		 * @returns {string}
		 */
		getCurrentUrl: function () {
			return this.getPageContext().navigator().getUrl();
		},

		/**
		 * Gets the current page context
		 *
		 * @returns {Element}
		 */
		getPageContext: function () {
			return this.getDriver().browser().activeWindow();
		},

		/**
		 * Navigates to the supplied url
		 */
		navigateTo: function (url) {
			return this.getPageContext().navigator().navigateTo(url);
		},

		/**
		 * Number of milliseconds to wait before moving on
		 *
		 * @param {int} waitInMs
		 */
		sleep: function (waitInMs) {
			return sleep(waitInMs);
		},

		/**
		 * Takes a screenshot of the current session window
		 *
		 * @returns {Buffer}
		 */
		takeScreenshot: function () {
			return this.getPageContext().takeScreenshot();
		},


		/**
		 * Gets the first element that applies to the supplied selector with the selector-type
		 *
		 * @params {object} context
		 * @params {string} selector
		 * @params {string} [selectorType='css selector']
		 * @returns {Element}
		 */
		getElement: function (context, selector, selectorType) {
			return context.getElement(selector, selectorType);
		},

		/**
		 * Gets all elements that apply to the supplied selector with the selector-type
		 *
		 * @params {object} context
		 * @params {string} selector
		 * @params {string} [selectorType='css selector']
		 * @returns {Element[]}
		 */
		getElements: function (context, selector, selectorType) {
			return context.getElements(selector, selectorType);
		}
	},

	{
		/**
		 * @var string
		 */
		TYPE: 'CabbieAdapter'
	});

module.exports = CabbieAdapter;
