import { store } from "../../store";
import { removeNewsItem } from "../../actions";

export default function deleteNewsItem({ newsItem, newsId }) {
  fetch("/news-service/news/" + newsId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      newsId: newsId
    })
  }).then(response => {
    if (response.status === 204) {
      store.dispatch(removeNewsItem({ newsItem: newsItem }));
    } else {
      console.log("Error");
    }
  });
}
