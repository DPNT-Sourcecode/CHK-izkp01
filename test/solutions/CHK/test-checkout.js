var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const chk = require('../../../lib/solutions/CHK/checkout');

describe('CHK challenge', function () {
    it('should return correct total', function () {
        assert.equal(chk("AAABCD"), 195);
    });

    it('should return correct total for only offers', function () {
        assert.equal(chk("AAABB"), 175);
    });

    it('should return correct total for only one item', function () {
        assert.equal(chk("A"), 50);
    });

    it('should return correct total for no offers', function () {
        assert.equal(chk("ABCD"), 115);
    });

    it('should return -1 for empty', function () {
        assert.equal(chk(" "), -1);
    });

    it('should -1 for invalid', function () {
        assert.equal(chk("-"), -1);
    });

    it('should -1 for invalid', function () {
        assert.equal(chk("ABCa"), -1);
    });

    it('should make B free', function () {
        assert.equal(chk("AAAAAEEB"), 280);
    });

    it('should make B free but no B so return total', function () {
        assert.equal(chk("AAAEEEE"), 290);
    });

    it('calculate F offer', function () {
        assert.equal(chk("AAABCDFFF"), 215);
    });
});