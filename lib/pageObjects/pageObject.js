// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BaseObject = require('./baseObject');
var PanelObject = require('./panelObject');
var utils = require('preceptor-core').utils;
var _ = require('underscore');

/**
 * @class PageObject
 * @extends PanelObject
 */
var PageObject = PanelObject.extend(

	/**
	 * Page-object constructor
	 *
	 * @constructor
	 * @param {int} [timeOut]
	 * @param {int} [waitInMs]
	 */
	function (timeOut, waitInMs) {
		this.__super(null, timeOut, waitInMs);
	},

	{
		/**
		 * Initializes the page-object
		 *
		 * @method initialize
		 */
		initialize: function () {
			var expectedUrl = this.constructor.getExpectedUrl();

			this.verifyUrlIsLoaded(expectedUrl, this._timeOut, this._waitInMs);

			this.__super();
		},

		/**
		 * Verifies that the url is loaded correctly
		 *
		 * @method verifyUrlIsLoaded
		 * @param {string} expectedUrl
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @return {PageObject}
		 */
		verifyUrlIsLoaded: function (expectedUrl, timeOut, waitInMs) {

			if (expectedUrl !== "*") {
				this.waitUntil(function () {
					var url = this.getAdapter().getCurrentUrl();

					if (_.isString(expectedUrl)) {
						expectedUrl = new RegExp(expectedUrl);
					}
					return !!url.match(expectedUrl);
				}.bind(this), "Waited for url that matches '" + expectedUrl + "'", timeOut, waitInMs);
			}

			return this;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'PageObject',


		/**
		 * Base of page-object (optional)
		 *
		 * Note:
		 * config.baseUrl is used as default, but it can be overwritten with this value for each page
		 *
		 * @property BASE
		 * @type {string}
		 * @static
		 */
		BASE: undefined,

		/**
		 * Url of page-object
		 *
		 * @property URL
		 * @type {string}
		 * @static
		 */
		URL: undefined,

		/**
		 * Expected url of page-object (optional)
		 *
		 * @property EXPECTED_URL
		 * @type {string}
		 * @static
		 */
		EXPECTED_URL: undefined,


		/**
		 * Navigate the browser to the page-object
		 *
		 * @method navigate
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @return {PageObject}
		 * @static
		 */
		navigate: function (timeOut, waitInMs) {
			var Class = this;
			BaseObject.getDriverAdapter().navigateTo(this.getNavigationUrl());
			return new Class(timeOut, waitInMs);
		},


		/**
		 * Get the base-url of the page-object
		 *
		 * @method getBaseUrl
		 * @return {string}
		 * @static
		 */
		getBaseUrl: function () {
			return this.BASE;
		},

		/**
		 * Get the navigation-url for the page-object
		 *
		 * @method getNavigationUrl
		 * @return {string}
		 * @static
		 */
		getNavigationUrl: function () {
			return utils.combine("/", this.getBaseUrl(), this.getUrl());
		},

		/**
		 * Gets the url of the page-object
		 *
		 * @method getUrl
		 * @return {string}
		 * @static
		 */
		getUrl: function () {
			return this.URL;
		},

		/**
		 * Gets the expected url
		 *
		 * @method getExpectedUrl
		 * @return {string}
		 * @static
		 */
		getExpectedUrl: function () {
			return this.EXPECTED_URL || this.getNavigationUrl();
		}
	});

module.exports = PageObject;
