import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Navbar from "./navbar";
import './custome.css';


const BranchList=()=>{ 
    const cors=require("cors");
    const [branchList,setBranchList]=useState([]); 
    
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
  useEffect(()=>{
    loadBranchList();
   },[])

const loadBranchList=async()=>{
const result=await axios.get(BASE_URL+"branchConfig");
   setBranchList(result.data);
}
    
    return(
		<div >	
      <div><Navbar/></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-5">	
      <a className="allowance-list" >Branch List</a>
           
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Branch Code</th>
                    <th scope="col">Branch Name</th>
                    <th scope="col">Branch Address</th>
                    <th scope="col">Upozila</th>
                    <th scope="col">District</th>
                    <th scope="col">Location</th>
                    <th scope="col">id</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Add</th>
                </tr>
             </thead>
            <tbody>
                {
                 branchList.map((d,index)=>{
                  return <tr  key={index}> 
                    <td>{d.branch_code}</td>                  
                    <td>{d.branch_name}</td>
                    <td>{d.brn_address_name}</td>
                    <td>{d.upozila}</td>
                    <td>{d.district}</td>
                    <td>{d.branch_location}</td>
                    <td>{d.id}</td>
                    <td><Link to={`/editBranch/${d.id}`}>Edit</Link></td>
                    <td> <Link to='/branchConfig'>Add </Link> </td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default BranchList;