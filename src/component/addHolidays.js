import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";

const AddHolidays=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[holidays,setHolidays]=useState({ 
        month:'',
        numberOfHoliday:'',
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
        if(!holidays.month.trim()){
            validationerror.month="Month is Required"; 
        }
        if(!holidays.numberOfHoliday.trim()){
            validationerror.numberOfHoliday="Number of Monthly is Required"; 
        }
        if(!holidays.year.trim()){
            validationerror.year="Transfered Branch is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post("http://localhost:9006/holiday/addHoliday",holidays)
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
            setHolidays({ 
                month:'',
                numberOfHoliday:'',
                year:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setHolidays({
          ...holidays,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Month Name</label>
            <select className="form-select" onChange={handleOnchange} name="month" value={holidays.month}>
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
             <label>Total Holidays</label>
      <input className="form-control" type="text" 
       name="numberOfHoliday" value={holidays.numberOfHoliday} 
         onChange={handleOnchange} />
       {errors.numberOfHoliday && <span>{errors.numberOfHoliday}</span>}
        </div> 

        <div className="col-md-20">
        <label>Year</label>
      < input className="form-control" type="text"  name="year" 
             value={holidays.year} onChange={handleOnchange}/>
            {errors.year && <span>{errors.year}</span>}
        </div>
    
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default AddHolidays;  