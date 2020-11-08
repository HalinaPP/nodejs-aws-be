'use strict';
import { selectById } from '../model/pg-client';
import { accessHeaders } from '../constants/headers';

export const getProductsById = async event => {
  
  const reqC = event.requestContext;
  console.log( reqC.requestTime+' '+reqC.httpMethod+' '+reqC.identity.sourceIp+' '+reqC.identity.userAgent+
  ' '+ reqC.protocol+' '+reqC.domainName+' '+ reqC.path);

  try{ 
    const productId = event.pathParameters.productId;
    const product = await selectById(productId);
  
    if(!product){
        throw new Error('[404] Product not found');
    }
    
    return {
      statusCode: 200,
      headers: accessHeaders,
      body: JSON.stringify(product, null, 2),
    
    };
  
  } catch(e) {
    return {
      statusCode: 500,
      headers: accessHeaders,
      body: JSON.stringify({error: e.message}, null, 2),
    };
  }
};
