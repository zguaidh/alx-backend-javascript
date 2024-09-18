const http = require('http');
const fs = require('fs').promises;

// Function to count students by field
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');  // Filter out empty lines
    if (lines.length === 0) throw new Error('No data found in the database');

    const csStudents = [];
    const sweStudents = [];

    lines.slice(1).forEach((line) => {  // Skip header line
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

// HTTP Server setup
const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const result = await countStudents(process.argv[2]);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${result}`);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${error.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Resource not found');
  }
});

// Server listens on port 1245
app.listen(1245, '127.0.0.1');

module.exports = app;
