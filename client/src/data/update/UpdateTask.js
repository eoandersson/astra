import { store } from "../../store";
import { editTask } from "../../actions";

const parseObjectId = mongoId => {
  var result =
    pad0(mongoId.timestamp.toString(16), 8) +
    pad0(mongoId.machineIdentifier.toString(16), 6) +
    pad0(mongoId.processIdentifier.toString(16), 4) +
    pad0(mongoId.counter.toString(16), 6);

  return result;
};

const pad0 = (str, len) => {
  var zeros = "00000000000000000000000000";
  if (str.length < len) {
    return zeros.substr(0, len - str.length) + str;
  }

  return str;
};

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
        taskId: parseObjectId(task.taskId),
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
        taskId: task.taskId,
        task: {
          taskId: task.taskId,
          name: task.name,
          description: task.description,
          status: status,
          subtasks: task.subtasks
        },
        category: category
      };
      store.dispatch(editTask(payload));
    } else {
      console.log("Error");
    }
  });
}
