import {
  ADD_TASK,
  ADD_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
  DELETE_TASK,
  DELETE_SUBTASK
} from "./ActionTypes";

export function addTask(payload) {
  return { type: ADD_TASK, payload };
}

export function editTask(payload) {
  return { type: EDIT_TASK, payload };
}

export function removeTask(payload) {
  return { type: DELETE_TASK, payload };
}

export function addSubtask(payload) {
  return { type: ADD_SUBTASK, payload };
}

export function editSubtask(payload) {
  return { type: EDIT_SUBTASK, payload };
}

export function removeSubtask(payload) {
  return { type: DELETE_SUBTASK, payload };
}
