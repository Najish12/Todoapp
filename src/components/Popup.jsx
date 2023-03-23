import React from 'react';
import TaskForm from "./TaskForm";
import { dateFormat } from '../helper';

function Popup(props) {

  const {type, data} = props;
  console.log({type, data})
    return (
        <div className="modal" tabIndex="-1" id="task-modal">
  <div className="modal-dialog mw-100 w-50">
    <div className="modal-content bg-primary">
      <div className="modal-header">
        {/* <h5 className="modal-title">Modal title</h5> */}
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body ">
 
          {/* view task */}

          { type ==="view"  && data.id ?
        <div className='p-3 text-white'>

          <h5>{data?.title}</h5>
          <p>{data?.description}</p>
          <div className='d-flex'>
            <p>Modified on: {dateFormat (data?.duedate)}</p>
            <p className='ms-auto'>Due On: {dateFormat(data?.duedate)}</p>

          </div>

        </div>
        : type ==="edit" ?
        <div p-3>
          <TaskForm isUpdate="true" data="data" />
          
        </div>
        :
        <div className='p-3 text-white'>
            Delete
            </div>
}

      </div>
      {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
    );
}

export default Popup;