import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import responseData from "./response";
import { BASE_URL } from "./config";

const SalaryProcess=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[salaryProcess,setSalaryProcess]=useState({ 
        month:'',
        year:''
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
        if(!salaryProcess.month.trim()){
            validationerror.month="Month is Required"; 
        }
        if(!salaryProcess.year.trim()){
            validationerror.year="Year is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            localStorage.setItem("year",salaryProcess.year);
            localStorage.setItem("month",salaryProcess.month);
            const result=axios.post(BASE_URL+"salaryProcess",salaryProcess)
            .then((result)=>{ 
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                    navigat("/MonthlySalarySheet/"+salaryProcess.year+"/"+salaryProcess.month); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) {
                    Swal.fire(result.data.message); 
                    navigat("/MonthlySalarySheet/"+salaryProcess.year+"/"+salaryProcess.month); 
                }
               }).catch((err) => {
                console.log(err);
            })   
            setSalaryProcess({ 
                month:'',
                year:''
            }); 
        }         
    } 
    const handleOnchange=(event)=>{
        setSalaryProcess({
          ...salaryProcess,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Month Name</label>
            <select className="form-select" onChange={handleOnchange} 
            name="month" value={salaryProcess.month}>
             <option value="">Select</option>
             <option value="January">January</option>
             <option value="February">February</option>
             <option value="March">March</option>
             <option value="April">April</option>
             <option value="May">May</option>
             <option value="June">June</option>
             <option value="July">July</option>
             <option value="August">August</option>
             <option value="September">September</option>
             <option value="October">October</option>
             <option value="November">November</option>
             <option value="December">December</option>
            </select>
       {errors.month && <span>{errors.month}</span>}
        </div>           
        

        <div className="col-md-20">
        <label>Year</label>
      < input className="form-control" type="text"  name="year" 
             value={salaryProcess.year} onChange={handleOnchange}/>
            {errors.year && <span>{errors.year}</span>}
        </div>
    
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Generate Salary Sheet</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default SalaryProcess;  