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
    case "SHOW-CREATE-TASK":
      return Object.assign({}, state, {
        visibility: true,
        projectId: action.payload.projectId,
        project: action.payload.project
      });
    case "HIDE-CREATE-TASK":
      return initialState;
    default:
      return state;
  }
}
