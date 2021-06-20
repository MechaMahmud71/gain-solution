const { buildSchema } = require('graphql');

module.exports=buildSchema(`
type Student {
  _id: ID!
  name:String!
  email:String!
  phone:String!
  dateOfBirth:String!
  subjects:[Subject]
}

input SubjectInput {
  name:String!
}

input StudentInput {
  name:String!
  email:String!
  phone:String!
  dateOfBirth:String!
  subjects:[SubjectInput]
}

input EditStudentInput{
  id:ID!
  name:String!
  email:String!
  phone:String!
  dateOfBirth:String!
  subjects:[SubjectInput]
}



type Subject{
  _id:ID
  name:String!
  students:[Student]
}



type RootQuery {
    students: [Student!]!
    student(id:ID!):Student
    subjects:[Subject!]!
    subject(id:ID!):Subject
}



type RootMutation {
    createSubject(subjectInput: SubjectInput): Subject
    createStudent(studentInput: StudentInput): Student
    editSubject(subjectInput: SubjectInput): Subject
    editStudent(editStudentInput: EditStudentInput): Student
    deleteStudent(id:ID!):Student
    deleteSubject(id:ID!):Subject
    
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`) 