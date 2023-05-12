import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import illustration from '../assets/illustration.png';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 h-100 d-flex flex-column justify-content-center align-items-center bg-primary">
                    <h1 className='display-4 text-uppercase text-center text-white'>An App to <br />
                    make your life <br /> <span className='display-1'>easy</span></h1>

                    <img className='img-fluid' src={illustration} alt="illustration" />

                </div>
                <div className="col-lg-6 h-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="card w-75 border-0">
                        <div className="card-header bg-white border-0">
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </div>
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//API provides endpoints for CRUD operations.
// e.g - 'GET' - https://example.com/user , GET method will get all the users from the database.
//e.g 'GET' - https://example.com/user/1 -  POST, PUT, PATCH, DELETE

/// Payment Gateways
export default Home;