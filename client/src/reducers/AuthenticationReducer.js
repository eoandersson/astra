import { USER_SIGN_IN, USER_SIGN_OUT } from "../actions/ActionTypes";

const initialState = {
  username: "",
  signedIn: false
};

export default function userAuthentication(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_IN:
      console.log("Hej!");
      console.log(action.payload);
      return Object.assign({}, state, {
        username: action.payload,
        signedIn: true
      });
    case USER_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
