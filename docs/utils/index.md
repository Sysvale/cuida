# Utilidades

As utilidades do Cuida Design System incluem funções auxiliares, composables Vue e ferramentas que facilitam o desenvolvimento com o sistema de design.

## Composables

Composables Vue que encapsulam lógica reutilizável:

- [**useToast**](./use-toast) - Composable para gerenciar notificações toast

## Utilitários

Funções e classes auxiliares para tarefas comuns:

- [**CdsFloatify**](./cds-floatify) - Utilitário para conversão de números para float
- [**CdsTip**](./cds-tip) - Sistema de dicas e tooltips
- [**ContrastChecker**](./contrast-checker) - Verificador de contraste de cores
- [**HasSlot**](./has-slot) - Verificador de slots em componentes Vue
- [**IsDeviceType**](./is-device-type) - Detector de tipo de dispositivo
- [**PaleteResolver**](./palete-resolver) - Resolvedor de cores da paleta
- [**RemoveAccents**](./remove-accents) - Removedor de acentos de strings
- [**Rounder**](./rounder) - Arredondador de números
- [**VariantResolver**](./variant-resolver) - Resolvedor de variantes de componentes

## Componentes de Documentação

Componentes personalizados criados especificamente para a documentação do design system:

- [**APITable**](./api-table) - Exibe tabelas automáticas com props, eventos e slots
- [**PreviewBuilder**](./preview-builder) - Cria previews interativas completas dos componentes  
- [**PreviewContainer**](./preview-container) - Container visual padronizado para demonstrações
- [**PlaygroundBuilder**](./playground-builder) - Gera controles automáticos para props
- [**LogBuilder**](./log-builder) - Captura e exibe eventos em tempo real
- [**FigmaFrame**](./figma-frame) - Incorpora designs do Figma na documentação

## Características

### 🔧 Flexíveis
Utilitários projetados para serem flexíveis e adaptáveis a diferentes casos de uso.

### ⚡ Performance
Otimizados para performance com baixo overhead.

### 📝 TypeScript
Totalmente tipados com TypeScript para melhor experiência de desenvolvimento.

### 🧪 Testados
Todos os utilitários possuem testes unitários abrangentes.

## Como usar

### Instalação

```bash
npm install @sysvale/cuida
```

### Importação Individual

```js
import { ContrastChecker, RemoveAccents } from '@sysvale/cuida/utils';

// Verificar contraste
const isAccessible = ContrastChecker.check('#ffffff', '#000000');

// Remover acentos
const cleanText = RemoveAccents('São Paulo');
```

### Uso de Composables

```vue
<template>
  <button @click="showToast">Mostrar Toast</button>
</template>

<script setup>
import { useToast } from '@sysvale/cuida';

const { toast } = useToast();

const showToast = () => {
  toast.success('Operação realizada com sucesso!');
};
</script>
```

## Contribuição

Para contribuir com novos utilitários ou melhorar os existentes:

1. Mantenha a consistência com o padrão existente
2. Adicione testes unitários
3. Documente adequadamente
4. Considere performance e acessibilidade

Cada utilitário deve ser:
- **Específico**: Resolver um problema específico
- **Reutilizável**: Funcionar em diferentes contextos
- **Bem documentado**: Com exemplos e casos de uso
- **Testado**: Com cobertura de testes adequada

