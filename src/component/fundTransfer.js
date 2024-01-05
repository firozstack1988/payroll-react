import React ,{useState,useRef,useEffect}from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar"
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

const FundTransfer=()=>{
    const cors=require("cors");
    const navigat=useNavigate();
    
    const[fundTransfer,setFundTransfer]=useState({ 
        debitAcc:'',
        creditAcc:'',
        tranAmt:'',
        tranType:'',
        debitAccBal:''
    });
    const[result,setResult]=useState({
        success:'',
        errorMsg:'',
        content:'', 
        generatedSerial:''
    });
    const[accbalance,setAccbalance]=useState({
        availBal:''
    });
   
    const [errors, setErrors] = useState({});

         
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationerror={}
        if(!fundTransfer.debitAcc.trim()){
            validationerror.debitAcc="Debit Account is Required"; 
        }
        if(!fundTransfer.creditAcc.trim()){
            validationerror.creditAcc="Credit Account is Required"; 
        }
        if(!fundTransfer.tranAmt.trim()){
            validationerror.tranAmt="Transaction Amount is Required"; 
        }
        if(!fundTransfer.tranType.trim()){
            validationerror.tranType="Transaction Type is Required"; 
        }
        
        setErrors(validationerror);
        if(Object.keys(validationerror).length===0){
            const result=axios.post("http://localhost:9006/fundTransfer/amtTransfer",fundTransfer)
            .then((result)=>{ 
                if(result.data.success=='Successfully Added') {
                    Swal.fire(result.data.success); 
                    navigat("/Navbar"); 
                }
                else{
                    Swal.fire(result.data.errorMsg);   
                }   
                
               }).catch((err) => { 
            })   
            setFundTransfer({ 
                debitAcc:'',
                creditAcc:'',
                tranAmt:'',
                tranType:'',
                debitAccBal:''
            }); 
        }
               
    } 
    const handleOnchange=(event)=>{
        setFundTransfer({
          ...fundTransfer,
          [event.target.name]:event.target.value
      });
    } 
    const url="http://localhost:9006/fundTransfer/getAvailBal/";
    const [debitGlAvailBal,setDebitGlAvailBal]=useState('');
    function getAvailBal(){
        const accbalance=axios.get(url+fundTransfer.debitAcc)
        .then((accbalance)=>{
             setDebitGlAvailBal(accbalance.availBal);
        });
       
    } 
    
    return(    
     
        <div className="container d-flex justify-content-center" >
        <form className="requires-validation" onSubmit={handleSubmit}>
        <div className="col-md-20">
            <label>Debit Account</label>
      <input className="form-control" type="text" 
       name="debitAcc" value={fundTransfer.debitAcc} onChange={handleOnchange} />
       {errors.debitAcc && <span>{errors.debitAcc}</span>}
        </div>           
           
         <div className="col-md-20">
            <label>Credit Account</label>
      <input className="form-control" type="text" onClick={getAvailBal}
       name="creditAcc" value={fundTransfer.creditAcc} onChange={handleOnchange} />
       {errors.creditAcc && <span>{errors.creditAcc}</span>}
        </div> 
        <div className="col-md-20">
        <label>Available balance</label>
      < input className="form-control" type="text"  name="debitAccBal" 
      value={debitGlAvailBal}  onChange={handleOnchange}/>
      {errors.debitAccBal && <span>{errors.debitAccBal}</span>}
        </div>

        <div className="col-md-20">
        <label>Transfered Amount</label>
      < input className="form-control" type="text"  name="tranAmt" 
      value={fundTransfer.tranAmt} onChange={handleOnchange}/>
      {errors.tranAmt && <span>{errors.tranAmt}</span>}
        </div>
        <div className="col-md-20">
        <label>Transaction Type</label>
      < input className="form-control" type="text" name="tranType" 
        value={fundTransfer.tranType} onChange={handleOnchange}/>
        {errors.tranType && <span>{errors.tranType}</span>}
        </div>
         
         <div className="form-button mt-3">
            <button id="submit" type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>   
        </div>
        
        </form> 
        </div>
              
    );
}

export default FundTransfer; 