# Plano Completo do MCP do Cuida

Documento para apresentação ao time e organização da implementação do MCP do design system Cuida.

---

## Parte 1: O que é MCP e por que estamos fazendo isso

### O que é MCP (Model Context Protocol)

MCP é um protocolo aberto criado pela Anthropic que permite que agentes de IA (como Claude, Cursor, etc.) se conectem a fontes de dados externas de forma padronizada. Funciona assim:

- O MCP define um "servidor" que expõe "tools" (ferramentas/funções)
- Agentes de IA podem chamar essas tools para obter informações
- É como criar uma API, mas especificamente desenhada para consumo por IAs

**Analogia simples**: Se a IA é um desenvolvedor, o MCP é como dar a ela acesso a uma documentação interativa que ela pode consultar programaticamente.

### Por que criar um MCP para o Cuida

- **Consistência**: Quando um dev pedir para a IA criar um componente, ela saberá exatamente quais props, eventos e slots existem
- **Atualização automática**: O MCP lê do repositório, então sempre terá a versão mais recente
- **Produtividade**: Devs podem pedir "crie uma página de login usando CdsButton e CdsTextInput" e a IA terá todo contexto necessário
- **Padronização**: Todos os devs da Sysvale terão acesso ao mesmo conhecimento estruturado

---

## Parte 2: Análise de viabilidade do projeto Cuida

### O que foi analisado

Fiz uma análise completa do repositório para validar se é viável construir esse MCP. Aqui está o que encontrei:

### Fontes de dados disponíveis (todas viáveis)

**1. Metadados de componentes** - `docs/.docgen/components-metadata.json`

- Arquivo JSON gerado automaticamente pelo script `npm run generate:docs`
- Contém para cada componente: nome, descrição, props (com tipo, required, default), eventos, slots
- Já existe e está bem estruturado - **perfeito para o MCP**

**2. Documentação em Markdown** - `docs/components/**/*.md`

- Arquivos organizados por categoria (forms, display, containers, etc.)
- Cada arquivo tem: descrição, quando usar/não usar, exemplos de código, preview
- Formato consistente - **fácil de parsear**

**3. Código-fonte dos componentes** - `src/components/*.vue`

- Aproximadamente 120 componentes Vue
- Mistura de Composition API e Options API (migração gradual)
- Props documentadas com JSDoc - **já preparado para extração**

**4. Tokens de design** - `src/assets/sass/tokens/`

- Arquivos SCSS organizados: cores, espaçamento, tipografia, sombras, bordas, elevação
- Estrutura modular com `@forward` - **fácil de mapear**

**5. Utilitários** - `src/utils/`

- Composables, constantes, métodos, validadores
- Alguns são Vue-specific (não úteis para MCP), outros são funções puras (úteis)

### Conclusão da viabilidade

**O projeto é totalmente viável** porque:

- Os dados já estão bem estruturados
- Já existe um processo de geração de metadados (`vue-docgen-api`)
- A documentação segue padrões consistentes
- Não será necessário criar scrapers complexos - apenas ler arquivos existentes

---

## Parte 3: Como a documentação será servida

### O problema

Temos apenas este repositório local. Como o MCP vai encontrar e servir a documentação?

### A solução: Leitura direta do filesystem

O MCP será um servidor local que roda no mesmo ambiente onde o repositório está clonado. Funciona assim:

1. **Dev clona o repositório Cuida** (já faz isso normalmente)
2. **Dev inicia o servidor MCP** (novo comando: `npm run mcp:start`)
3. **Servidor MCP lê os arquivos do repositório** em tempo real
4. **Cursor/Claude se conecta ao MCP** via configuração local
5. **IA faz consultas** e recebe dados atualizados

### Fluxo de dados

```
Repositório Cuida (local)
    │
    ├── docs/.docgen/components-metadata.json  ─┐
    ├── docs/components/**/*.md                 │
    ├── src/components/*.vue                    ├──► Servidor MCP ──► Cursor/Claude
    ├── src/assets/sass/tokens/*.scss           │
    └── src/utils/**/*                         ─┘
```

### Por que leitura local e não API hospedada

