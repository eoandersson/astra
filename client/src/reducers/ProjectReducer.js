import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT_LIST,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  SHOW_PROJECT_SIDEBAR,
  HIDE_PROJECT_SIDEBAR,
  GO_TO_PROJECT,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SHOW_CATEGORY,
  HIDE_CATEGORY
} from "../actions/ActionTypes";

const initialState = {
  projects: {},
  currentCategories: ["My Projects"],
  currentCategory: "My Projects",
  currentProjectIndex: 0,
  projectSidebarVisibility: true,
  userCategories: ["My Projects", "Shared Projects"]
};

export default function handleProject(state = initialState, action) {
  var newCurrentCategories = [];
  var projectCategories = {};
  var projectList = [];
  var projectIndex = 0,
    taskIndex = 0;

  var getProjectIndex = function() {
    projectList = state.projects[action.payload.category];
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
    projectCategories = state.projects;
    var tasks = projectCategories[action.payload.category][projectIndex].tasks;

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].name === action.payload.name) {
        return i;
      }
    }
    return -1;
  };

  switch (action.type) {
    case ADD_PROJECT:
      projectCategories = state.projects;
      projectList = projectCategories[action.payload.data.projectCategory];
      projectList.push(action.payload.data.project);

      newCurrentCategories = state.currentCategories;
      if (
        newCurrentCategories.indexOf(action.payload.data.projectCategory) === -1
      ) {
        newCurrentCategories.push(action.payload.data.projectCategory);
      }

      return Object.assign({}, state, {
        projects: projectCategories,
        currentCategories: newCurrentCategories,
        currentCategory: action.payload.data.projectCategory,
        currentProjectIndex: projectList.length - 1
      });
    case EDIT_PROJECT:
      projectCategories = state.projects;
      projectIndex = getProjectIndex();

      projectCategories[action.payload.category][projectIndex].projectName =
        action.payload.projectName;
      projectCategories[action.payload.category][
        projectIndex
      ].projectDescription = action.payload.projectDescription;
      projectCategories[action.payload.category][projectIndex].users =
        action.payload.users;

      return Object.assign({}, state, {
        projects: projectCategories
      });
    case DELETE_PROJECT:
      console.log(action.payload);
      projectCategories = state.projects;
      projectIndex = getProjectIndex();
      var newProjectIndex = 0;
      if (projectIndex === projectList.length - 1) {
        newProjectIndex = projectIndex - 1;
      }
      if (projectIndex !== -1) {
        projectCategories[action.payload.category].splice(projectIndex, 1);
      }
      return Object.assign({}, state, {
        projects: projectCategories,
        currentProjectIndex: newProjectIndex
      });
    case ADD_PROJECT_LIST:
      return Object.assign({}, state, {
        userCategories: action.payload.categories,
        projects: action.payload.projects
      });
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        userCategories: this.state.userCategories.push(action.payload)
      });
    case DELETE_CATEGORY:
      var currentCategories = this.state.userCategories;
      delete currentCategories[action.payload];
      return Object.assign({}, state, {
        userCategories: currentCategories
      });
    case SHOW_CATEGORY:
      newCurrentCategories = state.currentCategories;
      newCurrentCategories.push(action.payload);
      return Object.assign({}, state, {
        currentCategories: newCurrentCategories
      });
    case HIDE_CATEGORY:
      newCurrentCategories = state.currentCategories;
      var categoryIndex = newCurrentCategories.indexOf(action.payload);
      if (categoryIndex !== -1) newCurrentCategories.splice(categoryIndex, 1);
      return Object.assign({}, state, {
        currentCategories: newCurrentCategories
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
        currentCategory: action.payload.category,
        currentProjectIndex: action.payload.index
      });
    case ADD_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex();

      projectCategories[action.payload.category][projectIndex].tasks.push(
        action.payload.task
      );
      return Object.assign({}, state, {
        projects: projectCategories
      });

    case EDIT_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex();
      taskIndex = getTaskIndex(projectIndex);

      var newState = action.payload.status;
      projectCategories[action.payload.category][projectIndex].tasks[
        taskIndex
      ].status = newState;

      return Object.assign({}, state, {
        projects: projectCategories
      });
    case DELETE_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex();
      taskIndex = getTaskIndex(projectIndex);

      if (taskIndex !== -1) {
        projectCategories[action.payload.category][projectIndex].tasks.splice(
          taskIndex,
          1
        );
      }
      return Object.assign({}, state, {
        projects: projectCategories
      });
    default:
      return state;
  }
}
