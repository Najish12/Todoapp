import React, { useState, useContext, useEffect } from "react";
import TodoContext from '../context/TodoContext';
function Register(props) {
  const [formData, setFormData] = useState();
  const {message, onRegister, setMessage} = useContext(TodoContext);

  useEffect(()=>{
    setMessage("");
  }, [])

  const changeInput=(event)=>{
    const { name, value } = event.target;
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
      <div className="mb-3">
        <label className="form-label text-primary">Name</label>
        <input type="text" name="name" className="form-control" onChange={changeInput} />
      </div>

      <div className="mb-3">
        <label className="form-label text-primary">Email</label>
        <input type="email" name="email" className="form-control"  onChange={changeInput} />
      </div>

      <div className="mb-3">
        <label className="form-label text-primary">Password</label>
        <input type="password" name="password" className="form-control"  onChange={changeInput} />
      </div>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onSubmit}>Register</button>
    </form>
  );
}

export default Register;
