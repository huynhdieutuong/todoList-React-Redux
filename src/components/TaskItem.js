import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';

class TaskItem extends Component {
  onChangeStatus(id) {
    this.props.onChangeStatus(id);
  }

  onDeleteTask(id) {
    this.props.onDeleteTask(id);
  }

  onEditTask(id) {
    this.props.onEditTask(id);
  }

  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <th scope="row">{index}</th>
        <td className="none-center">{task.title}</td>
        <td><Badge onClick={() => this.onChangeStatus(task.id)} color={task.status ? "danger" : "secondary" }>{task.status ? 'Kích Hoạt' : 'Ẩn'}</Badge></td>
        <td>
          <Button onClick={() => this.onEditTask(task.id)} color="warning">Sửa</Button>{' '}
          <Button onClick={() => this.onDeleteTask(task.id)} color="danger">Xóa</Button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
