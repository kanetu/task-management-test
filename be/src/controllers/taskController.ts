import { Request, Response } from 'express';
import { buildTaskHierarchy } from '../utils';
import { taskService } from '../services';
import { ObjectId } from 'mongodb';
import { Task } from '../interfaces';

const getTasks = async (req: Request, res: Response) => {
  let result;
  try {
    const rawData = await taskService.getTasks(req);
    result = buildTaskHierarchy([...(rawData || [])]);
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({
    data: result,
  });
};

const getTask = async (req: Request, res: Response) => {
  const { params } = req;
  let result;

  try {
    result = await taskService.getTask(req, params.id);
  } catch (err) {
    console.error(err);
  }

  if (!result) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  res.status(200).json({
    data: result,
  });
}

const createTask = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      complete: false
    };
    await taskService.createTask(req, task)
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Add task unsuccessfully",
    });
  }

  res.status(200).json({
    message: "Add task successfully",
  });
}

const updateTask = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;

  try {

    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      complete: body.complete
    };
    await taskService.updateTask(req, id, task)
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Update task unsuccessfully",
    });
  }

  res.status(200).json({
    message: "Update task successfully",
  });
}

const deleteTask = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    await taskService.deleteTask(req, res, id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Delete task unsuccessfully",
    });
  }

  res.status(200).json({
    message: "Delete task successfully",
  });
}

const completeTask = async (req: Request, res: Response) => {
  const {
    dbClient,
    params: { id },
    body,
  } = req;

  try {

    const task = {
      title: body.title,
      desc: body.desc,
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      complete: body.complete
    };
    await taskService.completeTask(req, res, id, task)
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
}
export { getTasks, getTask, createTask, updateTask, deleteTask, completeTask }