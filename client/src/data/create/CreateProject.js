import { store } from "../../store";
import { handleAddProject, hideCreateProject } from "../../actions";

export default function createProject({ project, category }) {
  fetch("/project-service/projects", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      project: project,
      projectCategory: category
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
      store.dispatch(handleAddProject({ data }));
      store.dispatch(hideCreateProject());
    });
}
