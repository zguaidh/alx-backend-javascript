const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe("upgraded calculateNumber with SUM as type", function() {
  it('should return the sum of rounded a = 1 and b = 3', function() {
    assert.strictEqual(calculateNumber('SUM', 1, 3), 4);
  });
  it('should return the sum of rounded a = 1 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('SUM', 1, 3.7), 5);
  });
  it('should return the sum of rounded a = 1.2 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('SUM', 1.5, 3.7), 6);
  });
  it('should return the sum of rounded a = -1.4 and b = -3.7', function() {
    assert.strictEqual(calculateNumber('SUM', -1.4, -3.6), -5);
  });
  it('should return the sum of rounded a = 1.5 and b = -2.5', function() {
    assert.strictEqual(calculateNumber('SUM', 1.5, -2.5), 0);
  });
  it('should return the sum of rounded a = -2.5 and b = -2.5', function() {
    assert.strictEqual(calculateNumber('SUM', -2.5, -2.5), -4);
  });
  it('should handle very large numbers', function() {
    assert.strictEqual(calculateNumber('SUM', 1e15, 1e15), 2e15);
    assert.strictEqual(calculateNumber('SUM', -1e15, -1e15), -2e15);
  });
  it('should handle very large numbers', function() {
    assert.strictEqual(calculateNumber('SUBTRACT', 1e15, 1e15), 0);
    assert.strictEqual(calculateNumber('SUBTRACT', -1e15, -1e15), 0);
  });
  it('should handle very small numbers', function() {
    assert.strictEqual(calculateNumber('SUM', 1e-6, 1e-6), 0);  // Both numbers are too small to round up
    assert.strictEqual(calculateNumber('SUM', 1e-6, 1), 1);    // One number rounds to 1, the other to 0
  });
  it('should handle special values', function() {
    assert.ok(isNaN(calculateNumber('SUM', NaN, 1)));
    assert.strictEqual(calculateNumber('SUM', Infinity, 1), Infinity);
    assert.strictEqual(calculateNumber('SUM', -Infinity, -1), -Infinity);
  });
  it('should handle zero correctly', function() {
    assert.strictEqual(calculateNumber('SUM', 0, 0), 0);
    assert.strictEqual(calculateNumber('SUM', 0, 1.5), 2);
    assert.strictEqual(calculateNumber('SUM', 1.5, 0), 2);
    assert.strictEqual(calculateNumber('SUM', 0, -1.5), -1);
  });
})

describe("upgraded calculateNumber with SUBSTRACT as type", function() {
  it('should return the SUBSTRACT of rounded a = 1 and b = 3', function() {
    assert.strictEqual(calculateNumber('SUBSTRACT', 1, 3), -2);
  });
  it('should return the SUBSTRACT of rounded a = 1 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('SUBSTRACT', 1, 3.7), -3);
  });
  it('should return the SUBSTRACT of rounded a = 1.2 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('SUBSTRACT', 1.5, 3.7), -2);
  });
  it('should return the SUBSTRACT of rounded a = -1.4 and b = -3.7', function() {
    assert.strictEqual(calculateNumber('SUBSTRACT', -1.4, -3.6), 3);
  });
  it('should return the SUBSTRACT of rounded a = 1.5 and b = -2.5', function() {
    assert.strictEqual(calculateNumber('SUBSTRACT', 1.5, -2.5), 4);
  });
  it('should return the SUBSTRACT of rounded a = -2.5 and b = -2.5', function() {
    assert.equal(calculateNumber('SUBSTRACT', -2.5, -2.5), 0);
  });
  it('should handle very small numbers', function() {
    assert.equal(calculateNumber('SUBSTRACT', 1e-6, 1e-6), -0);  // Both numbers are too small to round up
    assert.strictEqual(calculateNumber('SUBSTRACT', 1e-6, 1), -1);    // One number rounds to 1, the other to 0
  });
  it('should handle special values', function() {
    assert.ok(isNaN(calculateNumber('SUBSTRACT', NaN, 1)));
    assert.strictEqual(calculateNumber('SUBSTRACT', Infinity, 1), Infinity);
    assert.strictEqual(calculateNumber('SUBSTRACT', -Infinity, -1), -Infinity);
  });
  it('should handle zero correctly', function() {
    assert.equal(calculateNumber('SUBSTRACT', 0, 0), 0);
    assert.strictEqual(calculateNumber('SUBSTRACT', 0, 1.5), -2);
    assert.strictEqual(calculateNumber('SUBSTRACT', 1.5, 0), 2);
    assert.strictEqual(calculateNumber('SUBSTRACT', 0, -1.5), 1);
  });
})

describe("upgraded calculateNumber with DIVIDE as type", function() {
  it('should return the division of a = 1 and b = 3', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1, 3), 0.3333333333333333);
  });
  it('should return the division of a = 1 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1, 3.7), 0.25);
  });
  it('should return the division of a = 1.2 and b = 3.7', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1.5, 3.7), 0.5);
  });
  it('should return the division of a = -1.4 and b = -3.7', function() {
    assert.strictEqual(calculateNumber('DIVIDE', -1.4, -3.6), 0.25);
  });
  it('should return the division of a = 1.5 and b = -2.5', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1.5, -2.5), -1);
  });
  it('should return the division of a = -2.5 and b = -2.5', function() {
    assert.strictEqual(calculateNumber('DIVIDE', -2.5, -2.5), 1);
  });
  it('should handle very large numbers', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1e15, 1), 1e15);
    assert.strictEqual(calculateNumber('DIVIDE', 1, 1e15), 1e-15);
  });
  it('should handle very small numbers', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 1e-6, 1e-6), 'Error');  // Both numbers are too small to round up
    assert.strictEqual(calculateNumber('DIVIDE', 1e-6, 1), 0);    // One number rounds to 1, the other to 0
  });
  it('should handle special values', function() {
    assert.ok(isNaN(calculateNumber('DIVIDE', NaN, 1)));
    assert.strictEqual(calculateNumber('DIVIDE', Infinity, 1), Infinity);
    assert.strictEqual(calculateNumber('DIVIDE', -Infinity, -1), Infinity);
  });
  it('should handle zero correctly', function() {
    assert.strictEqual(calculateNumber('DIVIDE', 0, 0), 'Error');
    assert.strictEqual(calculateNumber('DIVIDE', 0, 1.5), 0);
    assert.strictEqual(calculateNumber('DIVIDE', 1.5, 0), 'Error');
    assert.strictEqual(calculateNumber('DIVIDE', 0, -1.5), -0);
  });
  // it('should return a string', function() {
  //   assert.typeOf(calculateNumber('DIVIDE', 0, 0), 'string');
  // })
})
