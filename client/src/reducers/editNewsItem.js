const initialState = {
  newsItem: {},
  newsId: "",
  visibility: false,
  title: "",
  body: "",
  author: "Karl"
};

export default function editNewsItem(state = initialState, action) {
  switch (action.type) {
    case "SHOW-EDIT-NEWS-ITEM":
      console.log(action.payload);
      return Object.assign({}, state, {
        visibility: true,
        newsItem: action.payload.newsItem,
        newsId: action.payload.newsId,
        title: action.payload.title,
        body: action.payload.body,
        author: "Karl"
      });
    case "HIDE-EDIT-NEWS-ITEM":
      return initialState;
    default:
      return state;
  }
}