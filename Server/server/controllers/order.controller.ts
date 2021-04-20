import { Router } from "express";
import { Model } from "sequelize";
import { Order, OrderItem, Product } from "../../database/schema";
import {
  FORBIDDEN,
  OK,
  OrderItemInterface,
  requiresAuth,
  SUCCESS,
  warn
} from "../utils";

const router = Router();

router.post("/create", requiresAuth, async (req, res, next) => {
  let orderId: string | null = null;
  try {
    /** grabbing userId from middleware nxt_() */
    const userId = (req as any).userId as string;
    console.log({ userId });

    // inserting orderItems into `OrderItem` Schema for relation making
    const { orderItems, addressId } = req.body as OrderItemInterface;

    // making up the order first to get a persistant `orderId`
    const createdOrderRef: Model<any, any> = await Order.create({
      userId,
      addressId,
    });
    orderId = createdOrderRef.getDataValue("id") as string;

    /**
     * iterate through all the products
     * First check how many quantity exists
     * can buy or not
     * detemine the price of products
     * calculation of Subtotal ;
     */
    let subtotal: number = 0;
    for (const orderItem of orderItems) {
      const fetchedProduct = await Product.findByPk(orderItem.productId);
      const productStock: number = fetchedProduct?.getDataValue("inStock");
      const slug: string = fetchedProduct?.getDataValue("slug");
      const name: string = fetchedProduct?.getDataValue("name");
      const price: number = fetchedProduct?.getDataValue("price");

      // If quantity order is bigger than stock QTY - ThrowError()
      if (orderItem.quantity > productStock) {
        next(
          warn(res, FORBIDDEN, "required quantity are not present in stock!")
        );
        return;
      }

      // calculating left stock and minus from presentProductStock!!
      const updatedInStockQty = productStock - orderItem.quantity;

      // generating orderItemPayload
      const orderItemPayload = {
        productId: orderItem.productId,
        name,
        slug,
        price,
        userId,
        orderId,
        quantity: orderItem.quantity,
      };

      await OrderItem.create(orderItemPayload);

      /**
       *  On successfull orderItem placing
       * reducer the inStock of Product
       */
      await Product.update(
        { inStock: updatedInStockQty },
        { where: { id: orderItem.productId } }
      );

      subtotal += price * orderItem.quantity;
    }

    return res
      .status(OK)
      .send({ ...SUCCESS, userId, order: createdOrderRef, subtotal });
  } catch (error) {
    orderId !== null ? await Order.destroy({ where: { id: orderId } }) : null;
    warn(res, FORBIDDEN, error || "You are not authorized");
  }
  next();
});

export default router;
