# Wizard

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
<CdsWizard
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="wizardClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsWizard"
	:events="cdsWizardEvents"
/>

---

## Props

<APITable
	name="Wizard"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Wizard"
	section="events"
/>
<br />

## Slots

<APITable
	name="Wizard"
	section="slots"
/>

<script setup>
import CdsWizard from '@/components/Wizard.vue';

const cdsWizardEvents = [
	'wizard-click'
];
</script>
