function rearrangeFruits(fruits){
    let n = fruits.length;
    let removed = fruits.splice(-4);

    fruits.splice(0,0,...removed);
    return fruits
}

const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes", "Strawberry", "Watermelon", "Peach", "Kiwi"];

console.log(rearrangeFruits(fruits));