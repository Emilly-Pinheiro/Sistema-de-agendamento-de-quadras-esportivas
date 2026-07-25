## ⚙️ Configuração do Backend e Banco de Dados

Nosso banco de dados PostgreSQL está hospedado na nuvem usando o Supabase. Para rodar o projeto localmente e conectar ao banco, siga os passos abaixo:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Git

### 2. Instalando Dependências
Acesse a pasta do backend e instale os pacotes necessários:
```bash
cd backend
npm install
```

### 3. Configuração das Variáveis de Ambiente
Crie um arquivo chamado .env na raiz da pasta backend/ e adicione a string de conexão do Supabase (URL enviada no grupo)
```env
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.olxktackdtfzwcdwgggf.supabase.co:5432/postgres"
```

### 4. Gerando o Prisma Client
Com o arquivo `.env` configurado, sincronize os modelos do Prisma com o seu projeto:

```bash
npx prisma generate
```

### 5. Executando a Aplicação
Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
npm start
```