import store from "../../store";
import { changeProjectCategory } from "../../actions";

export default function moveProject({ oldCategory, targetCategory, project }) {
  const payload = {
    username: store.getState().userAuthentication.username,
    oldCategory: oldCategory,
    targetCategory: targetCategory,
    project: project
  };
  store.dispatch(changeProjectCategory(payload));

  fetch("/project-service/projects/category/move", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWT")
    },
    body: JSON.stringify({
      username: store.getState().userAuthentication.username,
      oldCategory: oldCategory,
      targetCategory: targetCategory,
      projectId: getId(project.projectId)
    })
  })
    .then(response => {
      if (!response.ok) {
        const payload = {
          username: store.getState().userAuthentication.username,
          oldCategory: targetCategory,
          targetCategory: oldCategory,
          project: project
        };
        store.dispatch(changeProjectCategory(payload));
        throw new Error(response.status);
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
}

function getId(mongoId) {
  var result =
    pad0(mongoId.timestamp.toString(16), 8) +
    pad0(mongoId.machineIdentifier.toString(16), 6) +
    pad0(mongoId.processIdentifier.toString(16), 4) +
    pad0(mongoId.counter.toString(16), 6);

  return result;
}

function pad0(str, len) {
  var zeros = "00000000000000000000000000";
  if (str.length < len) {
    return zeros.substr(0, len - str.length) + str;
  }

  return str;
}
