# v-cds-tip

Os v-cds-tip é uma diretiva do Cuida utilizada para implementar tooltips. O hover no componente dispara a exibição do tooptip. Para parar a exibição do tooptip basta enviar null como texto.

<hr />

#### Argumentos

**(String):**
- Especifica o texto do tooltip
- Obrigatória: *Sim*
- Valores válidos: qualquer string

<br />

#### Retorno

Nenhum

<br />

#### Obs:
- Utiliza o [tippy.js](https://tippyjs.bootcss.com/) como dependência. A leitura da documentação do tippy pode ajudar no uso dessa diretiva.

<br />

#### Exemplo

```html
<div
		v-cdstip="text"
	>
		...
</div>
```