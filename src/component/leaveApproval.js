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

const LeaveAproval=()=>{
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
    const {id}=useParams();
    const {fromDate}=useParams();
    const {toDate}=useParams();
    const {leaveType}=useParams();
    const[leaveAproval,setLeaveAproval]=useState({ 
        employeeId:loginUser,
        leaveAppliedId:id,
        fromDate:fromDate,
        toDate:toDate,
        leaveType:leaveType,
        leaveStatus:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
    });

    const [errors, setErrors] = useState({});
         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(leaveAproval.employeeId==''){
            validationerror.employeeId="Employee Id is Required"; 
        }
        if(leaveAproval.leaveAppliedId==''){
            validationerror.leaveAppliedId="Leave Applied id is Required"; 
        }
        if(leaveAproval.fromDate==''){
            validationerror.fromDate="From Date is Required"; 
        }
        if(leaveAproval.toDate==''){
            validationerror.toDate="To Date is Required"; 
        }
        
        if(leaveAproval.leaveStatus==''){
            validationerror.leaveStatus="Aproval status is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
             axios.post(BASE_URL+"leave/leaveAprovedData",leaveAproval)
            .then((result)=>{ 
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) 
                    Swal.fire(result.data.message); 

               }).catch((err) => {
                console.log(err);
            })   
            setLeaveAproval({ 
                employeeId:'',
                leaveAppliedId:'',
                fromDate:'',
                toDate:'',
                leaveType:'',
                leaveStatus:'',
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setLeaveAproval({
          ...leaveAproval,
          [event.target.name]:event.target.value
      });
    }
 
 const handleFromDate=(e)=>{
     setLeaveAproval({...leaveAproval,
          [e.target.name]:e.target.value});    
  }
   const handleToDate=(e)=>{
     setLeaveAproval({
          ...leaveAproval,
          [e.target.name]:e.target.value});    
  }
    
    return(    
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Employee Id</label>
      <input className="form-control" type="text" readonly="true"
       name="employeeId" value={leaveAproval.employeeId} onChange={handleOnchange} />
       {errors.employeeId && <span>{errors.employeeId}</span>}
        </div>           
       
        <div className="col-md-20">
        <label>Leave Applied Id</label>
      < input className="form-control" type="text"  readonly="true" name="leaveAppliedId" value={leaveAproval.leaveAppliedId} onChange={handleOnchange}/>
         {errors.leaveAppliedId && <span>{errors.leaveAppliedId}</span>}
        </div>
        <div className="col-md-20">
        <label>From Date</label>
      < input type="date"  readonly="true" name="fromDate" value={leaveAproval.fromDate} className="form-control"
           onChange={(e)=>handleFromDate(e)}/>
        {errors.fromDate && <span>{errors.fromDate}</span>}
        </div>
        
        <div className="col-md-20">
            <label>To Date</label>
            <input className="form-control" type="date" readonly="true"  name="toDate" value={leaveAproval.toDate} onChange={(e)=>handleFromDate(e)}/>
            {errors.toDate && <span>{errors.toDate}</span>}
        </div>
        <div className="col-md-20">
            <label>Leave Type</label>
            <input className="form-control" type="text" readonly="true" name="leaveType" value={leaveAproval.leaveType} onChange={(e)=>handleFromDate(e)}/>
            {errors.leaveType && <span>{errors.leaveType}</span>}
        </div>

        <div className="col-md-20">
            <label>Aproval Status</label>            
            <select className="form-select" onChange={handleOnchange} name="leaveStatus" value={leaveAproval.leaveStatus}>
             <option value="">Select</option>
             <option value="APPROVED">APPROVED</option>
             <option value="REJECTED">REJECTED</option>
            </select>
            {errors.leaveStatus && <span>{errors.leaveStatus}</span>}
        </div>
  
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
            <span> </span><button  onClick={() => navigat(-1)}>Go back</button>
        </div>
        </form> 
        </div>       
    );
}

export default LeaveAproval;  