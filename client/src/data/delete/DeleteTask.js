import store from "../../store";
import { removeTask } from "../../actions";

export default function deleteTask({project, projectId, category, task}) {
  fetch("/project-service/projects/task", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      task: task
    })
  }).then(response => {
    if (response.status === 200) {
      var payload = {
        project: project,
        name: task.name,
        category: category
      };
      store.dispatch(removeTask(payload));
    } else {
      console.log("Error");
    }
  });
}
