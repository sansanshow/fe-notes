import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './styles.scss';
import Header from '@/components/header';
import SetItem from './components/set-item';
import others from './utils/others'

import api from '@/api'

class App extends Component {
  _isMounted = false;
  _intervalId = null;
  constructor() {
    super();
    this.state = {
      products: [],
      news: [],
      animate: false
    }
    this.scroll = this.scroll.bind(this);
    this.resetNews = this.resetNews.bind(this);
    this.initData = this.initData.bind(this);
    this.initData();
  }
  componentDidMount() {
    console.log('life term', 'componentDidMount');
    this._isMounted = true;
  }
  componentWillUnmount() {
    console.log('life term', 'componentWillUnmount');
    this._isMounted = false;
    clearInterval(this._intervalId);
  }
  componentWillUpdate() {
    console.log('life term', 'componentWillUpdate');
  }
  initData() {
    api.getNews().then(res => {
      if(this._isMounted) {
        this.setState({
          news: res.data
        });
      }
      this._intervalId = setInterval(this.scroll, 2000);
    });
    // prd
    api.getEnableProductList().then(res => {
      if(this._isMounted) {
        this.setState({
          products: res.data
        });
      }
    }).finally(() => { console.log('finally'); });
  }
  scroll() {
    if(!this._isMounted) return;
    this.setState({
      animate: true
    })
    setTimeout(this.resetNews, 500);
  }
  resetNews() {
    if(!this._isMounted) return;
    this.state.news.push(this.state.news[0]);
    this.state.news.shift();
    this.setState({
      animate: false
    })
  }
  render() {
    let  userInfo = {
      mobile: '',
      bank: '',
      name: '',
      headphoto: '//dev2.5udaikuan.com/uploadfile/image/20181130/03fa50d49c4c4cea9e84c05379d33f06.jpeg',
    };
    let hasLogin = false;
    
    return (
      <div className="m-wrap">
        <Header/>
        <div className={hasLogin ? 'header-top has-login' :'header-top'}>
          <div className="content-box">
            <div className="align-box">
              <div className="portrait">
              {hasLogin ?
                <img className="" src={userInfo.headphoto} alt="user_head"/>
                : <i className="iconfont icon-icon_morentouxiang" />
              }
              </div>
              {hasLogin ?
                <div className="info-box">
                  <div className="mobile">158*****001</div>
                  <div className="name">张三丰</div>
                  <div className="bank">山西省运城市</div>
                </div>
                : <Link to={{
                  pathname: '/login',
                  search: '?sort=name',
                  hash: '#the-hash',
                  state: { fromDashboard: true }}}><div className="btn_login"><span>点击登录</span></div></Link>
              }
            </div>
          </div>
        </div>
        <div className="flash-news flex">
          <p className="flag"><i className="iconfont icon-icon_gonggao"></i>最新公告：</p>
          <ul className={ this.state.news.length > 1 && this.state.animate ? "flex1 no-wrap anim" : "flex1 no-wrap" } id="news-scroller">
            {
              this.state.news.map((item, i) => {
                return <li className="no-wrap" key={i}>{item.title}</li>
              })
            }
          </ul>
        </div>
        <div className="prd-module feature-set">
          <p className="tit"><i className="line"></i>产品服务模块</p>
          <div className="feature-box">
            <ul className="list">{
              this.state.products.map((item,index) => {
                return (<SetItem data={item} key={index}/>)
              })
            }
            </ul>
          </div>
        </div>
        <div className="others feature-set">
          <p className="tit"><i className="line"></i>其他</p>
          <div className="feature-box">
            <ul className="list">{
              others.map((item,index) => {
                return (<SetItem data={item} key={index}/>)
              })
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
