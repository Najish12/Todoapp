import React, { useState, useContext, useEffect, useRef } from "react";
import TodoContext from "../context/TodoContext";
function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { message, onLogin, setMessage } = useContext(TodoContext);
  const inputField = useRef(null);
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  const validate = () => {
    let errorsData = {};

    // create property for each field to store its errors in an array.
    errorsData.email = [];
    errorsData.password = [];

    //error condtions
    //if email is blank
    if (!formData.email) {
      errorsData.email.push("Please provide email");
    }

    let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    if (formData.email) {
      if (!emailreg.test(formData.email)) {
        errorsData.email.push("Please enter valid email");
      }
    }

    //password conditions
    if (!formData.password) {
      errorsData.password.push("Please provide password");
    }

    setErrors(errorsData);
  };

  useEffect(validate, [formData]);

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  const onblurHandle = (event) => {
    const { name } = event.target;
    setDirty((dirty) => ({
      ...dirty,
      [name]: true,
    }));
    validate();
  };

  useEffect(() => {
    setMessage("");
  }, []);

  const changeInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      onLogin(formData);
    } else {
      const currValue = inputField.current.value;
      if (!currValue) {
        Object.keys(dirty).forEach((abc) => (dirty[abc] = true));
      }
      setMessage(
        <div className="text-danger">Please resolve errors in the form</div>
      );
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label className="form-label text-primary">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={changeInput}
          onBlur={onblurHandle}
          ref={inputField}
        />
        <div className="text-danger">
          {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-primary">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={changeInput}
          onBlur={onblurHandle}
          ref={inputField}
        />
        <div className="text-danger">
          {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
        </div>
      </div>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onSubmit}>
        Login
      </button>
    </form>
  );
}

export default Login;
