import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
const creatHistory = require('history').createHashHistory;  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
// import history from 'history/createHashHistory'

class Header extends React.PureComponent {
  constructor() {
    super();
    this.onLeftClick = this.onLeftClick.bind(this);
    this.goBackPage = this.goBackPage.bind(this);
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate')
  //   return true;
  // }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  goBackPage() {
    history.goBack();  //返回上一页这段代码
  }
  onLeftClick() {
    if (this.props.back) {
      this.props.back()
    } else {
      this.goBackPage()
    }
    // this.props.router.goBack();
  }
  render() {
    return (
      <NavBar
          mode="light"
          icon={<Icon type="left" />}
          leftContent="返回"
          onLeftClick={this.onLeftClick}
          >{this.props.title || '这里是标题'}</NavBar>
    );
  }
}

export default Header;