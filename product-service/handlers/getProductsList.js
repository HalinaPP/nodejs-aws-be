'use strict';
import data from '../data/mock.json';

export const getProductsList = async event => {

  try{
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
    } catch (e) {
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
