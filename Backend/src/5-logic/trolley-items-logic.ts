import dal from "../2-utils/dal";
import TrolleyItemModel from "../4-models/trolley-item-model";
import { ResourceNotFoundError } from "../4-models/errors-model";


async function getTrolleyItemsByShoppingCart(userId: number): Promise<TrolleyItemModel[]> {
    const sql = "SELECT trolleyItem.*, products.productName, products.imageName, shoppingCart.userId, shoppingCart.status FROM trolleyItem JOIN products ON products.productId = trolleyItem.productId JOIN shoppingCart ON shoppingCart.shoppingCartId = trolleyItem.shoppingCartId WHERE shoppingCart.userId = ? and shoppingCart.status LIKE 'open'";
    const values = [userId];
    const trolleyItems = await dal.execute(sql, values);
    return trolleyItems;
}

async function addTrolleyItem(trolleyItem: TrolleyItemModel): Promise<TrolleyItemModel[]> {
    const sql = "INSERT INTO trolleyItem VALUES(DEFAULT, ?, ?, ?, ?)";
    const values = [trolleyItem.productId, trolleyItem.stock, trolleyItem.totalPrice, trolleyItem.shoppingCartId];
    const addedTrolleyItem = await dal.execute(sql, values);
    return addedTrolleyItem;
}

async function deleteTrolleyItem(trolleyItemId: number): Promise<void> {
    const sql = `DELETE FROM trolleyItem WHERE trolleyItemId =  ?`;
    const values = [trolleyItemId];
    const result = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(trolleyItemId);
    }
}


export default {
    getTrolleyItemsByShoppingCart,
    addTrolleyItem,
    deleteTrolleyItem
}