import React from "react";
import { Task } from "../../../interfaces";
import TaskCardForm from "./TaskCardForm";


interface AddNewTaskProps {
    isAddNewTask: boolean,
    onSubmit: (data: Task) => void,
    onClose: () => void
}
const AddNewTask: React.FC<AddNewTaskProps> = ({ isAddNewTask, onSubmit, onClose }) => {

    const initialTask: Task = {
        title: "",
        desc: "",
        complete: false,
    }

    return isAddNewTask ? (
        <TaskCardForm
            cardTitle="Add New Task"
            task={initialTask}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    ) : null
}

export default AddNewTask