
const Subject=require("../model/Subject");
const Student = require("../model/Student");


module.exports={
  
  //GET ALL STUDENTS
  students:async()=>{
    try {
      const students=await Student.find().populate('subjects');
      return students;
    } catch (error) {
      console.log(error.message);
    }
  },

  //Add Student with multiple subjects

  // createStudent:async(args)=>{
  //   try {
      
  //     let student;
  //     let filteredSubjects;
  //     let allSubs=[];
      
  //     let subNames=args.studentInput.subjects.map(el=>el.name);
      
  //     let subs=[];
  //     args.studentInput.subjects.forEach(el=>{
  //       el=JSON.parse(JSON.stringify(el))
  //       subs.push(el)
  //     })
      

  //     let subjects=await Subject.find();

  //     console.log(subjects)

  //     if(subjects.length===0){
  //       subjects= await Subject.insertMany(subs);

  //       let subIds=subjects.map(el=>el._id);

  //       args.studentInput={...args.studentInput,subjects}

  //       student = await Student.create(args.studentInput)

  //       subjects=await Subject.updateMany({_id:{$in:subIds}},{
  //         $push:{
  //           students:student._doc._id
  //         }
  //       })


  //       }
  //     else{

  //       studentSubjects=await Subject.find({name:{$in:subNames}});




  //       console.log(subs)
  //       args.studentInput.subjects=subs;

  //       // args.studentInput={...args.studentInput,subjects:subs}
        
  //       student = await Student.create(args.studentInput)

  //       studentSubjects=await Subject.find({name:{$in:subNames}});
        
  //       studentSubNames=studentSubjects.map(el=>el.name);

  //       let filterArr=[];
        
  //       subs.forEach(el=>{
  //         if(!studentSubNames.includes(el.name)){
  //           filterArr.push(el)
  //         }
  //       })

  //       if(filterArr.length>0){
  //         filteredSubjects= await Subject.insertMany(filterArr);

        
  //         subjects=await Subject.updateMany({name:{$in:subNames}},{
  //           $push:{
  //             students:student._doc._id
  //           }
  //         })
  //       }

  //       else{

  //         subjects=await Subject.updateMany({name:{$in:subNames}},{
  //           $push:{
  //             students:student._doc._id
  //           }
  //         })

  //       }

  //     }

  //     let createdStudent;
      
  //     createdStudent={
  //       ...student._doc,
  //       _id:student._doc._id,
  //       subjects:subjects
  //     }
      
      
  //     return student;

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // },


  createStudent:async(args)=>{
    try {
      const student= await Student.create(args.studentInput);
      return student;
    } catch (error) {
      console.log(error.message)
    }
  },

  editStudent:async(args)=>{
   try {
    args.editStudentInput=JSON.parse(JSON.stringify(args.editStudentInput))
    // console.log(args.editStudentInput)
    const id=args.editStudentInput.id;
    let student = await Student.findByIdAndUpdate(id,args.editStudentInput,{
      new: true,
      runValidators: true
    }).populate("subjects");

    return student
   } catch (error) {
     console.log(error.message)
   }
    

  },

  addSubjects:async(args)=>{
    
    try {
      let subjects=await Subject.find({name:{$in:args.addSubInput.subjects}});
    let studentId=args.addSubInput.studentId;
    let student= await Student.findByIdAndUpdate(studentId,{
      $set:{
        subjects:subjects
      }
    }).populate("subjects");

    editedSubjects=await Subject.updateMany({name:{$in:args.addSubInput.subjects}},{
      $push:{
        students:studentId
      }
    })
    // console.log(editedSubjects)
    
    student= await Student.findById(studentId).populate("subjects");
    
    return student;
    } catch (error) {
      console.log(error.message)
    }
  },

  deleteStudent:async(args)=>{
    try {
      const student= await Student.findById(args.id);

      await Student.deleteOne({_id:args.id})
      await Subject.updateMany({_id:{$in:student.subjects}},{
        $pull:{
          students:args.id
        }
      })
      
      return student;
    } catch (error) {
      console.log(error.message)
    }
  },




  // editStudent:async(args)=>{
  //   try {
  //     let subNames=args.editStudentInput.subjects.map(el=>el.name);
      
  //     // console.log(args.editStudentInput)
      
  //     let subs=[];
      
  //     args.editStudentInput.subjects.forEach(el=>{
  //       el=JSON.parse(JSON.stringify(el))
  //       subs.push(el)
  //     })
      
  //     // console.log(subs)

  //     let subjects=await Subject.find({name:{$in:subNames}})
      

  //     subNames=subjects.map(el=>el.name);

  //     subjects = subs.filter(el=> {
  //       return !subNames.includes(el.name);
  //     })
      
  //     // console.log(subjects)
      
     
  //     if(subjects){
  //       subjects= await Subject.insertMany(subjects);
  //     }
  //     console.log(subjects)

  //     const subIds=subjects.map(el=>el._id);


  //     args.editStudentInput={...args.editStudentInput,subjects}

  //     console.log(args.editStudentInput)

  //     let student = await Student.findByIdAndUpdate(args.editstudentInput.id,args.editStudentInput,{
  //       new: true,
  //       runValidators: true
  //     });

  //     console.log(student);

  //     subjects=await Subject.updateMany({_id:{$in:subIds}},{
  //       $push:{
  //         students:student._doc._id
  //       }
  //     })

      
      
  //     let createdStudent;
      
  //     createdStudent={
  //       ...student._doc,
  //       _id:student._doc._id,
  //       subjects:subjects
  //     }
      
      
  //     return student;
  //   } catch (error) {
  //     console.log(error.message)
  //   }

  // },

  subjects:async()=>{
    try {
      const subjects=await Subject.find().populate('students');
      return subjects
    } catch (error) {
      console.log(error.message)
    }
  },

  createSubject:async(args)=>{
    try {
     args.subjectInput=JSON.parse(JSON.stringify(args.subjectInput))
      const subject= await Subject.create(args.subjectInput);
      return subject;
    } catch (error) {
      console.log(error.message)
    }
  },

  editSubject:async(args)=>{
    try {
      const id=args.editSubjectInput.subjectId;
      const subject= await Subject.findByIdAndUpdate(id,{
        $set:{
          name:args.editSubjectInput.name
        }
      });
      return subject;
    } catch (error) {
      console.log(error.message)
    }
  },

  deleteSubject:async(args)=>{
    try {
      const subject= await Subject.findById(args.id);

      await Subject.deleteOne({_id:args.id})
      await Student.updateMany({_id:{$in:subject.students}},{
        $pull:{
          subjects:args.id
        }
      })
      
      return subject;
    } catch (error) {
      console.log(error.message)
    }
  }


}
