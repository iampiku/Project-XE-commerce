import { Router } from "express";
import { Model } from "sequelize";
import { Address, Order, OrderItem, Product } from "../../database/schema";
import {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  OK,
  OrderItemInterface,
  requiresAuth,
  SUCCESS,
  warn,
} from "../utils";

const router = Router();

router.get("/", async (req, res, next) => {
  // Added for future admin references (Do not touch!)
  // await OrderItem.destroy({truncate: true });
  // await Order.destroy({truncate: true });
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem }, { model: Address }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(OK).send({ ...SUCCESS, orders });
  } catch (error) {
    next(warn(res, INTERNAL_SERVER_ERROR, error));
  }
  next();
});

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
      const fetchedProduct: Model<any, any> | null = await Product.findByPk(
        orderItem.productId
      );

      if (fetchedProduct === null) {
        throw new Error("product cannot be found!!");
      }

      const productStock: number = await fetchedProduct?.getDataValue(
        "inStock"
      );
      const slug: string = await fetchedProduct?.getDataValue("slug");
      const name: string = await fetchedProduct?.getDataValue("name");
      const price: number = await fetchedProduct?.getDataValue("price");

      // If quantity order is bigger than stock QTY - ThrowError()
      if (orderItem.quantity > productStock) {
        await Order.destroy({ where: { id: orderId } });
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
      await fetchedProduct?.update({ inStock: updatedInStockQty });
      await fetchedProduct?.save();

      subtotal += price * orderItem.quantity;
    }

    await createdOrderRef.update({ subtotal });
    await createdOrderRef.save();

    return res
      .status(OK)
      .send({ ...SUCCESS, userId, order: createdOrderRef, subtotal });
  } catch (error) {
    if (orderId !== null) {
      // await OrderItem.destroy({ where: { orderId } });
      await Order.destroy({ where: { id: orderId } });
    }
    warn(res, FORBIDDEN, error || "You are not authorized");
  }
  next();
});

export default router;
