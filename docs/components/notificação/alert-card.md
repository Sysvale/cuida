# AlertCard

AlertCards são componentes utilizados para transmitir mensagens contextuais importantes e apresentar possíveis ações a serem tomadas em cima delas.

---

### Quando usar

- For necessário mostrar informações contextuais extensas.
- For necessário mostrar informações contextuais que requerem ações do usuário sobre elas.

### Quando não usar

- For necessário mostrar informações de maneira discreta ou que pode ser ocultada. Para esse caso, recomendamos o uso de toasts.
- For necessário mostrar informações contextuais curtas.

---

## Uso

```js
<CdsAlertCard
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="alertCardClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsAlertCard"
/>

---

## Props

<APITable
	name="CdsAlertCard"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsAlertCard"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsAlertCard from '@/components/AlertCard.vue';

const args = ref({});
</script>
