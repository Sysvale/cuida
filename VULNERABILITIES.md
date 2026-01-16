# Project Audit: Security, Performance, and Accessibility

This document lists the findings from an audit of the Cuida design system library.

## 1. Security Issues

### 1.1 Potential XSS in Icon Component
The `Icon.vue` component uses `v-html` to render SVG paths. While the paths are matched against a predefined icon set from `@sysvale/cuida-icons`, the use of `v-html` is generally discouraged unless strictly necessary and sanitized.
- **Location**: `src/components/Icon.vue`
- **Impact**: Low (if icons are trusted), but increases attack surface.

### 1.2 Dependency Vulnerabilities
Multiple vulnerabilities were found in dependencies (mostly development dependencies):
- `form-data` (Critical): Unsafe random function.
- `glob` (High): Command injection.
- `preact` (High): JSON VNode Injection.
- `esbuild`/`vite` (Moderate): Dev server vulnerabilities.
- `vue` v2.7.16 (Low): ReDoS vulnerability.

### 1.3 Mixed Vue Versions (Supply Chain Risk)
The `@sysvale/vue3-long-click` dependency explicitly depends on `vue: ^2.5.22`. In a Vue 3 project, this causes a second version of Vue (Vue 2) to be installed in `node_modules/@sysvale/vue3-long-click/node_modules/vue`.
- **Impact**: High. It leads to duplicate Vue instances, potential runtime conflicts, and brings in known vulnerabilities of older Vue versions (like the ReDoS mentioned above).
- **Recommendation**: Replace `@sysvale/vue3-long-click` with a Vue 3 compatible implementation that uses `vue` as a peer dependency.

---

## 2. Performance Issues

### 2.1 Duplicate and Non-Unique IDs
`Table.vue` uses `field.key` as an ID for every cell (`td`) in a column.
- **Impact**: High. If a table has 100 rows, there will be 100 elements with the same ID. This makes `document.getElementById` unreliable and degrades performance of DOM queries.
- **Location**: `src/components/Table.vue`

### 2.2 Inefficient Bundle Size (Charts)
Chart components (Line, Pie, etc.) register all Chart.js components using `registerables`.
- **Impact**: Medium. It increases the bundle size significantly as it includes all chart types and features even if only one is used.
- **Location**: `src/components/LineChart.vue`, `src/components/PieChart.vue`, etc.

### 2.3 Deep Watches and Expensive Clones
- `DataTable.vue` uses `lodash.clonedeep` on `customFieldsList`.
- `Table.vue` uses a deep watch on the `select` array.
- **Impact**: Low to Medium (depending on data size).

---

## 3. Accessibility (a11y) Issues

### 3.1 Non-Semantic Clickable Elements
`Clickable.vue` uses a `div` for interactive elements without providing proper ARIA roles, `tabindex`, or keyboard event listeners (Enter/Space).
- **Impact**: High. Screen reader users and keyboard-only users cannot interact with these elements.
- **Location**: `src/components/Clickable.vue`

### 3.2 Inaccessible Checkbox
`Checkbox.vue` hides the native input using `visibility: hidden`, which makes it non-focusable and potentially ignored by screen readers. Interaction is only handled via click listeners on labels.
- **Impact**: High. Keyboard navigation is impossible.
- **Location**: `src/components/Checkbox.vue`

### 3.3 Missing Native Disabled Support
`Button.vue` and other components do not apply the native `disabled` attribute to the underlying HTML element, relying only on CSS classes and JS click prevention.
- **Impact**: Medium. Assistive technologies might not correctly identify the button as disabled.
- **Location**: `src/components/Button.vue`

### 3.4 Broken Label Association
`Label.vue` accepts a `for` prop but fails to apply it to the native `label` element.
- **Impact**: High. Clicking the label does not focus the associated input, and screen readers may not link them.
- **Location**: `src/components/Label.vue`

### 3.5 Missing ARIA Roles in Tables
`Table.vue` and `DataTable.vue` lack necessary ARIA roles (e.g., `aria-sort`) and descriptions for complex actions like sorting.
