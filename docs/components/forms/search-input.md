# SearchInput

### SearchInputs permitem que os usuários realizem buscas sobre conjuntos de dados na interface
---

<br>


## Uso

```js
<CdsSearchInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsSearchInput"
	:events
/>

---

## Props

<APITable
	name="CdsSearchInput"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsSearchInput from '@/components/SearchInput.vue';

const events = [
	'update:modelValue'
];

const args = ref({
	modelValue: '',
	disabled: false,
	placeholder: 'Busque...',
	fluid: false,
	hideLabel: false,
});
</script>
