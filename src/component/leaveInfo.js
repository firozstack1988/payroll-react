import React,{useEffect,useState} from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import {useParams} from 'react-router-dom';
import responseData from "./response";
import { useNavigate } from "react-router-dom";
const moment = require("moment");

const LeaveInfo=()=>{ 
    const navigat=useNavigate();
    const [leaveList,setLeaveList]=useState([]); 
    const [leaveStatus,setLeaveStatus]=useState([]); 
    const {id}=useParams();
    const loggedUserRole=localStorage.getItem("loggedUserRole");
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
     });

   useEffect(()=>{
    loadLeaveBalanceList();
    loadLeaveStatus();
    },[])

    const loadLeaveBalanceList=async()=>{
    const result=await axios.get(BASE_URL+"employee/empLeaveBal/"+id);
     setLeaveList(result.data);
    }
    const loadLeaveStatus=async()=>{
      const result=await axios.get(BASE_URL+"leave/leaveStatus/"+id);
      setLeaveStatus(result.data);
      }
    
    return(
		<div >	
    
			<div className="py-5">	
     <h2 className="container d-flex justify-content-center" >Leave Information</h2>
      <br></br>     
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Sick Leave</th>
                    <th scope="col">Casual Leave</th>
                    <th scope="col">Earned Leave</th>
                    <th scope="col">Year</th>
                </tr>
             </thead>
            <tbody>
                {
                 leaveList.map((d,index)=>{
                  return <tr  key={index}> 
                     <td>{d.employee_id}</td> 
                    <td>{d.name}</td>                  
                    <td>{d.emp_designation}</td>
                    <td>{d.sick_leave}</td>
                    <td>{d.casual_leave}</td>
                    <td>{d.earned_leave}</td>
                    <td>{d.year}</td>
                  </tr>  
                })
                }
            </tbody>
             </table>
			</div>

      <div className="py-5">	
     <h2 className="container d-flex justify-content-center" >Leave Status</h2>
      <br></br>     
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Leave Type</th>
                    <th scope="col">Leave From date</th>
                    <th scope="col">Leave To date</th>
                    <th scope="col">No of Leave</th>
                    <th scope="col">Leave Status</th>
                </tr>
             </thead>
            <tbody>
                {
                 leaveStatus.map((d,index)=>{
                  return <tr  key={index}> 
                     <td>{d.employee_id}</td> 
                    <td>{d.leave_type}</td>                  
                    <td>{moment(d.from_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(d.to_date).format('YYYY-MM-DD')}</td>
                    <td>{d.number_of_days}</td>
                    <td>{d.leave_status}</td>
                  </tr>  
                })
                }
            </tbody>
             </table>
			</div>
      <div className="container d-flex justify-content-center">
      <button onClick={() => navigat(-1)}>Go back</button>
      </div>
		</div>	
    );
}
export default LeaveInfo;