// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceObject = require('./abstract/serviceObject');

var ServiceNewEntry = require('./newEntry');
var ServiceEntry = require('./entry');
var ServiceList = require('./list');

var _ = require('underscore');

/**
 * @class ServiceEndPoint
 * @extends ServiceObject
 *
 * @property {string} _moduleName
 */
var ServiceEndPoint = ServiceObject.extend(

	{
		/**
		 * Gets the singular module identifier
		 *
		 * @method getSingularModuleName
		 * @return {string}
		 */
		getSingularModuleName: function () {
			return this.constructor.moduleNames.singular;
		},

		/**
		 * Gets the plural module identifier
		 *
		 * @method getPluralModuleName
		 * @return {string}
		 */
		getPluralModuleName: function () {
			return this.constructor.moduleNames.plural;
		},


		/**
		 * Gets a list of fields available
		 *
		 * @method getFields
		 * @return {string[]}
		 */
		getFields: function () {
			return _.keys(this.constructor.fields);
		},

		/**
		 * Checks if a field is available
		 *
		 * @method hasField
		 * @param {string} field
		 * @return {boolean}
		 */
		hasField: function (field) {
			return (this.getFields().indexOf(field) !== -1);
		},

		/**
		 * Gets details field information
		 *
		 * @method getFieldInfo
		 * @param {string} field
		 * @return {object}
		 */
		getFieldInfo: function (field) {

			if (!this.hasField(field)) {
				throw new Error('Field ' + field + ' cannot be found');
			}

			return this.constructor.fields[field];
		},


		/**
		 * Retrieves a new entry object
		 *
		 * @method newEntry
		 * @param {object} [entry]
		 * @return {ServiceEntry}
		 */
		newEntry: function (entry) {
			var Class = this.constructor.objects.NewEntry;
			return new Class(entry, this._getChildOptions());
		},

		/**
		 * Retrieves a list object
		 *
		 * @method loadList
		 * @param {ServiceEntry[]} items
		 * @param {object} [options]
		 * @return {ServiceList}
		 */
		loadList: function (items, options) {
			var localOptions = this._getChildOptions(),
				Class = this.constructor.objects.List;

			localOptions.container = options.container;
			return new Class(items, localOptions);
		},

		/**
		 * Retrieves an entry object
		 *
		 * @method loadEntry
		 * @param {object} entry
		 * @param {object} [options]
		 * @return {ServiceEntry}
		 */
		loadEntry: function (entry, options) {
			var localOptions = this._getChildOptions(),
				Class = this.constructor.objects.Entry;

			localOptions.container = options.container;
			return new Class(entry, localOptions);
		},


		/**
		 * Gets the options for children
		 *
		 * @method _getChildOptions
		 * @return {object}
		 * @private
		 */
		_getChildOptions: function () {
			return {
				request: this.getRequest(),
				service: this.getService(),
				endPoint: this
			};
		},


		/**
		 * Removes an item
		 *
		 * @method removeItem
		 * @param {string} id
		 * @return {Promise} With {string} id
		 */
		removeItem: function (id) {
			var url = encodeURIComponent(this.getPluralModuleName()) + '/' + encodeURIComponent(id);
			this.getRequest().sendRequest("DELETE", url).then(function () {
				return id;
			});
		},

		/**
		 * Gets a list of items
		 *
		 * @method getAllItems
		 * @param {object} [options]
		 * @return {Promise} With {ServiceList}
		 */
		getAllItems: function (options) {
			var url = encodeURIComponent(this.getPluralModuleName()),
				components = [],
				localOptions = options || {},
				keys = _.keys(localOptions);

			if (keys.length > 0) {
				url += '?';
			}
			keys.forEach(function (key) {
				components.push(encodeURIComponent(key) + '=' + encodeURIComponent(localOptions[key]));
			});
			if (keys.length > 0) {
				url += components.join('&');
			}

			return this.getRequest().sendRequest("GET", url).then(function (data) {
				var container = this.getService().parse(data),
					moduleName = this.getPluralModuleName(),
					moduleList = container.getModuleList(moduleName);

				return moduleList;
			}.bind(this));
		},

		/**
		 * Gets an item
		 *
		 * @method getItem
		 * @param {string} id
		 * @return {Promise} With {ServiceEntry}
		 */
		getItem: function (id) {
			var url = encodeURIComponent(this.getPluralModuleName()) + '/' + encodeURIComponent(id);

			return this.getRequest().sendRequest("GET", url).then(function (data) {
				var container = this.getService().parse(data),
					moduleName = this.getPluralModuleName(),
					moduleList = container.getModuleList(moduleName);

				return moduleList.getItem(id);
			}.bind(this));
		},

		/**
		 * Queries a list of items
		 *
		 * @method queryItems
		 * @param {string} query
		 * @param {object} [options]
		 * @return {Promise} With {ServiceList}
		 */
		queryItems: function (query, options) {
			var url = encodeURIComponent(this.getPluralModuleName()) + '?',
				components = [],
				localOptions = options || { query: query },
				keys = _.keys(localOptions);

			keys.push('query');
			keys.forEach(function (key) {
				components.push(encodeURIComponent(key) + '=' + encodeURIComponent(localOptions[key]));
			});
			if (keys.length > 0) {
				url += components.join('&');
			}

			return this.getRequest().sendRequest("GET", url).then(function (data) {
				var container = this.getService().parse(data), moduleName = this.getPluralModuleName(), moduleList = container.getModuleList(moduleName);

				return moduleList;
			}.bind(this));
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceEndPoint',

		moduleNames: {
			singular: null,
			plural: null
		},

		objects: {
			NewEntry: ServiceNewEntry,
			Entry: ServiceEntry,
			List: ServiceList
		},

		fields: {},

		RELATION_ONE_TO_ONE: 'oneToOne',
		RELATION_ONE_TO_MANY: 'oneToMany'
	}
);

module.exports = ServiceEndPoint;
