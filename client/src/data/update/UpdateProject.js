import store from "../../store";
import { editProject, hideEditProject } from "../../actions";

export default function updateProject(input) {
  const {
    project,
    projectId,
    projectName,
    projectDescription,
    tasks,
    users,
    category
  } = input;
  fetch("/project-service/projects", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      projectName: projectName,
      projectDescription: projectDescription,
      users: users,
      tasks: tasks
    })
  }).then(response => {
    if (response.status === 200) {
      var payload = {
        project: project,
        projectName: projectName,
        projectDescription: projectDescription,
        users: users,
        category: category
      };
      store.dispatch(editProject(payload));
      store.dispatch(hideEditProject());
    } else {
      console.log("Error");
    }
  });
}
