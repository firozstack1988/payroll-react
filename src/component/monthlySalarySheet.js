import React,{useEffect,useState} from "react";
import axios from "axios";

const MonthlySalarySheet=()=>{
    const cors=require("cors");
    const [salaryList,setSalaryList]=useState([]); 
   
    const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    
    const[inputParam,setInputParam]=useState({ 
        month:month,
        year:year
    });
    const[result,setResult]=useState({
      success:'',
      errorMsg:'',
      content:''
  });
    useEffect(()=>{
        loadSalaryList();
    },[])

    const loadSalaryList=async()=>{
    
    const result=await axios.post("http://localhost:9006/salProcess/salarySheet",inputParam);
    setSalaryList(result.data.content);
    }
    
    return(
		<div className="container">	
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Monthly Salary Sheet</a>
         
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
                    <td>{sal.empId}</td>                  
                    <td>{sal.empName}</td>
                    <td>{sal.basicAmt}</td>
                    <td>{sal.houseRentAmt}</td>
                    <td>{sal.medicalAllowanceAmt}</td>
                    <td>{sal.lunchAmt}</td>
                    <td>{sal.transportAllowance}</td>
                    <td>{sal.creditAllowanceAmt}</td>
                    <td>{sal.cityAllowanceAmt}</td>
                    <td>{sal.providentFundAmt}</td>
                    <td>{sal.grossSalary}</td>
                  </tr>  
                })
 
                }

            </tbody>
             </table>
			</div>
		</div>	
	
    );
}
export default MonthlySalarySheet;