import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../context/TodoContext';

function TaskForm(props) {
    const init = {
        title:"",
        description:"",
        dueDate:""
    }

    const [formData,setFormData] = useState(init);
    const {userData, createTask, message, updateTask} = useContext(TodoContext);
    const {data, isUpdate, cancelTask } = props;

    const handleChange =(event)=>{
        const {name,value} = event.target;
        setFormData((prev)=>({
          ...prev,
          [name]: value,
          userId: userData.id,
          modifiedOn: Date()
        }))
      }


      const onUpdate = (e)=>{
        e.preventDefault();
        updateTask(formData);
      }

      const onSubmit=(e)=>{
        e.preventDefault();
        createTask(formData);
      }

      const onCancel = (e)=>{
        e.preventDefault()
        cancelTask();
        setFormData(init);
      }


      useEffect(()=>{
        if(data && isUpdate){
            setFormData(data);
        }
      },[data, isUpdate])

    return (
        <div className='p-5 w-75'>
            <h2 className='text-white fw-bold'>{isUpdate? "Update Task" : "Create Task"}</h2>
            <div className='p-4 bg-white'>
             <form>
                <div className='mb-3'>
                    <label className='form-lable'>Title</label>
                    <input type="text" className='form-control' name='title' onChange={handleChange} value={formData.title}/>
                </div>
                <div className='mb-3'>
                    <label className='form-lable'>Description</label>
                    <textarea name='description' className='form-control' rows="10" onChange={handleChange}
                    value={formData.description}></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-lable'>Date & Time</label>
                    <input type="datetime-local" className='form-control' name='duedate' onChange={handleChange} value={formData.duedate}/>
                </div>
                <p>{message}</p>
                {
                    !isUpdate?
                <div className='p-2'>
                <button className='btn btn-info' onClick={onSubmit}>{isUpdate? "Update Task":"Submit"}</button>
                </div>
                :
                <div className='p-2'>
                    <button className='btn btn-primary me-3' onClick={onUpdate}>Update Task</button>
                    <button className='btn btn-warning'>Cancel</button>
                </div>
                }
             </form>
            </div>
        </div>
    );
}

export default TaskForm;