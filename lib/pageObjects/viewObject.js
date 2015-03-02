// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BaseObject = require('./baseObject');

/**
 * @class ViewObject
 * @extends BaseObject
 */
var ViewObject = BaseObject.extend(

	{},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'ViewObject'
	}
);

module.exports = ViewObject;
