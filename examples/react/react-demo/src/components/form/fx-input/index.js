import React from 'react';
import './styles.scss';
class FxInput extends React.Component {
  constructor() {
    this.onChange = this.props.onChange
  }
  render() {
    return (
        <div className="inputBox mobile">
            <span className="label">{this.props.label}</span>
            <input type="tel" placeholder={this.props.placeholder || "请输入您的手机号"} name="mobile" className="input mobileInput" autoComplete="false"
                value={this.props.value} onChange={this.onChange} maxLength={this.props.maxLength}/>
                {/* {this.state.loginForm.mobile ?
                    <i className="clear-btn iconfont icon-yuanxingguanbianniu" onClick={ this.clearMobileHandle.bind(this) }></i>
                    : ''
                } */}
        </div>
    )
  }
}

export default FxInput;