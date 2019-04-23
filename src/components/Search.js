import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  onSearch() {
    this.props.onSearchTask(this.state.search);
  }

  render() {
    return (
      <div className="Sort">
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

export default Sort;
