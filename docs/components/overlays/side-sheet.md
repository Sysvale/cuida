# SideSheet

SideSheets são painéis que surgem do lado direito da tela. De modo semelhante aos Modais, são úteis quando se precisa que os usuários concluam executem ações sem perder o contexto da página atual.

---
<br>


## Quando usar:
- Para criar filtros com muitos campos sobre o conteúdo mostrado na página.
- Para criar formulários mantendo o conteúdo principal da página visível.
- Para mostrar informações detalhadas sobre determinado item da página.

<br>

## Quando não usar:
- Quando o conteúdo do SideSheet não for relacionado com o conteúdo da página.
- Não use SideBars como solução de navegação vertical.

<br>

## Observações:
- ⚠️ Este componente foi projetado apenas para usos em desktops e tablets.

---

## Uso

```js
<CdsSideSheet
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="sideSheetClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsSideSheet"
	:events="cdsSideSheetEvents"
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
	<p>
		Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
		leite de mula manquis sem cabeça. Sociosqu ad
		litora torquent.
	</p>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsSideSheet"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsSideSheet"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsSideSheet"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsSideSheet from '@/components/SideSheet.vue';

const cdsSideSheetEvents = [
	'update:modelValue',
	'cancel',
	'close',
	'ok',
];

const args = ref({
	title: 'SideSheet',
	okButtonText: 'Confirmar',
	cancelButtonText: 'Cancelar',
});
</script>
