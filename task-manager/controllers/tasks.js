const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const createCustomError = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOne({ _id: TaskId });
  if (!task) {
    return next(createCustomError(`No Task Found for id : ${TaskId}`, 404));
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskId });
  if (!task) {
    return next(createCustomError(`No Task Found for id : ${TaskId}`, 404));
  }
  res.status(200).json(task);
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: TaskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No Task Found for id : ${TaskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
