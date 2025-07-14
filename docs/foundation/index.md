# Fundação

A fundação do Cuida Design System é composta por tokens de design que garantem consistência visual e funcional em toda a interface.

## Design Tokens

Os design tokens são os elementos fundamentais do nosso sistema de design. Eles definem valores reutilizáveis para propriedades como cores, tipografia, espaçamento e muito mais.

### Disponíveis

- [**Cores**](./cores) - Paleta de cores do sistema
- [**Tipografia**](./tipografia) - Famílias, tamanhos e pesos de fonte
- [**Espaçamento**](./espacamento) - Sistema de espaçamento consistente
- [**Bordas**](./bordas) - Raios de borda e estilos
- [**Elevação**](./elevation) - Níveis de elevação e profundidade
- [**Sombras**](./shadow) - Estilos de sombra
- [**Transições**](./transicoes) - Animações e transições
- [**Iconografia**](./iconografia) - Sistema de ícones
- [**Peso da Fonte**](./peso-fonte) - Pesos tipográficos
- [**Princípios**](./principles) - Princípios de design

## Benefícios

### Consistência
Todos os tokens garantem que os elementos visuais sejam consistentes em toda a aplicação.

### Manutenção
Centralização dos valores facilita atualizações e manutenção do design.

### Escalabilidade
Permite que o sistema cresça de forma organizada e previsível.

### Acessibilidade
Tokens foram definidos considerando boas práticas de acessibilidade.

## Como usar

Os tokens podem ser utilizados de várias formas:

### CSS Custom Properties
```css
.my-component {
  color: var(--cds-color-blue-500);
  font-size: var(--cds-font-size-md);
  padding: var(--cds-spacing-md);
}
```

### SCSS Variables
```scss
.my-component {
  color: $cds-color-blue-500;
  font-size: $cds-font-size-md;
  padding: $cds-spacing-md;
}
```

### JavaScript/TypeScript
```js
import { tokens } from '@sysvale/cuida';

const styles = {
  color: tokens.color.blue[500],
  fontSize: tokens.fontSize.md,
  padding: tokens.spacing.md
};
```

