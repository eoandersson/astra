import store from "../../store";
import { editNewsItem, hideEditNewsItem } from "../../actions";

export default function updateNewsItem(input) {
  const { newsItem, newsId, title, body, author } = input;
  fetch("/news-service/news", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      newsId: newsId,
      title: title,
      body: body,
      author: author
    })
  }).then(response => {
    if (response.status === 200) {
      var payload = {
        newsItem: newsItem,
        title: title,
        body: body
      };
      store.dispatch(editNewsItem(payload));
      store.dispatch(hideEditNewsItem());
    } else {
      console.log(response.status);
    }
  });
}
