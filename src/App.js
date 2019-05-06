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

  render() {
    const { isDisplayForm } = this.props;
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
                  <Control />
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