// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ViewObject = require('./viewObject');

/**
 * @class PanelObject
 * @extends ViewObject
 */
var PanelObject = ViewObject.extend(

	/**
	 * Panel-object constructor
	 *
	 * @constructor
	 * @param {Element} [root]
	 * @param {int} [timeOut]
	 * @param {int} [waitInMs]
	 */
	function (root, timeOut, waitInMs) {
		this.__super(root, timeOut, waitInMs);
	},

	{
		/**
		 * Initializes the panel-object
		 *
		 * @method initialize
		 */
		initialize: function () {
			this._context = this._getPanelRootElement(this.getContext(), this._timeOut, this._waitInMs);
			this.__super();
		},

		/**
		 * Gets the root element of the panel-object
		 *
		 * @method _getPanelRootElement
		 * @param {Element} context
		 * @param {int} [timeOut]
		 * @param {int} [waitInMs]
		 * @return {Element}
		 * @private
		 */
		_getPanelRootElement: function (context, timeOut, waitInMs) {
			var selector = this.constructor.SELECTOR,
				elements;

			context = context || this.getAdapter().getPageContext();

			if (selector) {

				this.waitUntil(function () {
					elements = context.getElements(selector);
					return elements.length > 0;
				}, "Waited for root element with selector '" + selector + "'", timeOut, waitInMs);

				if (elements && elements.length === 1) {
					return elements[0];

				} else if (elements && elements.length > 1) {
					throw new Error("Panel-object selector is not specific enough. '" + selector + "'");

				} else {
					throw new Error("Root element for panel-object could not be found. '" + selector + "'");
				}

			} else {
				return context;
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'PanelObject',

		/**
		 * Selector for panel object
		 *
		 * @property SELECTOR
		 * @type {string}
		 * @static
		 */
		SELECTOR: undefined
	});

module.exports = PanelObject;
