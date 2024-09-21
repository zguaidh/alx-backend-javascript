const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe("calculateNumber", function() {
  it('should return the sum of rounded a = 1 and b = 3', function() {
    assert.equal(calculateNumber(1, 3), 4);
  });
  it('should return the sum of rounded a = 1 and b = 3.7', function() {
    assert.equal(calculateNumber(1, 3.7), 5);
  });
  it('should return the sum of rounded a = 1.2 and b = 3.7', function() {
    assert.equal(calculateNumber(1.5, 3.7), 6);
  });
  it('should return the sum of rounded a = -1.4 and b = -3.7', function() {
    assert.equal(calculateNumber(-1.4, -3.6), -5);
  });
  it('should return the sum of rounded a = 1.5 and b = -2.5', function() {
    assert.equal(calculateNumber(1.5, -2.5), 0);
  });
  it('should return the sum of rounded a = -2.5 and b = -2.5', function() {
    assert.equal(calculateNumber(-2.5, -2.5), -4);
  });
  it('should handle very small numbers', function() {
    assert.equal(calculateNumber(1e-6, 1e-6), 0);  // Both numbers are too small to round up
    assert.equal(calculateNumber(1e-6, 1), 1);    // One number rounds to 1, the other to 0
  });
  it('should handle special values', function() {
    assert.ok(isNaN(calculateNumber(NaN, 1)));
    assert.equal(calculateNumber(Infinity, 1), Infinity);
    assert.equal(calculateNumber(-Infinity, -1), -Infinity);
  });
  it('should handle zero correctly', function() {
    assert.equal(calculateNumber(0, 0), 0);
    assert.equal(calculateNumber(0, 1.5), 2);
    assert.equal(calculateNumber(1.5, 0), 2);
    assert.equal(calculateNumber(0, -1.5), -1);
  });
});
