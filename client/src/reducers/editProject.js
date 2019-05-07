const initialState = {
  visibility: false,
  projectId: "",
  projectName: "",
  usersMap: [],
  users: [],
  tasks: []
};

export default function editProject(state = initialState, action) {
  switch (action.type) {
    case "SHOW-EDIT":
      var usersMapObject = [];
      action.payload.users.map(user => {
        usersMapObject.push({ name: user });
      });

      return Object.assign({}, state, {
        visibility: true,
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        usersMap: usersMapObject,
        users: action.payload.users,
        tasks: action.payload.tasks
      });
    case "HIDE-EDIT":
      return initialState;
    default:
      return state;
  }
}
