import { store } from "../../store";
import { addSubtask } from "../../actions";

export default function createSubtask({
  project,
  projectId,
  taskName,
  subtask,
  category
}) {
  fetch("/project-service/projects/subtask", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      taskName,
      subtask: {
        name: subtask.name,
        description: subtask.description,
        status: 0
      }
    })
  }).then(response => {
    if (response.status === 200) {
      var payload = {
        project: project,
        name: taskName,
        subtask: {
          name: subtask.name,
          description: subtask.description,
          status: 0
        },
        category
      };
      store.dispatch(addSubtask(payload));
    } else {
      console.log("Error");
    }
  });
}
