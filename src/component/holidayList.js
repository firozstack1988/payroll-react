import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Allowance from './allowance';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Navbar from "./navbar";
import './custome.css';


const HolidayList=()=>{ 
    const cors=require("cors");
    const [holidayList,setHolidayList]=useState([]); 
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
  useEffect(()=>{
    loadHolidayList();
   },[])

    const loadHolidayList=async()=>{
    const result=await axios.get(BASE_URL+"Holiday");
      setHolidayList(result.data);
}
    
    return(
		<div >	
      <div><Navbar/></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-5">	
      <a className="allowance-list" >Branch List</a>
           
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Month</th>
                    <th scope="col">No of Holiday</th>
                    <th scope="col">Year</th>
                    <th scope="col">id</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Add</th>
                </tr>
             </thead>
            <tbody>
                {
                 holidayList.map((d,index)=>{
                  return <tr  key={index}> 
                    <td>{d.month}</td>                  
                    <td>{d.number_of_holiday}</td>
                    <td>{d.year}</td>
                    <td>{d.id}</td>
                    <td><Link to={`/editHoliday/${d.id}`}>Edit</Link></td>
                    <td> <Link to='/addHolidays'>Add </Link> </td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default HolidayList;