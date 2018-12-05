/**
 * 全屏函数封装
 * @author kovii
 */
class fullScreen {
  constructor(errcb, succ) {
    this.prefixName = '';
    this.isEnabledFullScreen = true;
    this.isFullScreen(errcb, succ);
  }
  /**
   * 全屏模式
   * @param {*} domName 
   */
  FullScreen(domName) {
    if (!this.isEnabledFullScreen) return;
    const element = document.querySelector(domName);
    const methodName = this.prefixName === '' ? 'requestFullscreen' : `${this.prefixName}RequestFullscreen`;
    element[methodName]();
  }
  /**
   * 退出-全屏模式
   * @param {*} domName 
   */
  ExitFullscreen() {
    if (!this.isEnabledFullScreen) return;
    const methodName = this.prefixName === '' ?
      'exitFullscreen' : `${this.prefixName}ExitFullscreen`;
    document[methodName]();
  }
  /**
   * 失败回调:
   * 调用全屏请求，浏览器原因或者用户阻止，导致全屏失败，进行回调；
   * @param {*} domName 
   */
  onScreenError(errorFn) {
    const methodName = `on${this.prefixName}fullscreenerror`;
    document[methodName] = (e) => {
      errorFn && errorFn();
    }
  }
  onScreenChange(enter, exit) {
    if (!this.isEnabledFullScreen) return;
    const methodName = `on${this.prefixName}fullscreenchange`;
    document[methodName] = (e) => {
      if (this.hasElementFullScreen()) {
        enter && enter();
      } else {
        exit && exit();
      }
    }
  }
  /**
   * 判断是否支持全屏
   * @param {*} fn 
   */
  isFullScreen(fn, succ) {
    let fullScreenEnabled;
    if (document.fullscreenEnabled) {
      fullScreenEnabled = true;
      this.prefixName = '';
    } else if (document.webkitFullscreenEnabled) {
      fullScreenEnabled = true;
      this.prefixName = 'webkit';
    } else if (document.mozFullscreenEnabled) {
      fullScreenEnabled = true;
      this.prefixName = 'moz';
    } else if (document.msFullscreenEnabled) {
      fullScreenEnabled = true;
      this.prefixName = 'ms';
    }
    if (!fullScreenEnabled) {
      this.isEnabledFullScreen = false;
      fn && fn();
    } else {
      succ && succ();
    }
  }

  /**
   * 判断是否有元素在全屏下
   */
  hasElementFullScreen() {
    const fullscreenElement = document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullscreenElement ||
      document.webkitFullscreenElement;
      if (fullscreenElement) {
        return true;
      }
      return false;
  }

}
