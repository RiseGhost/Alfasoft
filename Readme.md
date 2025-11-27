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

Visto normal do website
![Normal](https://github.com/RiseGhost/Alfasoft/blob/main/Documentacion%20Images/Captura%20de%20ecr%C3%A3%20de%202025-11-27%2016-10-02.png?raw=true)

Hover por cima do cards com os contactos:
![Hover](https://github.com/RiseGhost/Alfasoft/blob/main/Documentacion%20Images/Captura%20de%20ecr%C3%A3%20de%202025-11-27%2016-10-11.png?raw=true)

## O que foi implementado:

- Criação e armazenamento de contactos;
- Listagem de contactos;
- Remoção de contactos