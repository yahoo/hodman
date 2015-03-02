// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;
var utils = require('preceptor-core').utils;
var Promise = require('promise');
var _ = require('underscore');

/**
 * @class ServiceRequest
 * @extends Base
 *
 * @property {function} _request
 * @property {string} _baseUrl
 */
var ServiceRequest = Base.extend(

	/**
	 * @constructor
	 * @param {function} request
	 * @param {string} baseUrl
	 */
	function (request, baseUrl) {
		this.__super();

		this._request = request;
		this._baseUrl = baseUrl;

		this.initialize();
	},

	{
		/**
		 * Initializes the data-object
		 *
		 * @method initialize
		 */
		initialize: function () {
			// Nothing yet
		},


		/**
		 * Sends a request
		 *
		 * @method sendRequest
		 * @param {string} method
		 * @param {string} url
		 * @param {*} [data]
		 * @return {Promise}
		 */
		sendRequest: function (method, url, data) {
			return new Promise(function (resolve, reject) {
				this._request({
					"method": method,
					"url": utils.combine("/", this._baseUrl, url),
					"json": data
				}, function (err, response, responseData) {
					var body = response.body;
					if (err) {
						reject(err);
					} else {
						if (Math.floor(response.statusCode / 100) === 2) {
							if (_.isString(responseData)) {
								responseData = JSON.parse(responseData);
							}
							resolve(responseData);
						} else {
							if (!_.isString(body)) {
								body = JSON.stringify(body);
							}
							reject(new Error('Request for "' + url + '" with method "' + method + '" and data "' + JSON.stringify(data) + '"; received code "' + response.statusCode + '" with body "' + body + '"'));
						}
					}
				});
			}.bind(this));
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceRequest'
	}
);

module.exports = ServiceRequest;
