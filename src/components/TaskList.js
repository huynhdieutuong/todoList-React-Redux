import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTitle: '',
      filterStatus: 0
    }
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState(state => {
      return {
        [name]: value
      }
    }, () => this.props.onFilter(this.state));
  }

  render() {
    let { tasks, filterValue } = this.props;
    const { filterTitle, filterStatus } = this.state;

    // filter
    tasks = tasks.filter(task => task.title.toLowerCase().indexOf(filterValue.filterTitle.toLowerCase()) !== -1);
    if (filterValue.filterStatus !== 0) {
      tasks = tasks.filter(task => task.status === filterValue.filterStatus);
    }

    // search

    // sort

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
                    name="filterTitle"
                    value={filterTitle}
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
                />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterValue: state.filterValue
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onFilter: filterValue => dispatch(actions.filterTable(filterValue))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
