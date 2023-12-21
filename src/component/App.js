import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './navbar';
import AddUser from './addUsers';
import AddEmployee from './addEmployee';
import EmpDashboard from './empDashboard';
import EmployeeList from './employeeList';
import Login  from './Login';
import Leave from './leave';
import Allowance from './allowance';
import BranchConfig from './branchConfig';
import EmpTransfer from './empTransfer';
import AddHolidays from './addHolidays';
import SalaryProcess from './salaryProcess';
import MonthlySalarySheet from './monthlySalarySheet'

function App() {
  return (
    <div>
         <Router>
        <Routes >
          <Route exact path="/navbar" element={<Navbar/>}/>
          <Route exact path="/empDashboard" element={<EmpDashboard/>}/>
          <Route exact path="/addUsers" element={<AddUser/>}/>
          <Route exact path="/addEmployee" element={<AddEmployee/>}/>
          <Route exact path="/employeeList" element={<EmployeeList/>}/>
          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/allowance" element={<Allowance/>}/>
          <Route exact path="/branchConfig" element={<BranchConfig/>}/>
          <Route exact path="/empTransfer" element={<EmpTransfer/>}/>
          <Route exact path="/addHolidays" element={<AddHolidays/>}/>
          <Route exact path="/salaryProcess" element={<SalaryProcess/>}/>
          <Route exact path="/monthlySalarySheet" element={<MonthlySalarySheet/>}/>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
