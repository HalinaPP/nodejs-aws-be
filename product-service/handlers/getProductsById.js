'use strict';
import { selectById } from './pg-client';

export const getProductsById = async event => {
  try{ 
    const productId = event.path ? event.path.split('/')[2] : '';
   
    const product = await selectById(productId);
  
    if(!product){
        throw new Error('[404] Product not found');
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(product, null, 2),
    
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
