import { SHOW_EDIT_PROJECT, HIDE_EDIT_PROJECT } from "../actions/ActionTypes";

const initialState = {
  project: {},
  visibility: false,
  projectId: "",
  projectName: "",
  projectDescription: "",
  usersMap: [],
  tasks: [],
  category: ""
};

export default function editProject(state = initialState, action) {
  switch (action.type) {
    case SHOW_EDIT_PROJECT:
      var usersMapObject = [];
      for(const user of action.payload.users) {
        usersMapObject.push({ name: user });
      }

      return Object.assign({}, state, {
        visibility: true,
        project: action.payload.project,
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        projectDescription: action.payload.projectDescription,
        usersMap: usersMapObject,
        tasks: action.payload.tasks,
        category: action.payload.category
      });
    case HIDE_EDIT_PROJECT:
      return initialState;
    default:
      return state;
  }
}
