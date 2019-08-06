window.JSBridge = {};

function callJS (action, params, whoAmI) {
  alert(1);
  // params = JSON.parse(JSON.stringify(params));
  // switch (action) {
  //   case 'showSkill':
  //     const category = params.category;
  //     JSBridge.showSkill(category);
  //     break;
  //   case 'showSkillDetail':
  //     const id = params.id;
  //     JSBridge.showSkillDetail(id);
  //     break;
  //   case 'otherAction':
  //     // some code
  //     break;
  //   default:
  //     alert(1);
  //     break;

  // }
}

// JS暴露给应用的通用接口
const SpkJSBridge = {}
// 全部接口
JSBridge.callJS = callJS