import { Task } from "../models/taskModel.js";
import ErrorHandler from "../utils/Errorclass.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(200).json({
      success: true,
      message: "Task Created",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Invalid ID", 404));
    }

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Updated Task",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Invalid ID", 404));
    }
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted Task",
    });
  } catch (error) {
    next(error);
  }
};
