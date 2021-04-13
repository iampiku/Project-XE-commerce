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

CREATE TABLE IF NOT EXISTS `Categories` (
    `id` UUIDV4 NOT NULL PRIMARY KEY, 
    `name` VARCHAR(50) NOT NULL, 
    `slug` VARCHAR(50) NOT NULL, 
    `description` TEXT, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL
);


PRAGMA INDEX_LIST(`User`);
PRAGMA INDEX_INFO(`sqlite_autoindex_User_1`);
PRAGMA INDEX_INFO(`sqlite_autoindex_User_2`);
CREATE INDEX `products_slug` ON `Products` (`slug`);
PRAGMA INDEX_LIST(`Categories`)
PRAGMA INDEX_INFO(`sqlite_autoindex_Categories_1`)