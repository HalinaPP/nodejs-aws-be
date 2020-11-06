'use strict';
import { addProduct } from './pg-client';

export const setProduct = async event => {

    console.log('ev=', event.body);
  try{ 
    //const productId = await addProduct( JSON.parse(event.body) );
    const productId = await addProduct( JSON.parse(event.body)  );
    console.log('prod=',productId);
    if(!productId){
        throw new Error('500');
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({id: productId}, null, 2),
    
    };
  
  } catch(e) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({error: e.message}, null, 2),
    };
  }


};
