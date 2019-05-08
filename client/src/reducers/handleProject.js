const initialState = {
  projects: []
};

export default function handleProject(state = initialState, action) {
  var projectList = [];
  var projectIndex = 0,
    taskIndex = 0;

  var getEqualProject = function() {
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

  var getEqualTask = function(projectIndex) {
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
    case "ADD-PROJECT":
      projectList = state.projects;
      projectList.push(action.payload.project);

      return Object.assign({}, state, {
        projects: projectList
      });
    case "EDIT-PROJECT":
      projectList = state.projects;
      projectIndex = getEqualProject();

      projectList[projectIndex].projectName = action.payload.projectName;
      projectList[projectIndex].users = action.payload.users;

      return Object.assign({}, state, {
        projects: projectList
      });
    case "DELETE-PROJECT":
      projectList = state.projects;
      projectIndex = getEqualProject();
      if (projectIndex !== -1) {
        projectList.splice(projectIndex, 1);
      }
      return Object.assign({}, state, {
        projects: projectList
      });
    case "ADD-PROJECT-LIST":
      return Object.assign({}, state, {
        projects: action.payload
      });
    case "ADD-TASK":
      projectList = state.projects;
      projectIndex = getEqualProject();

      projectList[projectIndex].tasks.push(action.payload.task);
      return Object.assign({}, state, {
        projects: projectList
      });

    case "EDIT-TASK":
      projectList = state.projects;
      projectIndex = getEqualProject();
      taskIndex = getEqualTask(projectIndex);

      var newState = !projectList[projectIndex].tasks[taskIndex].state;
      projectList[projectIndex].tasks[taskIndex].state = newState;

      return Object.assign({}, state, {
        projects: projectList
      });
    case "DELETE-TASK":
      projectList = state.projects;
      projectIndex = getEqualProject();
      taskIndex = getEqualTask(projectIndex);

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
