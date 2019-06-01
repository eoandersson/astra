import { SHOW_CREATE_TASK, HIDE_CREATE_TASK } from "../actions/ActionTypes";

const initialState = {
  project: {},
  visibility: false,
  projectId: "",
  name: "",
  description: "",
  state: false
};

export default function taskModalVisibility(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_TASK:
      return Object.assign({}, state, {
        visibility: true,
        projectId: action.payload.projectId,
        project: action.payload.project
      });
    case HIDE_CREATE_TASK:
      return initialState;
    default:
      return state;
  }
}