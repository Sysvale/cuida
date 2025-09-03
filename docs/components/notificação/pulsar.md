# Pulsar

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsPulsar
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="pulsarClick = true"
/>
```

---

## Preview

<PreviewContainer>
	<div id="pulsar-target" style="width: fit-content;">
		Pulsar target
	</div>
	<CdsPulsar v-bind="args" />
</PreviewContainer>

<PlaygroundBuilder
	:args
	component="Pulsar"
/>

---

## Props

<APITable
	name="Pulsar"
	section="props"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsPulsar from '@/components/Pulsar.vue';

const args = ref({
	variant: 'green',
	position: 'top-end',
	targetId: 'pulsar-target'
});
</script>
