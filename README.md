# API de games
Esta API é utilizada para tal e tal.

## Endpoints
### GET /games
Rota responsável por retornar a listagem de todos games cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.
Exemplo de resposta:
```
{
    "games": [
        {
            "id": 12,
            "title": "Call of duty",
            "year": 2012,
            "price": 30
        },
        {
            "id": 13,
            "title": "Habbo Hotel",
            "year": 2004,
            "price": 2
        },
        {
            "id": 14,
            "title": "Minecraft",
            "year": 2009,
            "price": 100
        }
    ]
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido ou token expirado.


### POST /auth
Rota responsável por retornar a listagem de todos games cadastrados no banco de dados.
#### Parâmetros
e-mail: E-mail do usuário cadastrado no sistema.

password: Senha do usuário.

Exemplo:
```
{
    "email":"alisson@outlook.com",
    "password":"alisson"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.
Exemplo de resposta:
```
{
    "games": [
        {
            "id": 12,
            "title": "Call of duty",
            "year": 2012,
            "price": 30
        },
        {
            "id": 13,
            "title": "Habbo Hotel",
            "year": 2004,
            "price": 2
        },
        {
            "id": 14,
            "title": "Minecraft",
            "year": 2009,
            "price": 100
        }
    ]
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido ou token expirado.
