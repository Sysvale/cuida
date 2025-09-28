# Stepper

### Steppers são componentes que controlam e exibem tarefas divididas em etapas.

---
<br>

## Quando usar:
- For necessário mostrar, de forma visual, o estado e a etapa atual de um stepper.
- Houver um modal com várias etapas.
- Houver uma série de entradas ou ações que desejam mostrar o progresso do seu preenchimento, não importando data e hora dos estados.

<br>

## Quando não usar:
- Se precisa da cronologia (data, hora) dos steps. Para isso, utilize componente Timeline.
- A ordem das etapas, eventos ou ações não são relevantes.

---

## Uso

```js
<CdsStepper
	:steps="steps"
	:value="4"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsStepper"
	:events
/>

---

## Props

<APITable
	name="Stepper"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Stepper"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsStepper from '@/components/Stepper.vue';

const events = [
	'input'
];

const steps = ref([
	{ label: 'Dados da operadora', completed: true, inProcessing: false, error: false },
	{ label: 'Bandeira 2', completed: false, inProcessing: true, error: false },
	{ label: 'Bandeira 3', completed: false, inProcessing: false, error: true },
	{ label: 'Bandeira 4', completed: false, inProcessing: false, error: false },
	{ label: 'Bandeira 5', completed: false, inProcessing: false, error: false },
]);

const args = ref({
	steps,
	value: 4,
});
</script>
