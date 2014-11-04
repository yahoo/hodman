var ServiceBaseObject = require('./object');

/**
 * @class ServiceObject
 * @extends ServiceBaseObject
 */
var ServiceObject = ServiceBaseObject.extend(

	/**
	 * @constructor
	 * @param {object} options
	 * @param {ServiceLookup} options.service
	 */
	function (options) {
		this.__super(options);
	},

	{
		/**
		 * Gets the service object
		 *
		 * @method getService
		 * @return {ServiceLookup}
		 */
		getService: function () {
			return this.getOptions().service;
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceObject'
	}
);

module.exports = ServiceObject;
