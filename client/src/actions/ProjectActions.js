import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT_LIST
} from "./ActionTypes";

export function handleAddProject(project) {
  return { type: ADD_PROJECT, payload: project };
}

export function handleEditProject(payload) {
  return { type: EDIT_PROJECT, payload: payload };
}

export function handleDeleteProject(project) {
  return { type: DELETE_PROJECT, payload: project };
}

export function handleAddProjectList(projects) {
  return { type: ADD_PROJECT_LIST, payload: projects };
}
