
import { Link} from "react-router-dom";
import useHistory from "react-router-dom";
import AddUser from "./addUsers";
import AddEmployee from "./addEmployee";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect,useState} from "react";
import { BASE_URL } from "./config";

const Navbar=()=>{
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
   
  const [auth,setAuth]= useState(false);
    
 useEffect(()=>{
    axios.get("")
    .then((result)=>{   
    if(result.data=='success'){
        setAuth(true);
        Swal.fire("You are authorized"); 
    }      
    else{
        setAuth(false);
        Swal.fire("You are not authorized"); 
        navigat("/"); 
    }
       }).catch((err) => {
        console.log(err)
    }) 
   },[]);


function logout(){
    const result=axios.post(BASE_URL+"users/logout","")
        .then((result)=>{           
            if(result.data=='Successfully Logout') {
                Swal.fire(result.data);  
                navigat("/");    
            }    
              
           }).catch((err) => {
            console.log(err)
        }) 
}
function addEmployees(){
    navigat("/EmployeeList"); 
}
function newEmployeeAdd(){
    navigat("/AddEmployee"); 
}
function userAdd(){
    navigat("/UserList"); 
}
 
function addLeave(){
    navigat("/Leave"); 
}
function addAllowance(){
    navigat("/AllowanceList"); 
}
 
function addBranch(){
    navigat("/BranchList");  
}
function empTransfer(){
    navigat("/EmpTransfer"); 
}
function addHoliday(){
    navigat("/HolidayList");  
}
function salaryGen(){
    navigat("/SalaryProcess"); 
}
function fundTran(){
    navigat("/FundTransfer"); 
}
function changePassword(){
    navigat("/UserPassChange"); 
}
function addLeavePolicy(){
    navigat("/LeavePolicyList"); 
}
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        
        <NavDropdown title="Salary Disbursement">
        <NavDropdown.Item onClick={salaryGen}>Salary Generate</NavDropdown.Item> 
        <NavDropdown.Item onClick={fundTran}>Fund Transfer</NavDropdown.Item> 
        </NavDropdown>
        <NavDropdown title="Employee">
            <NavDropdown.Item onClick={addEmployees}> Employee List</NavDropdown.Item>
            <NavDropdown.Item onClick={newEmployeeAdd}>Add Employee</NavDropdown.Item>
            <NavDropdown.Item onClick={empTransfer}>Employee Transfer</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Leave Information">
            <NavDropdown.Item onClick={addLeave}>Leave Entry</NavDropdown.Item>
            <NavDropdown.Item onClick={addLeavePolicy}>Leave Policy</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Configuration">
            <NavDropdown.Item onClick={addAllowance}>Allowance Setup</NavDropdown.Item>
            
            <NavDropdown.Item onClick={addBranch}>Branch Setup</NavDropdown.Item>
            <NavDropdown.Item onClick={addHoliday}>Monthly Holiday Setup</NavDropdown.Item>
            <NavDropdown.Item onClick={userAdd}>Add User</NavDropdown.Item>
            <NavDropdown.Item onClick={changePassword}>User Password Change</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title={loginUser}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
       </div>
      </nav> 
        
      </div>
    );   
};

export default Navbar;