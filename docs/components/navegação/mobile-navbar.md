# MobileNavbar

MobileNavbar é uma barra de navegação móvel localizada na parte inferior da tela.

---
<br>

## Quando usar:
- Em aplicações móveis ou responsivas que exigem uma navegação simples e acessível.
- Quando for necessário fornecer acesso rápido a seções principais do aplicativo.
- Para substituir navegações complexas em telas pequenas, mantendo a usabilidade.

<br>

## Quando não usar:
- Em telas grandes (desktop), onde uma navbar lateral ou superior é mais apropriada.
- Quando o número de itens de navegação é muito grande (mais de 5 itens).

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

<PreviewBuilder
	:args
	:component="CdsMobileNavbar"
	:events="cdsMobileNavbarEvents"
/>

---

## Props

<APITable
	name="CdsMobileNavbar"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsMobileNavbar"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsMobileNavbar from '@/components/MobileNavbar.vue';

const cdsMobileNavbarEvents = [
	'item-click'
];

const items = [
	{ icon: 'home-outline', label: 'Início', route: { name: 'Google', path: 'www.google.com' } },
	{ icon: 'search-outline', label: 'Busca', route: { name: 'Google', path: 'www.google.com' }  },
	{ icon: 'notification-bell-outline', label: 'Notificações', route: { name: 'Google', path: 'www.google.com' }  },
	{ icon: 'user-outline', label: 'Perfil', route: { name: 'Google', path: 'www.google.com' }  },
];

const args = ref({
	items,
	activeItem: items[2],
});
</script>
