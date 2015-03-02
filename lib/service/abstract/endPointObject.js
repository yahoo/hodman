// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceObject = require('./serviceObject');

/**
 * @class ServiceEndPointObject
 * @extends ServiceObject
 */
var ServiceEndPointObject = ServiceObject.extend(

	/**
	 * @constructor
	 * @param {object} options
	 * @param {ServiceEndPoint} options.endPoint
	 */
	function (options) {
		this.__super(options);
	},

	{
		/**
		 * Gets the end-point object
		 *
		 * @method getEndPoint
		 * @return {ServiceEndPoint}
		 */
		getEndPoint: function () {
			return this.getOptions().endPoint;
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceEndPointObject'
	}
);

module.exports = ServiceEndPointObject;
