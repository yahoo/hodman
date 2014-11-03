// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var DriverAdapter = require('./lib/driverAdapter/driverAdapter');
var CabbieAdapter = require('./lib/driverAdapter/cabbieAdapter');

var BaseObject = require('./lib/baseObject');
var GenericPageObject = require('./lib/genericPageObject');
var PageObject = require('./lib/pageObject');
var PanelObject = require('./lib/panelObject');
var ViewObject = require('./lib/viewObject');

module.exports = {
	DriverAdapter: DriverAdapter,
	driverAdapters: {
		"Cabbie": CabbieAdapter
	},

	BaseObject: BaseObject,
	GenericPageObject: GenericPageObject,
	PageObject: PageObject,
	ViewObject: ViewObject,
	PanelObject: PanelObject,

	version: require('./package.json').version
};
