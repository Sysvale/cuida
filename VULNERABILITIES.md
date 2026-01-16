# Auditoria do Projeto: Segurança, Performance e Acessibilidade

Este documento lista as descobertas de uma auditoria da biblioteca do design system Cuida.

## 1. Problemas de Segurança

### 1.1 XSS Potencial no Componente Icon
O componente `Icon.vue` utiliza `v-html` para renderizar caminhos SVG. Embora os caminhos sejam comparados com um conjunto de ícones predefinido de `@sysvale/cuida-icons`, o uso de `v-html` é geralmente desencorajado a menos que seja estritamente necessário e sanitizado.
- **Localização**: `src/components/Icon.vue`
- **Impacto**: Baixo (se os ícones forem confiáveis), mas aumenta a superfície de ataque.

### 1.2 Vulnerabilidades de Dependências
Múltiplas vulnerabilidades foram encontradas em dependências (principalmente dependências de desenvolvimento):
- `form-data` (Crítica): Função aleatória insegura.
- `glob` (Alta): Injeção de comando.
- `preact` (Alta): Injeção de JSON VNode.
- `esbuild`/`vite` (Moderada): Vulnerabilidades no servidor de desenvolvimento.
- `vue` v2.7.16 (Baixa): Vulnerabilidade de ReDoS.

### 1.3 Versões Mistas de Vue (Risco na Cadeia de Suprimentos)
A dependência `@sysvale/vue3-long-click` depende explicitamente de `vue: ^2.5.22`. Em um projeto Vue 3, isso faz com que uma segunda versão do Vue (Vue 2) seja instalada em `node_modules/@sysvale/vue3-long-click/node_modules/vue`.
- **Impacto**: Alto. Isso leva a instâncias duplicadas do Vue, potenciais conflitos em tempo de execução e traz vulnerabilidades conhecidas de versões mais antigas do Vue (como o ReDoS mencionado acima).
- **Recomendação**: Substituir `@sysvale/vue3-long-click` por uma implementação compatível com Vue 3 que use `vue` como uma peer dependency.

---

## 2. Problemas de Performance

### 2.1 IDs Duplicados e Não Únicos
`Table.vue` utiliza `field.key` como um ID para cada célula (`td`) em uma coluna.
- **Impacto**: Alto. Se uma tabela tiver 100 linhas, haverá 100 elementos com o mesmo ID. Isso torna o `document.getElementById` não confiável e degrada a performance de consultas ao DOM.
- **Localização**: `src/components/Table.vue`

### 2.2 Tamanho de Bundle Ineficiente (Gráficos)
Componentes de gráfico (Line, Pie, etc.) registram todos os componentes do Chart.js usando `registerables`.
- **Impacto**: Médio. Isso aumenta significativamente o tamanho do bundle, pois inclui todos os tipos de gráfico e funcionalidades, mesmo que apenas um seja utilizado.
- **Localização**: `src/components/LineChart.vue`, `src/components/PieChart.vue`, etc.

### 2.3 Watches Profundos e Clones Caros
- `DataTable.vue` usa `lodash.clonedeep` em `customFieldsList`.
- `Table.vue` usa um watch profundo no array `select`.
- **Impacto**: Baixo a Médio (dependendo do tamanho dos dados).

---

## 3. Problemas de Acessibilidade (a11y)

### 3.1 Elementos Clicáveis Não Semânticos
`Clickable.vue` usa uma `div` para elementos interativos sem fornecer papéis (roles) ARIA adequados, `tabindex` ou listeners de eventos de teclado (Enter/Space).
- **Impacto**: Alto. Usuários de leitores de tela e usuários que utilizam apenas o teclado não conseguem interagir com esses elementos.
- **Localização**: `src/components/Clickable.vue`

### 3.2 Checkbox Inacessível
`Checkbox.vue` oculta o input nativo usando `visibility: hidden`, o que o torna não focável e potencialmente ignorado por leitores de tela. A interação é tratada apenas via listeners de clique em labels.
- **Impacto**: Alto. A navegação por teclado é impossível.
- **Localização**: `src/components/Checkbox.vue`

### 3.3 Falta de Suporte ao Atributo Disabled Nativo
`Button.vue` e outros componentes não aplicam o atributo `disabled` nativo ao elemento HTML subjacente, dependendo apenas de classes CSS e prevenção de clique via JS.
- **Impacto**: Médio. Tecnologias assistivas podem não identificar corretamente o botão como desabilitado.
- **Localização**: `src/components/Button.vue`

### 3.4 Associação de Label Quebrada
`Label.vue` aceita uma prop `for`, mas falha em aplicá-la ao elemento `label` nativo.
- **Impacto**: Alto. Clicar na label não foca o input associado, e leitores de tela podem não vinculá-los.
- **Localização**: `src/components/Label.vue`

### 3.5 Falta de Roles ARIA em Tabelas
`Table.vue` e `DataTable.vue` carecem de papéis ARIA necessários (ex: `aria-sort`) e descrições para ações complexas como ordenação.
