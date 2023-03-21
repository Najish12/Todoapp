import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoProvider =({children})=> {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const[userData, setUserData] = useState({
      name:""
    });

      const [taskList, setTaskList] = useState([]);
      const [latestTask, setLatestTask] = useState({})
      const [recentTask, setRecentTask] = useState([])

    const onRegister = async(formData)=>{
        const obj = {
            method: "POST",
            headers: {
          'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        
          const checkUser= await fetch(`http://localhost:5000/user?email=${formData.email}`,{method: "GET"})
        
          const user = checkUser.json();
          if(user.length > 0){
            setMessage("user already exit");
          }
          else{
        
          }
        
          const response = await fetch("http://localhost:5000/user", obj);
          // console.log(response); 
            if(response.ok){
              const user = await response.json();
              setMessage("user created successfully");
              const userData=JSON.stringify(user);
              localStorage.setItem("user",userData);
              setUserData({name:user.name});
              navigate('/task-list')
            }
            else{
              setMessage("somenthing went to wrong");
            }
    }
    const onLogin = async(formData)=>{
        const response =await fetch(`http://localhost:5000/user?email=${formData.email}&password=${formData.password}`,  {method:`GET`});
            console.log(response)
            const user = await response.json();
            if(user.length > 0){
                setMessage("logged in successfully");
                const userData=JSON.stringify(user[0]);
                localStorage.setItem("user",userData);
                setUserData({username: user[0].name, id:user[0].id});
                navigate('/task-list')
            }
            else{
                setMessage("something went wrong");
            }
    }

    //useEffect 
    useEffect(()=>{
      const user = localStorage.getItem("user");
      debugger
      if(user !== "undefined" ){
      const userObj = JSON.parse(user);
      setUserData(userObj);
      }
}, [])


// create task

const createTask = async(formData)=>{
        const obj = {
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData)
        }
        const response = await fetch('http://localhost:5000/tasks',obj);
        if(response.ok){
          setMessage("Task created successfully")
          getTaskList();
        }else{
          setMessage("Something went wrong")
        }
}


//update task
const updateTask = async(formData)=>{
  const obj = {
    method : "PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  }
  const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,obj);
  if(response.ok){
    setMessage("Task created successfully")
    getTaskList();
  }else{
    setMessage("Something went wrong")
  }
}


///  Get all task
    const getTaskList = async()=>{
      const response =  await fetch (`http://localhost:5000/tasks?userId=${userData.id}`, {method:"GET"});
      if (response.ok){
      const tasks = await response.json();
      setTaskList(tasks);
      const latestTask = tasks[tasks.length-1];
      setLatestTask(latestTask);
      const recentTask =  tasks.slice(-3);
      setRecentTask(recentTask);
      }
    }

        useEffect(()=>{
            if (userData){
              getTaskList()
              
            }
        },[userData])
    return(
            <TodoContext.Provider value={{
                message,   //message wala object use ho jaega dono side ka register ka or login ka
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
                updateTask
            }}>
                {children}

            </TodoContext.Provider>
    )
}
export default TodoContext;

