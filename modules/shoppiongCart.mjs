
// these varialbles are scoped to this module only untl we export them
const shippingCost  = 10;
const cart = []

// 2 types of exports works on top level code
// named exports and default exports


//Named exports - import with exact variable name inside a curly brac
export const addToCart = function(product, quantity){
  cart.push({product, quantity})
  console.log(`${quantity} ${product} added to cart`);
}
console.log(`Exporting Module`);

const totalPrice = 237;
const totalQuantity = 23

export {totalPrice, totalQuantity as qt}