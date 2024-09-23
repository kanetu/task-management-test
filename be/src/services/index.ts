import { completeTask, createTask, deleteTask, getTask, getTasks, updateTask } from "./taskService"

const taskService = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    completeTask
}
export {
    taskService
}