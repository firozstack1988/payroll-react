import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
const EmpTransfer=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[empTransfer,setEmpTransfer]=useState({ 
        employeeId:'',
        currentBrnName:'',
        transferedBrnName:'',
        designation:''
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
        if(!empTransfer.employeeId.trim()){
            validationerror.employeeId="Employee id is Required"; 
        }
        if(!empTransfer.currentBrnName.trim()){
            validationerror.currentBrnName="Current Branch Name is Required"; 
        }
        if(!empTransfer.transferedBrnName.trim()){
            validationerror.transferedBrnName="Transfered Branch is Required"; 
        }
        if(!empTransfer.designation.trim()){
            validationerror.designation="Designation is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post("http://localhost:9006/empTransfer/addTransfer",empTransfer)
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
            setEmpTransfer({ 
                employeeId:'',
                currentBrnName:'',
                transferedBrnName:'',
                designation:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setEmpTransfer({
          ...empTransfer,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Employee Id</label>
      <input className="form-control" type="text" 
       name="employeeId" value={empTransfer.employeeId} onChange={handleOnchange} />
       {errors.employeeId && <span>{errors.employeeId}</span>}
        </div>           
           
         <div className="col-md-20">
            <label>Current Branch Name</label>
      <input className="form-control" type="text" 
       name="currentBrnName" value={empTransfer.currentBrnName} onChange={handleOnchange} />
       {errors.currentBrnName && <span>{errors.currentBrnName}</span>}
        </div> 

        <div className="col-md-20">
        <label>Transfered Branch Name</label>
      < input className="form-control" type="text"  name="transferedBrnName" 
      value={empTransfer.transferedBrnName} onChange={handleOnchange}/>
      {errors.transferedBrnName && <span>{errors.transferedBrnName}</span>}
        </div>
        <div className="col-md-20">
        <label>Designation</label>
      < input className="form-control" type="text" name="designation" 
        value={empTransfer.designation} onChange={handleOnchange}/>
        {errors.designation && <span>{errors.designation}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default EmpTransfer;  