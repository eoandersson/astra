import {
  LOGIN_LOADING,
  LOGIN_FINISHED,
  REGISTER_LOADING,
  REGISTER_FINISHED,
  PROJECTS_LOADING,
  PROJECTS_FINISHED,
  NEWS_LOADING,
  NEWS_FINISHED
} from "../actions/ActionTypes";

const initialState = {
  loginLoading: false,
  registerLoading: false,
  projectsLoading: false,
  newsLoading: false
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return Object.assign({}, state, {
        loginLoading: true
      });
    case LOGIN_FINISHED:
      return Object.assign({}, state, {
        loginLoading: false
      });
    case REGISTER_LOADING:
      return Object.assign({}, state, {
        registerLoading: true
      });
    case REGISTER_FINISHED:
      return Object.assign({}, state, {
        registerLoading: false
      });
    case PROJECTS_LOADING:
      return Object.assign({}, state, {
        projectsLoading: true
      });
    case PROJECTS_FINISHED:
      return Object.assign({}, state, {
        projectsLoading: false
      });
    case NEWS_LOADING:
      return Object.assign({}, state, {
        newsLoading: true
      });
    case NEWS_FINISHED:
      return Object.assign({}, state, {
        newsLoading: false
      });
    default:
      return state;
  }
}
