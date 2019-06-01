import {
  SHOW_CREATE_NEWS_ITEM,
  HIDE_CREATE_NEWS_ITEM
} from "../actions/ActionTypes";

const initialState = {
  visibility: false,
  title: "",
  body: "",
  author: ""
};

export default function createNewsItem(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_NEWS_ITEM:
      return Object.assign({}, state, {
        visibility: true
      });
    case HIDE_CREATE_NEWS_ITEM:
      return initialState;
    default:
      return state;
  }
}
