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
      isDisplayForm: false
    }
    this.toggle = this.toggle.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  toggle() {
    this.setState(state => {
      return {
        isDisplayForm: !this.state.isDisplayForm
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

  addTask(newTask) {
    const { tasks } = this.state;
    tasks.push({ ...newTask, id: uuid() });
    this.setState(state => {
      return {
        tasks: tasks
      }
    });
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

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {
    const { isDisplayForm, tasks } = this.state;
    return (
      <div className="App">
        <Container>
          <h1>Quản Lý Công Việc</h1>
          <Row>
            {
              isDisplayForm &&
              <Col md="4">
                <TaskForm closeForm={this.closeForm} addTask={this.addTask}/>
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
                  <TaskList tasks={tasks} onChangeStatus={this.onChangeStatus}/>
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
