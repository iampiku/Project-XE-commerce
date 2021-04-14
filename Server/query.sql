--- To create User Table
CREATE TABLE IF NOT EXISTS `User` (
    `name` VARCHAR(255) NOT NULL,
    `id` UUIDV4 NOT NULL PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

-- To Create Product Table
CREATE TABLE IF NOT EXISTS `Products` (
    `id` UUIDV4 PRIMARY KEY, 
    `name` VARCHAR(50) NOT NULL, 
    `slug` VARCHAR(50) NOT NULL, 
    `description` TEXT NOT NULL, 
    `price` DECIMAL(10,2) NOT NULL, 
    `inStock` INTEGER NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

CREATE INDEX `products_slug` ON `Products` (`slug`);

-- To Create Categories Table
CREATE TABLE IF NOT EXISTS `Categories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `name` VARCHAR(50) NOT NULL, 
    `slug` VARCHAR(50) NOT NULL, 
    `description` TEXT, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create Address Table
CREATE TABLE IF NOT EXISTS `Addresses` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `city` VARCHAR(30) NOT NULL, 
    `address` VARCHAR(30) NOT NULL, 
    `country` VARCHAR(30) NOT NULL, 
    `zipCode` VARCHAR(30) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create CategoryImages Table
CREATE TABLE IF NOT EXISTS `CategoryImages` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `filename` VARCHAR(255) NOT NULL, 
    `filepath` VARCHAR(255) NOT NULL, 
    `originalName` VARCHAR(255) NOT NULL, 
    `fileSize` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create Comments Table
CREATE TABLE IF NOT EXISTS `Comments` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `content` VARCHAR(255) NOT NULL, 
    `rating` INTEGER NOT NULL DEFAULT 1, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create Orders Table
CREATE TABLE IF NOT EXISTS `Orders` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `trackingId` VARCHAR(255) NOT NULL, 
    `orderStatus` VARCHAR(255), 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create OrderItems Table
CREATE TABLE IF NOT EXISTS `OrderItems` (
    `id` UUIDV4 PRIMARY KEY, 
    `name` VARCHAR(60) NOT NULL, 
    `slug` VARCHAR(60) NOT NULL, 
    `price` DECIMAL(10,2) NOT NULL, 
    `quantity` INTEGER NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);

-- To Create Tags Table
CREATE TABLE IF NOT EXISTS `Tags` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `name` VARCHAR(255), 
    `slug` VARCHAR(255) NOT NULL, 
    `desctiption` TEXT, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);


-- Releated Defaults Indexies To Tables
PRAGMA INDEX_LIST(`User`);
PRAGMA INDEX_INFO(`sqlite_autoindex_User_1`);
PRAGMA INDEX_INFO(`sqlite_autoindex_User_2`);
PRAGMA INDEX_LIST(`Categories`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Categories_1`)
PRAGMA INDEX_LIST(`Addresses`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Addresses_1`)
PRAGMA INDEX_LIST(`CategoryImages`)
PRAGMA INDEX_INFO(`sqlite_autoindex_CategoryImages_1`)
PRAGMA INDEX_LIST(`Comments`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Comments_1`)
PRAGMA INDEX_LIST(`Orders`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Orders_1`)
PRAGMA INDEX_LIST(`Orders`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Orders_1`)
PRAGMA INDEX_LIST(`OrderItems`)
PRAGMA INDEX_INFO(`sqlite_autoindex_OrderItems_1`)
PRAGMA INDEX_LIST(`Tags`)