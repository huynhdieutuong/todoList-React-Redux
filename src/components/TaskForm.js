import React, { Component } from 'react';
import { Form, Input, Toast, ToastBody, ToastHeader, Button } from 'reactstrap';
import deleteIcon from '../icons/delete.svg';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      status: false
    };
  }

  componentDidMount() {
    if(this.props.taskEditing) {
      this.onFillTaskEditing();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.taskEditing !== this.props.taskEditing) {
      this.onFillTaskEditing();
    }
  }

  onChange = event => {
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

  submitForm = event => {
    event.preventDefault();
    if(this.state.title) {
      this.props.onSave(this.state);
      this.onReset();
      this.props.closeForm();
    }
  }

  onReset = () => {
    this.setState(state => {
      return {
        title: '',
        status: false
      }
    })
  }

  onFillTaskEditing = () => {
    const { id, title, status } = this.props.taskEditing;
    this.setState({
      id,
      title,
      status
    })
  }
  
  render() {
    const { closeForm } = this.props;
    const { title, status, id } = this.state;
    return (
      <div className="TaskForm">
        <Toast>
          <ToastHeader>
            { id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' } 
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
                <Button onClick={this.onReset} color="warning">Hủy Bỏ</Button>
              </span>
            </Form>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    taskEditing: state.taskEditing
  }
}

const mapDispatchToProp = (dispatch, props) => {
  return {
    onSave: task => dispatch(actions.saveTask(task)),
    closeForm: () => dispatch(actions.closeForm())
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(TaskForm);
