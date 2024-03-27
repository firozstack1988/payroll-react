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
import FundTransfer from './fundTransfer';
import AllowanceList from './allowanceList';
import UserPassChange from './userPassChange';
import EditAllowance from './editAllowance';
import BranchList from './branchList';
import EditBranch from './editBranch';
import HolidayList from './holidayList';
import EditHoliday from './editHoliday';
import UserList from './userList';
import EditUser from './editUser';
import EditEmployee from './editEmployee';
import LeavePolicy from './leavePolicy';
import LeavePolicyList from './leavePolicyList';
import EditLeavePolicy from './editLeavePolicy';

function App() {
  return (
    <div>
         <Router>
        <Routes >
          <Route exact path="/navbar" element={<Navbar/>}/>
          <Route exact path="/empDashboard" element={<EmpDashboard/>}/>
          <Route exact path="/addUsers" element={<AddUser/>}/>
          <Route exact path="/userList" element={<UserList/>}/>
          <Route exact path="/editUser/:id" element={<EditUser/>}/>

          <Route exact path="/addEmployee" element={<AddEmployee/>}/>
          <Route exact path="/employeeList" element={<EmployeeList/>}/>
          <Route exact path="/editEmployee/:id" element={<EditEmployee/>}/>

          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/leavePolicyList" element={<LeavePolicyList/>}/>
          <Route exact path="/editLeavePolicy/:id" element={<EditLeavePolicy/>}/>


          <Route exact path="/allowance" element={<Allowance/>}/>
          <Route exact path="/editAllowance/:id" element={<EditAllowance/>}/>

          <Route exact path="/editBranch/:id" element={<EditBranch/>}/>
          <Route exact path="/branchConfig" element={<BranchConfig/>}/>
          <Route exact path="/branchList" element={<BranchList/>}/>

          <Route exact path="/empTransfer" element={<EmpTransfer/>}/>

          <Route exact path="/addHolidays" element={<AddHolidays/>}/>
          <Route exact path="/holidayList" element={<HolidayList/>}/>
          <Route exact path="/editHoliday/:id" element={<EditHoliday/>}/>

          <Route exact path="/salaryProcess" element={<SalaryProcess/>}/>
          <Route exact path="/monthlySalarySheet" element={<MonthlySalarySheet/>}/>
          <Route exact path="/fundTransfer" element={<FundTransfer/>}/>
          <Route exact path="/allowanceList" element={<AllowanceList/>}/>
          <Route exact path="/userPassChange" element={<UserPassChange/>}/>
          
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
