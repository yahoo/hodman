// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceEndPointObject = require('./endPointObject');

/**
 * @class ServiceContainerObject
 * @extends ServiceEndPointObject
 */
var ServiceContainerObject = ServiceEndPointObject.extend(

	/**
	 * @constructor
	 * @param {object} options
	 * @param {ServiceContainer} [options.container]
	 */
	function (options) {
		this.__super(options);
	},

	{
		/**
		 * Gets the container object
		 *
		 * @method getContainer
		 * @return {ServiceContainer}
		 */
		getContainer: function () {
			return this.getOptions().container;
		},

		/**
		 * Does this object have a container?
		 *
		 * @method hasContainer
		 * @return {boolean}
		 */
		hasContainer: function () {
			return (this.getContainer() !== undefined);
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceContainerObject'
	}
);

module.exports = ServiceContainerObject;
