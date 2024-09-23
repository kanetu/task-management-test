import { useEffect, useState } from "react";
import { Task } from "../../interfaces";
import { tasksService } from '../../services';
import AddNewTask from "./components/AddNewTask";
import TaskList from "./components/TaskList";
import { TaskListContext } from "./contexts/TaskListContext";

interface TaskManagementProps { }
const TaskManagement: React.FC<TaskManagementProps> = () => {
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const data = await tasksService.getTasks();
      setTasks(data.data)
    } catch (err) {
      console.error(err)
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
      await tasksService.addTask(task);
      setNeedRefresh(true);
      setIsAddNewTask(false);

    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div style={{ width: "300px" }}>
        <h3>Task Management ({tasks.length})</h3>
        <button onClick={toggleAddNewTask}>Add New Taks</button>
        <AddNewTask isAddNewTask={isAddNewTask} onSubmit={handleAddNewTask} onClose={toggleAddNewTask} />

        <TaskListContext.Provider
          value={{ refresh: () => setNeedRefresh(true) }}
        >
          <TaskList tasks={tasks} />
        </TaskListContext.Provider>
      </div>
    </div>
  );
};

export default TaskManagement;
