import { combineReducers } from "redux";
import editModalVisibility from "./editModalVisibility";
import createProject from "./createProject";
import taskModalVisibility from "./taskModalVisibility";
import handleProject from "./handleProject";

export default combineReducers({
  editModalVisibility,
  createProject,
  taskModalVisibility,
  handleProject
});
