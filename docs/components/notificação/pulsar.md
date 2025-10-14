# Pulsar

Pulsars são componentes educativos utilizados para instruir os usuários sobre novidades na interface ou no produto.

---
<br>

## Quando usar:
- Para atrair a atenção do usuário para uma nova feature ou área da interface de modo não intrusivo.


<br>

## Quando não usar:
- Como único recurso de comunicação sobre mudança na interface ou no produto.
- Quando outro pulsar já estiver em uso na interface.

<br>

## Observações:
- Pulsars não devem ser uma parte permanete da interface. Após determinada característica
do produto ter sido absorvida/compreendida pelos usuários, o pulsar perde seu propósito e deve-se considerar
removê-lo.

---

## Uso

```js
<CdsPulsar
	variant="green"
	position="top-end"
	targetId="pulsar-target"
/>
```

---

## Preview

<PreviewContainer>
	<div id="pulsar-target" style="width: fit-content;">
		Pulsar target
	</div>
	<CdsPulsar v-bind="args" />
</PreviewContainer>

<PlaygroundBuilder
	:args
	:component="Pulsar"
/>

---

## Props

<APITable
	name="CdsPulsar"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsPulsar from '@/components/Pulsar.vue';

const args = ref({
	variant: 'green',
	position: 'top-end',
	targetId: 'pulsar-target'
});
</script>
