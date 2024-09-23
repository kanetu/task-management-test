import { completeTask, createTask, deleteTask, getTask, getTasks, updateTask } from "./taskController"

const taskController = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    completeTask,
    deleteTask
}
export {
    taskController
}