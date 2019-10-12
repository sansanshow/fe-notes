/**
 * 重载 
 * 一副扑克牌 抓牌 与 出牌的动作
 */

let suits = ['♠', '♥', '♣', '♦'];

function pickCard(x: {suit: string, card: number}[]): number;
function pickCard(x: number): {suit: string, card: number};
function pickCard(x): any {
  if (typeof x == 'object') {
    let pickCardIndex = Math.floor(Math.random() * x.length);
    return pickCardIndex;
  } else {
    let suit = Math.floor(x / 13);
    return { suit: suits[suit], card: (x % 13) + 1 };
  }
}
// 出牌
let myDeck = [{ suit: "♦", card: 2 }, { suit: "♠", card: 10 }, { suit: "♥", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

// 抓牌
let pickedCard2 = pickCard(15);
myDeck.push(pickedCard2);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

for (let index = 0; index < 5; index++) {
  pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("pop: card: " + pickedCard1.card + " of " + pickedCard1.suit);

  pickedCard2 = pickCard(Math.floor(Math.random() * 52));
  myDeck.push(pickedCard2);
  console.log("push: card: " + pickedCard2.card + " of " + pickedCard2.suit);
}
console.log(myDeck);