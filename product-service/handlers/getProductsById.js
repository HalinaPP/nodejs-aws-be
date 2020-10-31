'use strict';
const data = require('../data/mock.json');

module.exports.getProductsById = async event => {
  //try{
    const productId = event.path.split('/')[2];
   
    //{ statusCode: 404, body: 'Not found', headers: { 'Content-Type': 'text/plain' } }
  /*}catch(e){
   
  }
*/
  //try{
    const product = data.find(item => item.id === productId);
    if(!product){
      return new Error('[404] Not found');
    }
  /*}catch (e){
    throw 'Cannot-find product.';
  }*/
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({product:product}, null, 2),
  
  };

};
