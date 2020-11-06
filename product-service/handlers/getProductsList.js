'use strict';
import { selectAll } from './pg-client';

export const getProductsList = async event => {

  const products = await selectAll();
  try{
    if(!products){
      throw new Error( 'Error: products not found1!' );
    }
 
    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products, null, 2)
      
      };
    } catch (e) {
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
