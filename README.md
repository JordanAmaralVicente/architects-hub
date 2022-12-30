# Architecs Hub
Esse projeto consiste em basicamente um site em que usuários possam solicitar serviços a arquitetos cadastrados na plataforma. Tal projeto foi desenvolvido utilizando Nestjs no Back-end e React.JS no Front-end. Além disso, para o banco de dados, escolhi o MySQL.

## Como rodar o projeto
Para rodar o projeto você vai precisar dos seguintes itens:

- [Node.js](https://nodejs.org/en/) preferencialmente a versão 18.12.1
- [docker & docker-compose](https://www.docker.com/) => usado para o banco de dados

Uma vez que já tem esses itens instalados, o primeiro passo é rodar o banco de dados. para isso, há o script no package.json para subir o container do banco de dados. Para isso, basta digitar o seguinte comando no terminal, quando estiver na raiz do projeto

```bash
npm run start:docker
```

Certifique-se de que o container já está pronto para receber conexão antes de seguir os próximos passos. Para saber, você pode listar os containers em sua máquina e caso o container do banco esteja com status `healthy` você pode seguir, além disso, você também pode verificar através dos logs no terminal com a mensagem `ready for connections[...] port: 3306`.

Uma vez que tenha certificado, basta seguir para as próximas etapas.

Em um terminal separado, vamos instalar as dependências tanto do front-end quanto do back-end.

Como esses projetos tem diferentes package.json, eu criei um script que faz com que não precise ficar trocando de pasta.

```bash
npm run install:server && npm run install:web
```

Esses comandos farão a instalação das dependências necessárias.

Uma vez que tenha instalado, já é possível rodar tanto o servidor, quanto o front-end.

Em terminais separados - e com o banco de dados rodando - executar os seguintes comandos:

<br />
Para rodar o servidor:

```bash
npm run start:server
```


Para rodar o frontend:
```bash
npm run start:web
```

Uma vez que esteja rodando o projeto, já é possível acessar ele pelo browser. E fazer uso do projeto.

> Atenção! Quando acessar o servidor no browser, SEMPRE acessar através da url http://localhost:3000/ e não pelo endereço local da rede pois ele perderá a referência para o servidor.

## Considerações:
No meio do desenvolvimento tive alguns bugs, principalmente no Front-End relacionado ao context de autenticação. Isso foi algo que me tomou muito mais tempo que esperado, por conta disso, não consegui implementar tudo que gostaria, até então. Como é o caso dos testes unitários, embora alguns tenham sido implementados e possam ser testados através do comando de teste.

Dito isso, alguns próximos passos seriam:

- Melhorar a arquitetura do front
- Terminar a implementação de todos os testes unitários
- realizar a documentação do server