'use strict';

module.exports.getProductsList = async event => {
  return {
    statusCode: 200,
    body: 
    JSON.stringify({
        productName: "AzulAll",
        price: '78'
      }, null, 2),
  
  };

};
