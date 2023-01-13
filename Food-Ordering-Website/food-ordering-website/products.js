"use strict"

let products = [
  { 
    id: "1",
    name: 'Chow Mein',
    category: 'Chinese Style',
    price: 11.99,
    img: 'https://www.chefkunalkapur.com/wp-content/uploads/2021/12/Veg-Chowmein-1300x867.jpg?v=1638771610'
  },
  
  { 
    id: "2",
    name: 'Dumplings',
    category: 'Chinese Style',
    price: 10.99,
    img: 'https://www.allrecipes.com/thmb/utcoyAc7iC0Xo2gHsHcu-sWNQQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14759-pork-dumplings-ddmfs-319-3x4-1-315b828b72dc47e99394915e4d539816.jpg'
  },

  { 
    id: "3",
    name: 'Ma Po Tofu',
    category: 'Chinese Style',
    price: 13.99,
    img: 'http://okonomikitchen.com/wp-content/uploads/2019/07/EasyVeganMapoTofu-1.jpg'
  },

  { 
    id: "4",
    name: 'Ramen',
    category: 'Japanese Style',
    price: 13.99,
    img: 'https://www.feastingathome.com/wp-content/uploads/2018/01/spicy-miso-ramen-with-salmon-100-2.jpg'
  },

  { 
    id: "5",
    name: 'Japanese Curry',
    category: 'Japanese Style',
    price: 10.99,
    img: 'https://eatlittlebird.com/wp-content/uploads/2019/03/chicken-katsu-curry-22.jpg'
  },

  { 
    id: "6",
    name: 'Tempura',
    category: 'Japanese Style',
    price: 7.99,
    img: 'https://www.angsarap.net/wp-content/uploads/2014/12/Tempura-Wide.jpg'
  },

  { 
    id: "7",
    name: 'Cheese Burger',
    category: 'American Style',
    price: 12.99,
    img: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/master/pass/Smashburger-recipe-120219.jpg'
  },

  { 
    id: "8",
    name: 'Fried Chicken',
    category: 'American Style',
    price: 9.99,
    img: 'https://hot-thai-kitchen.com/wp-content/uploads/2022/09/hat-yai-fried-chicken-blog.jpg'
  },

  { 
    id: "9",
    name: 'Hot Dog',
    category: 'American Style',
    price: 6.99,
    img: 'https://www.thespruceeats.com/thmb/idKADDs0HiIEXXmDuxmOplfCYmU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hot-dog-buns-5270201-hero-01-a57bcb048446416fb295e14ff32bdf3c.jpg'
  },
];

function getAllProducts(){
  return products;
}

function getProduct(id){
  for (let product of products){
    if (product.id === id){
      return product;
    }
  }
}

module.exports = {
  getAllProducts,
  getProduct
}