# Fundação

A fundação do Cuida Design System é composta por tokens de design que garantem consistência visual e funcional nos nossos produtos.

## Design Tokens

Os design tokens são os elementos fundamentais do nosso sistema de design. Eles definem valores reutilizáveis para propriedades como cores, tipografia, espaçamento, etc.

### Disponíveis

- [**Princípios**](./principles) - Princípios de design
- [**Cores**](./cores) - Paleta de cores do sistema
- [**Tipografia**](./tipografia) - Famílias, tamanhos e pesos de fonte
- [**Peso da Fonte**](./peso-fonte) - Pesos tipográficos
- [**Espaçamento**](./espacamento) - Sistema de espaçamento
- [**Bordas**](./bordas) - Border radius
- [**Elevação**](./elevation) - Níveis de elevação com z-index
- [**Sombras**](./shadow) - Estilos de sombra
- [**Transições**](./transicoes) - Transições css
- [**Iconografia**](./iconografia) - Família de ícones

## Como usar

```css
<style lang="scss" scoped>
  @import 'node_modules/@sysvale/cuida/dist/@sysvale/tokens.scss';
  ...

  .my-component {
    color: $bn-400;
  }
</style>
```
