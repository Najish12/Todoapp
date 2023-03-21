import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';
import { dateFormat } from '../helper';

function TaskList(props) {
    const {taskList} = useContext(TodoContext)
    return (
        <div className=' container'>
            <div className="bg-primary text-white  p-5">
                <div className='d-flex'>
                    <h5>Task List</h5>
                    <Link className='btn btn-info ms-auto'>Create Task</Link>
                     </div>
                     <table className='table table-dark table-stripped'>
                        <thead>

                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taskList.map((item)=>{
                                    return(
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{dateFormat(item.duedate)}</td>
                                            <td><span className='px-2'><i class='fa-solid fa-eye'></i></span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                     </table>
            </div>
        </div>
    );
}

export default TaskList;