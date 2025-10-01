# Highlight

Highlights são componentes utilizados para destacar palavras ou frases importantes em um determinado contexto.

## Quando usar

- Se deseja guiar a atenção do usuário para palavras ou frases específicas na interface (nesses cenários, Highlights animados podem ser ainda mais efetivos que os comuns).
- Estiver implementando alguma feature de *diff* e precisar indicar elementos que foram substituídos por outros.

## Quando não usar

- Se deseja criar hierarquia na página. Para esses casos, use mecanismos de hierarquia tipográfica como peso da fonte, tamanho ou cor.
- O elemento sobre o qual o Highlight será *wrapper* não for um elemento de texto.
- Forem destacados trechos muito grandes de texto. Isso pode acabar resultando no oposto do que se espera com o uso de Highlights.

---

## Uso

### __Uso padrão__
O comportamento padrão do `cds-highligh`, quando nenhum valor é indicado na prop `highlightedText` é o de
marcar todo o conteúdo passado por slot.

<br>

<CdsHighlight>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>

```vue
<CdsHighlight>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>
```

### __Highlight em palavras específicas do texto__
Caso se deseje marcar apenas uma parte da string passada via slot, é possível indicar na prop
`highlightedText` a substring que receberá o destaque.

<br>

<CdsHighlight
	highlightedText="RO"
>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>

```vue
<CdsHighlight
	highlightedText="RO"
>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>
```

### __Highlight em palavras específicas do texto (Case Sensitive)__
É possível indicar se as comparações feitas com a substring devem maiúsculas e minúsculas (Case Sensitive).

<br>

<CdsHighlight
	highlightedText="RO"
>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>

```vue
<CdsHighlight
	highlightedText="RO"
>
	O rato ROeu A RoUpA do rei de ROMA
</CdsHighlight>
```

<br>

---

## Preview

<PreviewBuilder
	:args
	:component="CdsHighlight"
>
	O rato ROeu A RoUpA do rei de ROMA com eficácia, força e determinação.
</PreviewBuilder>

---

## Props

<APITable
	name="CdsHighlight"
	section="props"
/>

<br>

## Slots

<APITable
	name="CdsHighlight"
	section="slots"
/>

---

## Figma

<!-- <FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
const args = ref({});
import CdsHighlight from '@/components/Highlight.vue';

</script>
