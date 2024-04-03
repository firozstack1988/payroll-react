import React,{useEffect,useState} from "react";
import axios from "axios";
import responseData from "./response";
import { BASE_URL } from "./config";
import { useNavigate } from "react-router-dom";

const MonthlySalarySheet=()=>{
    const navigat=useNavigate();
    const [salaryList,setSalaryList]=useState([]); 
   
    const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
    useEffect(()=>{
        loadSalaryList();
    },[])

    const loadSalaryList=async()=>{
    const result=await axios.get(BASE_URL+"salaryProcess/"+year+"/"+month);
    console.log(result.data);
    setSalaryList(result.data);
    }
    
    return(
		<div  >	
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
       
       </div>
      </nav> 
			<div className="py-4">		
			<table className="table border shadow">	 
			 <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Basic Amount</th>
                    <th scope="col">House Rent</th>
                    <th scope="col">Medical Allowance</th>
                    <th scope="col">Lunch Allowance</th>
                    <th scope="col">Transport Allowance</th>
                    <th scope="col">Credit Allowance</th>
                    <th scope="col">City Allowance</th>
                    <th scope="col">Provident Fund</th>
                    <th scope="col">Gross Salary</th>
                </tr>
             </thead>
            <tbody>
                {
                salaryList.map((sal,index)=>{
                  return <tr  key={index}> 
                    <td>{sal.emp_id}</td>                  
                    <td>{sal.emp_name}</td>
                    <td>{sal.basic_amt}</td>
                    <td>{sal.house_rent_amt}</td>
                    <td>{sal.medical_allowance_amt}</td>
                    <td>{sal.lunch_amt}</td>
                    <td>{sal.transport_allowance}</td>
                    <td>{sal.credit_allowancea_amt}</td>
                    <td>{sal.city_allowance_amt}</td>
                    <td>{sal.provident_fund_amt}</td>
                    <td>{sal.gross_salary}</td>
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
export default MonthlySalarySheet;