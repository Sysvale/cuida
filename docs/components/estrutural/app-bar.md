# AppBar

### AppBars são componentes de navegação horizontal para produtos Sysvale e Cidade saudável.

---

## Quando usar:
- Como barra de navegação principal de aplicações
- Para exibir informações do usuário e controles de sistema
- Em aplicações que precisam de acesso rápido a configurações e ajuda
- Como header fixo em layouts de administração

## Quando não usar:
- Em sites estáticos ou páginas de conteúdo
- Quando não há necessidade de navegação global
- Em interfaces móveis onde o espaço é limitado

## Observações:
- O AppBar oferece integração com as marcas Sysvale e Cidade Saudável
- Inclui componentes para app switcher, configurações e ajuda
- Suporta avatar e informações do usuário
- Permite customização do conteúdo através de slots
- Oferece dropdown personalizável para ações do usuário

## Uso

### Exemplo básico

```vue
<template>
  <cds-app-bar
    :csBrand="true"
    :sysvaleBrand="false"
    :appSwitcher="true"
    :help="true"
    :settings="true"
    userName="Rafael Dias"
    userDescription="Administrador"
    @settings-click="handleSettingsClick"
    @help-click="handleHelpClick"
    @avatar-click="handleAvatarClick"
    @app-switcher-click="handleAppSwitcherClick"
  >
    <template #app-info>
      <div class="app-switcher">
        <cds-icon
          height="24"
          width="24"
          light
          name="calendar-outline"
        />
        <p class="app-name">
          Central de marcação
        </p>
      </div>
    </template>
    <template #dropdown-content>
      Conteúdo do dropdown
    </template>
  </cds-app-bar>
</template>

<script setup>
const handleSettingsClick = () => {
  console.info('Settings clicked');
};

const handleHelpClick = () => {
  console.info('Help clicked');
};

const handleAvatarClick = () => {
  console.info('Avatar clicked');
};

const handleAppSwitcherClick = () => {
  console.info('App switcher clicked');
};
</script>
```

## Preview

<cds-app-bar
  :csBrand="true"
  :sysvaleBrand="false"
  :hideAppSwitcher="true"
  :hideHelp="true"
  :hideSettings="true"
  userName="Rafael Dias"
  userDescription="Administrador"
>
  <template #app-info>
    <div class="app-switcher">
      <cds-icon
        height="24"
        width="24"
        light
        name="calendar-outline"
      />
      <p class="app-name">
        Central de marcação
      </p>
    </div>
  </template>
</cds-app-bar>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `csBrand` | `boolean` | `false` | Exibe a marca Cidade Saudável |
| `sysvaleBrand` | `boolean` | `false` | Exibe a marca Sysvale |
| `appSwitcher` | `boolean` | `false` | Exibe o seletor de aplicativos |
| `help` | `boolean` | `false` | Exibe o botão de ajuda |
| `settings` | `boolean` | `false` | Exibe o botão de configurações |
| `hideAppSwitcher` | `boolean` | `false` | Oculta o seletor de aplicativos |
| `hideHelp` | `boolean` | `false` | Oculta o botão de ajuda |
| `hideSettings` | `boolean` | `false` | Oculta o botão de configurações |
| `userName` | `string` | `''` | Nome do usuário |
| `userDescription` | `string` | `''` | Descrição/cargo do usuário |

## Eventos

| Nome | Descrição |
|------|-----------|
| `settings-click` | Emitido quando o botão de configurações é clicado |
| `help-click` | Emitido quando o botão de ajuda é clicado |
| `avatar-click` | Emitido quando o avatar do usuário é clicado |
| `app-switcher-click` | Emitido quando o seletor de aplicativos é clicado |
| `notification-click` | Emitido quando o botão de notificações é clicado |

## Slots

| Nome | Descrição |
|------|-----------|
| `app-info` | Slot para informações da aplicação atual |
| `dropdown-content` | Slot para conteúdo personalizado do dropdown do usuário |

## Figma

[AppBar no Figma](https://www.figma.com/design/design-system-url)
