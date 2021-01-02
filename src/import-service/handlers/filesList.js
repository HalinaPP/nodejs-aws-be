import { accessHeaders } from '../constants/headers';

const AWS = require('aws-sdk');
const BUCKET = 'import-files-halinapp';

export const filesList = async () => {
    const  s3 = new AWS.S3({region: 'eu-west-1'});
    let status=200;
    let files = [];

    const params = {
        Bucket: BUCKET,
        Prefix: 'uploaded/'
    };
    
    try{
        const s3Response = await s3.listObjectsV2(params).promise();
        files = s3Response.Contents;

    }catch(error) {
        console.error(error);
        status =500;
    }

    const response = {
        statusCode: status,
        headers: accessHeaders,
        body: JSON.stringify(
            files
                .filter(file => file.Size)
                .map(file =>`https://${BUCKET}.s3.amazonaws.com/${file.Key}`)
        )
    };
    return response;
}