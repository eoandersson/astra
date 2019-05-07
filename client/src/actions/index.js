export function showEditProject(project) {
  return { type: "SHOW-EDIT", payload: project };
}

export function hideEditProject() {
  return { type: "HIDE-EDIT" };
}

export function showCreateProject(project) {
  return { type: "SHOW-CREATE", payload: project };
}

export function hideCreateProject() {
  return { type: "HIDE-CREATE" };
}
