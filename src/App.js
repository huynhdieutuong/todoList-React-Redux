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
      search: null,
      sort: null
    }
  }

  onToogleForm = () => {
    const { taskEditing, openForm, onToogleForm, onClearTask } = this.props;
    if(taskEditing.id !== '') {
      openForm();
    } else {
      onToogleForm();
    };
    onClearTask({
      id: '',
      title: '',
      status: false
    });
  }

  // onSearchTask = value => {
  //   this.setState(state => {
  //     return {
  //       search: value
  //     }
  //   })
  // }

  // onSortTask = value => {
  //   this.setState(state => {
  //     return {
  //       sort: value
  //     }
  //   })
  // }

  render() {
    const { isDisplayForm } = this.props;

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
                <TaskForm />
              </Col>
            }
            <Col className={ isDisplayForm ? "md-8" : "md-12" }>
              <Row>
                <Col md="4">
                  <Button color="primary" onClick={this.onToogleForm}>Thêm Công Việc</Button>
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
                  <TaskList />
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
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToogleForm: () => dispatch(actions.toogleForm()),
    openForm: () => dispatch(actions.openForm()),
    onClearTask: task => dispatch(actions.editTask(task))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);