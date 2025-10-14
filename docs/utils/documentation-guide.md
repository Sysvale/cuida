# Guia dos Componentes de Documentação

Como usar os componentes personalizados para documentar componentes do design system

---

Este guia explica como usar os componentes de documentação e a estrutura básica da documentação dos componentes em markdown.

<br>

## Visão geral dos componentes

### Componentes principais
- **PreviewBuilder**: Componente que provê estrutura semelhante à utilizada no Storybook com Preview + Playground
- **APITable**: Exibe informações técnicas dos componentes (props, eventos, slots)
- **FigmaFrame**: Mostra designs dos componentes no Figma

### Componentes de suporte
###### Todos são utilizados internamente no PreviewBuilder, mas podem ser usados diretamente, caso necessário
- **PreviewContainer**: Container básico com bordas e background. Recebe por slot o componente a ser documentado.
- **PlaygroundBuilder**: Responsável por gerar controles interativos para props.
- **LogBuilder**: Componente utilizado para apresentar os eventos capturados.

---

## Estrutura padrão da documentação

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
	name="CdsComponentName"
	section="props"
/>

## Eventos

<APITable
	name="CdsComponentName"
	section="events"
/>

## Slots

<APITable
	name="CdsComponentName"
	section="slots"
/>

## Figma

<FigmaFrame
	src="..."
/>

<script setup>
import { ref } from 'vue';
import CdsComponente from '@/components/Componente.vue';

const args = ref({
	// seta valor default para as props dos componentes
});

const events = [
	// lista de eventos (Array de strings)
];
</script>
````

---

<!-- ## Casos de uso
### Componente simples (Botão, Badge)
```html
<PreviewBuilder
	:args
	:events
	:component="CdsButton"
/>

<APITable name="Button" section="props" />
<APITable name="Button" section="events" />
```

<br>

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

<br>

### Preview estático (sem playground)
```html
<PreviewBuilder
	:args="args"
	:component="CdsIcon"
	:events="[]"
	static
/>
```

<br>

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

<br>

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


## Casos de uso avançados

### Usando PreviewContainer diretamente
```html
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
```html
<div>
	<CdsButton
		text="Testar eventos"
		v-on="internalEvents"
	/>
	<LogBuilder ref="logBuilderRef" :events="['button-click']" />
</div>
```
```javascript
// ...
const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
```

--- -->

## Dicas e boas práticas

- Use `PreviewBuilder` como componente principal sempre que possível
- Mantenha `args` reativo com `ref()`
- Liste todos os eventos importantes do componente
- Adicione contexto textual antes dos previews
- Use `with-background` para inputs e formulários
- Use `with-trigger` para modais e overlays


---

## Troubleshooting

#### Preview não aparece
- Verifique se o componente está importado corretamente
- Confirme se `args` é reativo (`ref()` ou `reactive()`)
- Verifique se o nome do componente é definido no SFC. Ex.:
  - Para Composition API: `defineOptions({ name: 'CdsBaseInput' });`
  - Para Options API: ```export default {
	name: 'CdsActionBar'
	props: ....```

#### Playground não gera controles
- Confirme se existe arquivo o `components-metadata.json` e ele está atualizado
- Verifique se o nome do componente está sendo enviado corretamente para o `<PreviewBuilder>` ou `<PlaygroundBuilder>`
- Confirme se as props têm metadados adequados

#### Eventos não são capturados
- Verifique se a lista de eventos não está vazia
- Confirme se os nomes dos eventos estão corretos
- Use `createEventListeners()` para uso direto do `<LogBuilder>` com playground

#### Performance lenta
- Reduza número de `PreviewBuilder` por página
- Use `static={true}` quando playground não for necessário
- Considere lazy loading para componentes pesados
