interface Task {
  _id?: string;
  title: string;
  desc: string;
  parentId?: string;
  children?: Task[];
  complete: boolean;
}

export default Task;
