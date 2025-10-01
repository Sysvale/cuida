# FileViewer

###  FileViewer é um componente que permite pré-visualizar ou fazer download de um arquivo.
---
<br>

## Quando usar:
- Quando for necessário apresentar uma imagem ao usuário, possibilitando que ele visualize sem a necessidade de baixá-la.
- Quando for necessário apresentar um arquivo ao usuário e permitir que ele faça o download.
- Para apresentar pré-visualizações de arquivos de imagem antes de baixar.
- Quando o usuário precisa revisar rapidamente um arquivo sem abrir um aplicativo separado.

<br>

## Quando não usar:
- Quando for mais conveniente para o usuário ver a imagem diretamente sem precisar clicar no componente. Nesse caso, use o componente Image.
- Quando o conteúdo não necessita de interatividade, como um ícone simples ou uma miniatura sem funcionalidade adicional.
- Para arquivos muito grandes que podem demorar para carregar na pré-visualização. Nesse caso, forneça apenas a opção de download.
- Quando a pré-visualização pode comprometer a segurança ou privacidade dos dados contidos no arquivo.

---

## Uso

```js
<CdsFileViewer
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="fileViewerClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsFileViewer"
	:events
/>

---

## Props

<APITable
	name="CdsFileViewer"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsFileViewer"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsFileViewer from '@/components/FileViewer.vue';

const events = [
	'close',
	'download-click'
];

const args = ref({
	label: 'Comprovante de residência',
	fileUrl: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg",
	variant: 'green',
});
</script>
