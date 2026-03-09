-- CreateTable
CREATE TABLE "SharedFile" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedFile_token_key" ON "SharedFile"("token");

-- AddForeignKey
ALTER TABLE "SharedFile" ADD CONSTRAINT "SharedFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
