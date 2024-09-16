import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import TrolleyItemModel from "../4-models/trolley-item-model";
import trolleyItemsLogic from "../5-logic/trolley-items-logic";

const router = express.Router();

// http://localhost:3001/api/trolley-items-by-user-id/1
router.get("/trolley-items/:userId([0-9]+)",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const trolleyItems = await trolleyItemsLogic.getTrolleyItemsByShoppingCart(userId);
        response.json(trolleyItems);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/new-trolley-item
router.post("/trolley-items", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const trolleyItem = new TrolleyItemModel(request.body);
        const addedTrolleyItem = await trolleyItemsLogic.addTrolleyItem(trolleyItem);
        response.status(201).json(addedTrolleyItem);

    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/trolley-item/18
router.delete("/trolley-items/:trolleyItemId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const trolleyItemId = +request.params.trolleyItemId;
        await trolleyItemsLogic.deleteTrolleyItem(trolleyItemId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
})


export default router;
