import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../context/TodoContext';

function Login(props) {


    const[formData,setFormData]=useState();
    const {message, onLogin,setMessage}= useContext(TodoContext);

    useEffect(()=>{
        setMessage("")
    },[])
     

    const changeInput=(event)=>{
        const{name,value} = event.target;
        // let value= event.target.value; dono ko replace kiya short form m
        // let name= event.target.value;

              setFormData((prev)=>({
                    ...prev,
                    [name]:value
              }))
     }

        const onSubmit=async(e)=>{
            e.preventDefault();
            onLogin(formData);
        }


    return (
        <form>
            
             <div className="mb-3">
                <label className='form-label text-primary'>Email</label>
                <input type="email" name='email' className='form-control' onChange={changeInput}  />
             </div>
             <div className="mb-3">
                <label className='form-label text-primary'>Password</label>
                <input type="password" name='password' className='form-control' onChange={changeInput}  />
             </div>
             <p>{message}</p>
             <button className='btn btn-primary' onClick={onSubmit}>Login</button>
        </form>
    );
}

export default Login;