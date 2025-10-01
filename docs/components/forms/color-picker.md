# ColorPicker

### ColorPickers permitem aos usuários escolherem cores de modo visual.
---
<br>

## Quando usar:
- Use o ColorPicker em cenários em que o usuário precisa escolher uma cor dentre um conjunto de cores disponíveis.
- Use o ColorPicker em conjunto com inputs caso queira que o usuário visualize o valor HEX da cor escolhida.
- Em caso de poucas opções de cor dê preferência ao ColorPicker no modo `inline`.

<br>

## Obs:
- O ColorPicker não permite ao usuário escolher qualquer cor, apenas cores disponíveis no Cuida.
- O modo como você estrutura o array (matriz) da prop swatch importa na renderização do componente. Ex.: se você tiver 3 linhas na matriz o ColorPicker renderizará 3 linhas de cores.
- O ColorPicker emite a cor selecionada como uma string contendo o HEX da cor.

---

## Uso

```js
<CdsColorPicker
/>
```

---

## Preview

### Inline

<PreviewContainer>
	<CdsFlexbox justify="space-between" align="end" style="width: 550px">
		<div>
			<CdsColorPicker
				v-bind="argsInline"
				v-on="internalEvents"
				@update:modelValue="(value) => argsInline.modelValue = value"
			/>
		</div>
		<div>
			<div style="height: 52px; width: 52px; border-radius: 8px" :style="{background: argsInline.modelValue}"/>
			<i style="margin-top: 1px; font-size: 12.5px; color: #3b4754">⚠️ Div usada como demo. Não faz parte do ColorPicker.</i>
		</div>
	</CdsFlexbox>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args="argsInline"
	:component="ColorPicker"
/>

<br>
<br>
<br>

### Com popover

<PreviewContainer>
	<CdsFlexbox justify="space-between" align="end" style="width: 550px">
		<div>
			<CdsColorPicker
				v-bind="argsWithPopover"
				v-on="internalEvents"
				@update:modelValue="(value) => argsWithPopover.modelValue = value"
			/>
		</div>
		<div>
			<div style="height: 52px; width: 52px; border-radius: 8px" :style="{background: argsWithPopover.modelValue}"/>
			<i style="margin-top: 1px; font-size: 12.5px; color: #3b4754">⚠️ Div usada como demo. Não faz parte do ColorPicker.</i>
		</div>
	</CdsFlexbox>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args="argsWithPopover"
	:component="ColorPicker"
/>

---

## Props

<APITable
	name="CdsColorPicker"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsColorPicker"
	section="events"
/>
<br>

---

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsColorPicker from '@/components/ColorPicker.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'update:modelValue',
	'update:colorVariant'
];

const internalEvents = ref({});

const swatchInline = [
	[
		'$gp-400',
		'$ts-400',
		'$bn-400',
		'$in-400',
		'$vr-400',
	],
	[
		'$pp-400',
		'$rc-400',
		'$og-400',
		'$al-400',
		'$n-400',
	],
];

const swatchWithPopover = [
	['$gp-200', '$gp-300', '$gp-400', '$gp-500'],
	['$ts-200', '$ts-300', '$ts-400', '$ts-500'],
	['$bn-200', '$bn-300', '$bn-400', '$bn-500'],
	['$in-200', '$in-300', '$in-400', '$in-500'],
	['$vr-200', '$vr-300', '$vr-400', '$vr-500'],
	['$pp-200', '$pp-300', '$pp-400', '$pp-500'],
	['$rc-200', '$rc-300', '$rc-400', '$rc-500'],
	['$og-200', '$og-300', '$og-400', '$og-500'],
	['$al-200', '$al-300', '$al-400', '$al-500'],
	['$n-10', '$n-40', '$n-300', '$n-600'],
];

const argsInline = ref({
	swatch: swatchInline,
	inline: true,
	label: "Cor",
	modelValue: '#2AC092',
});

const argsWithPopover = ref({
	swatch: swatchWithPopover,
	popoverHeight: 190,
	modelValue: '#2AC092',
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
