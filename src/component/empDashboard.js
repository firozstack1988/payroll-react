import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { NavDropdown } from "react-bootstrap";
import {useParams} from 'react-router-dom';

const EmpDashboard = () => {
  const navigat=useNavigate();
  const loginUser=localStorage.getItem("loggedUser");
  const [empList,setEmpList]=useState([]); 
  
  const[result,setResult]=useState({
    success:'',
    errorMsg:'',
    content:''
});
   

  function logout(){
    const result=axios.post("http://localhost:9005/users/logout","")
        .then((result)=>{           
            if(result.data.success=='Successfully Logout') {
                Swal.fire(result.data.success);  
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
    <a className="navbar-brand" href="#">Employee Dashboard</a>
    
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
};

export default EmpDashboard;