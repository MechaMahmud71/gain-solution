import React, { useEffect, useState } from 'react';
import Table from './Table';

const Dashboard = () => {
  const [students,setStudents]=useState([]);
  // const [subject,setsubject]=useState=([]);
  
  useEffect(()=>{
    getStudents();
  },[])


  const getStudents=async()=>{
    const gql={
      query:`
      query{
        students{
          _id
          name
          phone
          dateOfBirth
          email
          subjects{
            _id
            name
          }
          
        }
      }
      `
    }
    try {
      const queryString=JSON.stringify(gql);
    // console.log(queryString)
    const response=await fetch("http://localhost:5000/graphql",{
      method:"POST",
      body:queryString,
      headers:{
        'Content-Type':'application/json'
      }
    })

    const {data:{students}}= await response.json();
    setStudents(students);
    } catch (error) {
      console.log(error.message)
    }
  }

  const studentTableDOM=students.map((el,index)=><Table value={el} key={index+1}/>)


  return (
    <> 
      <h2 className="student-table-heading">Students</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Subjects</th>
            <th scope="col">Remarks</th>
          </tr>
        </thead>
        {studentTableDOM}
      </table>
    </>
  )
}

export default Dashboard
