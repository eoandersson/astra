export function showEditProject(project) {
  return { type: "SHOW-EDIT", payload: project };
}

export function hideEditProject() {
  return { type: "HIDE-EDIT" };
}

export function showCreateProject() {
  return { type: "SHOW-CREATE" };
}

export function hideCreateProject() {
  return { type: "HIDE-CREATE" };
}

export function showCreateTask(payload) {
  return { type: "SHOW-CREATE-TASK", payload: payload };
}

export function hideCreateTask() {
  return { type: "HIDE-CREATE-TASK" };
}
