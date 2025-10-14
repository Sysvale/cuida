# AppBar

AppBars são componentes de navegação horizontal para produtos Sysvale e Cidade saudável.

---

## Uso

```js
<CdsAppBar
	:csBrand="true"
	:sysvaleBrand="false"
	:appSwitcher="true"
	:help="true"
	:settings="true"
	userName="Rafael Dias"
	userDescription="Administrador"
	@settings-click="logClick"
	@help-click="logClick"
	@avatar-click="logClick"
	@app-switcher-click="logClick"
>
	<template #app-info>
		<div class="app-switcher">
			<CdsIcon
				height="24"
				width="24"
				light
				name="calendar-outline"
			/>
			<p class="app-name">
				Central de marcação
			</p>
		</div>
	</template>
	<template #dropdown-content>
			Conteúdo do dropdown
	</template>
</CdsAppBar>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsAppBar"
	:events="cdsToastEvents"
>
	<template #app-info>
		<div>
			<CdsIcon
				height="24"
				width="24"
				light
				name="calendar-outline"
			/>
			<p class="app-name">
				Central de marcação
			</p>
		</div>
	</template>
	<template #dropdown-content>
		Conteúdo do dropdown
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsAppBar"
	section="props"
/>
<br>

## Events

<APITable
	name="CdsAppBar"
	section="events"
/>

<script setup>
import { ref } from 'vue';
import CdsAppBar from '@/components/AppBar.vue';

const args = ref({
	csBrand: true,
	sysvaleBrand: false,
	hideAppSwitcher: true,
	hideHelp: true,
	hideSettings: true,
	userName: 'Rafael Dias',
	userDescription: 'Administrador'
});

const cdsToastEvents = [
	'settings-click',
	'help-click',
	'avatar-click',
	'app-switcher-click'
];
</script>
