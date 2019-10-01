import { store } from "../../store";
import {
  handleAddNewsItemList,
  setNewsLoading,
  setNewsFinished
} from "../../actions";

export default function getAllNewsItems() {
  store.dispatch(setNewsLoading());
  fetch("/news-service/news", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      const newsItems = responseJson;
      var outputArr = [];
      for (var i = 0; i < newsItems.length; i++) {
        outputArr[i] = newsItems[i];
      }
      store.dispatch(handleAddNewsItemList(outputArr));
      store.dispatch(setNewsFinished());
    });
}
