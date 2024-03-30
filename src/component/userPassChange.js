import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import responseData from "./response";

const UserPassChange=()=>{
    const navigat=useNavigate();
    const loginUser=localStorage.getItem("loggedUser");
    const[passChange,setPassChange]=useState({ 
        userId:loginUser,
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
        content:'',
    });

    const [errors, setErrors] = useState({});
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(!passChange.oldPassword.trim()){
            validationerror.oldPassword="Old Password is Required"; 
        }
        if(!passChange.newPassword.trim()){
            validationerror.newPassword="New Password is Required"; 
        }
        if(!passChange.confirmPassword.trim()){
            validationerror.confirmPassword="Confirm Password is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post(BASE_URL+"users/passChange",passChange)
            .then((result)=>{ 
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) 
                    Swal.fire(result.data.message);   
                
               }).catch((err) => {
                console.log(err);
            })   
            setPassChange({ 
                userId:'',
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setPassChange({
          ...passChange,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>User Id</label>
            <input className="form-control" type="text" 
            name="userId" value={passChange.userId} onChange={handleOnchange} readOnly="true"/> 
        </div>           
           
         <div className="col-md-20">
             <label>Old Password</label>
      <input className="form-control" type="text" 
       name="oldPassword" value={passChange.oldPassword} onChange={handleOnchange} /> 
         {errors.oldPassword && <span>{errors.oldPassword}</span>}
        </div> 

        <div className="col-md-20">
        <label>New Password</label>
      < input className="form-control" type="text"  name="newPassword" 
             value={passChange.newPassword} onChange={handleOnchange}/>
            {errors.newPassword && <span>{errors.newPassword}</span>}
        </div>

        <div className="col-md-20">
        <label>Confirm Password</label>
      < input className="form-control" type="text"  name="confirmPassword" 
             value={passChange.confirmPassword} onChange={handleOnchange}/>
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
    
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
        </div>
        </form> 
        </div>       
    );
}

export default UserPassChange;  