-- CreateTable
CREATE TABLE `Client` (
    `cid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `bday` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Case` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('OUTSTANDING', 'COMPLETED') NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `request_message` VARCHAR(191) NOT NULL,
    `cid` INTEGER NOT NULL,
    `eid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `eid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`eid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Client`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_eid_fkey` FOREIGN KEY (`eid`) REFERENCES `Staff`(`eid`) ON DELETE RESTRICT ON UPDATE CASCADE;
