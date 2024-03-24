import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import { BASE_URL } from "./config";
import responseData from "./response";


const EditAllowance=()=>{
    const loginUser=localStorage.getItem("loggedUser");
    const navigat=useNavigate();
    var house='';
    const [salaryAllowanceList,setSalaryAllowanceList]=useState([]);
    
    const {id}=useParams();
    const[salaryAllowance,setSalaryAllowance]=useState({ 
        houseRent:'',
        createdby:loginUser,
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
   
    useEffect(()=>{
        axios.get(BASE_URL+"allowance/"+id).then(result=>{
         setSalaryAllowance({...salaryAllowance,
            houseRent:result.data[0].house_rent,
            medical:result.data[0].medical,
            transport:result.data[0].transport,
            lunch:result.data[0].lunch,
            cityAllowance:result.data[0].city_allowance,
            providentFund:result.data[0].provident_fund,
            creditAllowance:result.data[0].credit_allowance
        }) 
        }).catch((err)=>{
      
        });
      },[]);  
   
    const [errors, setErrors] = useState({});
         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        
        if(Object.keys(validationerror).length===0){
            const result=axios.post(BASE_URL+"allowance",salaryAllowance)
            .then((result)=>{ 
                if(result.data==responseData.INSERT_SUCCESS) {
                    Swal.fire(responseData.INSERT_SUCCESS); 
                    navigat("/AllowanceList"); 
                }
                if(result.data==responseData.UPDATE_SUCCESS) {
                    Swal.fire(responseData.UPDATE_SUCCESS); 
                    navigat("/AllowanceList"); 
                }
                if(result.data==responseData.UPDATE_FAILURE) {
                    Swal.fire(responseData.UPDATE_FAILURE); 
                    
                }
                if(result.data==responseData.INSERT_FAILURE) {
                    Swal.fire(responseData.INSERT_FAILURE); 
                   
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
      <input className="form-control" type="text" onChange={handleOnchange}
       name="houseRent" value={salaryAllowance.houseRent} />
       {errors.houseRent && <span>{errors.houseRent}</span>}
        </div>           
           
         <div className="col-md-20">
            <label>Medical Allowance</label>
      <input className="form-control" type="text" onChange={handleOnchange}
       name="medical" value={salaryAllowance.medical}   />
       {errors.medical && <span>{errors.medical}</span>}
        </div> 

        <div className="col-md-20">
        <label>Transport Allowance</label>
      < input className="form-control" type="text"  onChange={handleOnchange} name="transport" value={salaryAllowance.transport}  />
      {errors.transport && <span>{errors.transport}</span>}
        </div>
        <div className="col-md-20">
        <label>Lunch Allowance</label>
      < input className="form-control" type="text" name="lunch" onChange={handleOnchange} value={salaryAllowance.lunch} />
        {errors.lunch && <span>{errors.lunch}</span>}
        </div>
         
        <div className="col-md-20">
            <label>City Allowance</label>
            <input className="form-control" type="text"  name="cityAllowance" onChange={handleOnchange} value={salaryAllowance.cityAllowance} />
            {errors.cityAllowance && <span>{errors.cityAllowance}</span>}
        </div>

         <div className="col-md-20">
            <label>Provdent Fund</label>
            <input className="form-control" type="text"  name="providentFund" onChange={handleOnchange} value={salaryAllowance.providentFund}  />
            {errors.providentFund && <span>{errors.providentFund}</span>}
        </div>
        <div className="col-md-20">
            <label>Credit Allowance</label>
            <input className="form-control" type="text"  name="creditAllowance" onChange={handleOnchange} value={salaryAllowance.creditAllowance}  />
            {errors.creditAllowance && <span>{errors.creditAllowance}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default EditAllowance;  