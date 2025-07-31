# Button

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

## Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

## Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

## Uso

```js
<CdsButton
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="buttonClick = true"
/>
```

## Preview

<script setup>
import { ref, useTemplateRef, watch, nextTick, computed } from 'vue';
import Button from '@/components/Button.vue';
import CdsCollapsibleContainer from '@/components/CollapsibleContainer.vue';
import ComponentDoc from '../../docgen/ComponentDoc.vue';
import PlaygroundBuilder from '../../docgen/PlaygroundBuilder.vue';

const logContainer = useTemplateRef('logContainerRef');

const log = ref([]);
const showLog = ref(false);
const buttonProps = ref({})

const logButtonText = computed(() => {
	return showLog.value ? 'Esconder log' : 'Mostrar log'
});

watch(log.value, () => {
	if (logContainer.value) {
		nextTick(() => {
			logContainer.value.scrollTo({
				top: logContainer.value.scrollHeight,
				behavior: 'smooth',
			});
		});
	}
});

function handleUpdate (pl) {
	buttonProps.value = pl;
};

function logPush(ev) {
	log.value.push(
		{
			event: 'button-click',
			payload: ev,
			timestamp: new Date().toTimeString().split(' ')[0]
		}
	);
}
</script>

<div class="demo-container">
	<Button
		v-bind="buttonProps"
		@button-click="(ev) => logPush(ev)"/>
	<span class="show-log-button" @click="showLog = !showLog">{{logButtonText}}</span>
	<div
		v-show="showLog"
		class="log-container"
		ref="logContainerRef"
	>
		<template v-for="message in log">
			<div class="log-text">
				<div>
					<small class="log-event">
						@{{ message.event }}: 
					</small>
					<small>
						{{ JSON.stringify(message.payload, null, 2) }} <i>(payload)</i>
					</small>
				</div>
				<small>
					{{ message.timestamp }}
				</small>
			</div>
		</template>
	</div>
</div>

<PlaygroundBuilder component="Button" @update="handleUpdate"/>

## API

<ComponentDoc name="Button" />

## Figma

<iframe
	style="border: 1px solid #DFE5EC; border-radius: 12px;"
	width="700"
	height="450"
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
	allowfullscreen
/>

<style>
.demo-container {
	position: relative;
	padding: 20px;
	border: 1px solid #DFE5EC;
	border-radius: 12px;
	margin: 16px 0;
}

.show-log-button {
	padding: 3px 6px;
	color: white;
	background-color: black;
	position: absolute;
	right: 0;
	font-size: 12px;
	border-radius: 4px 0px 12px 0px;
	cursor: pointer;
	margin-bottom: 4px;
}

.log-container {
	padding: 20px;
	border-top: 1px solid #DFE5EC;
	margin: 20px 0;
	max-height: 150px;
	overflow: scroll;
}

.log-event {
	font-weight: bold;
	color: #2C70CD;
}

.log-text {
	display: flex;
	padding: 2px 0px;
	justify-content: space-between;
	align-itens: center;
	width: 100%;
}

#inner-tabs .inner-tabs__content {
	padding: 0px !important;
}
</style>
