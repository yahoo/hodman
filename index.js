// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

module.exports = {

	// Driver-adapters
	DriverAdapter: require('./lib/driverAdapter/driverAdapter'),
	driverAdapters: {
		"Cabbie": require('./lib/driverAdapter/cabbieAdapter')
	},

	// Page-Objects
	BaseObject: require('./lib/pageObjects/baseObject'),
	GenericPageObject: require('./lib/pageObjects/genericPageObject'),
	PageObject: require('./lib/pageObjects/pageObject'),
	ViewObject: require('./lib/pageObjects/viewObject'),
	PanelObject: require('./lib/pageObjects/panelObject'),

	// Service-Objects
	ServiceEndPoint: require('./lib/service/endPoint'),
	ServiceEntry: require('./lib/service/entry'),
	ServiceNewEntry: require('./lib/service/newEntry'),
	ServiceList: require('./lib/service/list'),
	ServiceLookup: require('./lib/service/lookup'),

	// Store-Objects
	StoreBase: require('./lib/store/base'),
	StoreLookup: require('./lib/store/lookup'),

	version: require('./package.json').version
};
