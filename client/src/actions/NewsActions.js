import {
  ADD_NEWS_ITEM,
  EDIT_NEWS_ITEM,
  DELETE_NEWS_ITEM,
  ADD_NEWS_ITEM_LIST
} from "./ActionTypes";

export function handleAddNewsItem(newsItem) {
  return { type: ADD_NEWS_ITEM, payload: newsItem };
}

export function handleEditNewsItems(newsItem) {
  return { type: EDIT_NEWS_ITEM, payload: newsItem };
}

export function handleDeleteNewsItem(newsItem) {
  return { type: DELETE_NEWS_ITEM, payload: newsItem };
}

export function handleAddNewsItemList(newsItems) {
  return { type: ADD_NEWS_ITEM_LIST, payload: newsItems };
}
