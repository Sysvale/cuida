# Auditoria do Projeto: Segurança, Performance e Acessibilidade

Este documento lista as descobertas de uma auditoria da biblioteca do design system Cuida.

**Legenda de Status:**
- ✅ **Resolvido**: Problema corrigido neste PR.
- ⚠️ **Parcialmente Resolvido**: Melhorado, mas ainda com pontos pendentes.
- 📝 **Documentado**: Identificado para futuras melhorias.

## 1. Problemas de Segurança

### 1.1 XSS Potencial no Componente Icon (📝 Documentado)
O componente `Icon.vue` utiliza `v-html` para renderizar caminhos SVG. Embora os caminhos sejam comparados com um conjunto de ícones predefinido de `@sysvale/cuida-icons`, o uso de `v-html` é geralmente desencorajado a menos que seja estritamente necessário e sanitizado.
- **Localização**: `src/components/Icon.vue`
- **Impacto**: Baixo (se os ícones forem confiáveis), mas aumenta a superfície de ataque.

### 1.2 Vulnerabilidades de Dependências (✅ Resolvido)
Múltiplas vulnerabilidades foram encontradas em dependências (principalmente dependências de desenvolvimento):
- `form-data` (Crítica): Função aleatória insegura.
- `glob` (Alta): Injeção de comando.
- `preact` (Alta): Injeção de JSON VNode.
- `esbuild`/`vite` (Moderada): Vulnerabilidades no servidor de desenvolvimento.
- `vue` v2.7.16 (Baixa): Vulnerabilidade de ReDoS.
*Nota: Corrigido via `npm audit fix` e remoção de dependência conflitante. Vulnerabilidades remanescentes no servidor de desenvolvimento (`esbuild`) e ferramentas de build (`minimatch`) persistem nas versões atuais mas são mitigadas no contexto de uso desta biblioteca.*

### 1.3 Versões Mistas de Vue / Risco na Cadeia de Suprimentos (✅ Resolvido)
A dependência `@sysvale/vue3-long-click` dependia explicitamente de `vue: ^2.5.22`. Em um projeto Vue 3, isso fazia com que uma segunda versão do Vue (Vue 2) fosse instalada.
- **Impacto**: Alto. Levava a instâncias duplicadas do Vue e trazia vulnerabilidades conhecidas (ReDoS).
- **Resolução**: Removida a dependência e implementada uma diretiva local `cdsLongClick` compatível com Vue 3.

---

## 2. Problemas de Performance

### 2.1 IDs Duplicados e Não Únicos (✅ Resolvido)
`Table.vue` utilizava `field.key` como um ID para cada célula (`td`) em uma coluna, gerando múltiplos elementos com o mesmo ID.
- **Impacto**: Alto. Tornava o `document.getElementById` não confiável e degradava a performance.
- **Resolução**: Removidos IDs duplicados das células e mantidos apenas nos headers onde são únicos.

### 2.2 Tamanho de Bundle Ineficiente nos Gráficos (⚠️ Parcialmente Resolvido)
Componentes de gráfico registravam todos os componentes do Chart.js usando `registerables`.
- **Impacto**: Médio. Aumentava significativamente o tamanho do bundle.
- **Resolução**: `LineChart.vue` foi refatorado para usar registro seletivo (tree-shaking). Outros componentes de gráfico ainda podem ser otimizados.

### 2.3 Watches Profundos e Clones Caros (📝 Documentado)
- `DataTable.vue` usa `lodash.clonedeep` em `customFieldsList`.
- `Table.vue` usa um watch profundo no array `select`.
- **Impacto**: Baixo a Médio.

---

## 3. Problemas de Acessibilidade (a11y)

### 3.1 Elementos Clicáveis Não Semânticos (✅ Resolvido)
`Clickable.vue` usava uma `div` sem papéis ARIA ou suporte a teclado.
- **Impacto**: Alto. Inacessível para usuários de leitor de tela e teclado.
- **Resolução**: Adicionados `role="button"`, `tabindex="0"` e suporte às teclas Enter e Espaço.

### 3.2 Checkbox Inacessível (✅ Resolvido)
`Checkbox.vue` ocultava o input nativo de forma que ele não recebia foco nem era lido corretamente.
- **Impacto**: Alto. Navegação por teclado era impossível.
- **Resolução**: Refatorado para usar input nativo (visualmente oculto, mas funcional) com anel de foco adequado.

### 3.3 Falta de Suporte ao Atributo Disabled Nativo (✅ Resolvido)
`Button.vue` não aplicava o atributo `disabled` nativo.
- **Impacto**: Médio.
- **Resolução**: Atributo `disabled` agora é aplicado corretamente ao elemento HTML.

### 3.4 Associação de Label Quebrada (✅ Resolvido)
`Label.vue` aceitava uma prop `for`, mas não a aplicava ao elemento nativo.
- **Impacto**: Alto.
- **Resolução**: Prop `for` agora é aplicada corretamente, vinculando a label ao input.

### 3.5 Falta de Roles ARIA em Tabelas (📝 Documentado)
`Table.vue` e `DataTable.vue` carecem de papéis ARIA (ex: `aria-sort`) e descrições para ações complexas.
