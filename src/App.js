import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './actions/index';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskEditing: null,
      filter: {
        name: '',
        status: 0
      },
      search: null,
      sort: null
    }
  }

  onDeleteTask = id => {
    const { tasks } = this.state;
    const index = tasks.findIndex(task => task.id === id);
    const newTasks = [ 
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1) 
    ];
    this.setState(state => {
      return {
        tasks: newTasks
      }
    });
  }

  onEditTask = id => {
    this.props.openForm();
    const { tasks } = this.state;
    const found = tasks.find(task => task.id === id);
    this.setState(state => {
      return{
        taskEditing: found
      }
    });
  }

  onFilterTask = value => {
    this.setState(state => {
      return {
        filter: {
          name: value.filterName,
          status: value.filterStatus === '1' ? true : value.filterStatus === '-1' ? false : 0
        }
      }
    })
  }

  onSearchTask = value => {
    this.setState(state => {
      return {
        search: value
      }
    })
  }

  onSortTask = value => {
    this.setState(state => {
      return {
        sort: value
      }
    })
  }

  render() {
    let { taskEditing, filter, search, sort } = this.state;
    const { isDisplayForm, onToogleForm } = this.props;
    // if(filter) {
    //   tasks = tasks.filter(task => task.title.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
    //   if (filter.status !== 0) {
    //     tasks = tasks.filter(task => task.status === filter.status);
    //   }
    // }

    // if(search) {
    //   tasks = tasks.filter(task => task.title.toLowerCase().indexOf(search.toLowerCase()) !== -1); 
    // }

    // if(sort) {
    //   tasks.sort((a, b) => {
    //     const nameA = a.title.toLowerCase();
    //     const nameB = b.title.toLowerCase();
    //     switch(sort) {
    //       case 'a-z': return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
    //       case 'z-a': return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    //       case 'kh': return b.status - a.status;
    //       default: return a.status - b.status;
    //     }
    //   });
    // }

    return (
      <div className="App">
        <Container>
          <h1>Quản Lý Công Việc</h1>
          <Row>
            {
              isDisplayForm &&
              <Col md="4">
                <TaskForm
                  taskEditing={taskEditing}
                  key={ taskEditing ? taskEditing.id : ''}
                  />
              </Col>
            }
            <Col className={ isDisplayForm ? "md-8" : "md-12" }>
              <Row>
                <Col md="4">
                  <Button color="primary" onClick={onToogleForm}>Thêm Công Việc</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Control 
                    onSearchTask={this.onSearchTask}
                    onSortTask={this.onSortTask}
                    />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TaskList
                    onDeleteTask={this.onDeleteTask}
                    onEditTask={this.onEditTask}
                    onFilterTask={this.onFilterTask}
                    />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToogleForm: () => dispatch(actions.toogleForm()),
    openForm: () => dispatch(actions.openForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);