---
layout: home

hero:
  name: "Cuida Design System"
  text: "A design system built by Sysvale"
  tagline: "Using Vue components for consistent user experiences"

features:
  - title: Vue Components
    details: Vue 3 divididos em categorias como display, forms, containers, navigation, etc.
    link: /components/forms/button
  - title: Design Tokens
    details: Tokens de design para cores, tipografia, espaçamento, etc.
    link: /foundation/principles
  - title: Utilities & Composables
    details: Funções auxiliares e composables para facilitar o desenvolvimento o desenvolvimento do DS.
    link: /utils/documentation-guide
---

## Bem-vindo ao Cuida!

### Instalação

- O Cuida pode ser instalado com o npm:

```bash
npm i @sysvale/cuida
```

<br>

## Uso

- Para usar o cuida, importe a biblioteca no seu entry point, provavelmente vai ser seu `main.js` ou `app.js`:

```js
import Cuida from "@sysvale/cuida";
```

- Importe os estilos do Cuida:
```js
import '@sysvale/cuida/dist/style.css';
```

- E registre o Cuida:

```js
app.use(Cuida);
```

- Caso deseje, é possível utilizar os Utils do Cuida expondo-os:

```js
const cdsUtils = Cuida.utils;
app.provide('cdsUtils', cdsUtils);
```

- Agora, para utilizar os componentes, basta usá-los no seu template. Como exemplo, para usar a
  [Badge](./components/display/badge):

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
<br>
<br>

## Desenvolvimento

### Configurando o projeto

- Clone o repositório:

```bash
git clone https://github.com/Sysvale/cuida.git
```

- Instale as dependências:

```bash
npm i
```

### Executando o Cuida


```bash
npm run docs:dev
```

### Testando-o

- Utilizando o docker:

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

<br>

## Contribuindo

Para informações sobre como contribuir com o projeto, acesse o [CONTRIBUTING.MD](./contributing.md)
