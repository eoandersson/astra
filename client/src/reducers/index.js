import { combineReducers } from "redux";
import editProject from "./editProject";
import createProject from "./createProject";
import createTask from "./createTask";

export default combineReducers({
  editProject,
  createProject,
  createTask
});