- **Simplicidade**: Não precisa de infraestrutura de servidor
- **Atualização**: Sempre lê a versão do branch atual do dev
- **Segurança**: Dados não saem da máquina
- **Offline**: Funciona sem internet (após instalar)

### Pré-requisito importante

Antes de iniciar o MCP, o dev deve rodar `npm run generate:docs` para garantir que `components-metadata.json` está atualizado. Podemos automatizar isso no script de start do MCP.

---

## Parte 4: Estrutura do projeto MCP

### Onde criar o MCP

Sugestão: criar uma pasta `mcp/` na raiz do repositório Cuida.

**Por que na raiz e não em packages/?**

- O Cuida não usa monorepo com workspaces
- Manter simples facilita contribuição
- Pode ser movido depois se necessário

### Estrutura de pastas sugerida

```
cuida/
├── mcp/                          # Nova pasta do MCP
│   ├── package.json              # Dependências do MCP
│   ├── tsconfig.json             # Config TypeScript
│   ├── src/
│   │   ├── index.ts              # Entrypoint do servidor
│   │   ├── server.ts             # Configuração do servidor MCP
│   │   ├── tools/                # Implementação dos tools
│   │   │   ├── components.ts     # Tools de componentes
│   │   │   ├── tokens.ts         # Tools de tokens
│   │   │   └── utils.ts          # Tools de utilitários
│   │   ├── readers/              # Leitores de arquivos
│   │   │   ├── metadata.ts       # Lê components-metadata.json
│   │   │   ├── docs.ts           # Lê arquivos .md
│   │   │   ├── source.ts         # Lê arquivos .vue
│   │   │   └── tokens.ts         # Lê arquivos .scss
│   │   ├── indexer/              # Sistema de busca
│   │   │   └── search.ts         # Indexação e busca
│   │   └── types/                # Tipos TypeScript
│   │       └── index.ts          # Interfaces e types
│   └── README.md                 # Documentação do MCP
├── src/                          # (existente)
├── docs/                         # (existente)
└── package.json                  # (existente - adicionar scripts)
```

### Por que essa estrutura

- **`tools/`**: Separa cada domínio (componentes, tokens, utils) para facilitar manutenção
- **`readers/`**: Isola a lógica de leitura de arquivos - se o formato mudar, só muda aqui
- **`indexer/`**: Centraliza busca - pode evoluir de busca simples para algo mais sofisticado
- **`types/`**: TypeScript ajuda a documentar os contratos e evitar erros

---

## Parte 5: Tools MCP (as funções que a IA pode chamar)

### Conceito de Tool

No MCP, um "tool" é uma função que a IA pode invocar. Cada tool tem:

- **Nome**: identificador único (ex: `list_components`)
- **Descrição**: explica o que faz (a IA lê isso para decidir quando usar)
- **Parâmetros**: inputs que aceita (com tipos)
- **Retorno**: dados que devolve

### Tools propostos para o Cuida

**Domínio: Componentes**

| Tool | Descrição | Parâmetros | Retorno |
|------|-----------|------------|---------|
| `list_components` | Lista todos os componentes disponíveis | `category?` (opcional) | Array com nome, categoria e descrição curta |
| `get_component_metadata` | Obtém metadados completos de um componente | `name` (obrigatório) | Props, eventos, slots, descrição |
| `get_component_docs` | Obtém documentação Markdown do componente | `name` (obrigatório) | Conteúdo do .md com exemplos |
| `get_component_source` | Obtém código-fonte Vue do componente | `name` (obrigatório) | Conteúdo do .vue |
| `search_components` | Busca componentes por termo | `query` (obrigatório) | Array de componentes que casam |

**Domínio: Tokens**

| Tool | Descrição | Parâmetros | Retorno |
|------|-----------|------------|---------|
| `list_token_groups` | Lista grupos de tokens disponíveis | - | Array: colors, spacing, typography, etc. |
| `get_token_group` | Obtém valores de um grupo de tokens | `group` (obrigatório) | Conteúdo SCSS parseado ou raw |

**Domínio: Utilitários**

