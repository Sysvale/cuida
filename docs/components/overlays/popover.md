# Popover

### Popovers são componentes flutuantes utilizados para exibir, sob interação, informações e ações relacionadas ao conteúdo da tela.

---
<br>

## Quando usar:
- Para criar dropdowns;
- Para mostrar informações ou ações adicionais sobre determinado elemento da interface;

<br>

## Quando não usar:
- Como um substituto para Tooltips, ou seja, tendo como conteúdo apenas pequenas porções de texto;
- Como um subistituto para modais;
- Para mostrar informações críticas para o sucesso de uma ação do usuário;

---

## Uso

```js
<CdsButton
	id="trigger-cds-popover"
	@click="showPopover = true"
>
	Click
</CdsButton>
<CdsPopover
	rightAligned="false"
	targetId="trigger-cds-popover"
	width="250"
	height="250"
	v-model="showPopover"
>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
</CdsPopover>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPopover"
	:events="cdsPopoverEvents"
	with-trigger
	targetId="trigger-cds-popover"
	@trigger-click="args.modelValue = !args.modelValue"
>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
</PreviewBuilder>

---

## Props

<APITable
	name="Popover"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Popover"
	section="events"
/>
<br>

## Slots

<APITable
	name="Popover"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsPopover from '@/components/Popover.vue';

const args = ref({
	targetId: 'trigger-cds-popover',
});

const cdsPopoverEvents = [
	'update:modelValue'
];
</script>
