const {Client} = require ('pg');
//const uuid = require ('uuid');

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl:{
        rejectUnauthorized: false
    },
    connectionTimeOutMillis: 5000

}

selectAll = async event => {
    
    const client = new Client(dbOptions);
    await client.connect();
    
    let productsAll;
    
    try{
        const { rows } = await client.query(`Select p.*, s.count from products as p LEFT JOIN stocks as s ON  p.id = s.product_id `);
        productsAll = rows;
    } catch (error) {
        console.error('Error',error);

    }finally{
        client.end();
    }
    return productsAll;
   
}

selectById = async id =>{
    const client = new Client(dbOptions);
    await client.connect();
    let product;
   
    try{
        const { rows } = await client.query(`Select  p.*, s.count from products as p LEFT JOIN stocks as s ON  s.product_id = p.id  where p.id='${id}'`);
        product = rows[0];
    } catch (error) {
        console.error('Error',err);

    }finally{
        client.end();
    }
    return product;
}

addProduct = async productData =>{
    const client = new Client(dbOptions);
    await client.connect();
    let productId;
    console.log('productData=',productData);

    try{
        let { rows } = await client.query(`INSERT INTO products
                                                (id, title, description, price)
                                            VALUES (uuid_generate_v4(), '${productData.title}', '${productData.description}', ${productData.price} ) RETURNING id`);
        console.log('row=',rows);
        productId = rows[0].id;
        if(productId) {
            let { rows } = await client.query(` INSERT INTO stocks
                                                (product_id, count)
                                            VALUES ('${productId}', ${productData.count}) `);
            console.log('st',rows);
       }
    } catch (error) {
        console.error('Error',err);

    }finally{
        client.end();
    }
    return productId;
}


module.exports = {
    selectAll,
    selectById,
    addProduct
}