# DynamicInputList

### Permite que o usuário adicione, remova e edite múltiplos inputs em uma lista dinâmica.
---
<br />

## Quando usar:
- Quando o usuário precisar inserir uma quantidade variável de informações do mesmo tipo;
- Para formulários que exigem múltiplas entradas do mesmo tipo (ex: números de telefone, emails adicionais, etc).

<br />

## Quando não usar:
- A quantidade de campos for fixa e conhecida previamente;
- Quando for necessário coletar informações de diferentes tipos. Neste caso, utilize campos individuais;
- A complexidade da lista é alta, contendo vários inputs, e requer uma solução mais específica.

<br />

## Observações:
⚠️ Importante: Certifique-se de que o modelValue seja passado como um array de objetos contendo id e value. O id é gerado automaticamente para cada novo item.

---

## Uso

```js
<CdsDynamicInputList
	label="Nova opção"
	buttonLabel="Adicionar"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDynamicInputList"
	:events
/>

---

## Props

<APITable
	name="DynamicInputList"
	section="props"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsDynamicInputList from '@/components/DynamicInputList.vue';

const events = [
	'update:modelValue'
];

const args = ref({
	label: 'Adicione opções',
	inputLabel: 'Nova opção',
	buttonVariant: 'dark',
	buttonText: 'Adicionar',
	incrementResolver: () => ({
		label: '',
		value: Math.random(),
	}),
});
</script>
