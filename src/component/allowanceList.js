import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
const AllowanceList=()=>{ 
    const cors=require("cors");
    const [salaryAllowanceList,setSalaryAllowanceList]=useState([]); 
    
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
  useEffect(()=>{
    loadAllowanceList();
   },[])

const loadAllowanceList=async()=>{
const result=await axios.get("http://localhost:9005/allowance/allowanceList");
console.log(result.data.content);
setSalaryAllowanceList(result.data.content);
}
    
    return(
		<div className="container">	
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Salary Allowance List</a>
        
        
        
       </div>
      </nav> 
			<div className="py-4">		
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">House Rent</th>
                    <th scope="col">Medical Allowance</th>
                    <th scope="col">Transport Allowance</th>
                    <th scope="col">Lunch</th>
                    <th scope="col">City Allowance</th>
                    <th scope="col">Provdent Fund</th>
                    <th scope="col">Credit Allowance</th>
                    <th scope="col">Action</th>
                </tr>
             </thead>
            <tbody>
                {
                salaryAllowanceList.map((emp,index)=>{
                  return <tr  key={index}> 
                    <td>{emp.houseRent}</td>                  
                    <td>{emp.medical}</td>
                    <td>{emp.transport}</td>
                    <td>{emp.lunch}</td>
                    <td>{emp.cityAllowance}</td>
                    <td>{emp.providentFund}</td>
                    <td>{emp.creditAllowance}</td>
                    <td>{emp.id}</td>
                  
                    <td><Link to="/allowance">Edit</Link></td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default AllowanceList;