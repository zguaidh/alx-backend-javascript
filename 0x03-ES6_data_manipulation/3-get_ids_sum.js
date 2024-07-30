export default function getStudentIdsSum (list) {
  return list.reduce((sum, current) => sum + current.id, 0);
}
