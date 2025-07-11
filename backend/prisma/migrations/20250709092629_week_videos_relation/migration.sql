/*
  Warnings:

  - Added the required column `week_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "week_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
