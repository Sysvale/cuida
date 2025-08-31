# CollapsibleContainer

### CollapsibleContainers são componentes utilizados para reduzir o espaço vertical quando há uma grande quantidade de informações, com a possibilidade de ser expandido para exibir o conteúdo sumarizado.
---
<br />

## Quando usar:
- For necessário otimizar o espaço vertical.
- Se deseja mostrar itens sumarizados.
- Se possui uma grande quantidade de informações que podem ser agrupadas em um tópico/título.

<br />

## Quando não usar:
- Houver poucos itens a ser sumarizados;

---

## Uso

```js
<CdsCollapsibleContainer>
	<p class="p-3">
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
</CdsCollapsibleContainer>
```

---

## Preview

<PreviewContainer
	:component="CdsCollapsibleContainer"
	:events="cdsCollapsibleContainerEvents"
>
	<p class="p-3">
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
</PreviewContainer>

---

## Props

<APITable
	name="CollapsibleContainer"
	section="props"
/>
<br />

## Eventos

<APITable
	name="CollapsibleContainer"
	section="events"
/>
<br />

## Slots

<APITable
	name="CollapsibleContainer"
	section="slots"
/>

<script setup>
import CdsCollapsibleContainer from '@/components/CollapsibleContainer.vue';

const cdsCollapsibleContainerEvents = [
	'update:model-value'
];
</script>
