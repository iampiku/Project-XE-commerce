import { Address } from "./address.schema";
import { Category } from "./category.schema";
import { CategoryImage } from "./categoryImage.schema";
import { Comment } from "./comment.schema";
import { Order } from "./order.schema";
import { Product } from "./product.schema";
import { User } from "./user.schema";

export { User, Product, Category, Address, CategoryImage, Comment, Order };

// Product.create({ name: 'Oneplus 9 Pro', price: 38977, description: 'New Oneplus Flagship Premium', inStock: 37 });

// Product.findAll().then((r: any) => console.log(r))
