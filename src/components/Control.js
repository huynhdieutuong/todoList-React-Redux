import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Search from './Search';
import Sort from './Sort';

class Control extends Component {

  render() {
    const { onSearchTask } = this.props;
    return (
      <div className="Control">
        <Row>
          <Col md="6">
            <Search onSearchTask={onSearchTask}/>
          </Col>
          <Col md="4">
            <Sort />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Control;
