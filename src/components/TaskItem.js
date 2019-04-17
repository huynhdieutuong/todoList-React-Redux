import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  onChangeStatus(id){
    this.props.onChangeStatus(id);
  }

  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <th scope="row">{index}</th>
        <td className="none-center">{task.title}</td>
        <td><Badge onClick={() => this.onChangeStatus(task.id)} color={task.status ? "danger" : "secondary" }>{task.status ? 'Kích Hoạt' : 'Ẩn'}</Badge></td>
        <td>
          <Button color="warning">Sửa</Button>{' '}
          <Button color="danger">Xóa</Button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
