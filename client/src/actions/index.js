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

export function addTask(payload) {
  return { type: "ADD-TASK", payload: payload };
}

export function editTask(payload) {
  return { type: "EDIT-TASK", payload: payload };
}

export function deleteTask(payload) {
  return { type: "DELETE-TASK", payload: payload };
}

export function hideCreateTask() {
  return { type: "HIDE-CREATE-TASK" };
}

export function handleAddProject(project) {
  return { type: "ADD-PROJECT", payload: project };
}

export function handleEditProject(payload) {
  return { type: "EDIT-PROJECT", payload: payload };
}

export function handleDeleteProject(project) {
  return { type: "DELETE-PROJECT", payload: project };
}

export function handleAddProjectList(projects) {
  return { type: "ADD-PROJECT-LIST", payload: projects };
}
