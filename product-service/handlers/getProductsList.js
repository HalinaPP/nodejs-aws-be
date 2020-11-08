'use strict';
import { selectAll } from '../model/pg-client';
import { accessHeaders } from '../constants/headers';

export const getProductsList = async event => {
  const reqC = event.requestContext;
  console.log( reqC.requestTime+' '+reqC.httpMethod+' '+reqC.identity.sourceIp+' '+reqC.identity.userAgent+
  ' '+ reqC.protocol+' '+reqC.domainName+' '+ reqC.path);

  const products = await selectAll();
  try{
    if(!products){
      throw new Error( 'Error: products not found1!' );
    }
 
    return {
        statusCode: 200,
        headers: accessHeaders ,
        body: JSON.stringify(products, null, 2)
      
      };
    } catch (e) {
      return {
        statusCode: 500,
        headers: accessHeaders,
        body: JSON.stringify({error: e.message}, null, 2),
      };
    }
  };
