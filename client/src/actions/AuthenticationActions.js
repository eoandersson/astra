import { USER_SIGN_IN, USER_SIGN_OUT } from "./ActionTypes";

export function userSignIn(username) {
  return { type: USER_SIGN_IN, payload: username };
}

export function userSignOut() {
  return { type: USER_SIGN_OUT };
}
