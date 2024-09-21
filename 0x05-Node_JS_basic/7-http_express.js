const express = require('express');
const fs = require('fs').promises;

const app = express();
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
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

    return (
      `Number of students: ${totalStudents}\n`
      + `Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\n`
      + `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`
    );
  } catch (error) {
    // console.log(error);
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const result = await countStudents(process.argv[2]);
    const finalResult = `This is the list of our students\n${result}`;
    res.send(finalResult);
  } catch (error) {
    res.send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(1245, '127.0.0.1');

module.exports = app;
