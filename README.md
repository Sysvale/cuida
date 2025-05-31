<p align="center">
  <a href="https://sysvale.github.io/cuida">
    <img src="https://framerusercontent.com/images/xz7CrU73qctPY2Vm79XMnTAVM.svg" alt="Cuida logo" width="250" />
  </a>
</p>

<div align="center">
  <p align="center">A design system built by Sysvale, using storybook and Vue components</p>
  <p align="center">https://cuida.framer.wiki/</p>
  <p align="center">https://main--6168a1779cac8c003ab99c2d.chromatic.com</p>
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

## Contribuindo

Para informações sobre como contribuir com o projeto, acesse o [CONTRIBUTING.MD](https://github.com/Sysvale/cuida/blob/main/CONTRIBUTING.md)
