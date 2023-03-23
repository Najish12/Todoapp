import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';
import TodoContext, { TodoProvider } from '../context/TodoContext';
import { dateFormat } from '../helper';

function reducer(state, action){
    switch(action.type){
        case 'view': return {type: "view", data: action.payload};
        case 'edit': return {type: "edit", data: action.payload};
        case 'delete': return {type: "delete", data: action.payload};
        default: return state;
    }
}

const init = {
    type: "",
    data: ""
}
function TaskList(props) {
    const {taskList} = useContext(TodoContext);
    const [state, dispatch] = useReducer(reducer, init);
    return (
        <div className='container'>
            <div className='bg-primary text-white p-5'>
                <div className='d-flex'>
                <h5>Task List</h5>
                <Link to='/create-task' className='btn btn-info ms-auto'>Create Task</Link>
                </div>
                <table className='table table-dark table-hover'>
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
                                        <td><span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"view", payload:item})}}><i class="fa-solid fa-eye"></i></span>

                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"edit", payload:item})}}><i class="fa-solid fa-pen-to-square"></i></span>

                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"delete", payload:item. id})}}><i class="fa-solid fa-trash-can"></i></span></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Popup type= {state.type} data={state.data}/>
        </div>
    );
}

export default TaskList;