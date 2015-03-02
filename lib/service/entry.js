// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceContainerObject = require('./abstract/containerObject');
var utils = require('preceptor-core').utils;

/**
 * @class ServiceEntry
 * @extends ServiceContainerObject
 *
 * @property {object} _entry
 */
var ServiceEntry = ServiceContainerObject.extend(

	/**
	 * @constructor
	 * @param {object} entry Data of entry
	 * @param {object} options
	 */
	function (entry, options) {
		this._entry = entry;
		this.__super(options);
	},

	{
		/**
		 * Gets a value of a field
		 *
		 * @method getValue
		 * @param {string} field
		 * @param {boolean} [directAccess=false]
		 * @return {*}
		 */
		getValue: function (field, directAccess) {
			var info, list, moduleList;

			if (!this.getEndPoint().hasField(field)) {
				throw new Error('Field ' + field + ' is not available.');
			}

			info = this.getEndPoint().getFieldInfo(field);

			if (info.moduleName && !directAccess) {
				moduleList = this.getContainer().getModuleList(info.moduleName);

				if ((info.relation === 'oneToOne') || !info.relation) {
					return moduleList.getItem(this._entry[field]);

				} else {

					list = [];
					(this._entry[field] || []).forEach(function (entry) {
						list.push(moduleList.getItem(entry));
					});

					return list;
				}

			} else {
				return this._entry[field];
			}
		},

		/**
		 * Sets a value of a field
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
		 * Saves the entry
		 *
		 * @method save
		 * @return {Promise} With {ServiceEntry}
		 */
		save: function () {
			var endPoint = this.getEndPoint(),
				singularModuleName = endPoint.getSingularModuleName(),
				pluralModuleName = endPoint.getPluralModuleName(),
				url = encodeURIComponent(pluralModuleName) + '/' + encodeURIComponent(this.getValue('id')),
				data = {};

			data[singularModuleName] = this._entry;

			return this.getRequest().sendRequest("PUT", url, data).then(function (data) {
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
		TYPE: 'ServiceEntry'
	}
);

module.exports = ServiceEntry;
