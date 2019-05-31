const initialState = {
  username: "",
  signedIn: false
};

export default function userAuthentication(state = initialState, action) {
  switch (action.type) {
    case "USER-SIGN-IN":
      console.log(action.payload);
      console.log(action.payload.username);
      return Object.assign({}, state, {
        username: action.payload,
        signedIn: true
      });
    default:
      return state;
  }
}
