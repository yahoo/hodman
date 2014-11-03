/*global describe, it, before, beforeEach, after, afterEach */
// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BaseObject = require('../lib/baseObject');
var expect = require('chai').expect;

describe('Base-Object', function () {

	beforeEach(function () {
		this.Class = BaseObject;
	});

	describe('Constructor', function () {

		it('should have a TYPE', function () {
			expect(this.Class.TYPE).to.equal('BaseObject');
		});

		it('should be convertible to string', function () {
			expect(this.Class.toString()).to.equal("[" + this.Class.TYPE + "]")
		});

		it('should have a SCREENSHOT_PATH', function () {
			expect(this.Class.SCREENSHOT_PATH).to.be.equal('');
		});

		it('should have a DRIVER_ADAPTER', function () {
			expect(this.class.DRIVER_ADAPTER).to.be.null;
		})
	});

	describe('Instance', function () {

		beforeEach(function () {
			this.instance = new this.Class();
		});

		it('should have a NAME', function () {
			expect(this.instance.NAME).to.exist;
			expect(this.instance.NAME).to.equal('unnamed');
		});

		it('should have a unique id', function () {
			expect(this.instance.uniqueId).to.exist;
			expect(this.instance.uniqueId).to.contain('instance');
		});

		it('should be convertible to string', function () {
			expect(this.instance.toString()).to.equal("[" + this.Class.TYPE + "::" + this.instance.NAME + "(" + this.instance.uniqueId + ")" + "]")
		});

	});

});
