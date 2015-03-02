// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceEndPointObject = require('./abstract/endPointObject');
var utils = require('preceptor-core').utils;

/**
 * @class ServiceNewEntry
 * @extends ServiceEndPointObject
 *
 * @property {object} _entry
 */
var ServiceNewEntry = ServiceEndPointObject.extend(

	/**
	 * @constructor
	 * @param {object} [entry]
	 * @param {object} options
	 */
	function (entry, options) {

		this._entry = entry || {};

		this.__super(options);
	},

	{
		/**
		 * Gets a value of a field
		 *
		 * @method getValue
		 * @param {string} field
		 * @return {*}
		 */
		getValue: function (field) {
			if (!this.getEndPoint().hasField(field)) {
				throw new Error('Field ' + field + ' is not available.');
			}
			return this._entry[field];
		},

		/**
		 * Sets a value for a field
		 *
		 * @method setValue
		 * @param {string} field
		 * @param {*} value
		 */
		setValue: function (field, value) {
			if (!this.getEndPoint().hasField(field)) {
				throw new Error('Field ' + field + ' is not available.');
			}
			this._entry[field] = value;
		},


		/**
		 * Sets a range of values
		 *
		 * @method setFields
		 * @param {object} values
		 */
		setFields: function (values) {
			utils.deepExtend(this._entry, [values])
		},


		/**
		 * Creates the entry
		 *
		 * @method save
		 * @return {Promise} With {ServiceEntry}
		 */
		save: function () {
			var endPoint = this.getEndPoint(),
				singularModuleName = endPoint.getSingularModuleName(),
				pluralModuleName = endPoint.getPluralModuleName(),
				url = encodeURIComponent(pluralModuleName),
				data = {};

			data[singularModuleName] = this._entry;

			return this.getRequest().sendRequest("POST", url, data).then(function (data) {
				var container = this.getService().parse(data),
					moduleName = this.getEndPoint().getPluralModuleName(),
					moduleList = container.getModuleList(moduleName);

				return moduleList.getItems()[0];
			}.bind(this));
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceNewEntry'
	}
);

module.exports = ServiceNewEntry;
