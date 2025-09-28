# TimeInput

### TimeInputs são componentes utilizados para inserir horários específicos no formato simples: hora e minutos.
---
<br>

## Quando usar:
- For necessário definir horários de eventos, agendamentos, alarmes e etc…

<br>

## Quando não usar:
- For necessário mostrar opções disponíveis de horários para seleção.

<br>

---

## Uso

```js
<CdsTimeInput
	v-model="inputValue"
	label="Horário"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsTimeInput"
/>

---

## Props

<APITable
	name="TimeInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="TimeInput"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsTimeInput from '@/components/TimeInput.vue';

const events = [
	'update:modelValue'
];

const args = ref({
	label: 'Horário',
	modelValue: '12:05'
});
</script>
