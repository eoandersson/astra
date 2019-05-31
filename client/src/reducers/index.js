import { combineReducers } from "redux";
import editModalVisibility from "./editModalVisibility";
import createProject from "./createProject";
import taskModalVisibility from "./taskModalVisibility";
import handleProject from "./handleProject";
import handleNews from "./handleNews";
import createNewsItem from "./createNewsItem";
import editNewsItem from "./editNewsItem";
import userAuthentication from "./userAuthentication";

export default combineReducers({
  editModalVisibility,
  createProject,
  taskModalVisibility,
  handleProject,
  handleNews,
  createNewsItem,
  editNewsItem,
  userAuthentication
});
