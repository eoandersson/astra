import { store } from "../../store";
import { addTask, hideCreateTask } from "../../actions";

export default function createTask({ project, projectId, task, category }) {
  fetch("/project-service/projects/task", {
    method: "POST",
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
        task: task,
        category: category
      };
      store.dispatch(addTask(payload));
      store.dispatch(hideCreateTask());
    } else {
      console.log("Error");
    }
  });
}
