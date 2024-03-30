import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "./config";
import {useParams} from 'react-router-dom';
import responseData from "./response";

const Leave=()=>{
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
    const[leave,setLeave]=useState({ 
        employeeId:loginUser,
        leaveType:'',
        leaveReason:'',
        fromDate:'',
        toDate:'',
        numberOfDays:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
    });

    const [errors, setErrors] = useState({});
         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(!leave.employeeId.trim()){
            validationerror.employeeId="Employee Id is Required"; 
        }
        if(!leave.leaveType.trim()){
            validationerror.leaveType="Leave Type is Required"; 
        }
        if(!leave.leaveReason.trim()){
            validationerror.leaveReason="Leave Reason is Required"; 
        }
        if(!leave.fromDate.trim()){
            validationerror.fromDate="From Date is Required"; 
        }
        if(!leave.toDate.trim()){
            validationerror.toDate="To Date is Required"; 
        }
        if(!leave.numberOfDays.trim()){
            validationerror.numberOfDays="Number of Leave is Required"; 
        }

        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
             axios.post(BASE_URL+"leave",leave)
            .then((result)=>{ 
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                    navigat("/LeaveInfo/"+loginUser); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) 
                    Swal.fire(result.data.message); 

               }).catch((err) => {
                console.log(err);
            })   
            setLeave({ 
                employeeId:'',
                leaveType:'',
                leaveReason:'',
                fromDate:'',
                toDate:'',
                numberOfDays:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setLeave({
          ...leave,
          [event.target.name]:event.target.value
      });
    }
 
 const handleFromDate=(e)=>{
     setLeave({...leave,
          [e.target.name]:e.target.value});    
  }
   const handleToDate=(e)=>{
     setLeave({
          ...leave,
          [e.target.name]:e.target.value});    
  }
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Employee Id</label>
      <input className="form-control" type="text" 
       name="employeeId" value={leave.employeeId} onChange={handleOnchange} />
       {errors.employeeId && <span>{errors.employeeId}</span>}
        </div>           
           
        <div className="col-md-20">
            <label>Leave Type</label>            
            <select className="form-select" onChange={handleOnchange} name="leaveType" value={leave.leaveType}>
             <option value="">Select</option>
             <option value="Sick Leave">Sick-Leave</option>
             <option value="Casual Leave">Casual-Leave</option>
             <option value="Earned Leave">Earned-Leave</option>
            </select>
            {errors.leaveType && <span>{errors.leaveType}</span>}
        </div>

        <div className="col-md-20">
        <label>Leave Reason</label>
      < input className="form-control" type="text"  name="leaveReason" value={leave.leaveReason} onChange={handleOnchange}/>
      {errors.leaveReason && <span>{errors.leaveReason}</span>}
        </div>
        <div className="col-md-20">
        <label>From Date</label>
      < input type="date"  name="fromDate" value={leave.fromDate} className="form-control"
           onChange={(e)=>handleFromDate(e)}/>
        {errors.fromDate && <span>{errors.fromDate}</span>}
        </div>
         
        <div className="col-md-20">
            <label>To Date</label>
            <input className="form-control" type="date"  name="toDate" value={leave.toDate} onChange={(e)=>handleFromDate(e)}/>
            {errors.toDate && <span>{errors.toDate}</span>}
        </div>

         
        <div className="col-md-20">
            <label>Number Of Leave</label>
            <input className="form-control" type="text"  name="numberOfDays" value={leave.numberOfDays} onChange={handleOnchange}/>
            {errors.numberOfDays && <span>{errors.numberOfDays}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default Leave;  