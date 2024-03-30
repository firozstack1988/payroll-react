import React ,{useState,useRef}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import responseData from "./response";

const AddUser=()=>{
    const navigat=useNavigate();
    const loginUserId=localStorage.getItem("loggedUser");
    const[users,setUsers]=useState({ 
        createdBy:'loginUserId',
        loginUser:'',
        userName:'',
        password:'',
        userType:'',
        userRole:''
    });
    const[result,setResult]=useState({
        status:'',
        message:'',
        content:''
    });
   const [errors, setErrors] = useState({});

    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(!users.loginUser.trim()){
            validationerror.loginUser="User Id is Required"; 
        }
        if(!users.userName.trim()){
            validationerror.userName="User Name is Required"; 
        }
        if(!users.password.trim()){
            validationerror.password="Password is Required"; 
        }
        if(!users.userType.trim()){
            validationerror.userType="User Type is Required"; 
        }
        if(!users.userRole.trim()){
            validationerror.userRole="User Role is Required"; 
        }
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post(BASE_URL+"users",users)
            .then((result)=>{           
                if(result.data.status==responseData.STATUS_SUCCESS) {
                    Swal.fire(result.data.message); 
                    navigat("/UserList"); 
                }
                if(result.data.status==responseData.STATUS_FAILURE) 
                    Swal.fire(result.data.message); 
               
               }).catch((err) => {
                console.log(err)
            }) 
            setUsers({ 
                loginUser:'',
                userName:'',
                password:'',
                userType:'',
                userRole:''
            });
        }
   
    } 
    const handleOnchange=(event)=>{
        setUsers({
          ...users,
          [event.target.name]:event.target.value
      });
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>User Id</label>
      <input className="form-control" type="text"  name="loginUser" value={users.loginUser} onChange={handleOnchange}/>
        </div>
        <div className="col-md-20">
            <label>User Name</label>
      <input className="form-control" type="text"  name="userName" value={users.userName} onChange={handleOnchange}/>
        </div>
        <div className="col-md-20">
        <label>Password</label>
  <input className="form-control" type="password"  name="password" value={users.password} onChange={handleOnchange}/>
    </div>
        <div className="col-md-20">
            <label>User Type</label>            
            <select className="form-select"  onChange={handleOnchange} name="userType" value={users.userType}>
             <option value="">Select</option>
             <option value="Admin">Admin</option>
             <option value="Employee">Employee</option>
            </select>
        </div>
        <div className="col-md-20">
             <label>User Role</label>            
            <select className="form-select"  onChange={handleOnchange} name="userRole" value={users.userRole}>
             <option value="">Select</option>
             <option value="BRANCH ADMIN">BRANCH ADMIN</option>
             <option value="AREA ADMIN">AREA ADMIN</option>
             <option value="WORKER">WORKER</option>
             <option value="SUPER ADMIN">SUPER ADMIN</option>
            </select>
        </div>
           
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Add</button>
        </div>
        </form> 
        </div>
              
    );
}

export default AddUser;  