import {
  SHOW_EDIT_PROJECT,
  HIDE_EDIT_PROJECT,
  SHOW_CREATE_PROJECT,
  HIDE_CREATE_PROJECT,
  SHOW_CREATE_TASK,
  HIDE_CREATE_TASK,
  SHOW_CREATE_NEWS_ITEM,
  HIDE_CREATE_NEWS_ITEM,
  SHOW_EDIT_NEWS_ITEM,
  HIDE_EDIT_NEWS_ITEM
} from "./ActionTypes";

export function showEditProject(project) {
  return { type: SHOW_EDIT_PROJECT, payload: project };
}

export function hideEditProject() {
  return { type: HIDE_EDIT_PROJECT };
}

export function showCreateProject() {
  return { type: SHOW_CREATE_PROJECT };
}

export function hideCreateProject() {
  return { type: HIDE_CREATE_PROJECT };
}

export function showCreateTask(payload) {
  return { type: SHOW_CREATE_TASK, payload: payload };
}

export function hideCreateTask() {
  return { type: HIDE_CREATE_TASK };
}

export function showCreateNewsItem() {
  return { type: SHOW_CREATE_NEWS_ITEM };
}

export function hideCreateNewsItem() {
  return { type: HIDE_CREATE_NEWS_ITEM };
}

export function showEditNewsItem(newsItem) {
  return { type: SHOW_EDIT_NEWS_ITEM, payload: newsItem };
}

export function hideEditNewsItem() {
  return { type: HIDE_EDIT_NEWS_ITEM };
}
