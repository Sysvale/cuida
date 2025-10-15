# v-cds-floatify

Os v-cds-floatify é uma diretiva do Cuida que permite que os elementos que a utilizam se tornem flutuantes.

<hr>

#### Argumentos

**(String):**
- Indica o posicionamento do componente em referência ao elemento alvo. É passado como argumento da diretiva, no formato  `v-cds-floatify:[argument]`
- Obrigatória: *Não*
- Valores válidos: 'top', 'top-start', 'top-end, 'bottom', 'bottom-start, 'bottom-end, 'left', 'left-start, 'left-end, 'right', 'right-start, 'right-end;

**(String):**
- O id do elemento que o ContrastChecker vai usar como referência para se posicionar. É passado como valor pra diretiva, no formato `v-cds-floatify="argument"`
- Obrigatória: *Sim*
- Valores válidos: qualquer string que indica o id de um elemento do DOM;

<br>

#### Retorno

Nenhum

<br>

#### Obs:
- Utiliza o [popper.js](https://popper.js.org/docs/v2/) como dependência. A leitura da documentação do popper pode ajudar no uso dessa diretiva.

<br>

#### Exemplo

```html
<template>
	<div
		v-cds-floatify:[position]="targetId"
	>
		...
	</div>
</template>
```