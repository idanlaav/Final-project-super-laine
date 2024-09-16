import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql";
import fs from "fs";
import dal from "../2-utils/dal";
import ProductModel from "../4-models/product-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";


async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`;
    const products = await dal.execute(sql);
    return products;
}

async function getProductsByCategory(categoryId: number): Promise<ProductModel[]> {
    const sql = "SELECT * FROM products WHERE categoryId = ?";
    const values = [categoryId];
    const products = await dal.execute(sql, values);
    return products;
}

async function getOneProductById(productId: number): Promise<ProductModel> {
    const sql = `SELECT * FROM products WHERE productId = ?`;
    const values = [productId];
    const products = await dal.execute(sql, values);
    const product = products[0];
    if (!product) {
        throw new ResourceNotFoundError(productId);
    }
    return product;
}

async function addProduct(product: ProductModel): Promise<ProductModel> {
    const errors = product.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    if (await isProductExist(product.productName)) {
        throw new ValidationError(`This product: "'${product.productName}'" already exists.`);
    }
    if (product.image) {
        const dotIndex = product.image.name.lastIndexOf(".");
        const extension = product.image.name.substring(dotIndex);
        product.imageName = uuid() + extension;
        await product.image.mv("./src/1-assets/images/" + product.imageName);
        delete product.image;
    }
    const sql = "INSERT INTO products VALUES(DEFAULT, ?, ?, ?, ?)";
    const values = [product.productName, product.categoryId, product.price, product.imageName];
    const result: OkPacket = await dal.execute(sql, values);
    product.productId = result.insertId;
    const addedProduct = await getOneProductById(product.productId);
    return addedProduct;
}

async function updateFullProductDetails(product: ProductModel): Promise<ProductModel> {
    const errors = product.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const productDB = await getOneProductById(product.productId);
    fs.unlink("./src/1-assets/images/" + productDB.imageName, () => { });
    if (product.image) {
        const dotIndex = product.image.name.lastIndexOf(".");
        const extension = product.image.name.substring(dotIndex);
        product.imageName = uuid() + extension;
        await product.image.mv("./src/1-assets/images/" + product.imageName);
        delete product.image;
    }
    const sql = `UPDATE products SET
                 productName = ?,
                 categoryId = ?,
                 price = ?,
                 imageName = ?
                 WHERE productId = ?`;
    const values = [product.productName, product.categoryId, product.price, product.imageName, product.productId];
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(product.productId);
    }
    return product;
}

async function isProductExist(productName: string): Promise<boolean> {
    const sql = `SELECT COUNT(productName) as count 
                 FROM products 
                 WHERE productName = ?`;
    const values = [productName];
    const result = await dal.execute(sql, values);
    const count = result[0].count;
    return count > 0
}


export default {
    getAllProducts,
    getProductsByCategory,
    getOneProductById,
    addProduct,
    updateFullProductDetails
}