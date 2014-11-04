// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BaseObject = require('./baseObject');
var PanelObject = require('./panelObject');
var _ = require('underscore');

/**
 * @class GenericPageObject
 * @extends PanelObject
 *
 * @property {string} _navigationUrl
 * @property {string} _expectedUrl
 */
var GenericPageObject = PanelObject.extend(

	/**
	 * Generic page-object constructor
	 *
	 * @constructor
	 * @param {string} navigationUrl
	 * @param {string} [expectedUrl=navigationUrl]
	 * @param {int} [timeOut]
	 * @param {int} [waitInMs]
	 */
	function (navigationUrl, expectedUrl, timeOut, waitInMs) {

		this._navigationUrl = navigationUrl;
		this._expectedUrl = expectedUrl;

		this.__super(null, timeOut, waitInMs);
	},

	{
		/**
		 * Verifies that the page-object and its sub-dom-elements are loaded as expected
		 *
		 * @method verifyIsLoaded
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @return {GenericPageObject}
		 * @private
		 */
		verifyIsLoaded: function (timeOut, waitInMs) {

			var navigationUrl = this._navigationUrl,
				expectedUrl = this._expectedUrl;

			expectedUrl = expectedUrl || navigationUrl;

			if (expectedUrl !== "*") {
				this.waitUntil(function () {
					var url = this.getAdapter().getCurrentUrl();

					if (_.isString(expectedUrl)) {
						expectedUrl = new RegExp(expectedUrl);
					}
					return !!url.match(expectedUrl);
				}.bind(this), timeOut, waitInMs);
			}

			return this.__super(timeOut, waitInMs);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'GenericPageObject',

		/**
		 * Navigates to the given url and check the expected url
		 *
		 * @method navigate
		 * @param {string} navigationUrl
		 * @param {string} [expectedUrl=navigationUrl]
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @return {GenericPageObject}
		 * @static
		 */
		navigate: function (navigationUrl, expectedUrl, timeOut, waitInMs) {
			var Class = this;
			BaseObject.getDriverAdapter().navigateTo(navigationUrl);
			return new Class(navigationUrl, expectedUrl, timeOut, waitInMs);
		}
	});

module.exports = GenericPageObject;
