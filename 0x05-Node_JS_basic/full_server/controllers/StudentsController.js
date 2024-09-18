import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const databaseFilePath = process.argv[2];

    try {
      const students = await readDatabase(databaseFilePath);
      let responseText = 'This is the list of our students\n';

      Object.keys(students).sort().forEach((field) => {
        responseText += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
      });

      res.status(200).send(responseText.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const databaseFilePath = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(databaseFilePath);
      const studentsInMajor = students[major] || [];
      res.status(200).send(`List: ${studentsInMajor.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
