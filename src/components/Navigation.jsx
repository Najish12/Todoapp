import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import TodoContext from '../context/TodoContext';

function Navigation(props) {

  // const [userData, setUserData]=useState()
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(TodoContext);


  

const logout=()=>{
  localStorage.removeItem("user")
  setUserData(null)
  navigate('/');

}


  return (
      <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        {/* <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </Link> */}
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <ul className="nav col-12 col-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0">
          {
            !userData ?
            <>
          <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
          <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
          </>
            :
            <>
          <li><Link to="/createtask" className="nav-link px-2 text-white">CreateTask</Link></li>
          <li><Link to="/profile" className="nav-link px-2 text-white">{userData?.name}</Link></li>
          <li><Link to="/task-list" className="nav-link px-2 text-white">TaskList</Link></li>
          <li className="nav-link text-white" onClick={logout}>Logout</li>
          </>
}
        </ul>
          

        {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"> */}
          {/* <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2">Login</button>
          <button type="button" className="btn btn-warning">Sign-up</button> */}
        {/* </div> */}
      </div>
    </div>
  </header>
  );
}

export default Navigation;