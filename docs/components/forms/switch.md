# Switch

Switches são componentes utilizados para ativar ou desativar configurações ou opções específicas.

### Quando usar

- A configuração controlada pelo Switch deve aplicar mudanças automaticamente.
- Ao usar labels. Quando usados em conjunto, devem descrever dois estados, dependentes do estado do Switch.

### Quando não usar

- Em formulários que possuem botão de submit.
- Utilizar Switches para controlar ações que dependam de requisições sem indicar o tempo de espera ao usuário.

---

## Uso

```js
<CdsSwitch
	v-model="isSelected"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsSwitch"
	:events="cdsSwitchEvents"
/>

---

## Props

<APITable
	name="Switch"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Switch"
	section="events"
/>
<br />

## Slots

<APITable
	name="Switch"
	section="slots"
/>

---

## Figma

<!-- <FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsSwitch from '@/components/Switch.vue';

const cdsSwitchEvents = [
	'update:modelValue'
];
</script>
