
import { Link} from "react-router-dom";
import useHistory from "react-router-dom";
import AddUser from "./addUsers";
import AddEmployee from "./addEmployee";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Navbar=()=>{
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
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
function addEmployees(){
    navigat("/AddEmployee"); 
}
function userAdd(){
    navigat("/AddUsers"); 
}
function empList(){
    navigat("/EmployeeList"); 
}
function addLeave(){
    navigat("/Leave"); 
}
function addAllowance(){
    navigat("/Allowance"); 
}
function addBranch(){
    navigat("/BranchConfig");  
}
function empTransfer(){
    navigat("/EmpTransfer"); 
}
function addHoliday(){
    navigat("/AddHolidays");  
}
function salaryGen(){
    navigat("/SalaryProcess"); 
}
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        
        <NavDropdown title="Salary Disbursement">
        <NavDropdown.Item onClick={salaryGen}>Salary Generate</NavDropdown.Item> 
        </NavDropdown>
        <NavDropdown title="Employee">
            <NavDropdown.Item onClick={addEmployees}>Add Employee</NavDropdown.Item>
            <NavDropdown.Item onClick={empList}>Employee List</NavDropdown.Item>
            <NavDropdown.Item onClick={empTransfer}>Employee Transfer</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Leave Information">
            <NavDropdown.Item onClick={addLeave}>Leave Entry</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Configuration">
            <NavDropdown.Item onClick={addAllowance}>Allowance Setup</NavDropdown.Item>
            <NavDropdown.Item onClick={addBranch}>Branch Setup</NavDropdown.Item>
            <NavDropdown.Item onClick={addHoliday}>Monthly Holiday Setup</NavDropdown.Item>
            <NavDropdown.Item onClick={userAdd}>Add User</NavDropdown.Item>
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