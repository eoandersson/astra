import { store } from "../../store";
import { editTask } from "../../actions";

export default function updateTask(input) {
  const { project, projectId, task, status, category } = input;
  fetch("/project-service/projects/task", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      task: {
        name: task.name,
        description: task.description,
        status: status
      }
    })
  }).then(response => {
    console.log(response.status);
    if (response.status === 200) {
      var payload = {
        project: project,
        name: task.name,
        status: status,
        category: category
      };
      store.dispatch(editTask(payload));
    } else {
      console.log("Error");
    }
  });
}
