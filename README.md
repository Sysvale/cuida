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

## Instalando

- O Cuida pode ser instalado com o npm:
```bash
$ npm i @sysvale/cuida;
```

## Usando

- Instale o bootstrap-vue como dependência:
```bash
$ npm i @sysvale/cuida;
```

- Para usar o bootstrap-vue, importe a biblioteca no seu entry point, provavelmente vai ser seu main.js ou app.js:
```js
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
```

- Instale o bootstrap-vue com:
```js
$ npm install bootstrap-vue bootstrap;
```

- Para usar o cuida, importe a biblioteca no seu entry point, provavelmente vai ser seu main.js ou app.js:
```js
import Cuida from '@sysvale/cuida';
```

- E instale o Cuida:
```js
Vue.use(Cuida);
```

- Agora para utilizar os componentes, basta usá-los no seu template. Como exemplo, para usar a 
[Badge](https://sysvale.github.io/cuida/?path=/docs/componentes-display-badge--badge):
```html
<cds-badge 
  variant="gray"
>
  Conteúdo
</cds-badge>
```

- Para utilizar os tokens, importe-os na sua tag script.
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
$ git clone https://github.com/Sysvale/cuida.git
```

- Instale as dependências e suba o container docker:

```bash
$ docker-compose up -d
```
A aplicação estará disponível na porta `6006`, em [http://localhost:6006/](http://localhost:6006).  
  
- Caso não queira usar docker, instale as dependências com:

```bash
$ npm i
```

### Executando o Cuida

- Após a execução do comando `docker-composer up -d` a aplicação já estará rodando no [http://localhost:6006/](http://localhost:6006)
.
- Ou alternativamente, sem o docker, rode apenas:

```bash
$ npm run storybook
```

### Testando-o

- Utilizando o docker:
```bash
$ docker-compose exec cuida npm run test
```
ou 
```bash
$ ./on-server.sh npm run test
```

- Sem o docker:

```bash
$ npm run test
```
