import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT_LIST,
  SHOW_PROJECT_SIDEBAR,
  HIDE_PROJECT_SIDEBAR,
  GO_TO_PROJECT,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK
} from "../actions/ActionTypes";

const initialState = {
  projects: [],
  currentProjectIndex: 0,
  projectSidebarVisibility: true
};

export default function handleProject(state = initialState, action) {
  var projectList = [];
  var projectIndex = 0,
    taskIndex = 0;

  var getProjectIndex = function() {
    projectList = state.projects;
    var timeStamp = action.payload.project.projectId.timeStamp;
    var machineIdentifier = action.payload.project.projectId.machineIdentifier;
    var processIdentifier = action.payload.project.projectId.processIdentifier;
    var counter = action.payload.project.projectId.counter;

    for (var i = 0; i < projectList.length; i++) {
      if (
        projectList[i].projectId.timeStamp === timeStamp &&
        projectList[i].projectId.machineIdentifier === machineIdentifier &&
        projectList[i].projectId.processIdentifier === processIdentifier &&
        projectList[i].projectId.counter === counter
      ) {
        return i;
      }
    }
    return -1;
  };

  var getTaskIndex = function(projectIndex) {
    projectList = state.projects;
    var tasks = projectList[projectIndex].tasks;

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].name === action.payload.name) {
        return i;
      }
    }
    return -1;
  };

  switch (action.type) {
    case ADD_PROJECT:
      projectList = state.projects;
      projectList.push(action.payload.project);

      return Object.assign({}, state, {
        projects: projectList,
        currentProjectIndex: projectList.length - 1
      });
    case EDIT_PROJECT:
      projectList = state.projects;
      projectIndex = getProjectIndex();

      projectList[projectIndex].projectName = action.payload.projectName;
      projectList[projectIndex].projectDescription =
        action.payload.projectDescription;
      projectList[projectIndex].users = action.payload.users;

      return Object.assign({}, state, {
        projects: projectList
      });
    case DELETE_PROJECT:
      projectList = state.projects;
      projectIndex = getProjectIndex();
      var newProjectIndex = 0;
      if (projectIndex === projectList.length - 1) {
        newProjectIndex = projectIndex - 1;
      }
      if (projectIndex !== -1) {
        projectList.splice(projectIndex, 1);
      }
      return Object.assign({}, state, {
        projects: projectList,
        currentProjectIndex: newProjectIndex
      });
    case ADD_PROJECT_LIST:
      return Object.assign({}, state, {
        projects: action.payload
      });
    case SHOW_PROJECT_SIDEBAR:
      return Object.assign({}, state, {
        projectSidebarVisibility: true
      });
    case HIDE_PROJECT_SIDEBAR:
      return Object.assign({}, state, {
        projectSidebarVisibility: false
      });
    case GO_TO_PROJECT:
      return Object.assign({}, state, {
        currentProjectIndex: action.payload
      });
    case ADD_TASK:
      projectList = state.projects;
      projectIndex = getProjectIndex();

      projectList[projectIndex].tasks.push(action.payload.task);
      return Object.assign({}, state, {
        projects: projectList
      });

    case EDIT_TASK:
      projectList = state.projects;
      projectIndex = getProjectIndex();
      taskIndex = getTaskIndex(projectIndex);

      var newState = action.payload.status;
      projectList[projectIndex].tasks[taskIndex].status = newState;

      return Object.assign({}, state, {
        projects: projectList
      });
    case DELETE_TASK:
      projectList = state.projects;
      projectIndex = getProjectIndex();
      taskIndex = getTaskIndex(projectIndex);

      if (taskIndex !== -1) {
        projectList[projectIndex].tasks.splice(taskIndex, 1);
      }
      return Object.assign({}, state, {
        projects: projectList
      });
    default:
      return state;
  }
}
