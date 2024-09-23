import { ObjectId } from "mongodb";
import { Task } from "../interfaces";
import { Request, Response } from "express";

const getTasks = async (req: Request): Promise<Task[] | undefined> => {

    const { dbClient } = req;
    let result;
    try {
        await dbClient.connect();
        const db = dbClient.db("task-management");
        result = await db.collection("tasks").find<Task>({}).toArray()
    } catch (err) {
      console.error(err);
    } finally {
      await dbClient.close();
    }
    
    return result;

};

const getTask = async (req: Request, id: string) => {
    const { dbClient } = req;
    let result;

    try {
        await dbClient.connect();
    
        const db = dbClient.db("task-management");
    
        result = await db
          .collection("tasks")
          .findOne({ _id: new ObjectId(id) });
      } catch (err) {
        console.error(err);
      } finally {
        await dbClient.close();
      }
    return result;
}

const createTask = async (req: Request, task: Task) => {
    const { dbClient } = req;
    try {
        await dbClient.connect();
        const db = dbClient.db("task-management");
        await db.collection("tasks").insertOne(task);
      } catch (err) {
        console.error(err);
      } finally {
        await dbClient.close();
      }
}

const updateTask = async (req: Request, id: string, task: Task) => {
    const { dbClient } = req;
    try {
        await dbClient.connect();
        const db = dbClient.db("task-management");
        await db
          .collection("tasks")
          .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: task });
      } catch (err) {
        console.error(err);
      } finally {
        await dbClient.close();
      }
}

const deleteTask = async (req: Request, res: Response,id: string) => {
    const { dbClient } = req;

    try {
        await dbClient.connect();
    
        const db = dbClient.db("task-management");
    
        const childTasks = await db.collection("tasks").aggregate<Task>([
          {
            $match: { parentId: new ObjectId(id) }
          },
          {
            $lookup: {
              from: "tasks",
              localField: "_id",
              foreignField: "parentId",
              as: "children"
            }
          }
        ]).toArray();
    
        if (childTasks.length > 0) {
          return res.status(403).json({
            message: "Can not delete this task",
          });
        }
    
        await db.collection("tasks").findOneAndDelete({ _id: new ObjectId(id) })
      } catch (err) {
        console.error(err);
      } finally {
        await dbClient.close();
      }
}

const completeTask = async (req: Request, res: Response,id: string, task: Task) => {
    const {
        dbClient,
      } = req;
    
      try {
        await dbClient.connect();
    
        const db = dbClient.db("task-management");
         
        const childTasks = await db.collection("tasks").aggregate<Task>([
          {
            $match: { parentId: new ObjectId(id) }
          },
          {
            $lookup: {
              from: "tasks",
              localField: "_id",
              foreignField: "parentId",
              as: "children"
            }
          }
        ]).toArray();
    
        const unCompleteChildrenIndex = childTasks.findIndex(child => !child.complete);
        if (unCompleteChildrenIndex > -1) {
          return res.status(403).json({
            message: "Can not complete this task",
          });
        }
    
        await db
          .collection("tasks")
          .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: task });
      } catch (err) {
        console.error(err);
      } finally {
        await dbClient.close();
      }
}
export {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    completeTask
}