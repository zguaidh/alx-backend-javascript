export default function createIteratorObject(report) {
    let allEmployees = report.allEmployees;
  
    function* employeeIterator() {
      for (let department of Object.values(allEmployees)) {
        for (let employee of department) {
          yield employee;
        }
      }
    }
  
    return employeeIterator();
  }
