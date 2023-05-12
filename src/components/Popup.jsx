import React, { useContext, useRef } from "react";
import TodoContext from "../context/TodoContext";
import { dateFormat } from "../helper";
import TaskForm from "./TaskForm";

function Popup(props) {

  const { type, data, cancelTask } = props;
  const { message, deleteTask }=useContext(TodoContext);

  // console.log({type, data})

  const closebtn = useRef();


  const closeModal=()=>{
    closebtn.current.click();
  }

  const onDelete=()=>{
    deleteTask(data);
  }

  return (
    <div className="modal" tabIndex="-1" id="task-modal">
      <div className="modal-dialog mw-100 w-50">
        <div className="modal-content bg-primary">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closebtn}
            ></button>
          </div>
          <div className="modal-body">     
            {/* view task  */}

              { type === "view" ?
              <div className="p-3 text-white">
                  <h5>{data?.title}</h5>
                  <p>{data?.description}</p>
                  <div className="d-flex text-warning">
                      <p>Modified On: {dateFormat(data?.modifiedOn)}</p>
                      <p className="ms-auto">Due On: {dateFormat(data?.duedate)}</p>
                  </div>
              </div>
                : type === "edit" ?
              <div className="p-3">
                  <TaskForm closeModal={closeModal} isUpdate="true" data={data} cancelTask={cancelTask}/>
              </div>
              :
              <div className="p-3 text-white">
                {message !== "" ? <p>{message}</p> : <p>Are you sure, you want to delete this task ?</p>}
                
                <button className="btn btn-danger" onClick={onDelete}>Yes</button>
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cancel</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


export default Popup;
