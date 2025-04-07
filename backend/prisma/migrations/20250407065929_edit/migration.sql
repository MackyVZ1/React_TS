/*
  Warnings:

  - The primary key for the `UserInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userinfoID` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE userinfo_userid_seq;
ALTER TABLE "UserInfo" DROP CONSTRAINT "UserInfo_pkey",
DROP COLUMN "userinfoID",
ALTER COLUMN "userId" SET DEFAULT nextval('userinfo_userid_seq'),
ADD CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("userId");
ALTER SEQUENCE userinfo_userid_seq OWNED BY "UserInfo"."userId";
