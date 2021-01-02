import { accessHeaders } from '../constants/headers';
import csv from 'csv-parser';

const AWS = require('aws-sdk');
const BUCKET = 'import-files-halinapp';

export const importFileParser =  ({ Records }) =>{
    try{
        const  s3 = new AWS.S3({region: 'eu-west-1'});
              
        Records.forEach( async(record)  => {
            const { key } =  record.s3.object;
            const params = {
                Bucket: BUCKET,
                Key: key
            };
                      
           await s3.getObject(params).createReadStream()
                .pipe(csv())
                .on('data', (data) =>  console.log(data) )
                .on('end',   async () =>  {
                    const copyKey =  key.replace('uploaded', 'parsed');
                
                    console.log('Copy from '+ BUCKET +'/'+key);

                    await s3.copyObject({
                        Bucket: BUCKET,
                        CopySource: `${BUCKET}/${key}`,
                        Key: copyKey
                    })
                    .promise();

                    console.log('Copy to '+ BUCKET +'/'+ copyKey);

                    await s3.deleteObject({
                        Bucket: BUCKET,
                        Key: key
                    }).promise();
        
                    console.log('image '+ key.split('/')[1]+' was parsed ');
                    
                });
        });
    } catch( err ){
        console.log('catch=',err);
    } 

    return {statusCode: 202};
}