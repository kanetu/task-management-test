import { useContext, useState } from "react";
import { Task } from "../../../interfaces";
import { tasksService } from "../../../services";
import { TaskListContext } from "../contexts/TaskListContext";
import TaskCardForm from "./TaskCardForm";
import TaskCardReadonly from "./TaskCardReadonly";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [mode, setMode] = useState("read");

  const { refresh } = useContext(TaskListContext);
  const handleEdit = () => {
    setMode("edit");
  };

  const hanldeDelete = async (id: string) => {
    try {
      await tasksService.deleteTask(id)
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (data: Task) => {
    try {
      await tasksService.completeTask(data)
      refresh();
      setMode("read");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseEdit = () => {
    setMode("read");
  };

  const handleUpdate = async (data: Task) => {
    try {
      await tasksService.updateTask(data)
      refresh();
      setMode("read");
    } catch (err) {
      console.error(err);
    }
  };

  return mode === "read" ? (
    <TaskCardReadonly
      task={task}
      onEdit={handleEdit}
      onDelete={hanldeDelete}
      onComplete={handleComplete}
    />
  ) : (
    <TaskCardForm
      cardTitle="Update Task"
      onClose={handleCloseEdit}
      task={task}
      onSubmit={handleUpdate}
    />
  );
};

export default TaskCard;
