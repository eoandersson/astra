import { ADD_TASK, EDIT_TASK, DELETE_TASK } from "./ActionTypes";

export function addTask(payload) {
  return { type: ADD_TASK, payload: payload };
}

export function editTask(payload) {
  return { type: EDIT_TASK, payload: payload };
}

export function deleteTask(payload) {
  return { type: DELETE_TASK, payload: payload };
}
