import React,{useEffect,useState} from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import {Link} from 'react-router-dom';
import Navbar from "./navbar";

const EmployeeList=()=>{
    const cors=require("cors");
    const [empList,setEmpList]=useState([]); 
    
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
    useEffect(()=>{
        loadEmpList();
    },[])

    const loadEmpList=async()=>{
    const result=await axios.get(BASE_URL+"employee");
    setEmpList(result.data);
    }
    
    return(
      <div>
         <div><Navbar/></div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
       
			<div className="py-5">		
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Branch Code</th>
                    <th scope="col">Department</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Add</th>
                </tr>
             </thead>
            <tbody>
                {
                empList.map((emp,index)=>{
                  return <tr  key={index}> 
                    <td>{emp.emp_id}</td>                  
                    <td>{emp.name}</td>
                    <td>{emp.branch_code}</td>
                    <td>{emp.dept_name}</td>
                    <td>{emp.email_address}</td>
                    <td>{emp.mobile_no}</td>
                    <td>{emp.emp_designation}</td>
                    <td>{emp.id}</td>
                    <td><Link to={`/editEmployee/${emp.id}`}>Edit</Link></td>
                    <td> <Link to='/addEmployee'>Add </Link> </td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		 
	</div>
    );
}
export default EmployeeList;