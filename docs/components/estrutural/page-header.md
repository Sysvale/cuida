# PageHeader

### PageHeader são componentes utilizados para adicionar título, subtítulo e ações em páginas.

---

## Quando usar:
- Precisar colocar headers em páginas
- Precisar adicionar botões de ação a nível de página
- Precisar adicionar cards informativos no topo de páginas
- Para criar cabeçalhos consistentes em páginas administrativas

## Quando não usar:
- Fora do topo de páginas
- Para cabeçalhos simples que não precisam de ações
- Em componentes que já têm seu próprio header

## Observações:
- Quando uma URL é colocada como parte do subtítulo, ela é renderizada como link no componente. Para tanto, a URL deve ser precedida de http:// ou https://
- O PageHeader oferece layout flexível para títulos e ações
- Suporta slots para conteúdo personalizado
- Mantém consistência visual entre páginas
- Ideal para páginas administrativas e dashboards

## Uso

### Exemplo básico

```vue
<template>
  <cds-page-header
    title="Procedimentos"
    subtitle="Gerencie os procedimentos cadastrados"
  >
    <template #aside>
      <div class="d-flex">
        <cds-button
          secondary
          @click="handleClick('Btn 1')"
          text="Button 1"
        />
        <cds-button
          class="d-flex align-items-center ml-4"
          variant="success"
          @click="handleClick('Btn 2')"
          text="Button 2"
        />
      </div>
    </template>
  </cds-page-header>
</template>

<script setup>
const handleClick = (btnName) => {
  console.info(btnName);
};
</script>
```

### Exemplo com URL no subtítulo

```vue
<template>
  <cds-page-header
    title="Painéis"
    subtitle="Crie painéis e os associe a serviços. Para acessar os painéis de modo externo, acesse https://short.sysvale.com/totem e insira a chave correspondente."
  />
</template>
```

## Preview

<cds-page-header
  title="Procedimentos"
  subtitle="Crie painéis e os associe a serviços. Para acessar os painéis de modo externo, acesse https://short.sysvale.com/totem e insira a chave correspondente."
>
  <template #aside>
    <div class="d-flex">
      <cds-button
        secondary
        text="Button 1"
      />
      <cds-button
        class="d-flex align-items-center ml-4"
        variant="success"
        text="Button 2"
      />
    </div>
  </template>
</cds-page-header>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | `''` | Título principal da página |
| `subtitle` | `string` | `''` | Subtítulo ou descrição da página |

## Eventos

Este componente não emite eventos.

## Slots

| Nome | Descrição |
|------|-----------|
| `aside` | Slot para botões de ação e outros elementos no lado direito do header |

## Figma

[PageHeader no Figma](https://www.figma.com/design/design-system-url)
