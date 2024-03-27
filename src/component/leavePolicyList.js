import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Navbar from "./navbar";
import './custome.css';


const LeavePolicyList=()=>{ 
    const [leavePolicyList,setLeavePolicyList]=useState([]); 
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
  useEffect(()=>{
    loadLeavePolicyList();
   },[])

    const loadLeavePolicyList=async()=>{
    const result=await axios.get(BASE_URL+"leavePolicy");
    setLeavePolicyList(result.data);
}
    
    return(
		<div >	
      <div><Navbar/></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-5">	
      <a className="allowance-list" >Leave Policy</a>
           
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Sick Leave</th>
                    <th scope="col">Casual Leave</th>
                    <th scope="col">Earned Leave</th>
                    <th scope="col">Year</th>
                    <th scope="col">id</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Add</th>
                </tr>
             </thead>
            <tbody>
                {
                 leavePolicyList.map((d,index)=>{
                  return <tr  key={index}> 
                    <td>{d.sick_leave}</td>                  
                    <td>{d.casual_leave}</td>
                    <td>{d.earned_leave}</td>
                    <td>{d.year}</td>
                    <td>{d.id}</td>
                    <td><Link to={`/editLeavePolicy/${d.id}`}>Edit</Link></td>
                    <td> <Link to='/leavePolicy'>Add </Link> </td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default LeavePolicyList;