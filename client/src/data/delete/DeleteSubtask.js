import { store } from "../../store";
import { removeSubtask } from "../../actions";

export default function deleteSubtask({
  project,
  projectId,
  taskName,
  subtask,
  category
}) {
  fetch("/project-service/projects/subtask", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      taskName: taskName,
      subtask: {
        name: subtask.name,
        description: subtask.description,
        status: subtask.status
      }
    })
  }).then(response => {
    if (response.status === 204) {
      var payload = {
        project: project,
        name: taskName,
        subtaskName: subtask.name,
        category: category
      };
      store.dispatch(removeSubtask(payload));
    } else {
      console.log("Error");
    }
  });
}
