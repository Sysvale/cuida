<p align="center">
  <a href="https://sysvale.github.io/component-library">
    <img src="https://sysvale.github.io/cuida/static/media/CuidaTempLogo.f4adb1cc.png" alt="SysvaleComponentLibraryLogo" width="350" />
  </a>
</p>

<div align="center">
  <p align="center">A design system built by Sysvale, using storybook and Vue components</p>
  <p align="center">https://sysvale.github.io/cuida/</p>
</div>

<p align="center">
  <a href="https://www.codefactor.io/repository/github/sysvale/component-library">
    <img src="https://www.codefactor.io/repository/github/sysvale/component-library/badge" alt="CodeFactor" />
  </a>
  
  <a href="https://travis-ci.com/Sysvale/component-library">
    <img src="https://travis-ci.com/Sysvale/component-library.svg?branch=master" alt="CodeFactor" />
  </a>
</p>

### Clonando o projeto e configurando-o

- Clone o repositório:

```
git clone https://github.com/Sysvale/cuida.git
```

- Instale as dependências e suba o container docker:

```
docker-compose up -d
```

- Caso não queira usar docker, instale as dependências com:

```
npm i
```

### Executando o Cuida
- Inicie o cuida:

```
docker-compose exec npm run storybook
```

- Ou alternativamente, sem o docker, rode apenas:

```
npm run storybook
```

### Para executar os testes

```
npm run test
```
