<p align="center">
  <a href="https://sysvale.github.io/cuida">
    <img src="https://framerusercontent.com/images/xz7CrU73qctPY2Vm79XMnTAVM.svg" alt="Cuida logo" width="250" />
  </a>
</p>

<div align="center">
  <p align="center">A design system built by Sysvale, using Vue components</p>
  <p align="center">https://cuida.sysvale.com/</p>
</div>

## Instalando

- O Cuida pode ser instalado com o npm:

```bash
npm i @sysvale/cuida
```

## Usando

- Para usar o cuida, importe a biblioteca no seu entry point, provavelmente vai ser seu main.js ou app.js:

```js
import Cuida from "@sysvale/cuida";
```

- Importe os estilos do Cuida:
```js
import '@sysvale/cuida/dist/style.css';
```

- E instale o Cuida:

```js
app.use(Cuida);
```

- Exponha os utils do Cuida:

```js
const cdsUtils = Cuida.utils;
app.provide('cdsUtils', cdsUtils);
```

- Agora para utilizar os componentes, basta usá-los no seu template. Como exemplo, para usar a Badge:

```html
<cds-badge variant="gray"> Conteúdo </cds-badge>
```

- Para utilizar os tokens do Cuida instale o sass-embedded

```bash
npm install -D sass-embedded
```

e importe o arquivo de tokens na sua tag script.
```html
<style lang="scss" scoped>
  @import 'node_modules/@sysvale/cuida/dist/@sysvale/tokens.scss';
  ...
</style>
```

## Desenvolvendo

### Configurando o projeto

- Clone o repositório:

```bash
git clone https://github.com/Sysvale/cuida.git
```

- Instale as dependências e suba o container docker:

```bash
docker-compose up -d
```

A documentação estará disponível na porta `5173`, em [http://localhost:5173/](http://localhost:5173).

- Caso não queira usar docker, instale as dependências com:

```bash
npm i
```

### Executando o Cuida

- Para executar a documentação local, execute:

```bash
npm run docs:dev
```

### Testando-o

- Utilizando o docker:

```bash
docker-compose exec cuida npm run test
```

ou

```bash
./on-server.sh npm run test
```

- Sem o docker:

```bash
npm run test
```

- Para utilizar o ui do vitest:
```bash
npm run test:ui
```

- Para visualizar o detalhamento da cobertura de testes, use o comando abaixo:
```bash
npx open-cli coverage/index.html
```
## Contribuindo

Para informações sobre como contribuir com o projeto, acesse o [CONTRIBUTING.MD](https://github.com/Sysvale/cuida/blob/main/CONTRIBUTING.md)
