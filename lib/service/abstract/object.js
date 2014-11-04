var Base = require('preceptor-core').Base;

/**
 * @class ServiceBaseObject
 * @extends Base
 *
 * @property {object} _options
 */
var ServiceBaseObject = Base.extend(

	/**
	 * @constructor
	 * @param {object} options
	 * @param {ServiceRequest} options.request
	 */
	function (options) {
		this.__super();

		this._options = options;

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
		 * Gets all options supplied when created
		 *
		 * @method getOptions
		 * @return {object}
		 */
		getOptions: function () {
			return this._options;
		},

		/**
		 * Gets the request object
		 *
		 * @method getRequest
		 * @return {ServiceRequest}
		 */
		getRequest: function () {
			return this.getOptions().request;
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceBaseObject'
	}
);

module.exports = ServiceBaseObject;
