import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import responseData from "./response";
import { BASE_URL } from "./config";

const LeavePolicy=()=>{
    const navigat=useNavigate();
    const[leavePolicy,setLeavePolicy]=useState({ 
        sickLeave:'',
        casualLeave:'',
        earnedLeave:'',
        year:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
    });

    const [errors, setErrors] = useState({});
         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(leavePolicy.sickLeave==''){
            validationerror.sickLeave="Sick Leave is Required"; 
        }
        if(leavePolicy.casualLeave==''){
            validationerror.casualLeave="Casual Leave is Required"; 
        }
        if(leavePolicy.earnedLeave==''){
            validationerror.earnedLeave="Earned Leave is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            axios.post(BASE_URL+"leavePolicy",leavePolicy)
            .then((result)=>{ 
                if(result.data==responseData.INSERT_SUCCESS) {
                    Swal.fire(responseData.INSERT_SUCCESS); 
                    navigat("/HolidayList"); 
                }
                if(result.data==responseData.INSERT_FAILURE) {
                    Swal.fire(responseData.INSERT_FAILURE);  
                }   
                
               }).catch((err) => {
                console.log(err);
            })   
            setLeavePolicy({ 
                sickLeave:'',
                casualLeave:'',
                earnedLeave:'',
                year:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setLeavePolicy({
          ...leavePolicy,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Sick Leave</label>
            <input className="form-control" type="text"  name="sickLeave" value={leavePolicy.sickLeave} 
             onChange={handleOnchange} />
       {errors.sickLeave && <span>{errors.sickLeave}</span>}
        </div>           
           
         <div className="col-md-20">
             <label>Casual Leave</label>
      <input className="form-control" type="text" name="casualLeave" value={leavePolicy.casualLeave} 
         onChange={handleOnchange} />
       {errors.casualLeave && <span>{errors.casualLeave}</span>}
        </div> 

        <div className="col-md-20">
             <label>Earned Leave</label>
      <input className="form-control" type="text" name="earnedLeave" value={leavePolicy.earnedLeave} 
         onChange={handleOnchange} />
       {errors.earnedLeave && <span>{errors.earnedLeave}</span>}
        </div> 

        <div className="col-md-20">
            <label>Year</label>
            <select className="form-select" onChange={handleOnchange} name="year" value={leavePolicy.year}>
             <option value="">Select</option>
             <option value="2023">2023</option>
             <option value="2024">2024</option>
             <option value="2025">2025</option>
             <option value="2026">2026</option>
             <option value="2027">2027</option>
             <option value="2028">2028</option>
             <option value="2029">2029</option>
             <option value="2030">2030</option>
             <option value="2031">2031</option>
             <option value="2032">2032</option>
             <option value="2033">2033</option>
             <option value="2033">2033</option>
             <option value="2034">2034</option>
             <option value="2035">2035</option>
            </select>
       {errors.year && <span>{errors.year}</span>}
        </div> 
    
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default LeavePolicy;  