import {
  SHOW_PROJECT_SIDEBAR,
  HIDE_PROJECT_SIDEBAR,
  GO_TO_PROJECT
} from "./ActionTypes";

export function showProjectSidebar() {
  return { type: SHOW_PROJECT_SIDEBAR };
}

export function hideProjectSidebar() {
  return { type: HIDE_PROJECT_SIDEBAR };
}

export function goToProject(index) {
  return { type: GO_TO_PROJECT, payload: index };
}
