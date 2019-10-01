import { store } from "../../store";
import { addCategory, hideCreateCategory } from "../../actions";

export default function createCategory({ category }) {
  fetch("/project-service/projects/category", {
    method: "POST",
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
    if (response.status === 200) {
      store.dispatch(addCategory(category));
      store.dispatch(hideCreateCategory());
    } else {
      console.log("Error");
    }
  });
}
