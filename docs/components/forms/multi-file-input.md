# MultiFileInput

### O MultiFileInput é um componente que permite ao usuário selecionar e carregar múltiplos arquivos de forma organizada.
---
<br>

## Quando usar:
- Quando o usuário precisa enviar múltiplos arquivos em um único formulário.
- Para situações onde é importante visualizar a lista de arquivos selecionados antes de finalizar o envio.
- Quando o espaço na interface é limitado, mas a seleção de vários arquivos é um requisito.

<br>

## Quando não usar:
- Quando apenas um único arquivo precisa ser enviado (nesse caso, um input de arquivo simples é suficiente).
- Se a lista de arquivos selecionados pode se tornar muito longa, ocupando espaço excessivo na tela e prejudicando a usabilidade.
- Em interfaces onde a complexidade do componente pode confundir o usuário, especialmente se o envio de múltiplos arquivos não for uma necessidade comum.

<br>

## Obs:
- O **MultiFileInput** é derivado do `FileInput` e possui todos os atributos e eventos dele.


---

## Uso

```js
<CdsMultiFileInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="multiFileInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsMultiFileInput"
	:events
/>

---

## Props

<APITable
	name="CdsMultiFileInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsMultiFileInput"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsMultiFileInput from '@/components/MultiFileInput.vue';

const events = [
	'submit'
];

const args = ref({
	documents:[
		{
			name: 'Comprovante de residência',
			required: true,
		},
		{
			name: 'Guia de encaminhamento',
			required: false,
		},
		{
			name: 'RG',
			required: false,
		},
		{
			name: 'Passaporte',
			required: true,
		}
	],
	variant: 'green',
	submitButtonText: 'Enviar arquivos',
	buttonSecondary: false,
	size: 'md',
});
</script>
