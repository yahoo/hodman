// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var sleep = require('sleep.js');

var DriverAdapter = require('./driverAdapter');

/**
 * @class CabbieAdapter
 * @extends DriverAdapter
 */
var CabbieAdapter = DriverAdapter.extend(

	{
		/**
		 * Initializes the driver-adapter
		 *
		 * @method initialize
		 */
		initialize: function () {
			// Nothing by default
		},


		/**
		 * Get the driver
		 *
		 * @method getDriver
		 * @return {Browser}
		 */
		getDriver: function () {
			return this.driver;
		},


		/**
		 * Gets the current url of the session window
		 *
		 * @method getCurrentUrl
		 * @return {string}
		 */
		getCurrentUrl: function () {
			return this.getPageContext().navigator().getUrl();
		},

		/**
		 * Gets the current page context
		 *
		 * @method getPageContext
		 * @return {Element}
		 */
		getPageContext: function () {
			return this.getDriver().browser().activeWindow();
		},

		/**
		 * Navigates to the supplied url
		 *
		 * @method navigateTo
		 * @param {string} url
		 */
		navigateTo: function (url) {
			return this.getPageContext().navigator().navigateTo(url);
		},

		/**
		 * Number of milliseconds to wait before moving on
		 *
		 * @method sleep
		 * @param {int} waitInMs
		 */
		sleep: function (waitInMs) {
			return sleep(waitInMs);
		},

		/**
		 * Takes a screenshot of the current session window
		 *
		 * @method takeScreenshot
		 * @return {Buffer}
		 */
		takeScreenshot: function () {
			return this.getPageContext().takeScreenshot();
		},

		/**
		 * Executes JavaScript code
		 *
		 * @method executeScript
		 * @param {string} code
		 * @param {string[]} [args]
		 * @return {*}
		 */
		executeScript: function (code, args) {
			return this.getPageContext().execute(code, args);
		},

		/**
		 * Gets the first element that applies to the supplied selector with the selector-type
		 *
		 * @method getElement
		 * @param {object} context
		 * @param {string} selector
		 * @param {string} [selectorType='css selector']
		 * @return {Element}
		 */
		getElement: function (context, selector, selectorType) {
			return context.getElement(selector, selectorType);
		},

		/**
		 * Gets all elements that apply to the supplied selector with the selector-type
		 *
		 * @method getElements
		 * @param {object} context
		 * @param {string} selector
		 * @param {string} [selectorType='css selector']
		 * @return {Element[]}
		 */
		getElements: function (context, selector, selectorType) {
			return context.getElements(selector, selectorType);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CabbieAdapter'
	});

module.exports = CabbieAdapter;
