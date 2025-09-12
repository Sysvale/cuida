# WebcamModal

### Um componente para capturar fotos diretamente da webcam do dispositivo, ao capturar uma foto o componente emite um File.

---

<br />

## Quando usar:
- É necessário capturar uma imagem diretamente do dispositivo do usuário, como para envio de documentos ou selfies.
- Deseja-se integrar a captura de imagens com outros fluxos do sistema sem exigir uma aplicação externa.

<br />

## Quando não usar:
- Não há acesso a permissões de câmera no dispositivo do usuário (como em alguns navegadores ou ambientes com restrições).
- É necessário capturar vídeos em vez de imagens estáticas.
- A interface do usuário exige múltiplas interações modais (cascatas ou modais aninhados).


---

## Uso

```js
<CdsWebcamModal
	v-model="showModal"
	title="Tirar uma foto"
	variant="dark"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsWebcamModal"
	:events
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
/>

---

## Props

<APITable
	name="WebcamModal"
	section="props"
/>
<br />

## Eventos

<APITable
	name="WebcamModal"
	section="events"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsWebcamModal from '@/components/WebcamModal.vue';

const events = [
	'update:model-value',
	'on-take-photo'
];

const args = ref({
	variant: 'green',
});
</script>
