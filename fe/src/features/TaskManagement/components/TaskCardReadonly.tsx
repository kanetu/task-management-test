import { useContext, useMemo, useState } from "react";
import { TaskListContext } from "..";
import { Task } from "../../../interfaces";
import TaskCard from "./TaskCard";
import TaskCardForm from "./TaskCardForm";

interface TaskCardReadonlyProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onComplete: (task: Task) => void;
}
const TaskCardReadonly: React.FC<TaskCardReadonlyProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const { refresh } = useContext(TaskListContext);
  const [isAddNewChild, setIsAddNewChild] = useState(false);

  const isDisallowComplete = useMemo(
    () => (task.children || [])?.filter((child) => !child.complete).length > 0,
    [task]
  );

  const isDisallowDelete = useMemo(
    () => (task.children || [])?.length > 0,
    [task]
  );

  const toggleAddNewChild = () => {
    setIsAddNewChild(!isAddNewChild);
  };

  const handleDelete = () => {
    onDelete(task._id!);
  };

  const handleComplete = () => {
    onComplete({ ...task, complete: true });
  };

  const handleAddNewChild = async (childTask: Task) => {
    try {
      const childTaskWithParentId = {
        ...childTask,
        parentId: task._id,
      };
      const response = await fetch("http://localhost:3002/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(childTaskWithParentId),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse and log the response JSON
      const data = await response.json();
      console.log("Task added successfully:", data);
      setIsAddNewChild(false);
      refresh();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const renderSubtasks = () =>
    (task.children || []).length > 0 ? (
      <>({(task.children || []).length})</>
    ) : null;

  const renderAddNewChild = () =>
    !task.complete ? (
      <button onClick={toggleAddNewChild}>Add New Child</button>
    ) : null;

  return (
    <div
      style={{
        border: "1px solid black",
        width: "calc(100% - 20px)",
        margin: "10px 0",
        padding: "5px",
      }}
    >
      <h4>
        {task.title}
        {renderSubtasks()}
        <button onClick={onEdit} style={{ marginRight: "5px" }}>
          Edit
        </button>
        <button
          onClick={handleDelete}
          style={{ marginRight: "5px" }}
          disabled={isDisallowDelete}
        >
          Delete
        </button>
        {!task.complete ? (
          <button onClick={handleComplete} disabled={isDisallowComplete}>
            Complete
          </button>
        ) : (
          <span style={{ backgroundColor: "green", color: "white" }}>
            Completed
          </span>
        )}
      </h4>
      <span>{task.desc}</span>
      <div className="child">
        {renderAddNewChild()}

        {isAddNewChild ? (
          <TaskCardForm
            cardTitle="Add New Task"
            task={{
              title: "",
              desc: "",
              complete: false,
            }}
            onSubmit={handleAddNewChild}
            onClose={toggleAddNewChild}
          />
        ) : null}
        {task.children?.map((child) => (
          <div key={child._id}>
            <TaskCard task={child} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCardReadonly;
