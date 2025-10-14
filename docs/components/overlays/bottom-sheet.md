# Bottom Sheet

BottomSheets são componentes que exibem conteúdo adicional em uma camada sobreposta na parte inferior da página atual, fornecendo acesso rápido a informações ou ações complementares sem interromper o fluxo principal da interface.

---
<br>

## Quando usar:
- Para fornecer acesso rápido a opções ou controles adicionais sem obscurecer o conteúdo principal da página;
- Quando há necessidade de apresentar informações contextuais relevantes sem exigir uma mudança de contexto para o usuário;
- Para oferecer uma experiência de navegação fluida, permitindo que o usuário permaneça na mesma tela enquanto interage com o conteúdo adicional.


<br>

## Quando não usar:
- Se o conteúdo ou as ações adicionais exigirem mais espaço do que a área disponível na parte inferior da tela.
- Quando a presença de um BottomSheet interferiria na experiência do usuário ou causaria confusão ao sobrepor-se a outros elementos essenciais da interface.
- Se houver necessidade de exibir uma quantidade significativa de informações ou fluxos complexos que não possam ser adequadamente contidos na parte inferior da tela.

---

## Uso

```js
<CdsBottomSheet
	v-model="showBottomSheet"
	title="Onde encontrar o meu CNS"
>
	Conteúdo
</CdsBottomSheet>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsBottomSheet"
	:events="cdsBottomSheetEvents"
	with-trigger
	title="Onde encontrar o meu CNS"
	@trigger-click="args.modelValue = !args.modelValue"
>
	Conteúdo
</PreviewBuilder>

---

## Props

<APITable
	name="CdsBottomSheet"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsBottomSheet"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsBottomSheet"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsBottomSheet from '@/components/BottomSheet.vue';
const args = ref({});

const cdsBottomSheetEvents = [
	'update:model-value',
	'close'
];
</script>
