// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

/**
 * @class DriverAdapter
 * @extends Base
 */
var DriverAdapter = Base.extend(

	/**
	 * Driver adapter constructor
	 *
	 * @constructor
	 * @param {Browser} driver
	 */
	function (driver) {
		this.__super();

		this.driver = driver;

		this.initialize();
	},

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
			throw new Error('Unimplemented adapter function "getCurrentUrl".');
		},

		/**
		 * Gets the current page context
		 *
		 * @method getPageContext
		 * @return {Element}
		 */
		getPageContext: function () {
			throw new Error('Unimplemented adapter function "getPageContext".');
		},

		/**
		 * Navigates to the supplied url
		 *
		 * @method navigateTo
		 */
		navigateTo: function (/* {string} url */) {
			throw new Error('Unimplemented adapter function "navigateTo".');
		},

		/**
		 * Number of milliseconds to wait before moving on
		 *
		 * @method sleep
		 */
		sleep: function (/* {int} waitInMs */) {
			throw new Error('Unimplemented adapter function "sleep".');
		},

		/**
		 * Takes a screenshot of the current session window
		 *
		 * @method takeScreenshot
		 * @return {Buffer}
		 */
		takeScreenshot: function () {
			throw new Error('Unimplemented adapter function "takeScreenshot".');
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
			throw new Error('Unimplemented adapter function "getElement".');
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
			throw new Error('Unimplemented adapter function "getElements".');
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'DriverAdapter'
	});

module.exports = DriverAdapter;
