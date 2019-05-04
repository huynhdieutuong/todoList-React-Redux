import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
  onDeleteTask(id) {
    this.props.onDeleteTask(id);
  }

  onEditTask(id) {
    this.props.onEditTask(id);
  }

  render() {
    const { task, index, onChangeStatus } = this.props;
    return (
      <tr>
        <th scope="row">{index}</th>
        <td className="none-center">{task.title}</td>
        <td><Badge onClick={() => onChangeStatus(task.id)} color={task.status ? "danger" : "secondary" }>{task.status ? 'Kích Hoạt' : 'Ẩn'}</Badge></td>
        <td>
          <Button onClick={() => this.onEditTask(task.id)} color="warning">Sửa</Button>{' '}
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
    onChangeStatus: id => dispatch(actions.changeStatus(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
