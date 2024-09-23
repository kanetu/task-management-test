import { useContext, useState } from "react";
import { TaskListContext } from "..";
import { Task } from "../../../interfaces";
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
      const response = await fetch(`http://localhost:3002/v1/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse and log the response JSON
      const data = await response.json();
      refresh();
      console.log("Task deleted successfully:", data);
    } catch (error) {
      console.error("Error delete task:", error);
    }
  };

  const handleComplete = async (data: Task) => {
    try {
      const response = await fetch(
        `http://localhost:3002/v1/tasks/complete/${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            complete: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
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
      const response = await fetch(
        `http://localhost:3002/v1/tasks/${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
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
