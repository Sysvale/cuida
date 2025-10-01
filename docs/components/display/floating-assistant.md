# FloatingAssistant

### Floating Assistant é um componente flutuante que pode ser utilizado para fornecer dicas de usabilidade ou informações específicas sobre o conteúdo da página.
---
<br>

## Quando usar:
- Houver necessidade de fornecer dicas ou informações adicionais sobre um determinado elemento ou seção da página.
- For necessário direcionar o usuário para uma página externa que contenha informações/tutoriais adicionais sobre o conteúdo.
- O objetivo for reduzir a quantidade de informações exibidas na tela, mantendo o foco do usuário no elemento relevante.


<br>

## Quando não usar:
- O componente se tornar intrusivo e atrapalhar a navegação e experiência do usuário.
- Não houver espaço suficiente para exibição do componente e ele puder ser confundido com o conteúdo da página.


---

## Uso

```js
<CdsFloatingAssistant
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="floatingAssistantClick = true"
/>
```

---

## Preview

<PreviewContainer>
	<div
		id="floating-assistant-target"
		style="width: fit-content;"
	>
		FloatingAssistant target
	</div>
	<CdsFloatingAssistant
		v-bind="args"
		v-on="internalEvents"
		targetId="floating-assistant-target"
	>
		A nova funcionalidade de cadastrar motoristas permite que você organize e
		gerencie a sua frota de forma mais fácil, vinculando cada motorista a seu
		ônibus específico.
	</CdsFloatingAssistant>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	:component="FloatingAssistant"
/>
---

## Props

<APITable
	name="CdsFloatingAssistant"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsFloatingAssistant"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsFloatingAssistant"
	section="slots"
/>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsFloatingAssistant from '@/components/FloatingAssistant.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'update:modelValue',
	'disable-tip'
];

const internalEvents = ref({});

const args = ref({
	url: 'https://medium.com/cidade-saud%C3%A1vel',
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
