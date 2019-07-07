import React, { Component } from "react";
import store from "../../store";
import { goToProject, showCategory } from "../../actions";
import { Search } from "semantic-ui-react";

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: store.getState().handleProject.projects,
      isLoading: false,
      results: [],
      value: ""
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        projects: store.getState().handleProject.projects
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getId = mongoId => {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machineIdentifier.toString(16), 6) +
      this.pad0(mongoId.processIdentifier.toString(16), 4) +
      this.pad0(mongoId.counter.toString(16), 6);

    return result;
  };

  pad0 = (str, len) => {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }

    return str;
  };

  getIndex = (category, projectId) => {
    const { projects } = this.state;
    for (var i = 0; i < projects[category].length; i++) {
      if (
        this.getId(projects[category][i].projectId) === this.getId(projectId)
      ) {
        return i;
      }
    }
    return 0;
  };

  goToProject = (category, projectId) => {
    const index = this.getIndex(category, projectId);
    const payload = {
      category: category,
      index: index
    };
    store.dispatch(showCategory(category));
    store.dispatch(goToProject(payload));
  };

  getResults = (projectList, category) => {
    const output = [];
    for (var i = 0; i < projectList.length; i++) {
      const project = projectList[i];
      output.push({
        title: project.projectName,
        description: project.projectDescription,
        projectId: project.projectId,
        category
      });
    }
    return output;
  };

  getSourceNoCategory = () => {
    let outputArr = [];
    const { projects } = this.state;
    for (var category in projects) {
      const projectList = this.getResults(projects[category], category);
      if (projectList.length > 0) {
        outputArr = outputArr.concat(projectList);
      }
    }
    return outputArr;
  };

  getSource = () => {
    const memo = {};
    const { projects } = this.state;
    for (var category in projects) {
      memo[category] = {
        name: category,
        results: this.getResults(projects[category], category)
      };
    }
    return memo;
  };

  handleResultSelect = (e, { result }) => {
    this.goToProject(result.category, result.projectId);
    this.setState({ value: result.title });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({
          isLoading: false,
          results: [],
          value: ""
        });

      const projects = this.getSourceNoCategory();
      const matchedProjects = projects.filter(
        project =>
          project.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );

      this.setState({
        isLoading: false,
        results: matchedProjects
      });
    }, 300);
  };

  render() {
    const { isLoading, results, value } = this.state;
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
        style={{ margin: "20px 0" }}
        placeholder="Search"
      />
    );
  }
}
