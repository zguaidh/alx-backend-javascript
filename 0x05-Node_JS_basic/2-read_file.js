const fs = require('fs');

function countStudents(file) {
  try {
    const data = fs.readFileSync(file, 'utf8').trim();

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const csStudents = [];
    const sweStudents = [];

    for (let i = 1; i < lines.length; i += 1) {
      const fields = lines[i].split(',').map((field) => field.trim());

      const firstname = fields[0];
      const field = fields[3];

      if (firstname && field) {
        if (field === 'CS') {
          csStudents.push(firstname);
        } else if (field === 'SWE') {
          sweStudents.push(firstname);
        }
      }
    }

    const totalStudents = csStudents.length + sweStudents.length;

    console.log(`Number of students: ${totalStudents}`);
    console.log(`Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}`);
    console.log(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
