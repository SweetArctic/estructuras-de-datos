# Caso de uso: Sistema de registros de notas para una univseridad.

# Uso de las colas: se utiliza el principio (FIFO) First in - First out que es un principio tipico de las
# colas, en este ejempleo se emplea este pricipio para almacenar los datos de los estudiantes en el orden respectivo en el que se va matriculando.
# Es decir, si primero se agrega a Maria, en el paso de verificacion de la matricula se atendera a Maria, luego, en el registro de las notas de cada estudiante
# se registran los datos de Maria primeramente y despues de los demas.

from collections import deque

# importo deque para almacenar los datos de manera eficiente dentro de la clase Universidad 
# implemento 'append()' para agregar estidiantes y 'popleft()' para almacenarlos, de esta se hace correcto uso del principio FIFO 
# cada vez que se registra un estudiante dentro de la clase universidad con add_student, se le aplica appent para guardarlo como ultimo elemento sobre el
# siguiente estudiante de la cola.

# (def add_student(self, student):)
#   self.students.append(student)  <=== uso de 'append()'

# cuando se atienden los estudiantes, se utiliza el metodo 'popleft()' para atender a los estudiantes de primero al ultimo en el orden en el que fueron agregados
# mediante el metodo 'append()'

# def add_student(self, student):
#   self.students.append(student) <=== uso de 'popleft()'



from collections import deque

class Student:
    def __init__(self, name, enrollment_number):
        self.name = name
        self.enrollment_number = enrollment_number
        self.courses = []
        self.grades = []
    
    def add_course(self, course, grade):
        self.courses.append(course)
        self.grades.append(grade)
    
    def get_average(self):
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)

class University:
    def __init__(self):
        self.students = deque()
    
    def add_student(self, student):
        self.students.append(student)
    
    def attend_student(self):
        if len(self.students) > 0:
            student = self.students.popleft()
            print(f"Attending: {student.name} ({student.enrollment_number})")
            return student
        else:
            print("No students in the queue.")
            return None
    
    def generate_report(self):
        if len(self.students) == 0:
            print("No students registered.")
            return
        
        for student in self.students:
            print(f"Report for {student.name} ({student.enrollment_number}):")
            for i in range(len(student.courses)):
                print(f"- Course: {student.courses[i]}, Grade: {student.grades[i]}")
            print(f"Overall average: {student.get_average():.2f}")
            print("-" * 30)

university = University()

num_students = int(input("How many students do you want to register? "))

for _ in range(num_students):
    name = input("\nStudent name: ")
    enrollment_number = input("Student enrollment number: ")
    
    student = Student(name, enrollment_number)
    
    num_courses = int(input(f"How many courses is {name} taking? "))
    
    for _ in range(num_courses):
        course = input("Course name: ")
        grade = float(input(f"Grade for the course {course}: "))
        student.add_course(course, grade)
    
    university.add_student(student)

university.generate_report()

while True:
    continue_attending = input("\nDo you want to attend to a student? (y/n): ")
    if continue_attending.lower() == "y":
        university.attend_student()
    else:
        print("No more students to attend.")
        break
