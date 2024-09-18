const express = require('express');
const fs = require('fs').promises;

const app = express();

// Function to count students by field
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');  // Filter out empty lines

    if (lines.length <= 1) throw new Error('No data available in the database');  // Ensure non-empty database

    const csStudents = [];
    const sweStudents = [];

    // Iterate through the lines starting from the second (excluding header)
    lines.slice(1).forEach((line) => {
      const [firstname, , , field] = line.split(',').map((field) => field.trim());

      if (firstname && field) {
        if (field === 'CS') csStudents.push(firstname);
        else if (field === 'SWE') sweStudents.push(firstname);
      }
    });

    const totalStudents = csStudents.length + sweStudents.length;

    return (
      `Number of students: ${totalStudents}\n` +
      `Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\n` +
      `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`
    );
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Route for homepage
app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

// Route for listing students
app.get('/students', async (req, res) => {
  try {
    const result = await countStudents(process.argv[2]);
    const finalResult = `This is the list of our students\n${result}`;
    res.status(200).send(finalResult);
  } catch (error) {
    res.status(500).send(`This is the list of our students\n${error.message}`);
  }
});

// Listen on port 1245
app.listen(1245, '127.0.0.1', () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
