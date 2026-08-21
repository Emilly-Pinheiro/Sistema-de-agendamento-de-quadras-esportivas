-- CreateTable
CREATE TABLE "jogadores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "jogadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quadras" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "imagens" TEXT[],

    CONSTRAINT "quadras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" TEXT NOT NULL,
    "jogador_id" TEXT NOT NULL,
    "quadra_id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "horario_inicio" TIME NOT NULL,
    "horario_fim" TIME NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jogadores_email_key" ON "jogadores"("email");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_jogador_id_fkey" FOREIGN KEY ("jogador_id") REFERENCES "jogadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_quadra_id_fkey" FOREIGN KEY ("quadra_id") REFERENCES "quadras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
