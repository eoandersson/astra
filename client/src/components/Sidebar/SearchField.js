import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { store } from "../../store";
import { goToProject, showCategory } from "../../actions";
import { Search } from "semantic-ui-react";
import getId from "../../utils/ParseObjectId";

class SearchField extends Component {
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

  goToProject = (category, projectId) => {
    const { history } = this.props;

    const payload = {
      category,
      projectId
    };

    store.dispatch(showCategory(category));
    store.dispatch(goToProject(payload));

    const parsedCategory = category.replace(" ", "-");
    history.push("/home/" + parsedCategory + "/" + getId(projectId));
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
        fluid
      />
    );
  }
}

export default withRouter(SearchField);
