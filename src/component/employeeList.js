import React,{useEffect,useState} from "react";
import axios from "axios";

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
    const result=await axios.get("http://localhost:9006/employees/employeeList");
    console.log(result.data.content);
    setEmpList(result.data.content);
    }
    
    return(
		<div className="container">	
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Employee List</a>
        
        
        
       </div>
      </nav> 
			<div className="py-4">		
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">Designation</th>
                </tr>
             </thead>
            <tbody>
                {
                empList.map((emp,index)=>{
                  return <tr  key={index}> 
                    <td>{emp.empId}</td>                  
                    <td>{emp.name}</td>
                    <td>{emp.deptName}</td>
                    <td>{emp.emailAddress}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.designation}</td>
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