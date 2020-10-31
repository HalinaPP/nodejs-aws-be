'use strict';

module.exports.getProductsById = async event => {
  return {
    statusCode: 200,
    body: 
    JSON.stringify({
        productName: "Azul",
        price: '78'
      }, null, 2),
  
  };

};
