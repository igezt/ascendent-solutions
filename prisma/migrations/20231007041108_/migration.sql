-- DropForeignKey
ALTER TABLE `case` DROP FOREIGN KEY `Case_cid_fkey`;

-- DropForeignKey
ALTER TABLE `case` DROP FOREIGN KEY `Case_eid_fkey`;

-- AlterTable
ALTER TABLE `case` MODIFY `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Client`(`cid`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_eid_fkey` FOREIGN KEY (`eid`) REFERENCES `Staff`(`eid`) ON DELETE NO ACTION ON UPDATE CASCADE;
