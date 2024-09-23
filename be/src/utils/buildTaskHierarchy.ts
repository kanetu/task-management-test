import { Task } from "../interfaces";


const nestChildren = (task: Task, allTasks: Task[]) => {
    const children = allTasks.filter(child => child.parentId?.toString() === task._id.toString());
    task.children = children.map(child => nestChildren(child, allTasks));
    return task;
}

const buildTaskHierarchy = (tasks: Task[]) => {
    return tasks.filter(task => task.parentId === null)
        .map(task => nestChildren(task, tasks));
}


export { nestChildren, buildTaskHierarchy }