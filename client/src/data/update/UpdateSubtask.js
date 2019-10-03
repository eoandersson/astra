import { store } from "../../store";
import { editSubtask } from "../../actions";

export default function updateSubtask(input) {
  const { project, projectId, taskName, subtask, status, category } = input;
  fetch("/project-service/projects/subtask", {
    method: "PUT",
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
        status: status
      }
    })
  }).then(response => {
    console.log(response.status);
    if (response.status === 200) {
      var payload = {
        project: project,
        name: taskName,
        subtaskName: subtask.name,
        status: status,
        category: category
      };
      store.dispatch(editSubtask(payload));
    } else {
      console.log("Error");
    }
  });
}
