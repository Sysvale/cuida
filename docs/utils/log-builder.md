# LogBuilder

Sistema de captura e exibição de eventos em tempo real para documentação de componentes

---

## Descrição

O **LogBuilder** é um componente responsável por capturar, registrar e exiber eventos emitidos pelos componentes durante a interação do usuário. Ele funciona como um console, mostrando em tempo real todos os eventos disparados com seus respectivos payloads e timestamps.

---

## Funcionamento

O componente recebe uma lista de eventos a serem monitorados (em formato de array de strings), registra listeners para cada um deles e, sempre que um evento é disparado, captura seus dados e os exibe em uma interface de log. Essa interface inclui alternância de visibilidade, rolagem automática e exibição dos dados com formatação JSON.

---

## Uso

### Integrado no PreviewBuilder
```vue
<!-- LogBuilder é usado abstraído pelo PreviewBuilder -->
<PreviewBuilder
  :component="CdsButton"
  :args="buttonArgs"
  :events="['button-click', 'focus', 'blur']"
  <!-- LogBuilder será renderizado automaticamente -->
/>
```

### Uso externo

- **Obs.: o componente que emite os eventos deve utilizar a diretiva v-on="internalEvents" para que o LogBuilder possa registrá-los corretamente.**

```vue
<template>
  <PreviewContainer>
  	<CdsTruncateContainer
  		v-bind="args"
  		v-on="internalEvents"
  	>
  		<ul>
  			<li v-for="n in 25">List Item {{n}}</li>
  		</ul>
  	</CdsTruncateContainer>
  	<LogBuilder ref="logBuilderRef" :events />
  </PreviewContainer>
</template>

<script setup>
...

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'button-click',
	'expand',
	'collapse'
];

const internalEvents = ref({});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});

...
</script>
```

---

## Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `events` | `string[]` | - | Array com nomes dos eventos a serem capturados |

---

## Métodos expostos (defineExpose)

| Nome | Parâmetros | Descrição |
|------|------------|-----------|
| `addLogEntry` | `(event: string, payload: any)` | Adiciona uma entrada manual ao log |
| `createEventListeners` | - | Cria objeto com listeners para os eventos especificados |
| `clearLog` | - | Limpa todas as entradas do log |

---

<br>

## Estrutura de dados do log

```typescript path=null start=null
type LogEntry = {
  event: string;      // Nome do evento (ex: 'button-click')
  payload: any;       // Dados enviados com o evento
  timestamp: string;  // Hora no formato HH:MM:SS
};
```

<br>

## Integração com PreviewContainer

O LogBuilder é posicionado dentro do PreviewContainer usando `position: absolute`:

```vue path=null start=null
<PreviewContainer>
  <!-- Componente sendo testado -->
  <CdsButton v-on="internalEvents" />
  
  <!-- LogBuilder posicionado absolutamente -->
  <LogBuilder :events="['button-click']" />
</PreviewContainer>
```

---

## Tipos TypeScript

```typescript path=null start=null
export type LogBuilderType = typeof import("./LogBuilder.vue")["default"];

interface Props {
  events: string[] | undefined;
}

type LogEntry = {
  event: string;
  payload: any;
  timestamp: string;
};
```

---

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em componentes ou aplicações de produção
- Requer array de eventos não vazio para exibir o botão
- Eventos devem ser criados via `createEventListeners()`
- Log é limpo automaticamente quando componente é desmontado