# PageContainer

### PageContainers são blocos básicos de estrutura no Cuida. Eles provêm padding e alinhamento de conteúdo.

---

## Quando usar:
- PageContainers devem ser usados sempre na construção das páginas, com o conteúdo sendo colocado como slot no componente
- Para criar layouts consistentes e organizados
- Quando precisar de padding e alinhamento padrão em páginas
- Como container principal de conteúdo em aplicativos

## Quando não usar:
- Não devem ser usados PageContainers aninhados
- Para layouts que precisam de controle específico de espaçamento
- Em componentes que já possuem seu próprio container

## Observações:
- O PageContainer fornece a estrutura básica para páginas no Cuida
- Oferece padding e alinhamento consistentes
- É projetado para ser o container raiz de conteúdo
- Evita a necessidade de definir espaçamento manualmente em cada página
- Mantém consistência visual em toda a aplicação

## Uso

### Exemplo básico

```vue
<template>
  <cds-page-container>
    <h1>Título da Página</h1>
    <p>Conteúdo da página vai aqui...</p>
  </cds-page-container>
</template>
```

### Exemplo com conteúdo estruturado

```vue
<template>
  <cds-page-container>
    <header>
      <h1>Dashboard</h1>
    </header>
    <main>
      <section>
        <h2>Estatísticas</h2>
        <!-- Conteúdo das estatísticas -->
      </section>
    </main>
  </cds-page-container>
</template>
```

## Preview

<cds-page-container style="background: #f5f5f5; min-height: 200px;">
  <div style="text-align: center; padding: 40px;">
    <h3>Conteúdo dentro do PageContainer</h3>
    <p>Este é um exemplo de como o conteúdo é exibido dentro do container.</p>
  </div>
</cds-page-container>

## Props

Este componente não possui props.

## Eventos

Este componente não emite eventos.

## Slots

| Nome | Descrição |
|------|-----------|
| `default` | Slot padrão para o conteúdo da página |

## Figma

[PageContainer no Figma](https://www.figma.com/design/design-system-url)
