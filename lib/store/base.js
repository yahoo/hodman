// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;
var _ = require('underscore');
var Promise = require('promise');

/**
 * @class StoreBase
 * @extends Base
 *
 * @property {object} _cache
 * @property {Store} _store
 * @property {ServiceEndPoint} _endPoint
 */
var StoreBase = Base.extend(

	/**
	 * @constructor
	 * @param {Store} store
	 * @param {ServiceEndPoint} endPoint
	 */
	function (store, endPoint) {
		this.__super();

		this._cache = {};
		this._store = store;
		this._endPoint = endPoint;
	},

	{
		/**
		 * Identifier prefix
		 *
		 * @property prefix
		 * @type {string}
		 */
		prefix: '',


		/**
		 * Gets the cache object
		 *
		 * @method getCache
		 * @return {object}
		 */
		getCache: function () {
			return this._cache;
		},

		/**
		 * Gets the store-lookup object
		 *
		 * @method getStoreLookup
		 * @return {Store}
		 */
		getStoreLookup: function () {
			return this._store;
		},

		/**
		 * Gets the end-point object
		 *
		 * @method getEndPoint
		 * @return {ServiceEndPoint}
		 */
		getEndPoint: function () {
			return this._endPoint;
		},


		/**
		 * Loads or creates a store object
		 *
		 * @method retrieve
		 * @param {string} id
		 * @param {object} [options]
		 * @return {Promise} With {ServiceEntry}
		 */
		retrieve: function (id, options) {
			if (this._cache[id]) {
				return Promise.resolve(this._cache[id]);
			} else {
				return this[id](options || {}).then(function (value) {
					this._cache[id] = value;
					return value;
				}.bind(this));
			}
		},

		/**
		 * Generates a unique identifier
		 *
		 * @method generateUniqueIdentifier
		 * @param {string} prefix
		 */
		generateUniqueIdentifier: function (prefix) {
			var id = Date.now();
			return (prefix || "") + this.prefix + id + "";
		},

		/**
		 * Deletes all records stored
		 *
		 * @return {Promise}
		 */
		deleteAllStored: function () {
			var endPoint = this.getEndPoint(),
				promises = [];

			_.keys(this._cache).reverse().forEach(function (key) {
				var record = this._cache[key],
					id = record.getValue('id');

				if (id !== undefined) {
					promises.push(endPoint.removeItem(id));
				}
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
		TYPE: 'StoreBase',

		/**
		 * @property keys
		 * @type {string[]}
		 * @static
		 */
		keys: null
	}
);

module.exports = StoreBase;
