-- DropForeignKey
ALTER TABLE `case` DROP FOREIGN KEY `Case_cid_fkey`;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Client`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE;
