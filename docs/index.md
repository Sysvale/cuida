---
layout: home

hero:
  name: "Cuida Design System"
  text: "A design system built by Sysvale"
  tagline: "Using Vue components for consistent user experiences"

features:
  - title: Vue Components
    details: 120+ componentes Vue 3 divididos em categorias como forms, containers, navigation, display, etc.
    link: /components/forms/base-input
  - title: Design Tokens
    details: Tokens de design consistentes para cores, tipografia, espaçamento e mais.
    link: /foundation/principles
  - title: Utilities & Composables
    details: Funções auxiliares e composables Vue para melhorar sua experiência de desenvolvimento.
    link: /utils/documentation-guide
---

## Bem vindo ao Cuida!

Cuida é um design system abrangente desenvolvido pela Sysvale, com:

- **Design Tokens**: Tokens SASS de Cores, tipografia, espaçamento e mais
- **Vue Components**: Mais de 100 componentes construídos com Vue 3 com Composition API
- **Utilities**: Funções auxiliares e composables
- **Documentation**: Guias completos e exemplos

### Instalação

- O Cuida pode ser instalado com o npm:

```bash
npm i @sysvale/cuida
```

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

## Desenvolvendo

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
## Contribuindo

Para informações sobre como contribuir com o projeto, acesse o [CONTRIBUTING.MD](./contributing.md)
