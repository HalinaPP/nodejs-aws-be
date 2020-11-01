'use strict';
import data from '../data/mock.json';

export const getProductsList = async event => {

  if(!data){
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({error: "Error: products not found1!"}, null, 2)
    
    };
  }

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data, null, 2)
      
      };
  };
