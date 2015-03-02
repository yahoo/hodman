// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ServiceContainerObject = require('./abstract/containerObject');

/**
 * @class ServiceList
 * @extends ServiceContainerObject
 *
 * @property {ServiceEntry[]} _items
 */
var ServiceList = ServiceContainerObject.extend(

	/**
	 * @constructor
	 * @param {ServiceEntry[]} items
	 * @param {object} options
	 */
	function (items, options) {

		this._items = items;

		this.__super(options);
	},

	{
		/**
		 * Gets all items
		 *
		 * @method getItems
		 * @return {ServiceEntry[]}
		 */
		getItems: function () {
			return this._items;
		},

		/**
		 * Gets a specific item from the list
		 *
		 * @method getItem
		 * @param {string} id
		 * @return {ServiceEntry}
		 */
		getItem: function (id) {
			var i, len,
				items = this.getItems();

			for (i = 0, len = items.length; i < len; i++) {
				if (items[i].getValue('id') == id) {
					return items[i];
				}
			}

			return undefined;
		},

		/**
		 * Checks if an item exists
		 *
		 * @method hasItem
		 * @param {string} id
		 * @return {boolean}
		 */
		hasItem: function (id) {
			return (this.getItem(id) !== undefined);
		}
	},
	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ServiceList'
	}
);

module.exports = ServiceList;
