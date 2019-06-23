import { DELETE_CATEGORY, ADD_CATEGORY } from "./ActionTypes";

export function addCategory(category) {
  return { type: ADD_CATEGORY, payload: category };
}

export function removeCategory(category) {
  return { type: DELETE_CATEGORY, payload: category };
}
