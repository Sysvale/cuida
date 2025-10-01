# PinInput

### PinInputs são componentes utilizados para adição de one-time passwords e códigos de 2FA

---

<br>


## Uso

```js
<CdsPinInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsPinInput"
	:events
/>

---

## Props

<APITable
	name="CdsPinInput"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsPinInput from '@/components/PinInput.vue';

const events = [
	'update:modelValue'
];

const args = ref({});
</script>
