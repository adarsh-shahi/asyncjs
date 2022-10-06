// import {addToCart, totalPrice as price, qt} from './shoppiongCart.mjs'

// addToCart('soap', 10)
// console.log(price, qt); 


console.log(`Importing module`);

//import everything in an object
import * as ShoppingCart from './shoppiongCart.mjs'
ShoppingCart.addToCart('bread', 23)
console.log(ShoppingCart.qt, ShoppingCart.totalPrice);



// all the modules that are imported are excuted first

