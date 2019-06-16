import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT_LIST
} from "./ActionTypes";

export function handleAddProject(payload) {
  return { type: ADD_PROJECT, payload };
}

export function handleEditProject(payload) {
  return { type: EDIT_PROJECT, payload: payload };
}

export function handleDeleteProject(payload) {
  return { type: DELETE_PROJECT, payload };
}

export function handleAddProjectList(projects) {
  return { type: ADD_PROJECT_LIST, payload: projects };
}
