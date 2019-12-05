import React, {Component} from 'react';
import { Button, Toast } from 'antd-mobile';
import Header from '@/components/header';
import './styles.scss';

import api from '@/api'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userType: '2',
      image: '',
      imgCode: '',
      imgToken: '',
      loginForm: {
        mobile: '',
        smsCode: '',
        smsToken: '',
      },
      captchaLabel: '获取验证码',
      captchaDisable: false,
      loginBtnDisabled: true,
      needImageCode: false,
      timer: null
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.valideHandle = this.valideHandle.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match);
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  inputHandle(e) {
    let name = e.target.attributes.name.value;
    let value = e.target.value;
    // 更改state 中对象中某一个值的 三种 方法2、3相似
    // 方法1
    // this.setState(preState => ({
    //   loginForm: {...preState.loginForm, [name]: value}
    // }))

    // 方法2
    // this.setState({
    //   loginForm: Object.assign({}, this.state.loginForm, {[name]: value})
    // })

    // 方法3
    // this.setState({
    //   loginForm: {...this.state.loginForm, [name]: value}
    // })

    if(name === 'imgCode') {
      this.setState({
        imgCode: value
      }, () => {
        // 验证 
        this.valideHandle();
      })
    } else {
      this.setState({
        loginForm: {...this.state.loginForm, [name]: value}
      }, () => {
        // 验证 
        this.valideHandle();
      })
    }
    // this.setState({
    //   loginForm: {...this.state.loginForm, [name]: value}
    // }, () => {
    //   // 验证 
    //   this.valideHandle();
    // })
    // if (['mobile', 'smsCode', 'imgCode'].includes(name)) {
    //   this.valideHandle();
    // }
  }
  valideHandle() {
    const valid = (!this.state.needImageCode || (this.state.needImageCode && this.state.imgCode && this.state.imgToken))
    && !!this.state.loginForm.mobile && !!this.state.loginForm.smsCode && !!this.state.loginForm.smsToken;
    this.setState({
      loginBtnDisabled: !valid
    })
  }
  loginHandle() {
    api.UserLogin({
        mobile: this.state.loginForm.mobile,
        smsToken: this.state.loginForm.smsToken,
        smsCode: this.state.loginForm.smsCode,
        type: this.state.userType
      }).then((res) => {
      Toast.info('登录成功');
    }).catch(() => {})
  }
  clearMobileHandle() {
    this.setState({
      loginForm: Object.assign({}, this.state.loginForm, {
        mobile: ''
      })
    }, () => {
      // 验证 
      this.valideHandle();
    })
    
  }
  codeBtnAction() {
    if (this.state.loginForm.mobile === '') {
      Toast.info('请填写手机号');
      return;
    }

    if (!/^1\d{10}$/g.test(this.state.loginForm.mobile)) {
      Toast.info('手机号格式有误');
      return;
    }

    if (this.state.needImageCode) {
      if (!this.state.imgToken) {
        Toast.info('图形验证码失效，请点击图片刷新');
        return;
      }
      if (this.state.imgCode === '') {
        Toast.info('请输入图形验证码');
        return;
      }
    }

    const tokenKey = sessionStorage.getItem('tokenKey');
    api.SendSms({
        mobile: this.state.loginForm.mobile,
        tokenKey,
        imgToken: this.state.imgToken,
        imgCode: this.state.imgCode
    }).then((res) => {
      const resData = res.data || {};
      if (resData.tip) {
        Toast.info(resData.tip);
      }
      if (resData.needImage) {
        this.refreshVerifImg();
      } else {
        this.setState({
          needImageCode: false,
          loginForm: {...this.state.loginForm, smsToken: resData.smsToken || ''}
        }, () => {
          this.valideHandle();
        })
        this.countdown();
      }
    });
  }
  countdown() {
    const TIME_COUNT = 60;
    let count = TIME_COUNT;
    clearInterval(this.state.timer);
    const timer = setInterval(() => {
      if (count > 1 && count <= TIME_COUNT) {
        count -= 1;
        this.setState({
          captchaLabel: `${count}s后重新发送`
        });
      } else {
        // this.captchaDisable = false;
        this.setState({
          captchaDisable: false
        });
        clearInterval(this.state.timer);
        // this.captchaLabel = '获取验证码';
        this.setState({
          captchaLabel: '获取验证码'
        });
      }
    }, 1000);
    this.setState({ timer, captchaDisable: true });
  }
  refreshVerifImg() {
    api.getImgVerif().then(res => {
      this.setState({
        needImageCode: true,
        imgCode: '',
        image: (res.data && res.data.image) || '',
        imgToken: (res.data && res.data.imageToken) || '',
        loginForm: {...this.state.loginForm, smsToken: '', smsCode: ''}
      })
    })
  }
  render() {
    return (
      <div className="m-wrap login">
        <Header title="登录"/>
        <div className="form">
        <div className="inputBox mobile">
          <span className="label">手机号</span>
          <input type="tel" placeholder="请输入您的手机号" name="mobile" className="input mobileInput" autoComplete="false"
            value={this.state.loginForm.mobile} onChange={this.inputHandle} maxLength="11"/>
            {this.state.loginForm.mobile ?
                <i className="clear-btn iconfont icon-yuanxingguanbianniu" onClick={ this.clearMobileHandle.bind(this) }></i>
                : ''
            }
            
        </div>
        {this.state.needImageCode ?
          <div className="code inputBox">
            <span className="label">图形验证码</span>
            <input type="text" placeholder="请输入图形验证码" className="input smscode" name="imgCode" value={this.state.imgCode}
              maxLength="4" onChange={(event) => {this.inputHandle(event)}} />
            <img className="verifImg" src={this.state.image} alt="" data-src="" onClick={ this.refreshVerifImg.bind(this) }/>
          </div>
          : ''
        }
        <div className="code inputBox">
          <span className="label">短信验证码</span>
          <input type="tel" placeholder="请输入短信验证码" className="input smscode" name="smsCode" onChange={(event) => {this.inputHandle(event)}}
            value={this.state.loginForm.smsCode} maxLength="6"/>
            <Button
              className={["sms-btn", this.state.captchaDisable ? "disables" : null].join(' ')}
              type="primary"
              size="small"
              disabled={this.state.captchaDisable}
              onClick={this.codeBtnAction.bind(this)}
            >{this.state.captchaLabel}</Button>
          </div>
        </div>
        <div className="btn">
          <Button size="large" type="primary"
            disabled={this.state.loginBtnDisabled} onClick={ this.loginHandle.bind(this) }>登录</Button>
        </div>
      </div>
    );
  }
}

export default Login;