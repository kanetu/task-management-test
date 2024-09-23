import { useState } from "react";
import { Task } from "../../../interfaces";

interface TaskCardFormProps {
  cardTitle: string;
  task: Task;
  onSubmit: (data: Task) => void;
  onClose: () => void;
}
const TaskCardForm: React.FC<TaskCardFormProps> = ({
  cardTitle,
  task,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const onChangeDesc = (event: any) => {
    setDesc(event.target.value);
  };

  const onUpdateTask = () => {
    const data = {
      ...task,
      title,
      desc,
    };
    onSubmit(data);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "calc(100% - 20px)",
        margin: "10px 0",
        padding: "5px",
      }}
    >
      <h3>
        {cardTitle} <button onClick={onClose}>Close</button>
      </h3>
      <form>
        <h4>Title</h4>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
        <h4>Description</h4>
        <input type="text" name="desc" value={desc} onChange={onChangeDesc} />

        <button onClick={onUpdateTask} type="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskCardForm;
