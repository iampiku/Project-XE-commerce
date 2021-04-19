import { Address } from "./address.schema";
import { Category } from "./category.schema";
import { CategoryImage } from "./categoryImage.schema";
import { Comment } from "./comment.schema";
import { Order } from "./order.schema";
import { OrderItem } from "./orderItem.schema";
import { Product } from "./product.schema";
import { ProductCategory } from "./productCategory.schema";
import { ProductTag } from "./productTag.schema";
import { Seller } from "./seller.schema";
import { Tag } from "./tag.schema";
import { User } from "./user.schema";

/** Will configure the association Mappings (1:N) / (M:N) / (N:1)  */
async function buildAssociationsBetweenSchemas() {
  /**
   * TODO: build relationships b/w schemas
   * User.hasMany(Comment);
   * User.hasMany(Address, {as: 'addresses'});
   * User.hasMany(Order);
   *
   * Address.belongsTo(User, {onDelete: 'cascade', foreignKey: 'userId'});
   *
   * Category.belongsToMany(Product, {through: ProductCategory, as: `products`, foreignkey: `categoryId`, otherKey: `productId`});
   * Category.hasMany(CategoryImage, {as: `images`});
   *
   * Comment.belongsTo(Product, {onDelete: `cascade`});
   * Comment.belongsTo(User);
   *
   * TODO: (FileUpload needs a Table to manage images efficiently)
   * TODO: (ProductImage Table needed for storing images to respective products)
   *
   * Order.hasMany(OrderItem);
   * Order.belongsTo(User, {foreignKey: `userId`});
   * Order.belongsTo(Address, {foreignKey: `addressId`});
   *
   * OrderItem.belongsTo(Order);
   * OrderItem.belongsTo(Product);
   *
   * Product.hasMany(Comment);
   * Product.belongsToMany(Category, {through: ProductCategory, as: 'categories', foreignKey: `productId`, otherKey: `categoryId`});
   * Product.belongsToMany(Tag, {through: ProductTag, as: 'tags', foreignKey: `productId`, otherkey: `tagId`});
   *
   * ProductTag.belongsTo(Product);
   * ProductTag.belongsTo(Tag);
   *
   * Product.belongsToMany(Seller, { through: ProductSeller, as: 'sellers', foreignKey: `productId`, otherKey: `sellerId`    });
   *
   * Tag.belongsToMany(Product, {through: ProductTag, as: 'products', foreignKey: 'tagId', otherKey: 'productId'});
   */

  User.hasMany(Comment);
  User.hasMany(Address, { as: "addresses" });
  User.hasMany(Order);

  Address.belongsTo(User, { onDelete: "cascade", foreignKey: "userId" });

  Category.belongsToMany(Product, {
    through: ProductCategory,
    as: `products`,
    foreignKey: `categoryId`,
    otherKey: `productId`,
  });
  Category.hasMany(CategoryImage, { as: `images` });

  Comment.belongsTo(Product, { onDelete: `cascade` });
  Comment.belongsTo(User);

  Order.hasMany(OrderItem);
  Order.belongsTo(User, { foreignKey: `userId` });
  Order.belongsTo(Address , { foreignKey: `addressId` });

  OrderItem.belongsTo(Order);
  OrderItem.belongsTo(Product);

  Product.hasMany(Comment);
  Product.belongsToMany(Category, {
    through: ProductCategory,
    as: "categories",
    foreignKey: `productId`,
    otherKey: `categoryId`,
  });
  Product.belongsToMany(Tag, {
    through: ProductTag,
    as: "tags",
    foreignKey: `productId`,
    otherKey: `tagId`,
  });

  Product.belongsTo(Seller);

  Seller.hasMany(Product, {
    as: "products",
    foreignKey: `sellerId`,
  });

  ProductTag.belongsTo(Product);
  ProductTag.belongsTo(Tag);

  Tag.belongsToMany(Product, {
    through: ProductTag,
    as: "products",
    foreignKey: "tagId",
    otherKey: "productId",
  });
}

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
  ProductCategory,
  ProductTag,
  buildAssociationsBetweenSchemas,
};

// Product.create({ name: 'Pixel 3A2', price: 45454, description: 'New Pixel Lineup', inStock: 20, categoryId: '3ac48ed6-7c00-444c-978d-e76facb9bb6c' });

// Category.create({name: 'Electronics', slug: 'electronics', description: 'Collectionsof electronics products', productId: []});

// Product.findAll().then((r: any) => console.log(r))
// 63b8c34b-4fa0-43d0-8c56-53066076085a, ab1f659b-1ab8-44d6-90e1-b3f2c4024796
