---
layout: home

hero:
  name: "Cuida Design System"
  text: "A design system built by Sysvale"
  tagline: "Using Vue components for consistent user experiences"
  actions:
    - theme: brand
      text: Get Started
      link: /foundation/
    - theme: alt
      text: Componentes
      link: /components/
    - theme: alt
      text: Design Kit
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/Sysvale/cuida

features:
  - title: Design Tokens
    details: Tokens de design consistentes para cores, tipografia, espaçamento e mais.
    link: /foundation/
  - title: Vue Components
    details: Mais de 100 componentes Vue 3 prontos para uso.
    link: /components/
  - title: Utilities & Composables
    details: Funções auxiliares e composables Vue para melhorar sua experiência de desenvolvimento.
    link: /utils/
---

## Bem vindo ao Cuida!

Cuida é um design system abrangente desenvolvido pela Sysvale, com:

- **Design Tokens**: Tokens SASS de Cores, tipografia, espaçamento e mais
- **Vue Components**: Mais de 100 componentes construídos com Vue 3 com Composition API
- **Utilities**: Funções auxiliares e composables
- **Documentation**: Guias completos e exemplos

### Instalando

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

- Agora para utilizar os componentes, basta usá-los no seu template. Como exemplo, para usar a
  [Badge](https://sysvale.github.io/cuida/?path=/docs/componentes-display-badge--badge):

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

A aplicação estará disponível na porta `6006`, em [http://localhost:6006/](http://localhost:6006).

- Caso não queira usar docker, instale as dependências com:

```bash
npm i
```

### Executando o Cuida

- Após a execução do comando `docker-composer up -d` a aplicação iniciará com instalação e build em segundo plano e estará acessível após alguns segundos em [http://localhost:6006/](http://localhost:6006). O progresso pode ser acompanhado também executando `docker-compose logs -f main`.
  .
- Ou alternativamente, sem o docker, rode apenas:

```bash
npm run storybook
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

