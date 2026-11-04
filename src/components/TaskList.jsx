
import { useState } from "react";
import {
  EditIcon,
  DeleteIcon,
  SaveIcon,
  CancelIcon,
} from "./Icons";

function TaskList({
  tasks,
  searchTerm,
  filterStatus,
  filterPriority,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium");

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedPriority(task.priority || "Medium");
  }

  function handleSave(taskId) {
    if (editedTitle.trim() === "") {
      return;
    }

    onEditTask(
      taskId,
      editedTitle.trim(),
      editedPriority
    );

    setEditingTaskId(null);
    setEditedTitle("");
    setEditedPriority("Medium");
  }

  function handleCancel() {
    setEditingTaskId(null);
    setEditedTitle("");
    setEditedPriority("Medium");
  }

  if (tasks.length === 0) {
  let emptyMessage = "You don't have any tasks yet.";

  if (searchTerm && filterPriority !== "All") {
    emptyMessage = `No ${filterPriority.toLowerCase()} priority tasks match your search.`;
  } else if (searchTerm) {
    emptyMessage = "No tasks match your search.";
  } else if (filterPriority !== "All") {
    emptyMessage = `No ${filterPriority.toLowerCase()} priority tasks.`;
  } else if (filterStatus === "Pending") {
    emptyMessage = "No pending tasks.";
  } else if (filterStatus === "Completed") {
    emptyMessage = "No completed tasks.";
  }

  return <p className="empty-message">{emptyMessage}</p>;
}

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-row" key={task.id}>
          <div className="task-information">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />

            {editingTaskId === task.id ? (
              <input
                className="task-edit-input"
                type="text"
                value={editedTitle}
                onChange={(event) =>
                  setEditedTitle(event.target.value)
                }
              />
            ) : (
              <span
                className={
                  task.completed
                    ? "task-title completed"
                    : "task-title"
                }
              >
                {task.title}
              </span>
            )}
          </div>

          <div className="task-actions">
            <div className="task-labels">
              {editingTaskId === task.id ? (
                <select
                  className="priority-edit-select"
                  value={editedPriority}
                  onChange={(event) =>
                    setEditedPriority(event.target.value)
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              ) : (
                <span
                  className={`priority-label priority-${(
                    task.priority || "Medium"
                  ).toLowerCase()}`}
                >
                  {task.priority || "Medium"}
                </span>
              )}

              <span
                className={
                  task.completed
                    ? "task-status completed-status"
                    : "task-status"
                }
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>

            {editingTaskId === task.id ? (
              <>
                <button
                  className="edit-button save-button"
                  onClick={() => handleSave(task.id)}
                  title="Save changes"
                  type="button"
                >
                  <SaveIcon />
                </button>

                <button
                  className="cancel-button"
                  onClick={handleCancel}
                  title="Cancel editing"
                  type="button"
                >
                  <CancelIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(task)}
                  title="Edit task"
                  type="button"
                >
                  <EditIcon />
                </button>

                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                  title="Delete task"
                  type="button"
                >
                  <DeleteIcon />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
