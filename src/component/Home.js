
import { Link } from "react-router-dom";
import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddUser from "./addUsers";
import Navbar from "./navbar";
const Home=()=>{
    return(
        <div>
        <Router>
     <Navbar/>
       <Routes >
         <Route exact path="/addUsers" element={<AddUser/>}/>
         
       </Routes>
     </Router>
     
   </div>
    );   
};

export default Home;