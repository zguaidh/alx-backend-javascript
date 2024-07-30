export default function updateStudentGradeByCity (list, city, newGrades) {
  const cityList = list.filter((x) => x.location === city);
  return cityList.map((x) => {
    for (const i in newGrades) {
      if (i.studentId === x.id) {
        Object.defineProperty(x, 'grade', {value: i.grade},
      } else {
        Object.defineProperty(x, 'grade', {value: 'N/A'}
      }
    }
  });
}
