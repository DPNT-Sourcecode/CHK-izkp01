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

    it('should return 0 for empty', function () {
        assert.equal(chk(" "), 0);
    });
});