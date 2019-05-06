import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  onChange = event => {
    this.setState({
      search: event.target.value
    })
  }

  onSearch = () => {
    this.props.onSearchTask(this.state.search);
  }

  render() {
    return (
      <div className="Search">
        <InputGroup>
          <Input placeholder="Nhập từ khóa..." onChange={this.onChange}/>
          <InputGroupAddon addonType="append">
          <Button color="primary" onClick={this.onSearch}>Tìm</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onSearchTask: value => dispatch(actions.searchTask(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
