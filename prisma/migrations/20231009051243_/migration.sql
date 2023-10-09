/*
  Warnings:

  - Made the column `cid` on table `case` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `case` DROP FOREIGN KEY `Case_cid_fkey`;

-- AlterTable
ALTER TABLE `case` MODIFY `cid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Client`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE;
