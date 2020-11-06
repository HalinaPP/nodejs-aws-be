'use strict';
import data from '../data/mock.json';

export const getProductsById = async event => {
  try{ 
    const productId = event.path.split('/')[2];
  
    const product = await data.find(item => item.id === productId);
  
      if(!product){
        throw new Error('[404] Product not found');
      }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({product:product}, null, 2),
    
    };
  
  } catch(e) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({error: e.message}, null, 2),
    };
  }


};
