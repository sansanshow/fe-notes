// function printLabel(labelObj: {label: string}) {
//   console.log(labelObj.label);
// }

let label = {name: '12', label: 'The Label'};

// printLabel(label);

/**
 * interface
 */
// ++ printLabel
interface LabelValue2 {
  label?: string;
}

function printLabelPlus(labelObj: LabelValue2) {
  console.log('printLabelPlus', label.label);
}

printLabelPlus(label);

/**
 * 可选属性 ?:
 */
interface SquareConfig2 {
  color?: string;
  width?: number;
}

function createSquare2(config: SquareConfig2): { color: string, area: number } {
  let defSquare = { color: 'white', area: 100 };
  if (config.color) {
    defSquare.color = config.color;
  }

  if (config.width) {
    defSquare.area = config.width * config.width;
  }
  return defSquare;
}

let mySquare31 = createSquare2({colour: 'black'});

console.log(mySquare31);
