import React, { Component } from 'react';

class SetItem extends Component {
  render() {
    return (
      <li>
        <i className={'iconfont ' + this.props.data.iconClass} style={+this.props.data.status === 1 ? {color: this.props.data.iconColor} : { color: '#ebebeb'}}/>
        <p className="name">{this.props.data.name}</p>
        <p className="desc">{this.props.data.desc}</p>
      </li>
    );
  }
}

export default SetItem;