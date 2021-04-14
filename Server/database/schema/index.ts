import { Address } from "./address.schema";
import { Category } from "./category.schema";
import { CategoryImage } from "./categoryImage.schema";
import { Comment } from "./comment.schema";
import { Order } from "./order.schema";
import { OrderItem } from "./orderItem.schema";
import { Product } from "./product.schema";
import { Tag } from "./tag.schema";
import { User } from "./user.schema";

export {
    Tag,
    User,
    Product,
    Category,
    Address,
    CategoryImage,
    Comment,
    Order,
    OrderItem,
};

// Product.create({ name: 'Oneplus 9 Pro', price: 38977, description: 'New Oneplus Flagship Premium', inStock: 37 });

// Product.findAll().then((r: any) => console.log(r))
