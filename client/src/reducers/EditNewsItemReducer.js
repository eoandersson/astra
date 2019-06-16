import {
  SHOW_EDIT_NEWS_ITEM,
  HIDE_EDIT_NEWS_ITEM
} from "../actions/ActionTypes";

const initialState = {
  newsItem: {},
  newsId: "",
  visibility: false,
  title: "",
  body: "",
  author: ""
};

export default function editNewsItem(state = initialState, action) {
  switch (action.type) {
    case SHOW_EDIT_NEWS_ITEM:
      return Object.assign({}, state, {
        visibility: true,
        newsItem: action.payload.newsItem,
        newsId: action.payload.newsId,
        title: action.payload.title,
        body: action.payload.body,
        author: action.payload.author
      });
    case HIDE_EDIT_NEWS_ITEM:
      return initialState;
    default:
      return state;
  }
}
