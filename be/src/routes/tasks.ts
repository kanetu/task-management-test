import express from "express";
import { ObjectId } from "mongodb";
import { Task } from "../interfaces";
import { taskController } from "../controllers";

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.patch("/complete/:id", taskController.completeTask);
router.delete("/:id", taskController.deleteTask);

export default router;
