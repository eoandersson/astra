const initialState = {
  visibility: false,
  projectName: "",
  users: [],
  usersMap: []
};

export default function createProject(state = initialState, action) {
  switch (action.type) {
    case "SHOW-CREATE":
      return Object.assign({}, state, {
        visibility: true
      });
    case "HIDE-CREATE":
      return initialState;
    default:
      return state;
  }
}
