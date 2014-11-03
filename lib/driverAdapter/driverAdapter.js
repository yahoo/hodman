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
			throw new Error('Unimplemented adapter function "getCurrentUrl".');
		},

		/**
		 * Gets the current page context
		 *
		 * @returns {Element}
		 */
		getPageContext: function () {
			throw new Error('Unimplemented adapter function "getPageContext".');
		},

		/**
		 * Navigates to the supplied url
		 */
		navigateTo: function (/* {string} url */) {
			throw new Error('Unimplemented adapter function "navigateTo".');
		},

		/**
		 * Number of milliseconds to wait before moving on
		 */
		sleep: function (/* {int} waitInMs */) {
			throw new Error('Unimplemented adapter function "sleep".');
		},

		/**
		 * Takes a screenshot of the current session window
		 *
		 * @returns {Buffer}
		 */
		takeScreenshot: function () {
			throw new Error('Unimplemented adapter function "takeScreenshot".');
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
			throw new Error('Unimplemented adapter function "getElement".');
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
			throw new Error('Unimplemented adapter function "getElements".');
		}
	},

	{
		/**
		 * @var string
		 */
		TYPE: 'DriverAdapter'
	});

module.exports = DriverAdapter;
