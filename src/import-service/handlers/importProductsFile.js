'use strict';

import { accessHeaders } from '../constants/headers';
const AWS = require('aws-sdk');
const BUCKET = 'import-files-halinapp';


export const importProductsFile = async event => {
  const reqC = event.requestContext;
  const csvName = event.queryStringParameters.name;

  console.log( reqC.requestTime+' '+reqC.httpMethod+' '+reqC.identity.sourceIp+' '+reqC.identity.userAgent+
  ' '+ reqC.protocol+' '+reqC.domainName+' '+ reqC.path);

    const  s3 = new AWS.S3({region: 'eu-west-1' });
    const pathName= 'uploaded/'+csvName;
    
    const params_sign = {
        Bucket:BUCKET,
        Key: pathName,
        Expires: 60,
        ContentType: 'text/csv'
    };

    return await new Promise((resolve,reject) => {
        s3.getSignedUrl('putObject', params_sign, (error,url) => {
        if(error){
            return reject(error);
            
        }

        resolve({
            statusCode: 200,
            headers: accessHeaders,
            body:url
        })
    });
});
}

  
    
   