import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoContext from '../context/TodoContext';

function Register(props) {
 const [formData, setFormData] = useState();
  
const {message, onRegister, setMessage}= useContext(TodoContext)

useEffect(()=>{
  setMessage("")
},[])

  const changeInput=(event)=>{
    // let value = event.target.value;
    // let name = event.target.value;
    // short form
    const {name, value } = event.target;
           setFormData((prev)=>({
            ...prev,
            [name]: value
           }));
  }

 const onSubmit=async(event)=>{
  event.preventDefault();
        onRegister(formData);
  
  }
   
    return (
        <form>
            <div className='mb-3'>
              <label className='form-label text-primary' htmlFor='ame'>Name</label>
              <input type='text' name='name' className='form-control' id='ame' onChange={changeInput}/>
            </div>
            <div className='mb-3'>
              <label className='form-label text-primary' htmlFor='mail'>Email</label>
              <input type='email' name='email' className='form-control' id='mail' onChange={changeInput}/>
            </div>
            <div className='mb-3'>
              <label className='form-label text-primary' htmlFor='user'>Password</label>
              <input type='password' name='password' className='form-control' id='user' onChange={changeInput}/>
            </div>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={onSubmit}>Register</button>
        </form>
    );
}

export default Register;