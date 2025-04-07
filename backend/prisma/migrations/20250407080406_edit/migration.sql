-- CreateTable
CREATE TABLE "Products" (
    "productID" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Amount" INTEGER NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productID")
);
