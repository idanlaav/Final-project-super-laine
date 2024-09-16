import express, { NextFunction, Request, Response } from "express";
import ShoppingCartModel from "../4-models/shopping-cart-model";
import shoppingCartLogic from "../5-logic/shopping-cart-logic";

const router = express.Router();

// http://localhost:3001/api/open-shopping-cart-by-user-id/1
router.get("/open-shopping-cart-by-user-id/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const shoppingCart = await shoppingCartLogic.getOpenShoppingCartByUserId(userId);
        response.json(shoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/close-shopping-cart-by-user-id/2
router.get("/close-shopping-cart-by-user-id/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const shoppingCart = await shoppingCartLogic.getCloseShoppingCartByUserId(userId);
        response.json(shoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/shopping-cart-by-id/12
router.get("/shopping-cart/:shoppingCartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shoppingCartId = +request.params.shoppingCartId;
        const shoppingCart = await shoppingCartLogic.getOneShoppingCartById(shoppingCartId);
        response.json(shoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/new-shopping-cart
router.post("/shopping-cart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shoppingCart = new ShoppingCartModel(request.body);
        const addedShoppingCart = await shoppingCartLogic.AddShoppingCart(shoppingCart);
        response.status(201).json(addedShoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/shopping-cart/12
router.put("/shopping-cart/:shoppingCartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.shoppingCartId = +request.params.shoppingCartId;
        const shoppingCart = new ShoppingCartModel(request.body);
        const updatedShoppingCart = await shoppingCartLogic.updateFullShoppingCart(shoppingCart);
        response.json(updatedShoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/shopping-cart/12
router.patch("/shopping-cart/:shoppingCartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.shoppingCartId = +request.params.shoppingCartId;
        const shoppingCart = new ShoppingCartModel(request.body);
        const updatedShoppingCart = await shoppingCartLogic.updatePartialShoppingCart(shoppingCart);
        response.json(updatedShoppingCart);
    }
    catch (err: any) {
        next(err);
    }
})

export default router;
