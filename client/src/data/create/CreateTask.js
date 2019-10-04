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
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then(taskResponse => {
      /*
       In case there is ever an issue with this, I wish to make my case.

       For some reason the ObjectId counter returned from the createTask
       API call is one lower than the value stored in the database.
       Because of this, if one wishes to make any changes to a new task
       without fetching the task again, one must increment the counter by one.
      */
      taskResponse.taskId.counter = taskResponse.taskId.counter + 1;
      var payload = {
        project: project,
        task: {
          taskId: taskResponse.taskId,
          name: taskResponse.name,
          description: taskResponse.description,
          status: taskResponse.status,
          subtasks: taskResponse.subtasks
        },
        category: category
      };
      store.dispatch(addTask(payload));
      store.dispatch(hideCreateTask());
    });
}
