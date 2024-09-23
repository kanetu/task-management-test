import express from "express"
import tasksRouter from "./tasks";
const routes = express.Router()

routes.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
routes.use('/tasks', tasksRouter)

export default routes

