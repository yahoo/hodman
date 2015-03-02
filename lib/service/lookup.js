// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceBaseObject = require('./abstract/object');
var ServiceContainer = require('./container');
var ServiceRequest = require('./request');

var _ = require('underscore');

/**
 * @class ServiceLookup
 * @extends ServiceBaseObject
 *
 * @property {object} _moduleList
 */
var ServiceLookup = ServiceBaseObject.extend(

	/**
	 * @constructor
	 * @param {object} options
	 * @param {string} options.baseUrl
	 * @param {function} options.request
	 */
	function (options) {
		options.request = new ServiceRequest(options.request, options.baseUrl);
		this._moduleList = {};

		this.__super(options);
	},

	{
		/**
		 * Initialize
		 *
		 * @method initialize
		 */
		initialize: function () {
			// Nothing yet
		},


		/**
		 * Register a service module
		 *
		 * @method registerModule
		 * @param {function} Class
		 */
		registerModule: function (Class) {

			var keys = [];

			if (Class.moduleNames.singular) {
				keys.push(Class.moduleNames.singular);
			}
			if (Class.moduleNames.plural) {
				keys.push(Class.moduleNames.plural);
			}
			if (Class.moduleNames.others) {
				keys = keys.concat(Class.moduleNames.others);
			}

			keys.forEach(function (key) {
				this._moduleList[key] = Class;
			}.bind(this));
		},

		/**
		 * Looks-up a service module
		 *
		 * @method lookupModule
		 * @param {string} moduleName
		 * @return {function}
		 */
		lookupModule: function (moduleName) {
			return this._moduleList[moduleName];
		},

		/**
		 * Retrieves a module the end-point
		 *
		 * @method getEndPoint
		 * @param {string} moduleName
		 * @return {ServiceEndPoint}
		 */
		getEndPoint: function (moduleName) {
			var Class = this.lookupModule(moduleName);

			if (!Class) {
				throw new Error('Cannot generate end-point for ' + moduleName);
			}

			return new Class(this._getChildOptions());
		},

		/**
		 * Get options for children
		 *
		 * @method _getChildOptions
		 * @return {object}
		 * @private
		 */
		_getChildOptions: function () {
			return {
				request: this.getRequest(),
				service: this
			};
		},

		/**
		 * Parses data and returns a container object
		 *
		 * @method parse
		 * @param {object} data
		 * @return {ServiceContainer}
		 */
		parse: function (data) {
			var moduleNames = _.keys(data),
				result = {},
				container = new ServiceContainer(result, this._getChildOptions());

			moduleNames.forEach(function (moduleName) {
				var localModule,
					endPoint,
					pluralModuleName,
					list = [];

				localModule = this.lookupModule(moduleName);
				if (localModule) {

					endPoint = this.getEndPoint(moduleName);
					pluralModuleName = endPoint.getPluralModuleName();

					// Convert to array if it is a single-item
					if (!_.isArray(data[moduleName])) {
						data[moduleName] = [data[moduleName]];
					}

					(data[moduleName] || []).forEach(function (entry) {
						list.push(endPoint.loadEntry(entry, {
							container: container
						}));
					});

					list = endPoint.loadList(list, {
						container: container
					});

					result[pluralModuleName] = list;
				}
			}.bind(this));

			return container;
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceLookup'
	}
);

module.exports = ServiceLookup;
