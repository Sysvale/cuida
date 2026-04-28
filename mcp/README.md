# Servidor MCP - Cuida Design System

Este servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) é o braço de inteligência do **Cuida Design System**. Ele fornece contexto sobre componentes, tokens e padrões de design para assistentes de IA.

---

## Início Rápido

### 1. Pré-requisitos (Geração de Metadados)
O servidor consome os dados gerados pelo `vue-docgen-api`. Antes de subir o MCP, certifique-se de que os metadados estão atualizados.

Na **raiz do projeto** (`/`):
```bash
npm run generate:docs
```
> :warning: Isso criará o arquivo `docs/.docgen/components-metadata.json`, essencial para o funcionamento do servidor.

### 2. Instalação e Build
Navegue até a pasta do servidor e instale as dependências:
```bash
cd mcp
npm install
npm run build
```

## Configuração em Clientes IA

### 1. OpenCode
No seu projeto OpenCode, adicione o servidor ao arquivo `opencode.json`. Isso permitirá que os agentes acessem o contexto do Cuida automaticamente.

> Neste exemplo vamos usar o [bun](https://bun.com/docs/installation)

```json
{
  "mcpServers": {
    "cuida": {
      "type": "local",
      "enabled": true,
      "command": [
        "bun",
        "/home/tassiocaique/workspace/cuida/mcp/src/index.ts"
      ]
    }
  }
}
```
> **Dica:** Se estiver desenvolvendo o próprio Design System e quiser as ferramentas de manutenção, adicione a flag `--include-contributor` no array de `args`.

### 2. Claude Code
Para o CLI oficial da Anthropic, você pode configurar via linha de comando:

```bash
claude config mcp add cuida node /caminho/absoluto/para/cuida/mcp/dist/index.js
```

Ou editar o arquivo global (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "cuida": {
      "command": "node",
      "args": ["/caminho/absoluto/para/cuida/mcp/dist/index.js"]
    }
  }
}
```
---

## Modos de Operação

O servidor possui dois perfis de ferramentas, dependendo do público-alvo:

### 🔹 Modo Usuário (Padrão)
Focado em desenvolvedores que **utilizam** o Cuida para construir interfaces.
```bash
npm start
```

### 🔸 Modo Contribuidor
Focado no time interno do Cuida que **mantém** o Design System.
```bash
npm run start:contributor
# ou
npm start -- --include-contributor
```
---

## Ferramentas Disponíveis (Modo Usuário)

| Categoria | Ferramenta | Descrição |
| :--- | :--- | :--- |
| **Componentes** | `list_components` | Lista todos os componentes, opcionalmente filtrados por categoria. |
| | `list_component_categories` | Lista categorias disponíveis de componentes. |
| | `search_components` | Busca componentes por palavras-chave (fuzzy search). |
| | `get_component_metadata` | Retorna metadados completos (props, events, slots). |
| | `get_component_source` | Exibe o código-fonte original do componente `.vue`. |
| | `get_component_docs` | Retorna a documentação técnica oficial (Markdown). |
| **Migração** | `get_deprecated_components` | :warning: (WIP) Lista componentes obsoletos. |
| | `get_component_replacement` | :warning: (WIP) Indica qual componente novo substitui o antigo. |
| **Tokens** | `list_token_groups` | Lista grupos de tokens disponíveis. |
| | `get_token_group` | Retorna todos os tokens de um grupo específico. |
| | `get_token_value` | :warning: (WIP) Consulta valor específico de um token. |
| **Foundation** | `get_colors_pallete` | Retorna a paleta de cores completa. |
| | `get_typography` | Sistema de tipografia (fontes, tamanhos, line-heights). |
| | `get_font_weight` | Valores de peso de fonte disponíveis. |
| | `get_spacing` | Sistema de espaçamento (tokens de espaço). |
| | `get_borders` | Tokens de borda (larguras, raios). |
| | `get_elevation` | Tokens de elevação (sombras em camadas). |
| | `get_shadows` | Definições de sombras. |
| | `get_transitions` | Durações e curvas de transição. |
| | `get_iconography` | Ícones disponíveis do sistema. |
| | `get_principles` | Princípios de design do Cuida. |
| **Utils** | `get_use_toast` | Documentação do composable useToast (notifications). |
| | `get_is_device_type` | Documentação do método de detecção de device. |
| | `get_cds_floatify` | Diretiva para floatify (números em formato brasileiro). |
| | `get_cds_tip` | Diretiva para tooltips. |

---

## Ferramentas Disponíveis (Modo Contribuidor)

> ⚠️ **Requer `--include-contributor`**

Estas ferramentas são identificadas pelo prefixo `[DS contributor tool]` na descrição.

| Categoria | Ferramenta | Descrição |
| :--- | :--- | :--- |
| **Integridade** | `check_metadata_freshness` | Verifica a idade do arquivo de metadados. |
| | `validate_component_structure` | Valida estrutura do arquivo `.vue` (template, script, exports). |
| **Utils Internas** | `get_has_slot` | Método interno para validar uso de slots. |
| | `get_rounder` | Método para bordas arredondadas baseadas em largura. |
| | `get_remove_accents` | Sanitiza strings removendo acentos. |
| | `get_contrast_checker` | WCAG contraste checker entre cores. |
| **Docs Engine** | `get_api_table` | Componente para gerar tabelas de API em docs. |
| | `get_preview_builder` | Componente para renderizar preview interativo. |
| | `get_preview_container` | Container visual para previews. |
| | `get_playground_builder` | Controles interativos para props de componentes. |
| | `get_figma_frame` | Componente para embedar frames do Figma. |
| **Construção** | `get_variant_resolver` | Mixin Sass para variants de cores. |
| | `get_palete_resolver` | Mixin Sass para gerar paletas de cores. |
| | `get_log_builder` | Utilitário para logging estruturado. |
| | `get_documentation_guide` | Guia de como documentar componentes. |

---

## Depuração e Testes

### MCP Inspector
A melhor forma de testar as ferramentas visualmente:
```bash
npm run inspect
```

### Comandos de Desenvolvimento
* `npm run dev`: Inicia o servidor em modo watch (TypeScript).
* `npm run typecheck`: Validação estática de tipos.
* `npm test`: Executa a suíte de testes unitários.

---

## Solução de Problemas

### Os componentes aparecem desatualizados?
A IA lê o que está no JSON de metadados. Volte à raiz e rode:
`npm run generate:docs`

### Erro de "Capabilities" ou "Resources"
Certifique-se de que o servidor está respondendo corretamente ao handshake inicial. O `stdio` deve estar livre de `console.log` comuns; use apenas logs de erro via `stderr`.

```typescript
// Configuração correta no servidor:
{
  capabilities: {
    tools: {},
    resources: {},
    prompts: {},
  }
}
```