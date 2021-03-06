import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import { connect } from 'react-redux';

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
    });
  }

  render() {
    let { tasks, search, sort } = this.props;
    const { filterTitle, filterStatus } = this.state;

    // filter
    tasks = tasks.filter(task => task.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1);

    const filterStatusBoleen = filterStatus === '1' ? true : filterStatus === '-1' ? false : 0;
    if(filterStatusBoleen !== 0) {
      tasks = tasks.filter(task => task.status === filterStatusBoleen);
    };

    // search
    tasks = tasks.filter(task => task.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    // sort
    tasks.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      switch (sort) {
        case 'a-z': return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        case 'z-a': return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        case 'kh': return b.status - a.status;
        case 'an': return a.status - b.status;
        default: return tasks;
      }
    })

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
    search: state.search,
    sort: state.sort
  }
}

export default connect(mapStateToProps, null)(TaskList);
