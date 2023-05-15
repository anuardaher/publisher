# Publisher

## Dependências

- NPM
- Vue-cli
- Docker
- Docker-compose

## Configurando e rodando local

Primeiro, renomeie o arquivo **.env.example** para **.env** e insira as variáveis conforme ambiente.

### Construindo e subindo os containers

`docker-compose up --build -d`

### Configure o MongoDB

Para rodar o projeto local, é necessário criar o usuário do banco de dados publisher que utilizamos no sistema. Acesse o container docker do mongo pelo terminal:

`docker exec -it mongo /bin/bash`

Execute o seguinte comando dentro do container:

```
mongo -uroot -p example
  use publisher
  db.createUser({
    user: "uc_user",
    pwd: "123456",
    roles: ["readWrite"]
  })
```

Lembrando que, caso queira rodar o projeto fora dos containers, não se esqueça de instalar as dependencias e checar o package.json
