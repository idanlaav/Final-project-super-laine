import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { RouteNotFoundError } from "../4-models/errors-model";
import ProductModel from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// http://localhost:3001/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/products-by-category/1
router.get("/products-by-category/:categoryId",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await productsLogic.getProductsByCategory(categoryId);
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/products/1
router.get("/products/:productId([0-9]+)",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productId = +request.params.productId;
        const product = await productsLogic.getOneProductById(productId);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/products
router.post("/products",[verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files.image;
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/products/1
router.put("/products/:productId([0-9]+)",[verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.productId = +request.params.productId;
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsLogic.updateFullProductDetails(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        if(!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }
        response.sendFile(absolutePath);         
    }
    catch (err: any) {
        next(err);
    }
})

export default router;
