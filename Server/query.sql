-- TABLE
CREATE TABLE `Addresses` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `city` VARCHAR(30) NOT NULL,
    `address` VARCHAR(30) NOT NULL,
    `country` VARCHAR(30) NOT NULL,
    `zipCode` VARCHAR(30) NOT NULL,
    `userId` UUIDV4 NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `Categories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `CategoryImages` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `filename` VARCHAR(255) NOT NULL,
    `filepath` VARCHAR(255) NOT NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `fileSize` VARCHAR(255) NOT NULL,
    `categoryId` UUIDV4 NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `Comments` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `content` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 1,
    `productId` UUIDV4 NOT NULL,
    `userId` UUIDV4 NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `OrderItems` (
    `id` UUIDV4 PRIMARY KEY,
    `name` VARCHAR(60) NOT NULL,
    `slug` VARCHAR(60) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userId` UUIDV4,
    `orderId` UUIDV4 NOT NULL,
    `productId` UUIDV4,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `Orders` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `trackingId` VARCHAR(255) NOT NULL,
    `orderStatus` VARCHAR(255),
    `userId` UUIDV4 NOT NULL,
    `addressId` UUIDV4 NOT NULL REFERENCES `Addresses` (`id`),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `ProductCategories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `productId` UUIDV4 NOT NULL,
    `categoryId` UUIDV4 NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `Products` (
    `id` UUIDV4 PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `inStock` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE `ProductTags` (
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `productId` UUIDV4,
    `tagId` UUIDV4,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

CREATE TABLE sqlite_sequence(name, seq);

CREATE TABLE `Tags` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255),
    `slug` VARCHAR(255) NOT NULL,
    `desctiption` TEXT,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

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