export default function getListStudentIds (arr) {
  if (!Array.isArray(arr)) {
    return [];
  } else {
    return arr.map((x) => (x.id));
  }
}
