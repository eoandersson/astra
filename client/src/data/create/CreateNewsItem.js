import { store } from "../../store";
import { handleAddNewsItem, hideCreateNewsItem } from "../../actions";

export default function createNewsItem({ title, body, author }) {
  fetch("/news-service/news", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      title: title,
      body: body,
      author: author
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then(data => {
      store.dispatch(handleAddNewsItem({ newsItem: data }));
      store.dispatch(hideCreateNewsItem());
    });
}
