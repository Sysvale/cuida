# Guia dos Componentes de Documentação

### Como usar os componentes personalizados para documentar componentes do design system
---

Este guia explica como usar os componentes de documentação e a estrutura básica da documentação dos componentes em markdown.

## Visão geral dos componentes

### Componentes principais
- **PreviewBuilder**: Componente que provê estrutura semelhante à utilizada no Storybook com Preview + Playground
- **APITable**: Exibe informações técnicas dos componentes (props, eventos, slots)
- **FigmaFrame**: Mostra designs originais do Figma

### Componentes de suporte
###### Todos são utilizados internamente no PreviewBuilder, mas podem ser usados separadamente
- **PreviewContainer**: Container básico que adicona bordas e background no componente documentado
- **PlaygroundBuilder**: Responsável por gerar controles interativos para props
- **LogBuilder**: Componente utilizado para apresentar os eventos capturados

---

## Estrutura padrão de documentação

### Template recomendado
````markdown
# NomeDoComponente

### Descrição breve do componente
---

Descrição detalhada do componente...

## Quando usar
- Lista de casos de uso...

## Quando não usar  
- Lista de quando evitar...

## Observações 
- listar observações importantes quando necessário

---

## Uso

```js
<CdsComponente
	prop="valor"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsComponente"
/>

---

## Props

<APITable
	name="ComponentName"
	section="props"
/>

## Eventos

<APITable
	name="ComponentName"  
	section="events"
/>

## Slots

<APITable
	name="ComponentName"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsComponente from '@/components/SeuComponente.vue';

const args = ref({
	// props padrão
});

const events = [
	// lista de eventos (Array de strings)
];
</script>
````

---

## Casos de uso específicos

### Componente simples (Botão, Badge)
```html
<!-- Descrição e exemplos de uso -->

<PreviewBuilder
	:args
	:events
	:component="CdsButton"
/>

<APITable name="Button" section="props" />
<APITable name="Button" section="events" />
```

### Componente com trigger (Modal, Popover)
```html
<PreviewBuilder
	:args
	:events
	:component="CdsModal"
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
>
	<span>Conteúdo do modal</span>
</PreviewBuilder>
```

### Preview estático (sem playground)
```html
<PreviewBuilder
	:args="args"
	:component="CdsIcon"
	:events="[]"
	static
/>
```

### Múltiplos previews na mesma página
```html
<div>
	<h3>Variante Primary</h3>
	<PreviewBuilder
		:args="primaryArgs"
		:component="CdsButton"
		:events="buttonEvents"
	/>

	<h3>Variante Secondary</h3>
	<PreviewBuilder
		:args="secondaryArgs"
		:component="CdsButton"
		:events="buttonEvents"
	/>
</div>
```

---

## Integração com Figma

```html
<div>
	<h2>Implementação</h2>
	<PreviewBuilder
		:args="componentArgs"
		:component="CdsComponent"
		:events="componentEvents"
	/>

	<h2>Componente no design kit</h2>
	<FigmaFrame 
		src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FJ5fTswomlHu7RXk1gwbUq6%2FCuida%3Fnode-id%3D3-0"
	/>
</div>
```

---

## Componentes avançados

### Usando PreviewContainer diretamente
```html
<!-- Para layouts customizados -->
<PreviewContainer with-background>
	<CdsFlexbox gap="4">
		<CdsButton text="Button 1" />
		<CdsButton text="Button 2" variant="secondary" />
		<CdsButton text="Button 3" variant="danger" />
	</CdsFlexbox>
	<LogBuilder :events="['button-click']" />
</PreviewContainer>
```

### LogBuilder standalone  
```javascript
// Script setup para LogBuilder standalone
const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
```

```html
<div>
	<CdsButton 
		text="Testar eventos"
		v-on="internalEvents"
	/>
	<LogBuilder ref="logBuilderRef" :events="['button-click']" />
</div>
```

---

## Dicas e boas práticas

- Use `PreviewBuilder` como componente principal sempre que possível
- Mantenha `args` reativo com `ref()`
- Liste todos os eventos importantes do componente  
- Adicione contexto textual antes dos previews
- Use `with-background` para inputs e formulários
- Use `with-trigger` para modais e overlays


---

## Troubleshooting

### Preview não aparece
- Verifique se o componente está importado corretamente
- Confirme se `args` é reativo (`ref()` ou `reactive()`)
- Verifique se o nome do componente tem a propriedade `name`

### Playground não gera controles
- Confirme se existe arquivo `components.json` gerado
- Verifique se o nome do componente está correto
- Confirme se as props têm metadados adequados

### Eventos não são capturados
- Verifique se a lista de eventos não está vazia
- Confirme se os nomes dos eventos estão corretos
- Use `createEventListeners()` para uso manual

### Performance lenta
- Reduza número de `PreviewBuilder` por página
- Use `static={true}` quando playground não for necessário
- Considere lazy loading para componentes pesados
