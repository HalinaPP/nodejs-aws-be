'use strict';

import { accessHeaders } from '../constants/headers';
const AWS = require('aws-sdk');
const BUCKET = 'import-files-halinapp';


export const importProductsFile = async event => {
  const reqC = event.requestContext;
  const csvName = event.queryStringParametrs.name;
console.log('ev=',event.queryStringParametrs);
  console.log( reqC.requestTime+' '+reqC.httpMethod+' '+reqC.identity.sourceIp+' '+reqC.identity.userAgent+
  ' '+ reqC.protocol+' '+reqC.domainName+' '+ reqC.path);

    const  s3 = new AWS.S3({region: 'eu-west-1', signatureVersion: 'v4' });

    const params_sign = {
        Bucket:BUCKET,
        Key: `uploaded/${csvName}`,
        Expires: 60,
        ContentType: 'text/csv'
    };

    return new Promice ((resolve,reject) => {
        s3.getSignedUrl('putObject', params_sign, (error,url) => {
        if(error){
            return reject(error);
            
        }

        return {
            statusCode: 200,
            headers: accessHeaders,
            body: url,
          
          };
        
    });
});
}

  
    
   