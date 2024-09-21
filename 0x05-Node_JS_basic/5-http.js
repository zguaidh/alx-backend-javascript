const http = require('http');
const fs = require('fs').promises;

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
    throw new Error('Cannot load the database');
  }
}
const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const result = await countStudents(process.argv[2]);
      const finalResult = `This is the list of our students\n${result}`;

      res.end(finalResult);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${error.message}`);
    }
  }
});

app.listen(1245, '127.0.0.1');

module.exports = app;
