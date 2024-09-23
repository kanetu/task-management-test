import React from "react";
import { Task } from "../../../interfaces";
import TaskCard from './TaskCard';

interface TaskListProps {
    tasks: Task[]
}
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {

    if (tasks.length === 0) return null;

    return (
        <div>
            {tasks.map((task: any) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    )
}

export default TaskList;