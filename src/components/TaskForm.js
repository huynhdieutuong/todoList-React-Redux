import React, { Component } from 'react';
import { Form, Input, Toast, ToastBody, ToastHeader, Button } from 'reactstrap';
import deleteIcon from '../icons/delete.svg';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      status: false
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    if(this.props.taskEditing) {
      const { id, title, status } = this.props.taskEditing;
      this.setState(state => {
        return {
          id: id,
          title: title,
          status: status 
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.taskEditing) {
      const { id, title, status } = nextProps.taskEditing;
      this.setState(state => {
        return {
          id: id,
          title: title,
          status: status 
        }
      })
    } else {
      this.setState(state => {
        return {
          id: '',
          title: '',
          status: false 
        }
      })
    }
  }

  onChange(event) {
    let { name, value } = event.target;
    if(name === 'status') {
      value = value === 'true' ? true : false
    }
    this.setState(state => {
      return {
        [name]: value 
      }
    });
  }

  submitForm(event) {
    event.preventDefault();
    this.props.addTask(this.state);
    this.setState(state => {
      return {
        id: '',
        title: '',
        status: false
      }
    })
  }
  
  render() {
    const { closeForm, taskEditing } = this.props;
    const { title, status } = this.state;
    return (
      <div className="TaskForm">
        <Toast>
          <ToastHeader>
            { taskEditing ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' } 
            <img src={deleteIcon} className="delete-icon" onClick={closeForm} alt=""/>
          </ToastHeader>
          <ToastBody>
            <Form onSubmit={this.submitForm}>
              <Input 
                className="input-form" 
                placeholder="Nhập tên công việc" 
                name="title" 
                onChange={this.onChange} 
                value={title} />
              <Input 
                className="input-form" 
                type="select" 
                name="status" 
                onChange={this.onChange} 
                value={status}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </Input>
              <span className="button-form">
                <Button color="primary">Lưu Lại</Button>&nbsp;
                <Button color="warning">Hủy Bỏ</Button>
              </span>
            </Form>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

export default TaskForm;
