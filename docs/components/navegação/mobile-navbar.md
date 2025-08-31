# MobileNavbar

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsMobileNavbar
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="mobileNavbarClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsMobileNavbar"
	:events="cdsMobileNavbarEvents"
/>

---

## Props

<APITable
	name="MobileNavbar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="MobileNavbar"
	section="events"
/>
<br />

## Slots

<APITable
	name="MobileNavbar"
	section="slots"
/>

<script setup>
import CdsMobileNavbar from '@/components/MobileNavbar.vue';

const cdsMobileNavbarEvents = [
	'mobileNavbar-click'
];
</script>
