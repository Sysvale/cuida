# Badge

Badge são indicadores de status utilizados para tornar evidentes metadados importantes.

### Quando usar

- For necessário mostrar status associados com a lógica de negócio ou ações do usuário.
- O conteúdo a ser mostrado for *readonly*.
- For preciso categorizar algo.

### Quando não usar

- O conteúdo que a badge representa puder ser setado ou removido pelo usuário.
- O click no componente precisar executar uma ação ou funcionalidade.

---

## Uso

```js
<CdsBadge
	variant="red"
	size="md"
>
	Badge
</CdsBadge>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsBadge"
	:events="cdsBadgeEvents"
>
	Badge
</PreviewBuilder>

---

## Props

<APITable
	name="CdsBadge"
	section="props"
/>

<br>

## Eventos

<APITable
	name="CdsBadge"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsBadge"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsBadge from '@/components/Badge.vue';

const cdsBadgeEvents = [
	'click'
];

const args = ref({});
</script>
