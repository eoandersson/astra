import { store } from "../../store";
import { addSubtask } from "../../actions";

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

export default function createSubtask({
  project,
  projectId,
  taskId,
  subtask,
  category
}) {
  console.log(taskId);
  fetch("/project-service/projects/subtask", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      projectId: projectId,
      taskId: parseObjectId(taskId),
      subtask: {
        name: subtask.name,
        description: subtask.description,
        status: 0
      }
    })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then(subtaskResponse => {
      var payload = {
        project: project,
        taskId,
        subtask: {
          subtaskId: subtaskResponse.subtaskId,
          name: subtaskResponse.name,
          description: subtaskResponse.description,
          status: subtaskResponse.status
        },
        category: category
      };
      store.dispatch(addSubtask(payload));
    });
}
