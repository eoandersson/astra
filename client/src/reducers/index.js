import { combineReducers } from "redux";
import editModalVisibility from "./EditProjectReducer";
import createProject from "./CreateProjectReducer";
import taskModalVisibility from "./CreateTaskReducer";
import handleProject from "./ProjectReducer";
import handleNews from "./NewsReducer";
import createNewsItem from "./CreateNewsItemReducer";
import editNewsItem from "./EditNewsItemReducer";
import userAuthentication from "./AuthenticationReducer";

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
