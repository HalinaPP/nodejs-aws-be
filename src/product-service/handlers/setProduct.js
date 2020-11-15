'use strict';
import { addProduct } from '../model/pg-client';
import { accessHeaders } from '../constants/headers';

export const setProduct = async event => {
  const reqC = event.requestContext;
  console.log( reqC.requestTime+' '+reqC.httpMethod+' '+reqC.identity.sourceIp+' '+reqC.identity.userAgent+
  ' '+ reqC.protocol+' '+reqC.domainName+' '+ reqC.path+' '+event.body);

  try{ 
    const productId = await addProduct( JSON.parse(event.body)  );
   
    if(!productId){
        throw new Error('400');
    }
    
    return {
      statusCode: 200,
      headers: accessHeaders,
      body: JSON.stringify({id: productId}, null, 2),
    };
  
  } catch(e) {
    return {
      statusCode: 500,
      headers: accessHeaders,
      body: JSON.stringify({error: e.message}, null, 2),
    };
  }
};
