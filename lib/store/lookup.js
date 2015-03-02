// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;
var _ = require('underscore');
var Promise = require('promise');

/**
 * @class StoreLookup
 * @extends Base
 *
 * @property {ServiceLookup} _service
 * @property {object} _stores
 * @property {object} _cache
 */
var StoreLookup = Base.extend(

	/**
	 * @constructor
	 * @param {ServiceLookup} service
	 */
	function (service) {
		this.__super();

		this._service = service;
		this._stores = {};
		this._cache = {};

		this.initialize();
	},

	{
		/**
		 * Initializes the store
		 *
		 * @method initialize
		 */
		initialize: function () {
			// Do nothing
		},


		/**
		 * Gets the api service object
		 *
		 * @method getService
		 * @return {ServiceLookup}
		 */
		getService: function () {
			return this._service;
		},

		/**
		 * Registers a store
		 *
		 * @method registerStore
		 * @param {function} Class
		 */
		registerStore: function (Class) {

			var keys = Class.keys;

			(keys || []).forEach(function (key) {
				this._stores[key] = Class;
			}.bind(this));
		},


		/**
		 * Lookup a store
		 *
		 * @method lookupStore
		 * @param {string} key
		 * @return {function}
		 */
		lookupStore: function (key) {
			return this._stores[key];
		},

		/**
		 * Retrieves a store
		 *
		 * @method getStore
		 * @param {string} key
		 * @return {StoreBase}
		 */
		getStore: function (key) {

			var Class = this.lookupStore(key),
				service,
				endPoint,
				cacheKey;

			if (!Class) {
				throw new Error('Store ' + key + ' could not be found.');
			}
			cacheKey = Class.keys[0];

			if (!this._cache[cacheKey]) {
				service = this.getService();
				endPoint = service.getEndPoint(key);

				this._cache[cacheKey] = new Class(this, endPoint);
			}

			return this._cache[cacheKey];
		},


		/**
		 * Deletes all records stored
		 *
		 * @return {Promise}
		 */
		deleteAllStored: function () {
			var promises = [];

			_.keys(this._cache).reverse().forEach(function (key) {
				var store = this._cache[key];
				promises.push(store.deleteAllStored());
			}.bind(this));

			return Promise.all(promises);
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'StoreLookup'
	}
);

module.exports = StoreLookup;
