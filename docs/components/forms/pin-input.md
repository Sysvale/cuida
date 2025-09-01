# PinInput

### PinInputs são componentes utilizados para adição de one-time passwords e códigos de 2FA.

---

## Quando usar:
- Para autenticação de dois fatores (2FA)
- Para inserção de senhas temporárias (OTP)
- Para códigos de verificação enviados por SMS ou email
- Quando é necessário inserir uma sequência numérica de tamanho fixo

## Quando não usar:
- Para senhas permanentes ou logins regulares
- Para campos de texto comum
- Quando o usuário precisa digitar texto ao invés de números

## Observações:
- O PinInput é otimizado para códigos numéricos de tamanho fixo
- Oferece feedback visual imediato sobre o estado da entrada
- Suporta estados de validação: default, valid, invalid
- Facilita a experiência do usuário com navegação automática entre campos

## Uso

### Exemplo básico

```vue
<template>
  <cds-pin-input
    v-model="pinValue"
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const pinValue = ref('');
</script>
```

### Exemplo com estado de validação

```vue
<template>
  <cds-pin-input
    v-model="pinValue"
    state="valid"
  />
</template>

<script setup>
import { ref } from 'vue';
const args = ref({});

const pinValue = ref('');
</script>
```

## Preview

<cds-pin-input />

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string` | `''` | Valor do PIN inserido |
| `state` | `string` | `'default'` | Estado visual: 'default', 'valid', 'invalid' |
| `length` | `number` | `4` | Número de dígitos do PIN |
| `disabled` | `boolean` | `false` | Define se o componente está desabilitado |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando o valor do PIN é alterado |
| `complete` | Emitido quando o PIN é completamente preenchido |

## Slots

Este componente não possui slots.

## Figma

[PinInput no Figma](https://www.figma.com/design/design-system-url)
