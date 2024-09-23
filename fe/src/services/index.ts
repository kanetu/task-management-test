import { addTask, addTaskChild, completeTask, deleteTask, getTasks, updateTask } from "./taskServices";

const tasksService = {
    getTasks,
    addTask,
    deleteTask,
    completeTask,
    updateTask,
    addTaskChild
}

export { tasksService };

