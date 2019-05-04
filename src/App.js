import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Container, Row, Col, Button } from 'reactstrap';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: 0
      },
      search: null,
      sort: null
    }
    this.toggle = this.toggle.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onFilterTask = this.onFilterTask.bind(this);
    this.onSearchTask = this.onSearchTask.bind(this);
    this.onSortTask = this.onSortTask.bind(this);
  }

  toggle() {
    const { taskEditing, isDisplayForm } = this.state;
    this.setState(state => {
      return {
        isDisplayForm: taskEditing ? true : !isDisplayForm,
        taskEditing: null
      }
    })
  }

  closeForm() {
    this.setState(state => {
      return {
        isDisplayForm: false
      }
    })
  }

  openForm() {
    this.setState(state => {
      return {
        isDisplayForm: true
      }
    })
  }

  addTask(newTask) {
    const { tasks } = this.state;
    if(newTask.id === '') {
      tasks.push({ ...newTask, id: uuid() });
    } else {
      const index = tasks.findIndex(task => task.id === newTask.id);
      tasks.splice(index, 1, newTask);
    }
    this.setState(state => {
      return {
        tasks: tasks
      }
    });
    this.closeForm();
  }

  onChangeStatus(id) {
    const { tasks } = this.state;
    const index = tasks.findIndex(task => task.id === id);
    const newTasks = [ 
      ...tasks.slice(0, index),
      { ...tasks[index], status: !tasks[index].status },
      ...tasks.slice(index + 1) 
    ];
    this.setState(state => {
      return {
        tasks: newTasks
      }
    });
  }

  onDeleteTask(id) {
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

  onEditTask(id) {
    this.openForm();
    const { tasks } = this.state;
    const found = tasks.find(task => task.id === id);
    this.setState(state => {
      return{
        taskEditing: found
      }
    });
  }

  onFilterTask(value) {
    this.setState(state => {
      return {
        filter: {
          name: value.filterName,
          status: value.filterStatus === '1' ? true : value.filterStatus === '-1' ? false : 0
        }
      }
    })
  }

  onSearchTask(value) {
    this.setState(state => {
      return {
        search: value
      }
    })
  }

  onSortTask(value) {
    this.setState(state => {
      return {
        sort: value
      }
    })
  }

  render() {
    let { isDisplayForm, taskEditing, filter, search, sort } = this.state;
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
                  closeForm={this.closeForm}
                  taskEditing={taskEditing}
                  key={ taskEditing ? taskEditing.id : ''}
                  />
              </Col>
            }
            <Col className={ isDisplayForm ? "md-8" : "md-12" }>
              <Row>
                <Col md="4">
                  <Button color="primary" onClick={this.toggle}>Thêm Công Việc</Button>
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
                    onChangeStatus={this.onChangeStatus}
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

export default App;