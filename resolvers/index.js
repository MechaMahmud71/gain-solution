
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

  //Add Students

  createStudent:async(args)=>{
    try {
      
      
      let subNames=args.studentInput.subjects.map(el=>el.name);
      
      let subs=[];
      args.studentInput.subjects.forEach(el=>{
        el=JSON.parse(JSON.stringify(el))
        subs.push(el)
      })
      

      let subjects=await Subject.find({name:{$in:subNames}})

      // console.log(subjects)

      subNames=subjects.map(el=>el.name);

      filteredSubjects = subs.filter(el=> {
        return !subNames.includes(el.name);
      })
      
      
      let subIds=[]
      console.log(filteredSubjects.length)
      
      if(filteredSubjects.length>0){
        filteredSubjects= await Subject.insertMany(filteredSubjects);
        subIds=filteredSubjects.map(el=>el._id);
      }
      // console.log(subjects)

      subIds=subjects.map(el=>el._id);

      // console.log(subjects)

      args.studentInput={...args.studentInput,subjects}

      // console.log(args.studentInput);
      let student = await Student.create(args.studentInput);

      console.log(student);

      subjects=await Subject.updateMany({_id:{$in:subIds}},{
        $push:{
          students:student._doc._id
        }
      })

      
      
      let createdStudent;
      
      createdStudent={
        ...student._doc,
        _id:student._doc._id,
        subjects:subjects
      }
      
      
      // return student;

    } catch (error) {
      console.log(error.message)
    }
  },


  editStudent:async(args)=>{
    try {
      let subNames=args.editStudentInput.subjects.map(el=>el.name);
      
      // console.log(args.editStudentInput)
      
      let subs=[];
      
      args.editStudentInput.subjects.forEach(el=>{
        el=JSON.parse(JSON.stringify(el))
        subs.push(el)
      })
      
      // console.log(subs)

      let subjects=await Subject.find({name:{$in:subNames}})
      

      subNames=subjects.map(el=>el.name);

      subjects = subs.filter(el=> {
        return !subNames.includes(el.name);
      })
      
      // console.log(subjects)
      
     
      if(subjects){
        subjects= await Subject.insertMany(subjects);
      }
      console.log(subjects)

      const subIds=subjects.map(el=>el._id);


      args.editStudentInput={...args.editStudentInput,subjects}

      console.log(args.editStudentInput)

      let student = await Student.findByIdAndUpdate(args.editstudentInput.id,args.editStudentInput,{
        new: true,
        runValidators: true
      });

      console.log(student);

      subjects=await Subject.updateMany({_id:{$in:subIds}},{
        $push:{
          students:student._doc._id
        }
      })

      
      
      let createdStudent;
      
      createdStudent={
        ...student._doc,
        _id:student._doc._id,
        subjects:subjects
      }
      
      
      return student;
    } catch (error) {
      console.log(error.message)
    }

  }

}
