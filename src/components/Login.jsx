import React, { useState } from 'react';

function Login(props) {
    const [formData, setFormData] = useState();
    const [message, setMessage] = useState("");

    const changeInput=(event)=>{
        const { name, value } = event.target;
        setFormData((prev)=>({
          ...prev,
          [name]: value
        }));
      }

      const onSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user?email=${formData.email}&password=${formData.password}`, {method: 'GET'});
        console.log(response);
        const user = await response.json();
        console.log(user);
        if(user.length > 0){
            setMessage("logged in successfully");
            const userData = JSON.stringify(user[0]);
            localStorage.setItem("user", userData);
        }
        else{
            setMessage("something went wrong");
        }
      }

    return (
        <form>
            <div className="mb-3">
        <label className="form-label text-primary">Email</label>
        <input type="email" name="email" className="form-control"  onChange={changeInput} />
      </div>

      <div className="mb-3">
        <label className="form-label text-primary">Password</label>
        <input type="password" name="password" className="form-control"  onChange={changeInput} />
      </div>
      <button className='btn btn-primary' onClick={onSubmit}>Login</button>
        </form>
    );
}

export default Login;