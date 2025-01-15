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
        assert.equal(chk("FFF"), 20);
    });

    it('calculate F offer', function () {
        assert.equal(chk("FFFFFFF"), 50);
    });

    it('calculate N offer', function () {
        assert.equal(chk("NNNM"), 120);
    });
    it('calculate U offer', function () {
        assert.equal(chk("UUUU"), 120);
    });
    it('calculate K offer', function () {
        assert.equal(chk("KK"), 120);
    });
    it('calculate H offer', function () {
        assert.equal(chk("HHHHH"), 45);
    });

    it('calculate R offer', function () {
        assert.equal(chk("RRRQ"), 150);
    });

    it('calculate any 3 offer', function () {
        assert.equal(chk("SSSS"), 45);
    });
    it('calculate any 3  offer', function () {
        assert.equal(chk("STXZ"), 45);
    });
    it('calculate any 3  offer', function () {
        assert.equal(chk("YZZZ"), 45);
    });



});
