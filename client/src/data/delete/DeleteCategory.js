import store from "../../store";
import { removeCategory } from "../../actions";

export default function deleteCategory({ category }) {
  fetch("/project-service/projects/category", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      username: store.getState().userAuthentication.username,
      category: category
    })
  }).then(response => {
    if (response.status === 204) {
      store.dispatch(removeCategory(category));
    } else {
      console.log("Error");
    }
  });
}
