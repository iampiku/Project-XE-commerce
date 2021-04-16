-- DROP TABLE IF EXISTS?
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Tags`;
DROP TABLE IF EXISTS `ProductTags`;
DROP TABLE IF EXISTS `ProductCategories`;
DROP TABLE IF EXISTS `Products`;
DROP TABLE IF EXISTS `OrderItems`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Comments`;
DROP TABLE IF EXISTS `CategoryImages`;
DROP TABLE IF EXISTS `Categories`;
DROP TABLE IF EXISTS `Addresses`;
DROP TABLE IF EXISTS `Addresses`;

-- TABLE
CREATE TABLE IF NOT EXISTS `Addresses` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `city` VARCHAR(30) NOT NULL, 
    `address` VARCHAR(30) NOT NULL, 
    `country` VARCHAR(30) NOT NULL, 
    `zipCode` VARCHAR(30) NOT NULL, 
    `userId` UUIDV4 NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);
PRAGMA INDEX_LIST(`Addresses`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Addresses_1`)

CREATE TABLE `Categories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `Categories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `name` VARCHAR(50) NOT NULL, 
    `slug` VARCHAR(50) NOT NULL, 
    `description` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
PRAGMA INDEX_LIST(`Categories`);
PRAGMA INDEX_INFO(`sqlite_autoindex_Categories_1`);

CREATE TABLE IF NOT EXISTS `CategoryImages` (`id` UUIDV4 NOT NULL PRIMARY KEY, `filename` VARCHAR(255) NOT NULL, `filepath` VARCHAR(255) NOT NULL, `originalName` VARCHAR(255) NOT NULL, `fileSize` VARCHAR(255) NOT NULL, `categoryId` UUIDV4 NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
 PRAGMA INDEX_LIST(`CategoryImages`);
 PRAGMA INDEX_INFO(`sqlite_autoindex_CategoryImages_1`);

CREATE TABLE IF NOT EXISTS `Comments` (`id` UUIDV4 NOT NULL PRIMARY KEY, `content` VARCHAR(255) NOT NULL, `rating` INTEGER NOT NULL DEFAULT 1, `productId` UUIDV4 NOT NULL, `userId` UUIDV4 NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
 PRAGMA INDEX_LIST(`Comments`);
 PRAGMA INDEX_INFO(`sqlite_autoindex_Comments_1`);

CREATE TABLE IF NOT EXISTS `OrderItems` (`id` UUIDV4 PRIMARY KEY, `name` VARCHAR(60) NOT NULL, `slug` VARCHAR(60) NOT NULL, `price` DECIMAL(10,2) NOT NULL, `quantity` INTEGER NOT NULL, `userId` UUIDV4, `orderId` UUIDV4 NOT NULL, `productId` UUIDV4, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
 PRAGMA INDEX_LIST(`OrderItems`)
 PRAGMA INDEX_INFO(`sqlite_autoindex_OrderItems_1`)
 CREATE INDEX `order_items_user_id_order_id` ON `OrderItems` (`userId`, `orderId`);

CREATE TABLE IF NOT EXISTS `Orders` (`id` UUIDV4 NOT NULL PRIMARY KEY, `trackingId` VARCHAR(255) NOT NULL, `orderStatus` VARCHAR(255), `userId` UUIDV4 NOT NULL, `addressId` UUIDV4 NOT NULL REFERENCES `Addresses` (`id`), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
 PRAGMA INDEX_LIST(`Orders`)
 PRAGMA INDEX_INFO(`sqlite_autoindex_Orders_1`)
 CREATE INDEX `orders_tracking_id` ON `Orders` (`trackingId`)

CREATE TABLE IF NOT EXISTS `ProductCategories` (`id` UUIDV4 NOT NULL PRIMARY KEY, `productId` UUIDV4 NOT NULL, `categoryId` UUIDV4 NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
PRAGMA INDEX_LIST(`ProductCategories`);
PRAGMA INDEX_INFO(`sqlite_autoindex_ProductCategories_1`);

CREATE TABLE IF NOT EXISTS `Products` (`id` UUIDV4 PRIMARY KEY, `name` VARCHAR(50) NOT NULL, `slug` VARCHAR(50) NOT NULL, `description` TEXT NOT NULL, `price` DECIMAL(10,2) NOT NULL, `inStock` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
PRAGMA INDEX_LIST(`Products`);
PRAGMA INDEX_INFO(`sqlite_autoindex_Products_1`);
CREATE INDEX `products_slug` ON `Products` (`slug`);
DROP TABLE IF EXISTS `ProductCategories`;;

CREATE TABLE IF NOT EXISTS `ProductTags` (`id` UUIDV4 NOT NULL PRIMARY KEY, `productId` UUIDV4, `tagId` UUIDV4, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
PRAGMA INDEX_LIST(`ProductTags`);
PRAGMA INDEX_INFO(`sqlite_autoindex_ProductTags_1`);

CREATE TABLE sqlite_sequence(name, seq);

CREATE TABLE IF NOT EXISTS `Tags` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255), `slug` VARCHAR(255) NOT NULL, `desctiption` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
PRAGMA INDEX_LIST(`Tags`);

CREATE TABLE `Users` (
    `name` VARCHAR(255) NOT NULL,
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

-- INDEX
CREATE INDEX `order_items_user_id_order_id` ON `OrderItems` (`userId`, `orderId`);

CREATE INDEX `orders_tracking_id_user_id` ON `Orders` (`trackingId`, `userId`);

CREATE INDEX `products_slug` ON `Products` (`slug`);

-- TRIGGER
-- VIEW


-- To Get All Users with addresses
SELECT `Users`.`name`, `Users`.`id`, `Users`.`username`, `Users`.`email`, `Users`.`password`, `Users`.`createdAt`, `Users`.`updatedAt`, `addresses`.`id` AS `addresses.id`, `addresses`.`city` AS `addresses.city`, `addresses`.`address` AS `addresses.address`, `addresses`.`country` AS `addresses.country`, `addresses`.`zipCode` AS `addresses.zipCode`, `addresses`.`userId` AS `addresses.userId`, `addresses`.`createdAt` AS `addresses.createdAt`, `addresses`.`updatedAt` AS `addresses.updatedAt`, `addresses`.`UserId` AS `addresses.UserId` FROM `Users` AS `Users` LEFT OUTER JOIN `Addresses` AS `addresses` ON `Users`.`id` = `addresses`.`UserId`;

-- To Get All Products with Categories + Tags
SELECT `Products`.`id`, `Products`.`name`, `Products`.`slug`, `Products`.`description`, `Products`.`price`, `Products`.`inStock`, `Products`.`createdAt`, `Products`.`updatedAt`, `categories`.`id` AS `categories.id`, `categories`.`name` AS `categories.name`, `categories`.`slug` AS `categories.slug`, `categories`.`description` AS `categories.description`, `categories`.`createdAt` AS `categories.createdAt`, `categories`.`updatedAt` AS `categories.updatedAt`, `categories->ProductCategories`.`id` AS `categories.ProductCategories.id`, `categories->ProductCategories`.`productId` AS `categories.ProductCategories.productId`, `categories->ProductCategories`.`categoryId` AS `categories.ProductCategories.categoryId`, `categories->ProductCategories`.`createdAt` AS `categories.ProductCategories.createdAt`, `categories->ProductCategories`.`updatedAt` AS `categories.ProductCategories.updatedAt`, `tags`.`id` AS `tags.id`, `tags`.`name` AS `tags.name`, `tags`.`slug` AS `tags.slug`, `tags`.`desctiption` AS `tags.desctiption`, `tags`.`createdAt` AS `tags.createdAt`, `tags`.`updatedAt` AS `tags.updatedAt`, `tags->ProductTags`.`id` AS `tags.ProductTags.id`, `tags->ProductTags`.`productId` AS `tags.ProductTags.productId`, `tags->ProductTags`.`tagId` AS `tags.ProductTags.tagId`, `tags->ProductTags`.`createdAt` AS `tags.ProductTags.createdAt`, `tags->ProductTags`.`updatedAt` AS `tags.ProductTags.updatedAt`, `tags->ProductTags`.`ProductId` AS `tags.ProductTags.ProductId`, `tags->ProductTags`.`TagId` AS `tags.ProductTags.TagId` FROM `Products` AS `Products` LEFT OUTER JOIN `ProductCategories` AS `categories->ProductCategories` ON `Products`.`id` = `categories->ProductCategories`.`productId` LEFT OUTER JOIN `Categories` AS `categories` ON `categories`.`id` = `categories->ProductCategories`.`categoryId` LEFT OUTER JOIN `ProductTags` AS `tags->ProductTags` ON `Products`.`id` = `tags->ProductTags`.`productId` LEFT OUTER JOIN `Tags` AS `tags` ON `tags`.`id` = `tags->ProductTags`.`tagId`;