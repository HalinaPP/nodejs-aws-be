'use strict';
import data from '../data/mock.json';

export const getProductsById = async event => {
  try{ 
    const productId = event.path.split('/')[2];
  
    const product = await data.find(item => item.id === productId);
  
      if(!product){
        return {
          statusCode: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({error:'[404] Product not found'}, null, 2),
        
        };
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
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({error: e}, null, 2),
    };
  }


};
