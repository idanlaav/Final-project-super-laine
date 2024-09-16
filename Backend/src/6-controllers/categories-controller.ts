import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import categoriesLogic from "../5-logic/categories-logic";

const router = express.Router();

// http://localhost:3001/api/categories
router.get("/categories",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await categoriesLogic.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
})

export default router;
