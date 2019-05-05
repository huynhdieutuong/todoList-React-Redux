import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
  onChangeStatus = id => {
    this.props.onChangeStatus(id);
  }

  onDeleteTask = id => {
    this.props.onDeleteTask(id);
    this.props.closeForm();
  }

  onEditTask = task => {
    this.props.openForm();
    this.props.onEditTask(task);
  }

  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <th scope="row">{index}</th>
        <td className="none-center">{task.title}</td>
        <td><Badge onClick={() => this.onChangeStatus(task.id)} color={task.status ? "danger" : "secondary" }>{task.status ? 'Kích Hoạt' : 'Ẩn'}</Badge></td>
        <td>
          <Button onClick={() => this.onEditTask(task)} color="warning">Sửa</Button>{' '}
          <Button onClick={() => this.onDeleteTask(task.id)} color="danger">Xóa</Button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeStatus: id => dispatch(actions.changeStatus(id)),
    onDeleteTask: id => dispatch(actions.deleteTask(id)),
    onEditTask: task => dispatch(actions.editTask(task)),
    closeForm: () => dispatch(actions.closeForm()),
    openForm: () => dispatch(actions.openForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
