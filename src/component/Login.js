import axios from "axios";
import Swal from "sweetalert2";
import React ,{useState,useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import responseData from "./response";

const Login=()=>{
    axios.defaults.withCredentials = true
    const[users,setUsers]=useState({ 
        loginUser:'',
        password:''
    });
    const[islogin,setIslogin]=useState(false); 
    useEffect(()=>{
        setIslogin(true);
    },[]);
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
        content:''
    });
    const[contentDetail,setContentDetail]=useState({
        userType:'',
        userRole:'',
        loginUser:'',
        userName:''
    });
  const navigat=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        const result=axios.post(BASE_URL+"users/login",users)
        .then((result)=>{   
        if(result.data.status==responseData.STATUS_SUCCESS){
            localStorage.setItem("loggedUser",users.loginUser); 
              if(result.data.content=="SUPER ADMIN")
              navigat("/Navbar"); 
              if(result.data.content=="BRANCH ADMIN")
              navigat("/AdminDashboard/"+users.loginUser);
              if(result.data.content=="WORKER")
              navigat("/EmpDashboard/"+users.loginUser);
              if(result.data.content=="AREA ADMIN")
              navigat("/AdminDashboard/"+users.loginUser);

            Swal.fire(result.data.message); 
        }      
        else{
            Swal.fire(result.data.message); 
        }
           }).catch((err) => {
            console.log(err)
        }) 
        setUsers({ 
            loginUser:'',
            password:''
        });
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
        <label>Password</label>
  <input className="form-control" type="password"  name="password" value={users.password} onChange={handleOnchange}/>
    </div>
      
     <div className="form-button mt-3">
        <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Login</button>
    </div>
    </form> 
    </div>
 )
}
export default Login;