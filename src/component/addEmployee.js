import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
const AddEmployee=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[employee,setEmployee]=useState({ 
        name:'',
        deptName:'',
        emailAddress:'',
        mobileNo:'',
        designation:'',
        branchCode:'',
        basicAmt:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
        content:'',
        generatedSerial:''
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
            const result=axios.post("http://localhost:9006/employees/addEmployee",employee)
            .then((result)=>{ 
                if(result.data.success=='Successfully Added') {
                    Swal.fire(result.data.success);  
                    navigat("/Navbar"); 
                }
                else{
                    console.log(result.data.errorMsg);
                    Swal.fire(result.data.errorMsg);   
                }   
                
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
                basicAmt:''
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
            <input className="form-control" type="text"  name="designation" value={employee.designation} onChange={handleOnchange}/>
            {errors.designation && <span>{errors.designation}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default AddEmployee;  