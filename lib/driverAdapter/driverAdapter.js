// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

/**
 * @class DriverAdapter
 * @extends Base
 * @property {Browser} driver
 * @property {number} devicePixelRatio
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
		this.devicePixelRatio = null;

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
		 * Executes JavaScript code
		 *
		 * @method executeScript
		 * @param {string} code
		 * @param {string[]} [args]
		 * @return {*}
		 */
		executeScript: function (code, args) {
			throw new Error('Unimplemented adapter function "executeScript".');
		},

		/**
		 * Gets the device-pixel ratio
		 *
		 * @method getDevicePixelRatio
		 * @param {int} pixelWidth
		 * @return {number}
		 */
		getDevicePixelRatio: function (pixelWidth) {
			var result, script = '';

			if (!this.devicePixelRatio) {
				script += "var width, ratio, scrollWidth;\n";
				script += "scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);\n";
				script += "width = Math.max(scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.offsetWidth);\n";
				script += "ratio = window.devicePixelRatio || 1;\n";
				script += "return { width: width, ratio: ratio };\n";

				result = this.executeScript(script);

				// This is done to fix some issues with Chrome:
				// http://www.quirksmode.org/blog/archives/2012/06/devicepixelrati.html
				//
				// Here, we calculate the ratio ourselves instead of trusting the browser.
				// For this, however, we need the width of a screenshot.
				//
				// This code will be removed as soon as all browser support full-page screenshot,
				// and they are able to report this value correctly. Do not depend on this method!
				if (pixelWidth) {
					this.devicePixelRatio = pixelWidth / result.width;
				} else {
					this.devicePixelRatio = result.ratio;
				}
			}

			return this.devicePixelRatio;
		},

		/**
		 * Gets the offset of the screenshot
		 *
		 * Note:
		 *  This method is needed for the Chrome browser. We need this because
		 *  Chrome can only take screenshot of the current view-port, and therefore
		 *  the offset needs to be determined to calculate the correct coordinates
		 *  for clipping and blocking-out.
		 *  This method will be removed as soon as all browser support full-page screenshot!
		 *  Do not depend on this method!
		 *
		 * @method getScreenshotOffset
		 * @param {int} pixelWidth
		 * @param {int} pixelHeight
		 * @return {object}
		 */
		getScreenshotOffset: function (pixelWidth, pixelHeight) {
			var result, script = '', x = 0, y = 0;

			script += "var scrollLeft, scrollTop, scrollWidth, scrollHeight;\n";
			script += "scrollLeft = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);\n";
			script += "scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);\n";
			script += "scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);\n";
			script += "scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);\n";
			script += "return { scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth, scrollHeight: scrollHeight };\n";

			result = this.executeScript(script);

			if (Math.abs(pixelWidth - result.scrollWidth) > 1) {
				x = result.scrollLeft;
			}
			if (Math.abs(pixelHeight - result.scrollHeight) > 1) {
				y = result.scrollTop;
			}

			return {x: x, y: y};
		},

		/**
		 * Scrolls the active page to a specific coordinate
		 *
		 * Note:
		 *  This method is needed for the Chrome browser. We need this because
		 *  Chrome can only take screenshot of the current view-port, and
		 *  we want to make sure that we get as much of the important part as possible.
		 *  For this, we scroll to the top of the element that the screenshot
		 *  should be taken from.
		 *  This method will be removed as soon as all browser support full-page screenshot!
		 *  Do not depend on this method!
		 *
		 * @method scrollTo
		 * @param {int} x
		 * @param {int} y
		 */
		scrollTo: function (x, y) {
			this.executeScript("window.scrollTo(arguments[0], arguments[1]);\n", [x, y]);
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
