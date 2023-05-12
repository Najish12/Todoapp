import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import TodoContext from "../context/TodoContext";

function Navigation(props) {

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(TodoContext);

  const logout=()=>{
    localStorage.removeItem("user");
    setUserData(null);
    navigate('/');
  }


  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <Link to="/"><img src={logo} alt="logo" /></Link>
            
          <ul className="nav col-12 col-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0">
            {
              !userData ? 
              <>
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 text-white">
                About
              </Link>
            </li>
            </>
              :
              <>
            <li>
              <Link to="/task-list" className="nav-link px-2 text-white">
                Task List
              </Link>
            </li>
            <li>
              <Link to="/create-task" className="nav-link px-2 text-white">
                Create Task
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link px-2 text-white">
                {userData?.name}          
              </Link>
            </li>
            <li className="nav-link text-white" onClick={logout}>Logout</li>
            </>
          }
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
