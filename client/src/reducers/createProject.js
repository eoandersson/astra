const initialState = {
  visibility: false,
  projectId: "",
  projectName: "",
  users: [],
  tasks: []
};

export default function createProject(state = initialState, action) {
  switch (action.type) {
    case "SHOW-CREATE":
      return Object.assign({}, state, {
        visibility: true,
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        users: action.payload.users,
        tasks: action.payload.tasks
      });
    case "HIDE-CREATE":
      return Object.assign({}, state, {
        visibility: false,
        projectId: "",
        projectName: "",
        users: [],
        tasks: []
      });
    default:
      return state;
  }
}
