'use strict';
//import data from '../data/mock.json';
const data = require('../data/mock.json');

/*module.exports.getProductsList = async event => {
 
  
  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    body: JSON.stringify(  data , null, 2),
  
  };

};*/

module.exports.getProductsList = async event => {
    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data, null, 2)
      
      };
  };
