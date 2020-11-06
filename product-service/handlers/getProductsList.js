'use strict';
import data from '../data/mock.json';

export const getProductsList = async event => {

  try{
    if(!data){
      throw new Error( 'Error: products not found1!' );
    }

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data, null, 2)
      
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
