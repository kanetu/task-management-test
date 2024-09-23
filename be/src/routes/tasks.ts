import express from "express";
import { ObjectId } from "mongodb";
import { buildTaskHierarchy } from '../utils'
import { Task } from "../interfaces";

const router = express.Router();

router.get("/", async (req, res) => {
  const { dbClient } = req;

  let result;
  try {
    await dbClient.connect();

    const db = dbClient.db("task-management");
    const rawData = await db.collection("tasks").find<Task>({}).toArray();
    result = buildTaskHierarchy([...rawData]);

  } catch (err) {
    console.error(err);
  } finally {
    await dbClient.close();
  }

  return res.status(200).json({
    data: result,
  });
});

router.get("/:id", async (req, res) => {
  const { dbClient, params } = req;
  let result;

  try {
    await dbClient.connect();

    const db = dbClient.db("task-management");

    result = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(params.id) });
  } catch (err) {
    console.error(err);
  } finally {
    await dbClient.close();
  }

  if (!result) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  res.status(200).json({
    data: result,
  });
});

router.post("/", async (req, res) => {
  const { dbClient, body } = req;

  try {
    await dbClient.connect();
    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      complete: false
    };
    const db = dbClient.db("task-management");
    await db.collection("tasks").insertOne(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Add task unsuccessfully",
    });
  } finally {
    await dbClient.close();
  }

  res.status(200).json({
    message: "Add task successfully",
  });
});

router.patch("/:id", async (req, res) => {
  const {
    dbClient,
    params: { id },
    body,
  } = req;

  try {
    await dbClient.connect();

    const db = dbClient.db("task-management");
    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
    };

    await db
      .collection("tasks")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Update task unsuccessfully",
    });
  } finally {
    await dbClient.close();
  }

  res.status(200).json({
    message: "Update task successfully",
  });
});

router.patch("/complete/:id", async (req, res) => {
  const {
    dbClient,
    params: { id },
    body,
  } = req;

  try {
    await dbClient.connect();

    const db = dbClient.db("task-management");
    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      complete: body.complete
    };

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
    return res.status(500).json({
      message: "Complete task unsuccessfully",
    });
  } finally {
    await dbClient.close();
  }

  res.status(200).json({
    message: "Complete task successfully",
  });
});

router.delete("/:id", async (req, res) => {
  const {
    dbClient,
    params: { id },
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

    if (childTasks.length > 0) {
      return res.status(403).json({
        message: "Can not delete this task",
      });
    }

    await db.collection("tasks").findOneAndDelete({ _id: new ObjectId(id) })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Delete task unsuccessfully",
    });
  } finally {
    await dbClient.close();
  }

  res.status(200).json({
    message: "Delete task successfully",
  });
});

export default router;
