-- CreateTable
CREATE TABLE "Users" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "roleID" INTEGER NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "userinfoID" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "houseNo" INTEGER,
    "villageNo" INTEGER,
    "alley" TEXT,
    "road" TEXT,
    "subDistract" TEXT,
    "province" TEXT,
    "countery" TEXT,
    "postcode" TEXT,
    "addressNum" TEXT,
    "paymentMethod" TEXT,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("userinfoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phoneNum_key" ON "Users"("phoneNum");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
