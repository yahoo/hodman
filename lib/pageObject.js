// Copyright 2014, Yahoo! Inc.
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
		 * Verifies that the page-object and its sub-dom-elements are loaded as expected
		 *
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @returns {PageObject}
		 */
		verifyIsLoaded: function (timeOut, waitInMs) {

			var expectedUrl = this.constructor.getExpectedUrl();

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
		 * @var {string}
		 */
		TYPE: 'PageObject',


		/**
		 * Base of page-object (optional)
		 *
		 * Note:
		 * config.baseUrl is used as default, but it can be overwritten with this value for each page
		 *
		 * @var {string}
		 */
		BASE: undefined,

		/**
		 * Url of page-object
		 *
		 * @var {string}
		 */
		URL: undefined,

		/**
		 * Expected url of page-object (optional)
		 *
		 * @var {string}
		 */
		EXPECTED_URL: undefined,


		/**
		 * Navigate the browser to the page-object
		 *
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @returns {PageObject}
		 */
		navigate: function (timeOut, waitInMs) {
			var Class = this;
			BaseObject.getDriverAdapter().navigateTo(this.getNavigationUrl());
			return new Class(timeOut, waitInMs);
		},


		/**
		 * Get the base-url of the page-object
		 *
		 * @returns {string}
		 */
		getBaseUrl: function () {
			return this.BASE;
		},

		/**
		 * Get the navigation-url for the page-object
		 *
		 * @returns {string}
		 */
		getNavigationUrl: function () {
			return utils.combine("/", this.getBaseUrl(), this.getUrl());
		},

		/**
		 * Gets the url of the page-object
		 *
		 * @returns {string}
		 */
		getUrl: function () {
			return this.URL;
		},

		/**
		 * Gets the expected url
		 *
		 * @returns {string}
		 */
		getExpectedUrl: function () {
			return this.EXPECTED_URL || this.getNavigationUrl();
		}
	});

module.exports = PageObject;
