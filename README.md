<p align="center">
  <a href="https://sysvale.github.io/cuida">
    <img src="https://sysvale.github.io/cuida/static/media/CuidaTempLogo.f4adb1cc.png" alt="Cuida logo" width="350" />
  </a>
</p>

<div align="center">
  <p align="center">A design system built by Sysvale, using storybook and Vue components</p>
  <p align="center">https://sysvale.github.io/cuida/</p>
</div>

<p align="center">
  <a href="https://www.codefactor.io/repository/github/sysvale/cuida">
    <img src="https://www.codefactor.io/repository/github/sysvale/cuida/badge" alt="CodeFactor" />
  </a>
  
  <a href="https://travis-ci.com/Sysvale/cuida">
    <img src="https://travis-ci.com/Sysvale/cuida.svg?branch=master" alt="CodeFactor" />
  </a>
</p>

### Clonando o projeto e configurando-o

- Clone o repositório:

```bash 
$ git clone https://github.com/Sysvale/cuida.git
```

- Instale as dependências e suba o container docker:

```bash
$ docker-compose up -d
```
A aplicação estará disponível na porta `6006`.  
  
- Caso não queira usar docker, instale as dependências com:

```bash
$ npm i
```

### Executando o Cuida

- Após a execução do comando `docker-composer up -d` a aplicação já estará rodando no `localhost:6006`
.
- Ou alternativamente, sem o docker, rode apenas:

```bash
$ npm run storybook
```

### Para executar os testes

- Utilizando o docker:
```bash
$ docker-compose exec cuida npm run test
```

- Sem o docker:

```bash
$ npm run test
```