| Tool | Descrição | Parâmetros | Retorno |
|------|-----------|------------|---------|
| `list_utils` | Lista utilitários disponíveis | `type?` (composables, methods, etc.) | Array com nome e descrição |
| `get_util` | Obtém detalhes de um utilitário | `name` (obrigatório) | Código e documentação |

### Por que esses tools específicos

- **`list_*`**: Permite à IA descobrir o que existe antes de pedir detalhes
- **`get_*`**: Permite obter informação específica sem baixar tudo
- **`search_*`**: Permite busca por intenção ("componente de input de texto")
- **Separação por domínio**: IA pode focar no que precisa (só componentes, só tokens, etc.)

---

## Parte 6: Como implementar (sem código, conceitual)

### Passo 1: Configurar o projeto MCP

**O que fazer:**

- Criar a pasta `mcp/` com `package.json` próprio
- Instalar o SDK oficial do MCP (`@modelcontextprotocol/sdk`)
- Configurar TypeScript com target Node.js

**Por que separar o package.json:**

- O MCP tem dependências diferentes do Cuida (Vue, Vite, etc.)
- Evita conflitos de versão
- Permite publicar o MCP separadamente se desejado

### Passo 2: Implementar os leitores de dados

**Leitor de metadados:**

- Ler e parsear `docs/.docgen/components-metadata.json`
- Criar um Map/objeto indexado por nome do componente
- Cachear em memória (arquivo não muda durante execução)

**Leitor de documentação:**

- Mapear nome do componente para caminho do .md
- O mapeamento pode ser: `CdsButton` → `docs/components/forms/button.md`
- Usar o campo `sourceFiles` do metadata para ajudar no mapeamento

**Leitor de código-fonte:**

- Usar o campo `sourceFiles` do metadata que já contém o caminho
- Ler o arquivo .vue sob demanda

**Leitor de tokens:**

- Mapear grupos para arquivos: `colors` → `_colors.module.scss`
- Decidir se expõe SCSS raw ou tenta parsear valores

### Passo 3: Implementar o índice de busca

**Abordagem simples (recomendada para começar):**

- Criar índice em memória no startup
- Indexar: nome do componente, descrição, nomes de props
- Busca por substring case-insensitive

**Por que não usar algo mais complexo:**

- O volume de dados é pequeno (~120 componentes)
- Busca simples é suficiente para o caso de uso
- Pode evoluir depois se necessário

### Passo 4: Registrar os tools no servidor MCP

**O que fazer:**

- Criar o servidor usando o SDK do MCP
- Registrar cada tool com nome, descrição e handler
- Cada handler chama os leitores apropriados e formata resposta

**Comunicação:**

- O SDK do MCP cuida do protocolo (stdio ou HTTP)
- Para uso local, stdio é mais simples (Cursor suporta)

### Passo 5: Configurar integração com Cursor

**O que fazer:**

- Adicionar configuração em `.cursor/mcp.json` ou similar
- Documentar como o dev configura seu Cursor local

**Exemplo conceitual de configuração:**

- Informar o comando para iniciar o MCP (`npm run mcp:start`)
- Informar o diretório de trabalho (raiz do Cuida)

---

## Parte 7: Mapeamento nome do componente para documentação

### O desafio

Os arquivos de documentação não seguem exatamente o nome do componente:

- Componente: `CdsButton` (em `src/components/Button.vue`)
- Documentação: `docs/components/forms/button.md`

### Solução proposta: Criar um índice de mapeamento

**Abordagem 1: Derivar do nome do arquivo**

- O metadata tem `sourceFiles: ["src/components/Button.vue"]`
- Extrair "Button" do caminho
- Buscar arquivo .md que contenha "button" no nome (case-insensitive)
- Funciona para maioria dos casos

**Abordagem 2: Scan inicial da pasta docs**

- No startup, listar todos os .md em `docs/components/`
- Parsear o frontmatter ou título de cada um
- Criar mapeamento `CdsButton` → `docs/components/forms/button.md`

**Abordagem 3: Adicionar campo no metadata (melhor longo prazo)**

