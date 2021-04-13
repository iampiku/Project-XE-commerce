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

PRAGMA INDEX_LIST(`User`);

PRAGMA INDEX_INFO(`sqlite_autoindex_User_1`);

PRAGMA INDEX_INFO(`sqlite_autoindex_User_2`);

-- Creating new User
INSERT INTO
    `User` (
        `name`,
        `id`,
        `username`,
        `email`,
        `password`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6, $ 7);

-- To Login / Access Account Profile User
SELECT
    `name`,
    `id`,
    `username`,
    `email`,
    `password`,
    `createdAt`,
    `updatedAt`
FROM
    `User` AS `User`
WHERE
    `User`.`username` = 'sounishnath003'
    AND `User`.`password` = '1234'
LIMIT
    1;

-- To Get all Users Stored
SELECT
    `name`,
    `id`,
    `username`,
    `email`,
    `password`,
    `createdAt`,
    `updatedAt`
FROM
    `User` AS `User`;

-- Reset Password Link
SELECT
    `name`,
    `id`,
    `username`,
    `email`,
    `password`,
    `createdAt`,
    `updatedAt`
FROM
    `User` AS `User`
WHERE
    `User`.`username` = 'sounishnath003'
    AND `User`.`email` = 'a@a.com';