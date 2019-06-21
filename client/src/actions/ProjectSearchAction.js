import {
  SHOW_PROJECT_SIDEBAR,
  HIDE_PROJECT_SIDEBAR,
  GO_TO_PROJECT,
  SHOW_CATEGORY,
  HIDE_CATEGORY,
  MOVE_PROJECT
} from "./ActionTypes";

export function showProjectSidebar() {
  return { type: SHOW_PROJECT_SIDEBAR };
}

export function hideProjectSidebar() {
  return { type: HIDE_PROJECT_SIDEBAR };
}

export function goToProject(payload) {
  return { type: GO_TO_PROJECT, payload: payload };
}

export function showCategory(category) {
  return { type: SHOW_CATEGORY, payload: category };
}

export function hideCategory(category) {
  return { type: HIDE_CATEGORY, payload: category };
}

export function changeProjectCategory(payload) {
  return { type: MOVE_PROJECT, payload: payload };
}
