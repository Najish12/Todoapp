import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TodoContext = createContext();

export const TodoProvider = ({children})=>{

    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [userData,setUserData] = useState({
      name: ""
    });
    const [taskList,setTaskList] = useState([]);

    const [latestTask,setLatestTask] = useState({});

    const [recentTask,setRecentTask] = useState([]);

    const onRegister=async(formData)=>{
        const obj = {
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(formData)
          }
          const checkUser = await fetch(`http://localhost:5000/user?email=${formData.email}`,{method:"GET"})
          const user = await checkUser.json();
      
          if(user.length > 0){
            setMessage("User Already Exist");
          }
          else{
            const response = await fetch("http://localhost:5000/user",obj);
          // console.log(response);
          if(response.ok){
            const user = await response.json();
            setMessage("User Created Successfully");
            const userData = JSON.stringify(user);
            localStorage.setItem("user",userData);
            setUserData({name: user.name});
            navigate('/task-list');
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
          else{
            setMessage("Something Went Wrong");
          }
        }
    }
    const onLogin=async(formData)=>{
        const response = await fetch(`http://localhost:5000/user?email=${formData.email}&password=${formData.password}`,{method:'GET'});
    console.log(response);
    const user = await response.json();
    console.log(user);
    if(user.length > 0){
      setMessage("Logged in Successfully");
      const userData = JSON.stringify(user[0]);
      localStorage.setItem("user",userData);
      setUserData({name: user[0].name, id: user[0].id});
      setTimeout(() => {
        setMessage("");
      }, 3000);
      navigate('/task-list');
    }
    else{
      setMessage("Something Went Wrong")
    }
    }


    //If you use any components then use useEffect
    //Effects
  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user !== "undefined"){
      const userObj = JSON.parse(user);
      setUserData(userObj);
    }
     },[])

     //Create Task Function
     const createTask=async(formData)=>{
      const obj={
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }
      const response = await fetch('http://localhost:5000/tasks',obj);
      if(response.ok){
        setMessage("Task Created Successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        getTaskList();
      }
      else{
        setMessage("Something Went Wrong")
      }
     }

     //Update Task Function
     const updateTask=async(formData)=>{
      const obj={
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }
      const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,obj);
      if(response.ok){
        setMessage("Task Updated Successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        getTaskList();
      }
      else{
        setMessage("Something Went Wrong")
      }
     }

     //Get All Task

     const getTaskList = async()=>{
      const response = await fetch(`http://localhost:5000/tasks?userID=${userData.id}`,{method:"GET"});
      if(response.ok){
      const tasks = await response.json();
      setTaskList(tasks);
      const latestTask = tasks[tasks.length-1];
      setLatestTask(latestTask);
      const recentTask = tasks.slice(-3);
      setRecentTask(recentTask);
      }
     };

     useEffect(()=>{
      if(userData){
        getTaskList();
      }
     },[userData])

     const deleteTask = async (id)=>{
      const response = await fetch(`http://localhost:5000/tasks/${id}`,{method:"DELETE"});
      if(response.ok){
        setMessage("Task Deleted Successfuly");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        getTaskList();
      }
      else{
        setMessage("Something Went Wrong")
      }
     }

    return(
        <TodoContext.Provider value={{
            message, // message : message
            onLogin,
            onRegister,
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
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;