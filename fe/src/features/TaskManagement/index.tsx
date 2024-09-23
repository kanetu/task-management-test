import { createContext, useEffect, useState } from "react";
import { Task } from "../../interfaces";
import TaskCard from "./components/TaskCard";
import TaskCardForm from "./components/TaskCardForm";

export const TaskListContext = createContext({
  refresh: () => {},
});

interface TaskManagementProps {}

const TaskManagement: React.FC<TaskManagementProps> = () => {
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3002/v1/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse and log the response JSON
      const data = await response.json();
      setTasks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getTasks();
    })();
  }, []);

  useEffect(() => {
    if (needRefresh) {
      (async () => {
        await getTasks();
      })();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  const toggleAddNewTask = () => {
    setIsAddNewTask(!isAddNewTask);
  };

  const handleAddNewTask = async (task: Task) => {
    try {
      const response = await fetch("http://localhost:3002/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse and log the response JSON
      const data = await response.json();
      console.log("Task added successfully:", data);
      setNeedRefresh(true);
      setIsAddNewTask(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div style={{ width: "300px" }}>
        <h3>Task Management ({tasks.length})</h3>
        <button onClick={toggleAddNewTask}>Add New Taks</button>

        {isAddNewTask ? (
          <TaskCardForm
            cardTitle="Add New Task"
            task={{
              title: "",
              desc: "",
              complete: false,
            }}
            onSubmit={handleAddNewTask}
            onClose={toggleAddNewTask}
          />
        ) : null}

        <TaskListContext.Provider
          value={{ refresh: () => setNeedRefresh(true) }}
        >
          <div>
            {tasks.length > 0
              ? tasks.map((task: any) => (
                  <div key={task._id}>
                    <TaskCard task={task} />
                  </div>
                ))
              : null}
          </div>
        </TaskListContext.Provider>
      </div>
    </div>
  );
};

export default TaskManagement;
