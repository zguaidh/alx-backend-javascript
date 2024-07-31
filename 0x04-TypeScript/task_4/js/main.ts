import { Cpp } from "./subjects/Cpp";
import { Java } from "./subjects/Java";
import { React } from "./subjects/React";
import { Teacher } from "./subjects/Teacher";

const cpp = new Cpp(new Teacher('John', 'Doe'));
const java = new Java(new Teacher('John', 'Doe'));
const react = new React(new Teacher('John', 'Doe'));

const cTeacher = new Teacher('John', 'Doe');
cTeacher.experienceTeachingC = 10;

console.log("C++");
cpp.setTeacher(cTeacher);
console.log(cpp.getRequirements());
console.log(cpp.getAvailableTeacher());

console.log("Java");
java.setTeacher(cTeacher);
console.log(java.getRequirements());
console.log(java.getAvailableTeacher());

console.log("React");
react.setTeacher(cTeacher);
console.log(react.getRequirements());
console.log(react.getAvailableTeacher());

