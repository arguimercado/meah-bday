-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kidCount" INTEGER NOT NULL,
    "overnight" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kid" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "Kid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Kid_guestId_idx" ON "Kid"("guestId");

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
