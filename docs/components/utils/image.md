# Image

Image é um componente utilitário utilizado para renderizar imagens com fallback.

---

<br>

## Obs:
- ⚠️ Quando a prop `round` for true, o tamanho da imagem vai ser setado como igual à largura.

<br>

---

## Uso

```js
<CdsImage
	:width="400"
	:blackAndWhite="false"
	:dimmed="false"
	:roundedCorners="false"
	:opacity="1"
	src="https://cdn.dribbble.com/users/56251/screenshots/10780716/media/bf16339f04fb54b38055adcce2a6da21.png?compress=1&resize=1000x750&vertical=top"
	fallbackSrc="https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png"
	alt="Imagem de exemplo do cds-image"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsImage"
/>

---

## Props

<APITable
	name="Image"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsImage from '@/components/Image.vue';

const args = ref({
	width: 400,
	height: 400,
	blackAndWhite: false,
	dimmed: false,
	roundedCorners: false,
	opacity: 1,
	src: "https://cdn.dribbble.com/users/56251/screenshots/10780716/media/bf16339f04fb54b38055adcce2a6da21.png?compress=1,resize=1000x750&vertical=top",
	fallbackSrc: "https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png",
	alt: "Imagem de exemplo do cds-image"
});
</script>
