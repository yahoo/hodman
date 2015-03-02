// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceObject = require('./abstract/serviceObject');

/**
 * @class ServiceContainer
 * @extends ServiceObject
 *
 * @property {object} _moduleList
 */
var ServiceContainer = ServiceObject.extend(

	/**
	 * @constructor
	 * @param {object} moduleList
	 * @param {object} options
	 */
	function (moduleList, options) {
		this._moduleList = moduleList;
		this.__super(options);
	},

	{
		/**
		 * Gets an item-list by moduleName
		 *
		 * @method getModuleList
		 * @param {string} moduleName
		 * @return {ServiceList}
		 */
		getModuleList: function (moduleName) {
			return this._moduleList[moduleName];
		},

		/**
		 * Does the container have a module?
		 *
		 * @method hasModuleList
		 * @param {string} moduleName
		 * @return {boolean}
		 */
		hasModuleList: function (moduleName) {
			return (this.getModuleList(moduleName) !== undefined);
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceContainer'
	}
);

module.exports = ServiceContainer;
