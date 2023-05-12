import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const [taskList, setTaskList] = useState([]);
  const [latestTask, setLatestTask] = useState({});
  const [recentTask, setRecentTask] = useState([]);

  const onRegister = async (formData) => {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const checkUser = await fetch(
      `http://localhost:5000/user?email=${formData.email}`,
      { method: "GET" }
    );

    const user = await checkUser.json();

    if (user.length > 0) {
      setMessage("User already exist");
    } else {
      const response = await fetch("http://localhost:5000/user", obj);

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setMessage("user created successfully");
        setTimeout(()=>{
          setMessage("");
         }, 3000);
        const userData = JSON.stringify(user);
        localStorage.setItem("user", userData);
        setUserData({ name: user.name });
        navigate("/task-list");
      } else {
        setMessage("something went wrong");
      }
    }
  };
  const onLogin = async (formData) => {
    const response = await fetch(
      `http://localhost:5000/user?email=${formData.email}&password=${formData.password}`,
      { method: "GET" }
    );
    console.log(response);
    const user = await response.json();
    if (user.length > 0) {
      setMessage("logged in successfully");
      setTimeout(()=>{
        setMessage("");
       }, 3000);   
      const userData = JSON.stringify(user[0]);
      localStorage.setItem("user", userData);
      setUserData({ name: user[0].name, id: user[0].id });
      navigate("/task-list");
    } else {
      setMessage("something went wrong");
    }
  };
  //effects

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== "undefined") {
      const userObj = JSON.parse(user);
      setUserData(userObj);
    }
  }, []);

  //create Task

  const createTask = async (formData) => {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch("http://localhost:5000/tasks", obj);
    if (response.ok) {
      setMessage("Task created successfully");
      setTimeout(()=>{
        setMessage("");
       }, 3000);   
      getTaskList();
    } else {
      setMessage("something went wrong");
    }
  };


  //update task

  const updateTask = async (formData) => {
    const obj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`http://localhost:5000/tasks/${formData.id}`, obj);
    if (response.ok) {
      setMessage("Task Updated successfully");
      setTimeout(()=>{
        setMessage("");
       }, 3000);   
      getTaskList();
    } else {
      setMessage("something went wrong");
    }
  };

  //get all tasks

  const getTaskList = async () => {
    const response = await fetch(
      `http://localhost:5000/tasks?userId=${userData.id}`,
      { method: "GET" }
    );
    if (response.ok) {
      const tasks = await response.json();
      setTaskList(tasks);
      const latestTask = tasks[tasks.length - 1];
      setLatestTask(latestTask);
      const recentTask = tasks.slice(-3);
      setRecentTask(recentTask);
    }
  };

  const deleteTask = async(id)=>{
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {method: "DELETE"});
    if(response.ok){
      setMessage("Task deleted successfully");
      setTimeout(()=>{
       setMessage("");
      }, 3000);      
      getTaskList();
    }else{
      setMessage("Something went wrong");
    }
  }





  useEffect(()=>{
    if(userData){
      getTaskList();
    }
  }, [userData])

  return (
    <TodoContext.Provider
      value={{
        message,
        onRegister,
        onLogin,
        userData,
        setUserData,
        setMessage,
        createTask,
        getTaskList,
        recentTask,
        latestTask,
        taskList,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
