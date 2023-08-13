# **Advanced CRUD NestJS GraphQL**

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/neliocursos/exemplo-readme/blob/main/LICENSE)

# Autor

👤 Cauã Soares

💼 https://www.linkedin.com/in/ocauasoares

# Estrutura do projeto

![Estrutura](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/structure.jpg)

Esse projeto é um **CRUD** avançado feito com **NestJS** e **GraphQL**, onde foi implementado autenticação usando **JWT** (JSON Web Token) para a segurança de rotas protegidas. Também foi implementado **testes unitários** em todas as operações do **CRUD**.

## Módulos

![Módulos](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/modules.jpg)

## Use-cases

![User use-cases](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/use-cases.jpg)

## Trechos do código

Trechos de código responsável pela função de **login** do usuário.

![Login user service](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/login-user-service.jpg)

![Login user resolver](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/login-user-resolver.jpg)

## GraphQL Playground

Esse é o modo interativo do próprio GraphQL para usar as funcionalidades disponíveis na aplicação.

![GraphQL Playground](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/graphql-playground.jpg)

# Cobertura de código (testes unitários)

![Cobertura de código](https://raw.githubusercontent.com/ocsoares/images/master/advanced-crud-nestjs-graphql/coverage-user-use-cases.jpg)

# Principais tecnologias e bibliotecas utilizadas

-   TypeScript
-   NestJS
-   GraphQL
-   Docker
-   PostgreSQL
-   Prisma
-   bcrypt
-   JWT

## Características e funcionalidades do projeto:

### Estrutural 🛠️

-   Clean Code
-   SOLID
-   Clean Architecture
-   PostgreSQL usado no **Docker**
-   Testes unitários
    <br>
    <br>

### Funcionalidades 🎯

-   Mutations para **cadastro** e **login** de usuários
-   A rota de login é responsável por fornecer um **JWT** para se **autenticar** nas rotas **protegidas**
-   As rotas com as funcionalidades do **CRUD**, exceto **criar** e **logar** com um usuário, são **protegidas** e precisam de autenticação com JWT.

# Executar o projeto localmente

Pré-requisitos: Typescript, NodeJS e Docker

```bash
# clonar o repositório
git clone https://github.com/ocsoares/Advanced-CRUD-NestJS-GraphQL

# instalar as bibliotecas
npm install

# criar um arquivo .env na pasta raíz do projeto

# configurar esse .env baseado no arquivo .env.example

# transpilar os arquivos do projeto para .js
npm run build

# iniciar o container do docker
docker-compose up

# executar o projeto
npm start
```
