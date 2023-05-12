import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TodoContext from '../context/TodoContext';
import { dateFormat } from '../helper';

function CreateTask(props) {
    const { latestTask, recentTask } = useContext(TodoContext);
    const [isUpdate, setIsUpdate]= useState(false);
    const editTask = ()=>{
        setIsUpdate(true);
    }
    const cancelTask = ()=>{
        setIsUpdate(false);
    }

    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 h-100 d-flex flex-column justify-content-center align-items-center bg-primary">
                    <TaskForm data={latestTask} isUpdate={isUpdate} cancelTask={cancelTask}/>
                </div>
                <div className="col-lg-6 h-100 d-flex flex-column align-items-center justify-content-center">
                   <div className='card bg-primary w-75 text-white'>
                        <div className='card-header d-flex bg-primary border-0'>
                            <h3>Latest Task</h3>
                            <button className='btn btn-info ms-auto' onClick={editTask}>Edit Task</button>
                        </div>
                        <div className='card-body'>
                            <h5 className='card-title'>{latestTask?.title}</h5>
                            <p>{latestTask?.description}</p>
                        </div>
                        <div className="card-footer d-flex">
                            <p>Modified On: {dateFormat(latestTask?.modifiedOn)}</p>
                            <p className='ms-auto'>Due On: {dateFormat(latestTask?.duedate)}</p>
                        </div>
                   </div>

                    <div className='card bg-primary w-75 text-white mt-5'>
                        <div className='card-header'>
                           <h3>Recent Tasks</h3>
                        </div>
                        <div className="card-body">
                            {
                                recentTask.map((item)=>{
                                    return (
                                    <div key={item.id} className='d-flex border-1 border border-warning align-items-center px-3 py-2'>
                                        <p className='text-warning mb-0'>{item.title}</p>
                                        <p className='text-warning ms-auto mb-0'>{dateFormat(item.duedate)}</p>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <Link to='/task-list' className='text-primary fw-bold'>View All</Link>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;