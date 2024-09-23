import { ObjectId } from "mongodb"

interface Task {
    _id: ObjectId,
    title: string,
    complete: boolean,
    desc: string,
    children?: Task[],
    parentId?: ObjectId
}

export default Task