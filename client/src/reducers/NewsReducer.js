import {
  ADD_NEWS_ITEM,
  EDIT_NEWS_ITEM,
  DELETE_NEWS_ITEM,
  ADD_NEWS_ITEM_LIST
} from "../actions/ActionTypes";

const initialState = {
  newsItems: []
};

export default function handleNewsItems(state = initialState, action) {
  var newsItemList = [];
  var newsItemIndex = 0;

  var getEqualNewsItem = function() {
    newsItemList = state.newsItems;
    var timeStamp = action.payload.newsItem.newsId.timeStamp;
    var machineIdentifier = action.payload.newsItem.newsId.machineIdentifier;
    var processIdentifier = action.payload.newsItem.newsId.processIdentifier;
    var counter = action.payload.newsItem.newsId.counter;

    for (var i = 0; i < newsItemList.length; i++) {
      if (
        newsItemList[i].newsId.timeStamp === timeStamp &&
        newsItemList[i].newsId.machineIdentifier === machineIdentifier &&
        newsItemList[i].newsId.processIdentifier === processIdentifier &&
        newsItemList[i].newsId.counter === counter
      ) {
        return i;
      }
    }
    return -1;
  };

  switch (action.type) {
    case ADD_NEWS_ITEM:
      newsItemList = state.newsItems;
      newsItemList.push(action.payload.newsItem);

      return Object.assign({}, state, {
        newsItems: newsItemList
      });
    case EDIT_NEWS_ITEM:
      newsItemList = state.newsItems;
      newsItemIndex = getEqualNewsItem();

      newsItemList[newsItemIndex].title = action.payload.title;
      newsItemList[newsItemIndex].body = action.payload.body;

      return Object.assign({}, state, {
        newsItems: newsItemList
      });
    case DELETE_NEWS_ITEM:
      newsItemList = state.newsItems;
      newsItemIndex = getEqualNewsItem();
      if (newsItemIndex !== -1) {
        newsItemList.splice(newsItemIndex, 1);
      }
      return Object.assign({}, state, {
        newsItems: newsItemList
      });
    case ADD_NEWS_ITEM_LIST:
      return Object.assign({}, state, {
        newsItems: action.payload
      });
    default:
      return state;
  }
}
