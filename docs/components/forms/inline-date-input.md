# InlineDateInput

### InlineDateInput são componentes para escolha de datas e horas dentro de formulários.
---
<br>

## Recomendamos o uso de InlineDateInput quando:
- Houver a necessidade de oferecer opções de datas dentro de um grupo de inputs de um formulário.

<br>

## Não recomendamos o uso de InlineDateInput quando:
- For necessário exibir informações adicionais condicionais no calendário (ex.: datas que já estejam ocupadas).
- For necessário que o calendário seja exibido constantemente.
- For necessário alterar dinamicamente o estado da tela exibida, baseado na data escolhida. Para estes casos,
recomenda-se o uso de Calendar.

<br>

## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsInlineDateInput"
/>

---

## Props

<APITable
	name="MonthAndYearPicker"
	section="props"
/>
<br>

## Eventos

<APITable
	name="InlineDateInput"
	section="events"
/>

<br>

## Eventos

<APITable
	name="InlineDateInput"
	section="events"
/>

<br>

## Slots

<APITable
	name="InlineDateInput"
	section="slots"
/>

<br>

<script setup>
import { ref } from 'vue';
import CdsInlineDateInput from '@/components/InlineDateInput.vue';

const events = [
	'update:modelValue',
];

const args = ref({
	modelValue: '2000-01-01',
	variant: "blue",
	range: true,
	label: 'Período',
});
</script>