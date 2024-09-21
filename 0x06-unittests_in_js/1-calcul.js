module.exports = function calculateNumber(type, a, b) {
  const rounedA = Math.round(a);
  const rounedB = Math.round(b);
  let result = 0;
  if (type === 'SUM') {
    result = rounedA + rounedB;
  } else if (type === 'SUBSTRACT') {
    result = rounedA - rounedB;
  } else if (type === 'DIVIDE') {
    if (rounedB === 0) {
      result = "Error";
    } else {
      result = rounedA / rounedB;
    }
  }
  return result;
 }
