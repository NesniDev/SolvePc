-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Fácil', 'Medio', 'Difícil');

-- CreateTable
CREATE TABLE "Solution" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "image" TEXT,
    "so" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Explain" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT,
    "terminal" TEXT,
    "prerequisites" TEXT[],
    "steps" TEXT[],
    "solutionId" INTEGER NOT NULL,

    CONSTRAINT "Explain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonError" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,
    "explainId" INTEGER NOT NULL,

    CONSTRAINT "CommonError_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_slug_key" ON "Solution"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Explain_solutionId_key" ON "Explain"("solutionId");

-- AddForeignKey
ALTER TABLE "Explain" ADD CONSTRAINT "Explain_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonError" ADD CONSTRAINT "CommonError_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
