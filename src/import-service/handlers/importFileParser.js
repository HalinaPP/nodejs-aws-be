import { accessHeaders } from '../constants/headers';

const AWS = require('aws-sdk');
const BUCKET = 'import-files-halinapp';
import * as csv from 'csv-parser';

export const importFileParser = async (event) =>{

    const  s3 = new AWS.S3({region: 'eu-west-1'});
    
    const params = {
        Bucket: BUCKET,
        Key: 'uploaded/catalogs.csv'
    };
    
    const s3Stream = s3.getObject(params).createReadStream();

    await new Promice((resolve,reject) => {
        s3Stream.pipe(csv())
        .on('data', (data) =>  console.log(data) )
        .on('error', (error) =>  reject(error) )
        .on('end', () =>  resolve() );
    
    });

    for(let record of event.Records){
        await s3.copyObject({
            Bucket: BUCKET,
            CopySource: BUCKET+'/'+record.s3.object.key,
            Key: record.s3.object.key.replace('uploaded', 'parsed')
        }).promise();

        await s3.deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).promise();

        console.log('image '+record.s3.object.key.split('/')[1]+' was parsed ');
    }
    return {statusCode: 202}


}