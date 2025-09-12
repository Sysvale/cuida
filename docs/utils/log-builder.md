# LogBuilder

### Sistema de captura e exibição de eventos em tempo real para documentação de componentes
---

O **LogBuilder** é um componente especializado que captura, registra e exibe eventos emitidos pelos componentes durante a interação do usuário. Ele funciona como um console de desenvolvimento visual, mostrando em tempo real todos os eventos disparados com seus respectivos payloads e timestamps.

## Quando usar

- Para demonstrar eventos emitidos por componentes interativos
- Quando precisar de feedback visual sobre eventos disparados
- Para debugging e demonstração de comportamentos de componentes
- Sempre que quiser mostrar a comunicação entre componente e aplicação

## Como funciona

O componente cria listeners dinâmicos para os eventos especificados, captura os dados quando são emitidos e os exibe em uma interface de log com botão de toggle, scroll automático e formatação JSON.

---

## Uso

### Uso básico
```vue
<LogBuilder 
  ref="logBuilderRef"
  :events="['button-click', 'focus', 'blur']" 
/>
```

### Com componente e eventos
```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

onMounted(() => {
  internalEvents.value = logBuilder.value.createEventListeners();
});
</script>

<template>
  <CdsButton 
    text="Clique aqui"
    v-on="internalEvents"
  />
  <LogBuilder 
    ref="logBuilderRef"
    :events="['button-click']" 
  />
</template>
```

### Integrado no PreviewBuilder
```vue
<!-- LogBuilder é usado automaticamente pelo PreviewBuilder -->
<PreviewBuilder
  :component="CdsButton"
  :args="buttonArgs"
  :events="['button-click', 'focus', 'blur']"
  <!-- LogBuilder será renderizado automaticamente -->
/>
```

---

## Props

| Nome | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `events` | `string[] \| undefined` | - | Array com nomes dos eventos a serem capturados |

---

## Métodos expostos

| Nome | Parâmetros | Descrição |
|------|------------|-----------|
| `addLogEntry` | `(event: string, payload: any)` | Adiciona uma entrada manual ao log |
| `createEventListeners` | - | Cria objeto com listeners para os eventos especificados |
| `clearLog` | - | Limpa todas as entradas do log |

---

## Interface visual

### 🎛️ Botão de controle
- Posicionado no canto inferior direito do container
- Toggle entre "Mostrar log" / "Ocultar log"
- Estilo consistente com o design system
- Z-index elevado para ficar sempre visível

### 📊 Área do log
- Container com scroll automático
- Altura máxima de 150px
- Scroll invisível (webkit-scrollbar hidden)
- Border superior para separação visual

### 📝 Entradas do log
- **Timestamp**: Formato HH:MM:SS
- **Nome do evento**: Prefixado com @ e destacado em azul
- **Payload**: Formatado em JSON com indentação
- Layout flex para organização esquerda/direita

---

## Estrutura de dados do log

```typescript path=null start=null
type LogEntry = {
  event: string;      // Nome do evento (ex: 'button-click')
  payload: any;       // Dados enviados com o evento
  timestamp: string;  // Hora no formato HH:MM:SS
};
```

### Exemplo de entrada
```json
{
  "event": "button-click",
  "payload": {
    "mouseEvent": "[MouseEvent]",
    "buttonId": "primary-btn"
  },
  "timestamp": "14:32:15"
}
```

---

## Funcionalidades avançadas

### 🔄 Scroll automático
- Detecta novas entradas e faz scroll para baixo
- Comportamento suave (`behavior: 'smooth'`)
- Usa `nextTick` para garantir DOM atualizado

```javascript path=null start=null
watch(log.value, () => {
  if (logContainer.value) {
    nextTick(() => {
      logContainer.value?.scrollTo({
        top: logContainer.value.scrollHeight,
        behavior: 'smooth',
      });
    });
  }
}, { deep: true });
```

### 🎧 Criação dinâmica de listeners
```javascript path=null start=null
function createEventListeners() {
  const listeners: Record<string, Function> = {};

  props.events?.forEach((event) => {
    listeners[event] = (ev: any) => {
      addLogEntry(event, ev);
    };
  });

  return listeners;
}
```

