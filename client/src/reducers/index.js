import { combineReducers } from "redux";
import editProject from "./editProject";
import createProject from "./createProject";

export default combineReducers({
  editProject,
  createProject
});
