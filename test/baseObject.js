/*global describe, it, before, beforeEach, after, afterEach */
// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BaseObject = require('..').BaseObject;
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

		it('should have a getScreenshotPath', function () {
			expect(this.Class.getScreenshotPath()).to.be.undefined;
		});

		it('should have a getDriverAdapter', function () {
			expect(this.Class.getDriverAdapter()).to.be.undefined;
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

		it('should be convertible to string', function () {
			expect(this.instance.toString()).to.equal("[" + this.Class.TYPE + "::" + this.instance.NAME + "(" + this.instance._uniqueId + ")" + "]")
		});
	});
});
