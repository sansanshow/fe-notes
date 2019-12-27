/**
 * 不完善之处是驼峰
 */


const elementStyle = document.createElement("div").style; // 拿到当前浏览器下所有的css属性


/**
 * 这个函数用来判断浏览器前缀
 * 返回standard表示不需要前缀
 * @param {string} prop 
 */
function vendor(prop) {
    // 处理有中划线(-)分隔开的属性，事实上是以驼峰命名法
    let afterProp = transformCamels(prop);
    let transformNames = {
        webkit: `webkit${afterProp}`,
        moz: `moz${afterProp}`,
        ms: `ms${afterProp}`,
        o: `o${afterProp}`,
        standard: `${prop}`
    }
    for(var key in transformNames) {
        if(elementStyle[transformNames[key]] !== undefined) {
            return key;
        }  
    }
    return false
}
/**
 * 针对网上一些方法的改进
 * @param {string} prop 
 */
function transformCamels(prop){
    let camels = prop.split('-');
    camels.forEach((item, index) => {
        camels[index] = item.charAt(0).toUpperCase() + item.substr(1);
    })
    let afterProp = camels.join('');
    return afterProp;
}

/**
 * 封装成方法使用
 * @param {*} style 
 */
function prefixStyle(style) {
    let prefix = vendor(style);
    if(prefix === false) {
        return false;
    }
    if(prefix === 'standard') {
        return style;
    }
    // return prefix + style.charAt(0).toUpperCase() + style.substr(1);
    return prefix + transformCamels(style);
    
}
export default prefixStyle