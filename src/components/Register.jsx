import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeInput=(event)=>{
    const { name, value } = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }));
  }

  const onSubmit=async(event)=>{
    event.preventDefault();
    const obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    const checkUser = await fetch(`http://localhost:5000/user?email=${formData.email}`, {method: "GET"})

    const user = await checkUser.json();

    if(user.length > 0){
      setMessage("User already exist");
    }else{
      const response = await fetch("http://localhost:5000/user", obj);
      if(response.ok){
          setMessage("user created successfully");
          navigate('/task-list')
      }
      else{
        setMessage("something went wrong");
      }
    }   
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
