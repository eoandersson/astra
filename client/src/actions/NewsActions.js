import {
  ADD_NEWS_ITEM,
  EDIT_NEWS_ITEM,
  DELETE_NEWS_ITEM,
  ADD_NEWS_ITEM_LIST
} from "./ActionTypes";

export function handleAddNewsItem(newsItem) {
  return { type: ADD_NEWS_ITEM, payload: newsItem };
}

export function editNewsItem(newsItem) {
  return { type: EDIT_NEWS_ITEM, payload: newsItem };
}

export function removeNewsItem(newsItem) {
  return { type: DELETE_NEWS_ITEM, payload: newsItem };
}

export function handleAddNewsItemList(newsItems) {
  return { type: ADD_NEWS_ITEM_LIST, payload: newsItems };
}
