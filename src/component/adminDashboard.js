import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { NavDropdown } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import responseData from "./response";
import { BASE_URL } from "./config";

const AdminDashboard = () => {
  const navigat=useNavigate();
  const loginUser=localStorage.getItem("loggedUser");
  const [empList,setEmpList]=useState([]); 
  const {id}=useParams();
  const[result,setResult]=useState({
    success:'',
    errorMsg:'',
    content:''
   });
  
   useEffect(()=>{
    loadEmpList();
    },[])

const loadEmpList=async()=>{
const result=await axios.get(BASE_URL+"employee/empDetail/"+id);
   setEmpList(result.data);
  }
   function addLeave(){
    navigat("/Leave"); 
   }
   function empInfo(){
    navigat("/EmployementInfo"); 
   }
   function leaveInfo(){
    navigat("/LeaveInfo"); 
   }
   function leaveAproval(){
    navigat("/LeaveAproval"); 
   }

  function logout(){
    const result=axios.post(BASE_URL+"users/logout","")
        .then((result)=>{           
            if(result.data==responseData.LOGOUT) {
                Swal.fire(responseData.LOGOUT);  
                navigat("/");    
            }     
           }).catch((err) => {
            console.log(err)
        }) 
     }

  return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
    <a className="navbar-brand" href="#">Admin Dashboard</a>
    
    <NavDropdown title="Employee">
            <NavDropdown.Item onClick={empInfo}> Employement Information</NavDropdown.Item>
        </NavDropdown>
    <NavDropdown title="Leave Information">
            <NavDropdown.Item onClick={addLeave}>Leave Entry</NavDropdown.Item>
            <NavDropdown.Item onClick={leaveInfo}>Leave Information</NavDropdown.Item>
            <NavDropdown.Item onClick={leaveAproval}>Leave Aproval</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title={loginUser}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
    </NavDropdown>
   </div>
  </nav> 
  <div className="py-4">		
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
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>

  </div>
); 
};

export default AdminDashboard;