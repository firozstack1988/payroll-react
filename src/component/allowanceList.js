import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Navbar from "./navbar";
import './custome.css';


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
const result=await axios.get(BASE_URL+"allowance");
console.log(result.data.content);
setSalaryAllowanceList(result.data);
}
    
    return(
		<div >	
      <div><Navbar/></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-5">	
      <a className="allowance-list" >Salary Allowance List</a>	
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">House Rent</th>
                    <th scope="col">Medical Allowance</th>
                    <th scope="col">Transport Allowance</th>
                    <th scope="col">Lunch</th>
                    <th scope="col">City Allowance</th>
                    <th scope="col">Provident Fund</th>
                    <th scope="col">Credit Allowance</th>
                    <th scope="col">id</th>
                    <th scope="col">Action</th>
                </tr>
             </thead>
            <tbody>
                {
                salaryAllowanceList.map((emp,index)=>{
                  return <tr  key={index}> 
                    <td>{emp.house_rent}</td>                  
                    <td>{emp.medical}</td>
                    <td>{emp.transport}</td>
                    <td>{emp.lunch}</td>
                    <td>{emp.city_allowance}</td>
                    <td>{emp.provident_fund}</td>
                    <td>{emp.credit_allowance}</td>
                    <td>{emp.id}</td>
                  
                    <td><Link to={`/editAllowance/${emp.id}`}>Edit</Link></td>
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