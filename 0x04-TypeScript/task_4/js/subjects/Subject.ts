namespace Subjects {
  export class Subject {
    constructor(public teacher: Teacher) {}

    setTeacher(teacher: Teacher) {
      this.teacher = teacher;
    }
  }
}

