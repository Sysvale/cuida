# DateInput

### DateInputs permitem que o usuário selecione uma data ou um intervalo de datas através de um calendário interativo.
---
<br />

## Quando usar:
- O usuário precisar selecionar uma data específica (ex: data de nascimento, data de agendamento, data de referência).
- O usuário precisar selecionar um período (data de início e fim), habilitando a propriedade range.


<br />

## Quando não usar:
- O usuário precisar selecionar um horário junto com a data (este componente lida apenas com datas).
- O usuário precisar selecionar múltiplas datas que não formam um intervalo contínuo.
- For preciso selecionar a penas mês ou ano, sem especificar o dia.
- For preciso digitar a data;

<br />

## ⚠️ Observações:
- O `v-model` para data única recebe e retorna uma string no formato ISO ('yyyy-MM-dd').
- Quando a propriedade range for true, o v-model recebe e retorna um objeto com as chaves start e end, ambas strings no formato ISO ('yyyy-MM-dd').
- O componente expõe métodos úteis como clearSelection(), getDMYFormat(), toISO(), toJSDate(), etc., que podem ser acessados via ref.
- **Importante:** no modo de seleção única, por padrão o ano mínimo disponível para seleção é o ano atual - 120 anos e o ano máximo é o ano atual + 50 anos.

<br />

---

### __Data única (Padrão)__

Este é o modo de operação padrão do DateInput quando a prop range é false
(ou não fornecida). Ele permite ao usuário selecionar um único dia no calendário.

###### Funcionamento:
- Nesse modo o `v-model` recebe e retorna uma string no formato ('yyyy-MM-dd').
- Com a seleção de data única é possível selecionar pela UI o mês e ano.

<PreviewContainer>
	<CdsDateInput
		v-model="modelValue"
		label="Data"
		variant="green"
		state="default"
		:range="false"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="false"
		:floatingLabel="false"
		:showTodayDot="true"
		:highlightToday="true"
		placeholder="Insira uma data..."
		errorMessage="Campo obrigatório"
		tooltip=""
		tooltipIcon="info-outline"
		supportingText="supportingText"
		supportLink=""
		supportLinkUrl=""
		@click="logClick"
		@change="logChange"
		@focus="logFocus"
		@blur="logBlur"
		@keydown="logKeydown"
	/>
</PreviewContainer>

<br />

### __Range__

A prop range permite habilitar a seleção de um intervalo de datas (início e fim).

###### Funcionamento:
- Nesse modo o `v-model` recebe e retorna um objeto com as chaves start e end, ambas strings no formato ('yyyy-MM-dd').
- O primeiro clique no calendário define a data de início.
- O segundo clique define a data de fim. O calendário é fechado após a seleção da data de fim.
- Os seletores de mês e ano no cabeçalho do calendário são desabilitados no modo range.

<PreviewContainer>
	<CdsDateInput
		v-model="modelValue"
		label="Data"
		variant="green"
		state="default"
		:range="true"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="false"
		:floatingLabel="false"
		:showTodayDot="true"
		:highlightToday="true"
		placeholder="Insira uma data..."
		errorMessage="Campo obrigatório"
		tooltip=""
		tooltipIcon="info-outline"
		supportingText="supportingText"
		supportLink=""
		supportLinkUrl=""
		@click="logClick"
		@change="logChange"
		@focus="logFocus"
		@blur="logBlur"
		@keydown="logKeydown"
	/>
</PreviewContainer>

<br />

### __MaxDate e MinDate__

A prop range permite habilitar a seleção de um intervalo de datas (início e fim).

###### Funcionamento:
- As props minDate e maxDate limitam o período disponível para seleção.
- Os valores de `minDate` e de `maxDate` devem ser fornecidos no formato ISO ('yyyy-MM-dd').
- Meses fora do intervalo permitido são desabilitados e não podem ser selecionados.
- Anos fora do intervalo permitido são desabilitados e não podem ser selecionados.

<PreviewContainer>
	<CdsDateInput
		v-model="modelValue"
		label="Data"
		variant="green"
		state="default"
		:range="false"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="false"
		:floatingLabel="false"
		:showTodayDot="true"
		:highlightToday="true"
		placeholder="Insira uma data..."
		errorMessage="Campo obrigatório"
		tooltip=""
		tooltipIcon="info-outline"
		supportingText="supportingText"
		supportLink=""
		supportLinkUrl=""
		maxDate="2025-12-06"
		minDate="2025-06-12"
		@click="logClick"
		@change="logChange"
		@focus="logFocus"
		@blur="logBlur"
		@keydown="logKeydown"
	/>
</PreviewContainer>

<br />

### __Mobile__

Controla o estilo visual do input, ativando o comportamento de "label flutuante". (Substitui a prop `mobile` depreciada).

<PreviewContainer>
	<CdsDateInput
		v-model="modelValue"
		label="Data"
		variant="green"
		state="default"
		:range="false"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="true"
		:floatingLabel="false"
		:showTodayDot="true"
		:highlightToday="true"
		placeholder="Insira uma data..."
		errorMessage="Campo obrigatório"
		tooltip=""
		tooltipIcon="info-outline"
		supportingText="supportingText"
		supportLink=""
		supportLinkUrl=""
		@click="logClick"
		@change="logChange"
		@focus="logFocus"
		@blur="logBlur"
		@keydown="logKeydown"
	/>
</PreviewContainer>

<br />

### __Digitação__

O modo de digitação é ativado passando-se o valor `typing` para a prop `mode`.
Nesse deixa de ser possível selecionar a data pelo picker.

<PreviewContainer>
	<CdsDateInput
		v-model="modelValue"
		label="Data"
		variant="green"
		state="default"
		:range="false"
		:required="false"
		:disabled="false"
		:fluid="false"
		:floatingLabel="false"
		:showTodayDot="true"
		:highlightToday="true"
		placeholder="Insira uma data..."
		errorMessage="Campo obrigatório"
		mode="typing"
		tooltip=""
		tooltipIcon="info-outline"
		supportingText="supportingText"
		supportLink=""
		supportLinkUrl=""
		@click="logClick"
		@change="logChange"
		@focus="logFocus"
		@blur="logBlur"
		@keydown="logKeydown"
	/>
</PreviewContainer>

---

## Uso

```js
<CdsDateInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dateInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDateInput"
	:events
/>

---

## Props

<APITable
	name="DateInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DateInput"
	section="events"
/>

<br />

<script setup>
import { ref } from 'vue';
import CdsDateInput from '@/components/DateInput.vue';

const events = [
	'update:modelValue',
	'supportLinkClick',
	'blur',
	'change',
	'click',
	'focus',
	'keydown',
	'mouseenter',
	'mouseleave',
];

const args = ref({
	type: 'text',
	state: 'default',
	disabled: false,
	floatingLabel: false,
	required: false,
	fluid: false,
	lazy: false,
	placeholder: 'Digite algo...',
	errorMessage: 'Campo obrigatório',
	tooltip: '',
	tooltipIcon: 'info-outline',
	trailingIcon: 'info-outline',
	leadingIcon: 'info-outline',
});
</script>
