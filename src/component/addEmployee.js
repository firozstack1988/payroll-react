import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import responseData from "./response";
import { BASE_URL } from "./config";
import Navbar from "./navbar";

const AddEmployee=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
    const[employee,setEmployee]=useState({ 
        createdby:loginUser,
        empId:'',
        name:'',
        deptName:'',
        emailAddress:'',
        mobileNo:'',
        designation:'',
        branchCode:'',
        basicAmt:'',
        supervision:'',
    });
    const[result,setResult]=useState({
        status:'',
        message:'',
        content:'',
    });

    const [errors, setErrors] = useState({});
         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(!employee.name.trim()){
            validationerror.name="User Name is Required"; 
        }
        if(!employee.empId.trim()){
            validationerror.empId="User Id is Required"; 
        }
        if(!employee.deptName.trim()){
            validationerror.deptName="Department is Required"; 
        }
        if(!employee.mobileNo.trim()){
            validationerror.mobileNo="Mobile No is Required"; 
        }
        if(!employee.designation.trim()){
            validationerror.designation="Designation is Required"; 
        }
        if(!employee.basicAmt.trim()){
            validationerror.basicAmt="Basic Amount is Required"; 
        }
        if(!employee.branchCode.trim()){
            validationerror.branchCode="Branch Code is Required"; 
        }
        if(!employee.emailAddress.trim()){
            validationerror.emailAddress="Email is Required"; 
        }
       else if(!/\S+@\S+\.+/.test(employee.emailAddress)){
            validationerror.emailAddress="Invalid Email"; 
        }

        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            axios.post(BASE_URL+"employee",employee)
            .then((result)=>{ 
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                    navigat("/employeeList"); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) 
                    Swal.fire(result.data.message); 
                if(result.data==responseData.DUPLICATE_EMPID) 
                    Swal.fire(responseData.DUPLICATE_EMPID);    
                
               }).catch((err) => {
                console.log(err);
            })   
            setEmployee({ 
                empId:'',
                name:'',
                deptName:'',
                emailAddress:'',
                mobileNo:'',
                designation:'',
                branchCode:'',
                basicAmt:'',
                supervision:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setEmployee({
          ...employee,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     <div>
         <div><Navbar/></div>
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
       
        <div className="col-md-20">
            <label>Employee Id</label>
      <input className="form-control" type="text" 
       name="empId" value={employee.empId} onChange={handleOnchange} />
       {errors.empId && <span>{errors.empId}</span>}
        </div> 

        <div className="col-md-20">
            <label>Employee Name</label>
      <input className="form-control" type="text" 
       name="name" value={employee.name} onChange={handleOnchange} />
       {errors.name && <span>{errors.name}</span>}
        </div>           
           
        <div className="col-md-20">
            <label>Department</label>            
            <select className="form-select" onChange={handleOnchange} name="deptName" value={employee.deptName}>
             <option value="">Select</option>
             <option value="Human-Resource">Human-Resource</option>
             <option value="Management">Management</option>
             <option value="Information-Technology">Information-Technology</option>
             <option value="Accounts">Accounts</option>
             <option value="Audit">Audit</option>
            </select>
            {errors.deptName && <span>{errors.deptName}</span>}
        </div>

        <div className="col-md-20">
        <label>Email Addess</label>
      < input className="form-control" type="text"  name="emailAddress" value={employee.emailAddress} onChange={handleOnchange}/>
      {errors.emailAddress && <span>{errors.emailAddress}</span>}
        </div>
        <div className="col-md-20">
        <label>Mobile No</label>
      < input className="form-control" type="text" name="mobileNo" value={employee.mobileNo} onChange={handleOnchange}/>
        {errors.mobileNo && <span>{errors.mobileNo}</span>}
        </div>
         
        <div className="col-md-20">
            <label>Branch Code</label>
            <input className="form-control" type="text"  name="branchCode" 
            value={employee.branchCode} onChange={handleOnchange}/>
            {errors.branchCode && <span>{errors.branchCode}</span>}
        </div>
        <div className="col-md-20">
            <label>Basic Amount</label>
            <input className="form-control" type="text"  name="basicAmt" 
            value={employee.basicAmt} onChange={handleOnchange}/>
            {errors.basicAmt && <span>{errors.basicAmt}</span>}
        </div>

        <div className="col-md-20">
            <label>Designation</label>
            <select className="form-select" onChange={handleOnchange} name="designation" value={employee.designation}>
             <option value="">Select</option>
             <option value="BRANCH ADMIN">BRANCH ADMIN</option>
             <option value="AREA ADMIN">AREA ADMIN</option>
             <option value="SUPER ADMIN">SUPER ADMIN</option>
             <option value="FIELD WORKER">FIELD WORKER</option>
             <option value="AUDIT OFFICER">AUDIT OFFICER</option>
             <option value="IT OFFICER">IT OFFICER</option>
            </select>
            {errors.designation && <span>{errors.designation}</span>}
        </div>

        <div className="col-md-20">
            <label>Super Visor</label>            
            <select className="form-select" onChange={handleOnchange} name="supervision" value={employee.supervision}>
             <option value="">Select</option>
             <option value="BRANCH ADMIN">BRANCH ADMIN</option>
             <option value="AREA ADMIN">AREA ADMIN</option>
             <option value="SUPER ADMIN">SUPER ADMIN</option>
            </select>
            {errors.supervision && <span>{errors.supervision}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
        </div>
        
        </form> 
        </div>
        </div>      
    );
}

export default AddEmployee;  