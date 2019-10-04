import { store } from "../../store";
import { editSubtask } from "../../actions";

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

export default function updateSubtask(input) {
  const { project, projectId, taskId, subtask, status, category } = input;
  fetch("/project-service/projects/subtask", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      taskId: parseObjectId(taskId),
      subtask: {
        subtaskId: parseObjectId(subtask.subtaskId),
        name: subtask.name,
        description: subtask.description,
        status: status
      }
    })
  }).then(response => {
    if (response.status === 200) {
      var payload = {
        project: project,
        taskId,
        subtaskId: subtask.subtaskId,
        subtask: {
          subtaskId: subtask.subtaskId,
          name: subtask.name,
          description: subtask.description,
          status: status
        },
        category: category
      };
      store.dispatch(editSubtask(payload));
    } else {
      console.log("Error");
    }
  });
}
