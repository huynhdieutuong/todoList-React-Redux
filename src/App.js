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
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
      tasks = [];
    }
    this.state = {
      tasks: tasks,
      isDisplayForm: false,
      taskEditing: null
    }
    this.toggle = this.toggle.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
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

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {
    const { isDisplayForm, tasks, taskEditing } = this.state;
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
                  addTask={this.addTask}
                  taskEditing={taskEditing}
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
                  <Control />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TaskList 
                    tasks={tasks} 
                    onChangeStatus={this.onChangeStatus}
                    onDeleteTask={this.onDeleteTask}
                    onEditTask={this.onEditTask}
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
