import store from "../../store";
import { removeProject } from "../../actions";

export default function deleteProject({ project, projectId, category }) {
  fetch("/project-service/projects", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      username: store.getState().userAuthentication.username
    })
  }).then(response => {
    if (response.status === 204) {
      const payload = {
        project: project,
        category: category
      };
      store.dispatch(removeProject(payload));
    } else {
      console.log("Error: " + response.status);
    }
  });
}
