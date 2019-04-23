import React, { Component } from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import checkIcon from '../icons/checked.svg';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a-z'
    }
  }
  onSort(value) {
    this.setState({
      value: value
    });
    this.props.onSortTask(value);
  }

  render() {
    const sortStyles = [
      { name: 'Tên A-Z', value: 'a-z'},
      { name: 'Tên Z-A', value: 'z-a'},
      { name: 'divider'},
      { name: 'Trạng Thái Kích Hoạt', value: 'kh'},
      { name: 'Trạng Thái Ẩn', value: 'an'}
    ]
    return (
      <div className="Sort">
        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Sắp Xếp
          </DropdownToggle>
          <DropdownMenu>
            { sortStyles.map((style, index) => {
                if(style.name === 'divider') {
                  return <DropdownItem key={index} divider />
                } else {
                  return <DropdownItem key={index} onClick={() => this.onSort(style.value)}>
                            <span>{style.name}</span> 
                            { style.value === this.state.value ? <img src={checkIcon} className="check-icon" alt="check" /> : '' }
                          </DropdownItem> 
                }
              })
            }
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    );
  }
}

export default Sort;
