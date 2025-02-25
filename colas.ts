//  Use case: Grade registration system for a university.

//  Use of queues: the FIFO principle is used, which is a typical principle of queues.

//  In this example, this principle is used to store student data in the order in which they are enrolled.

//  That is, if Maria is added first, Maria will be attended to in the enrollment verification step, then, in the registration of each student's grades, Maria's data is recorded first and then the others.

// from collections import deque

//  I import deque to store data efficiently within the University class
//  I implement 'append()' to add students and 'popleft()' to store them, this makes correct use of the FIFO principle
//  every time a student is registered within the University class with add_student, append is applied to save it as the last element over the
//  next student in the queue.

//  (def add_student(self, student):)
//  self.students.append(student) <=== use of 'append()'

//  when students are served, the 'popleft()' method is used to serve students from first to last in the order in which they were added
//  using the 'append()' method

//  def add_student(self, student):
//  self.students.append(student) <=== use of 'popleft()'

class Student {
    name: string;
    enrollmentNumber: string;
    courses: string[];
    grades: number[];

    constructor(name: string, enrollmentNumber: string) {
        this.name = name;
        this.enrollmentNumber = enrollmentNumber;
        this.courses = [];
        this.grades = [];
    }

    addCourse(course: string, grade: number): void {
        this.courses.push(course);
        this.grades.push(grade);
    }

    getAverage(): number {
        if (this.grades.length === 0) {
            return 0;
        }
        return this.grades.reduce((acc, grade) => acc + grade, 0) / this.grades.length;
    }
}

class University {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(student: Student): void {
        this.students.push(student);
    }

    attendStudent(): Student | null {
        if (this.students.length > 0) {
            const student = this.students.shift(); // FIFO - remove the first student in the queue
            console.log(`Attending: ${student!.name} (${student!.enrollmentNumber})`);
            return student!;
        } else {
            console.log("No students in the queue.");
            return null;
        }
    }

    generateReport(): void {
        if (this.students.length === 0) {
            console.log("No students registered.");
            return;
        }

        this.students.forEach((student) => {
            console.log(`Report for ${student.name} (${student.enrollmentNumber}):`);
            student.courses.forEach((course, i) => {
                console.log(`- Course: ${course}, Grade: ${student.grades[i]}`);
            });
            console.log(`Overall average: ${student.getAverage().toFixed(2)}`);
            console.log("-".repeat(30));
        });
    }
}

const university = new University();

const numStudents = parseInt(prompt("How many students do you want to register?") || "0");

for (let i = 0; i < numStudents; i++) {
    const name = prompt("\nStudent name: ") || "";
    const enrollmentNumber = prompt("Student enrollment number: ") || "";

    const student = new Student(name, enrollmentNumber);

    const numCourses = parseInt(prompt(`How many courses is ${name} taking?`) || "0");

    for (let j = 0; j < numCourses; j++) {
        const course = prompt("Course name: ") || "";
        const grade = parseFloat(prompt(`Grade for the course ${course}:`) || "0");

        student.addCourse(course, grade);
    }

    university.addStudent(student);
}

university.generateReport();

while (true) {
    const continueAttending = prompt("\nDo you want to attend to a student? (y/n): ") || "";

    if (continueAttending.toLowerCase() === "y") {
        university.attendStudent();
    } else {
        console.log("No more students to attend.");
        break;
    }
}
