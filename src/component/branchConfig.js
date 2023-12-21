import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
const BranchConfig=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const[branchConfig,setBranchConfig]=useState({ 
        branchCode:'',
        branchName:'',
        brnAddressName:'',
        upozila:'',
        district:'',
        branchLocation:''
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
        if(!branchConfig.branchCode.trim()){
            validationerror.branchCode="Branch Code is Required"; 
        }
        if(!branchConfig.branchName.trim()){
            validationerror.branchName="Branch Name is Required"; 
        }
        if(!branchConfig.brnAddressName.trim()){
            validationerror.brnAddressName="Branch Address is Required"; 
        }
        if(!branchConfig.upozila.trim()){
            validationerror.upozila="Upozila is Required"; 
        }
        if(!branchConfig.district.trim()){
            validationerror.district="District is Required"; 
        }
        if(!branchConfig.branchLocation.trim()){
            validationerror.branchLocation="Location is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post("http://localhost:9006/brnConfig/addBranch",branchConfig)
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
            setBranchConfig({ 
                branchCode:'',
                branchName:'',
                brnAddressName:'',
                upozila:'',
                district:'',
                branchLocation:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setBranchConfig({
          ...branchConfig,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Branch Code</label>
      <input className="form-control" type="text" 
       name="branchCode" value={branchConfig.branchCode} onChange={handleOnchange} />
       {errors.branchCode && <span>{errors.branchCode}</span>}
        </div>           
           
         <div className="col-md-20">
            <label>Branch Name</label>
      <input className="form-control" type="text" 
       name="branchName" value={branchConfig.branchName} onChange={handleOnchange} />
       {errors.branchName && <span>{errors.branchName}</span>}
        </div> 

        <div className="col-md-20">
        <label>Branch Address Name</label>
      < input className="form-control" type="text"  name="brnAddressName" 
      value={branchConfig.brnAddressName} onChange={handleOnchange}/>
      {errors.brnAddressName && <span>{errors.brnAddressName}</span>}
        </div>
        <div className="col-md-20">
        <label>Upozila</label>
      < input className="form-control" type="text" name="upozila" 
        value={branchConfig.upozila} onChange={handleOnchange}/>
        {errors.upozila && <span>{errors.upozila}</span>}
        </div>
         
        <div className="col-md-20">
            <label>District</label>
            <input className="form-control" type="text"  name="district" value={branchConfig.district} onChange={handleOnchange}/>
            {errors.district && <span>{errors.district}</span>}
        </div>

         <div className="col-md-20">
            <label>Location</label>
            <select className="form-select" onChange={handleOnchange} 
            name="branchLocation" value={branchConfig.branchLocation}>
             <option value="">Select</option>
             <option value="City">City Corporation</option>
             <option value="Union">Union Porishod</option>
             <option value="Porosova">Porosova</option>
            </select>
            {errors.branchLocation && <span>{errors.branchLocation}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default BranchConfig;  