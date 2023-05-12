import React, { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";

function TaskForm(props) {
  const init = {
    title: "",
    description: "",
    duedate: "",
  };
  const [formData, setFormData] = useState(init);
  const { userData, createTask, message, updateTask } = useContext(TodoContext);
  const { data, isUpdate, cancelTask, closeModal } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      userId: userData.id,
      modifiedOn: Date(),
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    updateTask(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
  };

  const onCancel = (e) => {
    e.preventDefault();
    cancelTask();
    setFormData(init);
    closeModal();
  };

  useEffect(() => {
    if (data && isUpdate) {
      setFormData(data);
    }
  }, [data, isUpdate]);

  return (
    <div className="p-5">
      <h2 className="text-white fw-bold">
        {isUpdate ? "Update Task" : "Create Task"}
      </h2>
      <div className="p-4 bg-white">
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="10"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="duedate"
              onChange={handleChange}
              value={formData.duedate}
            />
          </div>
          {message}
          {!isUpdate ? (
            <div className="p-2">
              <button className="btn btn-primary" onClick={onSubmit}>
                Create Task
              </button>
            </div>
          ) : (
            <div className="p-2">
              <button className="btn btn-primary me-3" onClick={onUpdate}>
                Update Task
              </button>
              <button className="btn btn-warning" onClick={onCancel}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
