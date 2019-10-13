import { store } from "../../store";
import {
  showCategory,
  goToProject,
  setProjectsLoading,
  setProjectsFinished
} from "../../actions";

export default function getProjectFromId(projectId, category) {
  store.dispatch(setProjectsLoading());
  fetch("/project-service/projects/id/" + projectId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then(responseJson => {
      const project = responseJson;
      const payload = {
        category,
        projectId: project.projectId
      };
      store.dispatch(showCategory(category));
      store.dispatch(goToProject(payload));

      store.dispatch(setProjectsFinished());
    })
    .catch(error => {
      console.log("error: " + error);
      store.dispatch(setProjectsFinished());
    });
}
