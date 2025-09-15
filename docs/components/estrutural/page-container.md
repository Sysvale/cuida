# PageContainer

### PageContainers são blocos básicos de estrutura no Cuida. Eles provêm padding e alinhamento de conteúdo.
---
<br />

## Quando usar:
- PageContainers devem ser usados sempre na construção das páginas, com o conteúdo sendo colocado como slot no componente.

<br />

## Quando não usar:
- Não devem ser usados PageContainers aninhados.

---

## Uso

```vue
<CdsPageContainer>
	Teste
</CdsPageContainer>
```

---

## Preview

<PreviewContainer>
	<div class="d-flex justify-content-center">
		<CdsPageContainer
			style="background: silver"
		>
			Componente interno
		</CdsPageContainer>
	</div>
</PreviewContainer>

---

## Slots

<APITable
	name="PageContainer"
	section="slots"
/>

<script setup>
import CdsPageContainer from '@/components/PageContainer.vue';
</script>
