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
  GO_TO_DASHBOARD,
  ADD_TASK,
  ADD_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
  DELETE_TASK,
  DELETE_SUBTASK,
  SHOW_CATEGORY,
  HIDE_CATEGORY,
  MOVE_PROJECT,
  USER_SIGN_OUT
} from "../actions/ActionTypes";

const initialState = {
  projects: {},
  currentCategories: [],
  currentCategory: "",
  currentProjectIndex: 0,
  projectSidebarVisibility: true,
  userCategories: ["My Projects", "Shared Projects"]
};

export default function handleProject(state = initialState, action) {
  var userCategories = [];
  var newCurrentCategories = [];
  var projectCategories = {};
  var projectList = [];
  var projectIndex = 0,
    taskIndex = 0,
    subtaskIndex = 0;

  var getProjectIndex = function(category, projectId) {
    projectList = state.projects[category];
    var timeStamp = projectId.timeStamp;
    var machineIdentifier = projectId.machineIdentifier;
    var processIdentifier = projectId.processIdentifier;
    var counter = projectId.counter;

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

    var taskTimeStamp = action.payload.taskId.timeStamp;
    var taskMachineIdentifier = action.payload.taskId.machineIdentifier;
    var taskProcessIdentifier = action.payload.taskId.processIdentifier;
    var taskCounter = action.payload.taskId.counter;

    for (var i = 0; i < tasks.length; i++) {
      if (
        tasks[i].taskId.timeStamp === taskTimeStamp &&
        tasks[i].taskId.machineIdentifier === taskMachineIdentifier &&
        tasks[i].taskId.processIdentifier === taskProcessIdentifier &&
        tasks[i].taskId.counter === taskCounter
      ) {
        return i;
      }
    }
    return -1;
  };

  var getSubtaskIndex = function(projectIndex, taskIndex) {
    projectCategories = state.projects;
    var subtasks =
      projectCategories[action.payload.category][projectIndex].tasks[taskIndex]
        .subtasks;

    var subtaskTimeStamp = action.payload.subtaskId.timeStamp;
    var subtaskMachineIdentifier = action.payload.subtaskId.machineIdentifier;
    var subtaskProcessIdentifier = action.payload.subtaskId.processIdentifier;
    var subtaskCounter = action.payload.subtaskId.counter;

    for (var i = 0; i < subtasks.length; i++) {
      if (
        subtasks[i].subtaskId.timeStamp === subtaskTimeStamp &&
        subtasks[i].subtaskId.machineIdentifier === subtaskMachineIdentifier &&
        subtasks[i].subtaskId.processIdentifier === subtaskProcessIdentifier &&
        subtasks[i].subtaskId.counter === subtaskCounter
      ) {
        return i;
      }
    }
    return -1;
  };

  var getCategoryIndex = function(projectIndex) {
    userCategories = state.userCategories;
    for (var i = 0; i < userCategories.length; i++) {
      if (userCategories[i] === action.payload) {
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
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );

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
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
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
      projectCategories = state.projects;
      userCategories = state.userCategories;
      projectCategories[action.payload] = [];
      userCategories.unshift(action.payload);
      return Object.assign({}, state, {
        projects: projectCategories,
        userCategories: userCategories
      });
    case DELETE_CATEGORY:
      projectCategories = state.projects;
      delete projectCategories[action.payload];
      var categoryIndex = getCategoryIndex();
      userCategories.splice(categoryIndex, 1);
      return Object.assign({}, state, {
        projects: projectCategories,
        userCategories: userCategories
      });
    case MOVE_PROJECT:
      projectCategories = state.projects;
      // Remove project from old category
      projectIndex = getProjectIndex(
        action.payload.oldCategory,
        action.payload.project.projectId
      );
      if (projectIndex !== -1) {
        projectCategories[action.payload.oldCategory].splice(projectIndex, 1);
      }
      // Add project to new category
      projectList = projectCategories[action.payload.targetCategory];
      projectList.push(action.payload.project);
      // Update expanded categories
      newCurrentCategories = state.currentCategories;
      if (newCurrentCategories.indexOf(action.payload.targetCategory) === -1) {
        newCurrentCategories.push(action.payload.targetCategory);
      }
      if (projectCategories[action.payload.oldCategory].length === 0) {
        for (var i = 0; i < newCurrentCategories.length; i++) {
          if (newCurrentCategories[i] === action.payload.oldCategory) {
            newCurrentCategories.splice(i, 1);
          }
        }
      }
      return Object.assign({}, state, {
        projects: projectCategories,
        currentCategories: newCurrentCategories,
        currentCategory: action.payload.targetCategory,
        currentProjectIndex: projectList.length - 1
      });
    case SHOW_CATEGORY:
      newCurrentCategories = state.currentCategories;
      if (newCurrentCategories.indexOf(action.payload) === -1) {
        newCurrentCategories.push(action.payload);
      }
      return Object.assign({}, state, {
        currentCategories: newCurrentCategories
      });
    case HIDE_CATEGORY:
      newCurrentCategories = state.currentCategories;
      categoryIndex = newCurrentCategories.indexOf(action.payload);
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
        currentProjectIndex: getProjectIndex(
          action.payload.category,
          action.payload.projectId
        )
      });
    case GO_TO_DASHBOARD:
      return Object.assign({}, state, {
        currentCategory: "",
        currentProjectIndex: 0
      });
    case ADD_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );

      projectCategories[action.payload.category][projectIndex].tasks.push(
        action.payload.task
      );
      return Object.assign({}, state, {
        projects: projectCategories
      });
    case ADD_SUBTASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
      taskIndex = getTaskIndex(projectIndex);

      projectCategories[action.payload.category][projectIndex].tasks[
        taskIndex
      ].subtasks.push(action.payload.subtask);
      return Object.assign({}, state, {
        projects: projectCategories
      });
    case EDIT_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
      taskIndex = getTaskIndex(projectIndex);

      projectCategories[action.payload.category][projectIndex].tasks[
        taskIndex
      ] = action.payload.task;

      return Object.assign({}, state, {
        projects: projectCategories
      });
    case EDIT_SUBTASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
      taskIndex = getTaskIndex(projectIndex);
      subtaskIndex = getSubtaskIndex(projectIndex, taskIndex);

      var newSubtask = action.payload.subtask;
      projectCategories[action.payload.category][projectIndex].tasks[
        taskIndex
      ].subtasks[subtaskIndex] = newSubtask;

      return Object.assign({}, state, {
        projects: projectCategories
      });
    case DELETE_TASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
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
    case DELETE_SUBTASK:
      projectCategories = state.projects;
      projectIndex = getProjectIndex(
        action.payload.category,
        action.payload.project.projectId
      );
      taskIndex = getTaskIndex(projectIndex);
      subtaskIndex = getSubtaskIndex(projectIndex, taskIndex);

      if (taskIndex !== -1) {
        projectCategories[action.payload.category][projectIndex].tasks[
          taskIndex
        ].subtasks.splice(subtaskIndex, 1);
      }
      return Object.assign({}, state, {
        projects: projectCategories
      });
    case USER_SIGN_OUT:
      return Object.assign({}, state, {
        projects: {},
        currentCategories: [],
        currentCategory: "",
        currentProjectIndex: 0,
        projectSidebarVisibility: true,
        userCategories: ["My Projects", "Shared Projects"]
      });
    default:
      return state;
  }
}
