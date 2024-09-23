import { useContext, useMemo, useState } from "react";
import { Task } from "../../../interfaces";
import { tasksService } from "../../../services";
import { TaskListContext } from "../contexts/TaskListContext";
import AddNewTask from "./AddNewTask";
import TaskList from "./TaskList";

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
      await tasksService.addTaskChild(task._id!, childTask)
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
        <AddNewTask isAddNewTask={isAddNewChild} onSubmit={handleAddNewChild} onClose={toggleAddNewChild} />
        <TaskList tasks={task.children || []} />
      </div>
    </div>
  );
};

export default TaskCardReadonly;
