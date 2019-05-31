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

export function handleAddNewsItem(newsItem) {
  return { type: "ADD-NEWS-ITEM", payload: newsItem };
}

export function handleEditNewsItems(newsItem) {
  return { type: "EDIT-NEWS-ITEM", payload: newsItem };
}

export function handleDeleteNewsItem(newsItem) {
  return { type: "DELETE-NEWS-ITEM", payload: newsItem };
}

export function handleAddNewsItemList(newsItems) {
  return { type: "ADD-NEWS-ITEM-LIST", payload: newsItems };
}

export function showCreateNewsItem() {
  return { type: "SHOW-CREATE-NEWS-ITEM" };
}

export function hideCreateNewsItem() {
  return { type: "HIDE-CREATE-NEWS-ITEM" };
}

export function showEditNewsItem(newsItem) {
  console.log(newsItem);
  return { type: "SHOW-EDIT-NEWS-ITEM", payload: newsItem };
}

export function hideEditNewsItem() {
  return { type: "HIDE-EDIT-NEWS-ITEM" };
}

export function userSignIn(username) {
  console.log("Action: " + username);
  return { type: "USER-SIGN-IN", payload: username };
}
