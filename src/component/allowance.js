import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
const Allowance=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[salaryAllowance,setSalaryAllowance]=useState({ 
        houseRent:'',
        medical:'',
        transport:'',
        lunch:'',
        cityAllowance:'',
        providentFund:'',
        creditAllowance:''
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
        if(!salaryAllowance.houseRent.trim()){
            validationerror.houseRent="House Rent is Required"; 
        }
        if(!salaryAllowance.medical.trim()){
            validationerror.medical="Medical Allowance is Required"; 
        }
        if(!salaryAllowance.transport.trim()){
            validationerror.transport="Transport Allowance is Required"; 
        }
        if(!salaryAllowance.lunch.trim()){
            validationerror.lunch="Lunch Allowance is Required"; 
        }
        if(!salaryAllowance.cityAllowance.trim()){
            validationerror.cityAllowance="City Allowance is Required"; 
        }
        if(!salaryAllowance.providentFund.trim()){
            validationerror.providentFund="Provident Fund is Required"; 
        }
        if(!salaryAllowance.creditAllowance.trim()){
            validationerror.creditAllowance="Credit Allowance is Required"; 
        }

        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post("http://localhost:9006/allowance/addAllowance",salaryAllowance)
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
            setSalaryAllowance({ 
                houseRent:'',
                medical:'',
                transport:'',
                lunch:'',
                cityAllowance:'',
                providentFund:'',
                creditAllowance:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setSalaryAllowance({
          ...salaryAllowance,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>House Rent</label>
      <input className="form-control" type="text" 
       name="houseRent" value={salaryAllowance.houseRent} onChange={handleOnchange} />
       {errors.houseRent && <span>{errors.houseRent}</span>}
        </div>           
           
         <div className="col-md-20">
            <label>Medical Allowance</label>
      <input className="form-control" type="text" 
       name="medical" value={salaryAllowance.medical} onChange={handleOnchange} />
       {errors.medical && <span>{errors.medical}</span>}
        </div> 

        <div className="col-md-20">
        <label>Transport Allowance</label>
      < input className="form-control" type="text"  name="transport" value={salaryAllowance.transport} onChange={handleOnchange}/>
      {errors.transport && <span>{errors.transport}</span>}
        </div>
        <div className="col-md-20">
        <label>Lunch Allowance</label>
      < input className="form-control" type="text" name="lunch" value={salaryAllowance.lunch} onChange={handleOnchange}/>
        {errors.lunch && <span>{errors.lunch}</span>}
        </div>
         
        <div className="col-md-20">
            <label>City Allowance</label>
            <input className="form-control" type="text"  name="cityAllowance" value={salaryAllowance.cityAllowance} onChange={handleOnchange}/>
            {errors.cityAllowance && <span>{errors.cityAllowance}</span>}
        </div>

         <div className="col-md-20">
            <label>Provdent Fund</label>
            <input className="form-control" type="text"  name="providentFund" value={salaryAllowance.providentFund} onChange={handleOnchange}/>
            {errors.providentFund && <span>{errors.providentFund}</span>}
        </div>
        <div className="col-md-20">
            <label>Credit Allowance</label>
            <input className="form-control" type="text"  name="creditAllowance" value={salaryAllowance.creditAllowance} onChange={handleOnchange}/>
            {errors.creditAllowance && <span>{errors.creditAllowance}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default Allowance;  