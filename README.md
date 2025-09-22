# 🛠️ Backend: CRUD de Produtos com Procedures (NestJS + SQL Server)

Este projeto é um backend construído com [NestJS](https://nestjs.com/) que implementa um CRUD de produtos utilizando **stored procedures** no banco de dados **SQL Server** (MSSQL).  
Não são utilizados comandos SQL diretos (como `INSERT`, `SELECT`, `DELETE`), apenas execuções de procedures existentes no banco.

---

## 🚀 Tecnologias Utilizadas

### 📦 Backend

- **[NestJS](https://nestjs.com/)** — Framework progressivo para construção de APIs Node.js escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript com tipagem estática.
- **[MSSQL (SQL Server)](https://www.microsoft.com/en-us/sql-server/)** — Banco de dados relacional usado com procedures.
- **[mssql](https://www.npmjs.com/package/mssql)** — Driver Node.js para SQL Server (usado para executar procedures com parâmetros nomeados).
- **[dotenv](https://www.npmjs.com/package/dotenv)** — Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **[Swagger](https://swagger.io/tools/swagger-ui/)** (via `@nestjs/swagger`) — Geração automática da documentação da API.
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** — Lint e formatação automática do código.
- **[ts-node](https://typestrong.org/ts-node/)** — Execução de scripts TypeScript diretamente via CLI (usado para testes locais).

---

## 🤖 Tecnologias de IA utilizadas

- **ChatGPT (OpenAI)** — Assistente para geração de código, dúvidas técnicas, sugestões e revisão.
- **GitHub Copilot** — Auxílio na escrita de código diretamente no editor, autocompletando funções e trechos.

---

## 🧱 Estrutura

- `modules/products` — Contém controller, service, DTOs e lógica de integração com procedures.
- `.env` — Variáveis de ambiente (host, porta, usuário, senha etc).
- `databaseConfig` — Configuração central da conexão via `mssql`.

---

## ⚙️ Procedures utilizadas

As seguintes stored procedures estão implementadas no banco SQL Server:

| Procedure      | Ação                       |
| -------------- | -------------------------- |
| `SpGrProduto`  | Cadastrar novo produto     |
| `SpSeProduto`  | Buscar produtos por nome   |
| `SpSe1Produto` | Buscar produto por código  |
| `SpExProduto`  | Remover produto por código |

> Obs: Não há procedure de update, por isso o projeto trata somente `Create`, `Read` e `Delete`.

---

## 📌 Requisitos

- Node.js (v18 ou superior)
- Banco SQL Server com as procedures existentes
- .env configurado com credenciais corretas

---

## ▶️ Rodando o projeto

- git clone https://github.com/Noemi-Oliveira-Ferrari/product-proc-crud.git
- cd product-proc-crud
- Preencha o arquivo `.env` com as credenciais do banco
- npm install
- npm start
- Acesse http://localhost:3000/api no navegador
