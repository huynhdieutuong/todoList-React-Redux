import React, { Component } from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap';

class Sort extends Component {
  render() {
    return (
      <div className="Sort">
        <InputGroup>
          <Input placeholder="Nhập từ khóa..."/>
          <InputGroupAddon addonType="append">
          <Button color="primary">Tìm</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Sort;
