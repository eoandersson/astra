import { store } from "../../store";
import { editProject, hideEditProject } from "../../actions";

export default async function updateProject(input) {
  const {
    project,
    projectId,
    projectName,
    projectDescription,
    tasks,
    users,
    category
  } = input;

  const response = await fetch("/project-service/projects", {
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
  });

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
  return response.status;
}
