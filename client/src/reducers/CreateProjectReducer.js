import {
  SHOW_CREATE_PROJECT,
  HIDE_CREATE_PROJECT
} from "../actions/ActionTypes";

const initialState = {
  visibility: false,
  projectName: "",
  users: [],
  usersMap: []
};

export default function createProject(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_PROJECT:
      return Object.assign({}, state, {
        visibility: true
      });
    case HIDE_CREATE_PROJECT:
      return initialState;
    default:
      return state;
  }
}
