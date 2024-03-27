import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Navbar from "./navbar";
import './custome.css';


const UserList=()=>{ 
    const cors=require("cors");
    const [userList,setUserList]=useState([]); 
    
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
  useEffect(()=>{
    loadUserList();
   },[])

const loadUserList=async()=>{
const result=await axios.get(BASE_URL+"users");
   setUserList(result.data);
}
    
    return(
		<div >	
      <div><Navbar/></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-5">	
      <a className="allowance-list" >User List</a>
           
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Role</th>
                    <th scope="col">User Type</th>
                    <th scope="col">id</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Add</th>
                </tr>
             </thead>
            <tbody>
                {
                 userList.map((d,index)=>{
                  return <tr  key={index}> 
                    <td>{d.login_user}</td>                  
                    <td>{d.user_name}</td>
                    <td>{d.user_role}</td>
                    <td>{d.user_type}</td>
                    <td>{d.id}</td>
                    <td><Link to={`/editUser/${d.id}`}>Edit</Link></td>
                    <td> <Link to='/addUsers'>Add </Link> </td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default UserList;