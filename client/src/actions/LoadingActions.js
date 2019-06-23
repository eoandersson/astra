import {
  LOGIN_LOADING,
  LOGIN_FINISHED,
  REGISTER_LOADING,
  REGISTER_FINISHED,
  PROJECTS_LOADING,
  PROJECTS_FINISHED,
  NEWS_LOADING,
  NEWS_FINISHED
} from "./ActionTypes";

export function setLoginLoading() {
  return { type: LOGIN_LOADING };
}

export function setLoginFinished() {
  return { type: LOGIN_FINISHED };
}

export function setRegisterLoading() {
  return { type: REGISTER_LOADING };
}

export function setRegisterFinished() {
  return { type: REGISTER_FINISHED };
}

export function setProjectsLoading() {
  return { type: PROJECTS_LOADING };
}

export function setProjectsFinished() {
  return { type: PROJECTS_FINISHED };
}

export function setNewsLoading() {
  return { type: NEWS_LOADING };
}

export function setNewsFinished() {
  return { type: NEWS_FINISHED };
}
