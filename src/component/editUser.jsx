import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import responseData from "./response";
import {useParams} from "react-router-dom";

const EditUser=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    const {id}=useParams();
    const[users,setUsers]=useState({ 
        loginUser:'',
        userName:'',
        userType:'',
        userRole:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
        content:''
    });
   const [errors, setErrors] = useState({});

   useEffect(()=>{
    axios.get(BASE_URL+"users/userDetail/"+id).then(result=>{
        setUsers({...users,
            loginUser:result.data[0].login_user,
            userName:result.data[0].user_name,
            userType:result.data[0].user_type,
            userRole:result.data[0].user_role,
            id:result.data[0].id
    }) 
    }).catch((err)=>{
  
    });
  },[]);

    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(users.loginUser==''){
            validationerror.loginUser="User Id is Required"; 
        }
        if(users.userName==''){
            validationerror.userName="User Name is Required"; 
        }
        if(users.userType==''){
            validationerror.userType="User Type is Required"; 
        }
        if(users.userRole==''){
            validationerror.userRole="User Role is Required"; 
        }
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            axios.post(BASE_URL+"users/modifyUser",users)
            .then((result)=>{           
                if(result.data==responseData.UPDATE_SUCCESS) {
                    Swal.fire(responseData.UPDATE_SUCCESS); 
                    navigat("/UserList"); 
                }
                if(result.data==responseData.UPDATE_FAILURE) 
                    Swal.fire(responseData.UPDATE_FAILURE); 
                    
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
             <option value="ADMIN">ADMIN</option>
             <option value="USER">USER</option>
             <option value="SUPER">SUPER</option>
            </select>
        </div>
           
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
        </div>
        </form> 
        </div>
              
    );
}

export default EditUser;  