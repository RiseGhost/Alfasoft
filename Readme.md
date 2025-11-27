# Alfasoft
Neste repositório encontra-se o exercício de recurtamento da 🏢 empresa Alfasoft.
- Linguagens e Frameworkds: NodeJS & Vue.js
- 💾 Databases manager system: 🐬 Mysql

## Backend

### Database tables
Para o desenvolvimento deste trabalho foi criada a tabela com a seguinte descrição:

| Field   | Type         | Null | Key | Default | Extra          |
|---------|--------------|------|-----|---------|----------------|
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| name    | varchar(255) | NO   |     | NULL    |                |
| contact | varchar(9)   | NO   | UNI | NULL    |                |
| email   | varchar(255) | NO   | UNI | NULL    |                |
| picture | varchar(255) | NO   |     | NULL    |                |

### Endpoint routers

- **GET** /contacts -> Devolve todos os contacto salvos na base de dados;
- **POST** /contacts -> Cria um novo contacto;
- **DELETE** /contacts -> Apaga um contacto dado o id.

## Frontend:

