import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';

import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks, onChangeStatus } = this.props;
    return (
      <div className="TaskList">
        <Table hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Trạng Thái</th>
              <th>Hoạt Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"></th>
              <td><Input type="text" /></td>
              <td>
                <Input type="select">
                  <option value={true}>Kích Hoạt</option>
                  <option value={false}>Ẩn</option>
                </Input>
              </td>
              <td></td>
            </tr>
            {
              tasks.map((task, index) => 
              <TaskItem 
                key={index} 
                task={task} 
                index={index + 1}
                onChangeStatus={onChangeStatus}
                />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TaskList;
