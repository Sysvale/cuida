# Alert

Alerts são componentes utilizados para prover feedbacks contextuais e notificações em resposta a ações do usuário ou atividades do sistema.

## Quando usar

- For necessário mostrar informações contextuais.
- Para feedbacks urgentes.

## Quando não usar

- Não cubra outros elementos da interface com um Alert.
- For necessário mostrar informações de modo não intrusivo. Para esse caso, recomendamos o uso de b-toasts.
- For necessário mostrar informações contextuais extensas. Para esse caso, recomendamos o uso de AlertCard.

---

## Uso

```js
<CdsAlert
	variant="green"
	text="Link Button"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsAlert"
	:events="cdsAlertEvents"
/>

---

## Props

<APITable
	name="CdsAlert"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsAlert"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsAlert"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsAlert from '@/components/Alert.vue';

const args = ref({});

const cdsAlertEvents = [
	'close'
];
</script>
