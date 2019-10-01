import { store } from "../../store";
import {
  handleAddProjectList,
  setProjectsLoading,
  setProjectsFinished
} from "../../actions";

export default function getUserProjects() {
  store.dispatch(setProjectsLoading());
  fetch(
    "/project-service/projects/user/" +
      store.getState().userAuthentication.username,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT")
      }
    }
  )
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then(responseJson => {
      const projects = responseJson;
      var payload = {
        projects: projects,
        categories: Object.keys(projects)
      };
      store.dispatch(handleAddProjectList(payload));
      store.dispatch(setProjectsFinished());
    })
    .catch(error => {
      console.log("error: " + error);
      store.dispatch(setProjectsFinished());
    });
}