### ⏰ Timestamp automático
```javascript path=null start=null
const addLogEntry = (event: string, payload: any) => {
  log.value.push({
    event,
    payload,
    timestamp: new Date().toTimeString().split(' ')[0] // HH:MM:SS
  });
};
```

---

## Exemplos práticos

### Botão com múltiplos eventos
```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

const events = [
  'button-click',
  'focus', 
  'blur',
  'mouseenter',
  'mouseleave'
];

onMounted(() => {
  internalEvents.value = logBuilder.value.createEventListeners();
});
</script>

<template>
  <CdsButton 
    text="Botão interativo"
    v-on="internalEvents"
  />
  <LogBuilder ref="logBuilderRef" :events />
</template>
```

### Input com validação
```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});

const events = [
  'update:modelValue',
  'blur',
  'focus', 
  'input',
  'change'
];

onMounted(() => {
  internalEvents.value = logBuilder.value.createEventListeners();
});
</script>

<template>
  <CdsTextInput 
    label="Digite algo"
    placeholder="Observe os eventos..."
    v-on="internalEvents"
  />
  <LogBuilder ref="logBuilderRef" :events />
</template>
```

### Modal com eventos de ciclo de vida
```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

const logBuilder = useTemplateRef('logBuilderRef');
const internalEvents = ref({});
const showModal = ref(false);

const events = [
  'open',
  'close',
  'update:modelValue',
  'ok',
  'cancel'
];

onMounted(() => {
  internalEvents.value = logBuilder.value.createEventListeners();
});
</script>

<template>
  <CdsButton 
    text="Abrir Modal"
    @button-click="showModal = true"
  />
  
  <CdsModal
    v-model="showModal"
    title="Modal de teste"
    v-on="internalEvents"
  >
    Conteúdo do modal para testar eventos
  </CdsModal>
  
  <LogBuilder ref="logBuilderRef" :events />
</template>
```

---

## Estilos visuais

```scss path=null start=null
.show-log-button {
  padding: 4px 8px;
  color: black;
  background-color: #fff;
  border-top: 1px solid #DFE5EC;
  border-left: 1px solid #DFE5EC;
  position: absolute;
  right: 0;
  font-size: 12px;
  border-radius: 6px 0px 12px 0px;
  cursor: pointer;
  margin-bottom: 4px;
  font-weight: 650;
  bottom: -4px;
  z-index: 2;
}

.log-container {
  padding: 20px;
  border-top: 1px solid #DFE5EC;
  margin: 22px 0;
  max-height: 150px;
  overflow: scroll;
  scrollbar-width: none;  // Firefox
  -ms-overflow-style: none;  // IE/Edge
}

.log-event {
  font-weight: bold;
  color: #2C70CD;
}

.log-text {
  display: flex;
  padding: 2px 0px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
```

---

## Estados do componente

### 📊 Com eventos
```vue path=null start=null
<div>
  <span class="show-log-button" @click="showLog = !showLog">
    {{ logButtonText }}
  </span>
  
  <div v-show="showLog" class="log-container">
    <!-- Entradas do log -->
  </div>
</div>
```

### 📝 Log vazio
```vue path=null start=null
<CdsFlexbox fluid align="center" justify="center">
  <CdsBadge variant="gray">
    ⚡Nenhum evento foi disparado
  </CdsBadge>
</CdsFlexbox>
```

### 📄 Log com entradas
```vue path=null start=null
<template v-for="message in log">
  <div class="log-text">
    <div>
      <small class="log-event">
        @{{ message.event }}: 
      </small>
      <small>
        {{ JSON.stringify(message.payload, null, 2) }} <i>(payload)</i>
      </small>
    </div>
    <small>
      {{ message.timestamp }}
    </small>
  </div>
</template>
```

---

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

## Notas importantes

- ⚠️ **Exclusivo para documentação** - Não usar em aplicações
- Requer array de eventos não vazio para exibir o botão
- Eventos devem ser criados via `createEventListeners()`
- Log é limpo automaticamente quando componente é desmontado
- Suporte a payloads complexos com formatação JSON
- Performance otimizada com watchers deep

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