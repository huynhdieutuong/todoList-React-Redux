import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';

import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: 0
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(state => {
      return {
        [name]: value
      }
    }, () => this.props.onFilterTask(this.state));
  }

  render() {
    const { tasks, onChangeStatus, onDeleteTask, onEditTask } = this.props;
    const { filterName, filterStatus } = this.state;
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
              <td><Input type="text" 
                    onChange={this.onChange}
                    name="filterName"
                    value={filterName}
                    /></td>
              <td>
                <Input type="select" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                  <option value={0}>Tất Cả</option>
                  <option value={1}>Kích Hoạt</option>
                  <option value={-1}>Ẩn</option>
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
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, null)(TaskList);
