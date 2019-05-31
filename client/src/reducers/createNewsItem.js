const initialState = {
  visibility: false,
  title: "",
  body: "",
  author: ""
};

export default function createNewsItem(state = initialState, action) {
  switch (action.type) {
    case "SHOW-CREATE-NEWS-ITEM":
      return Object.assign({}, state, {
        visibility: true
      });
    case "HIDE-CREATE-NEWS-ITEM":
      return initialState;
    default:
      return state;
  }
}
