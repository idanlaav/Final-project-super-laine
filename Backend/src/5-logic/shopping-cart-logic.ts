import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import ShoppingCartModel from "../4-models/shopping-cart-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";


async function getOpenShoppingCartByUserId(userId: number): Promise<ShoppingCartModel[]> {    
    const sql = `SELECT * FROM shoppingCart WHERE userId = ? AND status LIKE 'open'`;
    const values = [userId];
    const shoppingCart = await dal.execute(sql, values);
    return shoppingCart;
}

async function getCloseShoppingCartByUserId(userId: number): Promise<ShoppingCartModel[]> {
    const sql = `SELECT * FROM shoppingCart WHERE userId = ? AND status LIKE 'close'`;
    const values = [userId];
    const shoppingCart = await dal.execute(sql, values);
    return shoppingCart;
}

async function getOneShoppingCartById(shoppingCartId: number): Promise<ShoppingCartModel> {
    const sql = `SELECT * FROM shoppingCart WHERE shoppingCartId = ?`;
    const values = [shoppingCartId];
    const shoppingCart = await dal.execute(sql, values);
    const thisShoppingCart = shoppingCart[0];
    if (!thisShoppingCart) {
        throw new ResourceNotFoundError(shoppingCartId);
    }
    return thisShoppingCart;
}

async function AddShoppingCart(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel[]> {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const myDate = yyyy + '-' + mm + '-' + dd;
    shoppingCart.productionDate = myDate.toString();
    const sql = "INSERT INTO shoppingCart VALUES(DEFAULT, ?, ?, DEFAULT);";
    const values = [shoppingCart.userId, shoppingCart.productionDate];
    const addedShoppingCart = await dal.execute(sql, values);
    return addedShoppingCart;
}

async function updateFullShoppingCart(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel> {
    const errors = shoppingCart.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `UPDATE shoppingCart SET
                 userId = ?,
                 productionDate = ?,
                 status = ?
                 WHERE shoppingCartId = ?`;
    shoppingCart.productionDate = shoppingCart.productionDate.substring(0, 10);
    const values = [shoppingCart.userId, shoppingCart.productionDate, shoppingCart.status, shoppingCart.shoppingCartId];
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(shoppingCart.shoppingCartId);
    }
    return shoppingCart;
}

async function updatePartialShoppingCart(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel> {
    const errors = shoppingCart.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbShoppingCart = await getOneShoppingCartById(shoppingCart.shoppingCartId);
    dbShoppingCart.productionDate = dbShoppingCart.productionDate.substring(0, 10);
    for (const prop in dbShoppingCart) {
        if (shoppingCart[prop] !== undefined) {
            dbShoppingCart[prop] = shoppingCart[prop];
        }
    }
    const updatedShoppingCart = await updateFullShoppingCart(new ShoppingCartModel(dbShoppingCart));
    return updatedShoppingCart;
}


export default {
    getOpenShoppingCartByUserId,
    getCloseShoppingCartByUserId,
    getOneShoppingCartById,
    AddShoppingCart,
    updateFullShoppingCart,
    updatePartialShoppingCart
}