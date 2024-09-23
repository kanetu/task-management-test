import express from "express"
import tasksRouter from "./tasks";
const routes = express.Router()

routes.get('/', (req, res) => {
  res.status(200).json('Express');
});
routes.use('/tasks', tasksRouter)

export default routes

