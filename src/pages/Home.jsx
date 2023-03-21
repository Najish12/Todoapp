import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import illustration from '../assets/Group 23.png';

function Home(props){
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
            <div className="col-lg-6 h-100 d-flex justify-content-center align-items-center bg-primary flex-column">
            <h1 className="display-4 text-uppercase text-center text-white">An app to <br/> make your life <br/><span className="display-1">easy</span></h1>
            <img className='img-fluid' src={illustration} />
            </div>
            <div className="col-lg-6 h-100 d-flex flex-column align-items-center justify-content-center">
                <div className="card w-75 border-buttom">
                <div className="card-header border-0">
                    <Link  to="/Login" >Login</Link>
                    <Link to="/Register">Register</Link>
                </div>
                <div className="card-body">
                    <Outlet/>
                </div>
                </div>
            </div>
            </div>
        </div>
       
    );
}
//API provides endpoints for CRUD operations.
//e.g -- 'GET'- http://examle.com/user , GET method will get all the users form the database
//e.g -- 'GET'- http://examle.com/user/1 - POST,PUT, PATCH ,DELETE
export default Home;