- Modificar o script `docs/plugins/vueDocgen.js`
- Adicionar campo `docsPath` ao metadata gerado
- Benefício: mapeamento explícito e confiável

### Recomendação

Começar com Abordagem 1 ou 2 (funcionam sem modificar código existente), e migrar para Abordagem 3 quando estabilizar.

---

## Parte 8: Governança e colaboração

### Como múltiplos devs vão contribuir

**Estrutura de branches:**

- Branch principal do MCP: `main` (junto com o Cuida)
- Feature branches: `feature/mcp-*`
- PRs revisados por pelo menos 1 pessoa

**Divisão de trabalho sugerida:**

- Dev A: Estrutura base do servidor e tools de componentes
- Dev B: Tools de tokens e leitores SCSS
- Dev C: Sistema de busca e indexação
- Dev D: Documentação e testes

**Comunicação:**

- Definir contratos dos tools ANTES de implementar
- Usar os tipos TypeScript como "contrato" entre partes
- Cada tool pode ser desenvolvido independentemente

### Versionamento

- Começar em versão `0.1.0` (experimental)
- Seguir semver: patch para fixes, minor para novos tools, major para breaking changes
- Manter CHANGELOG.md na pasta `mcp/`

---

## Parte 9: Testes e validação

### Testes unitários

- Testar cada leitor isoladamente (mock do filesystem)
- Testar formatação de resposta dos tools
- Testar busca com casos conhecidos

### Testes de integração

- Testar fluxo completo: request → tool → leitor → response
- Usar dados reais do repositório

### Validação manual

**Cenários para testar:**

1. "Liste todos os componentes de formulário" → deve retornar CdsButton, CdsTextInput, etc.
2. "Quais props o CdsButton aceita?" → deve retornar variant, size, text, disabled, etc.
3. "Me mostre um exemplo de uso do CdsAlert" → deve retornar código do .md
4. "Busque componentes de input" → deve retornar TextInput, EmailInput, etc.

---

## Parte 10: Exemplo de uso futuro

### Cenário: Dev quer criar página de login

**Sem MCP (hoje):**

1. Dev abre documentação do Cuida no browser
2. Procura componentes de input, botão, card
3. Copia exemplos
4. Adapta manualmente
5. Consulta props quando dá erro

**Com MCP (futuro):**

1. Dev pede no Cursor: "Crie uma página de login com email, senha e botão de entrar usando Cuida"
2. IA consulta MCP: `list_components({ category: "forms" })`
3. IA consulta MCP: `get_component_metadata({ name: "CdsTextInput" })`
4. IA consulta MCP: `get_component_docs({ name: "CdsButton" })` para ver exemplos
5. IA gera código correto usando props e padrões do Cuida

### Benefício mensurável

- Menos tempo consultando docs
- Menos erros de props/tipos
- Código mais consistente com o design system

---

## Parte 11: Próximos passos e cronograma sugerido

### Fase 1: Setup inicial

- Criar estrutura de pastas
- Configurar TypeScript e dependências
- Implementar servidor MCP básico (hello world)

### Fase 2: Leitores de dados

- Implementar leitor de metadata
- Implementar leitor de docs
- Implementar leitor de source
- Criar mapeamento nome → arquivos

### Fase 3: Tools de componentes

- Implementar `list_components`
- Implementar `get_component_metadata`
- Implementar `get_component_docs`
- Implementar `get_component_source`

### Fase 4: Busca e tokens

- Implementar `search_components`
- Implementar tools de tokens
- Implementar tools de utils

### Fase 5: Integração e docs

- Configurar integração com Cursor
- Escrever documentação de uso
- Criar testes automatizados

### Fase 6: Refinamento

- Coletar feedback dos devs
- Ajustar descrições dos tools
- Otimizar performance se necessário

---

## Anexo: Referências úteis

- Documentação oficial MCP: https://modelcontextprotocol.io
- SDK TypeScript MCP: https://github.com/modelcontextprotocol/typescript-sdk
- vue-docgen-api (usado no Cuida): https://vue-styleguidist.github.io/docs/docgen-api
- Configuração MCP no Cursor: documentação do Cursor sobre MCPs
