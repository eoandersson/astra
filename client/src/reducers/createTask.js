const initialState = {
  visibility: false,
  projectId: "",
  name: "",
  description: "",
  state: false
};

export default function createTask(state = initialState, action) {
  switch (action.type) {
    case "SHOW-CREATE-TASK":
      return Object.assign({}, state, {
        visibility: true,
        projectId: action.payload.projectId
      });
    case "HIDE-CREATE-TASK":
      return initialState;
    default:
      return state;
  }
}
