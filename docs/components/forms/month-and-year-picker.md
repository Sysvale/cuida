# MonthAndYearPicker

### MonthAndYearPickers permitem que o usuário selecione um mês e ano através de um campo de texto e um seletor interativo.
---
<br>

## Quando usar:
- O usuário precisar selecionar apenas o mês e ano, sem especificar o dia

<br>

## Quando não usar:
- O usuário precisar selecionar uma data específica com dia, mês e ano (use DateInput).
- O usuário precisar selecionar um intervalo de datas (use DateInput com a propriedade range).
- For necessário selecionar apenas o ano, sem o mês.

## ⚠️ Observações:
- O `v-model`  recebe e retorna uma string no formato ('yyyy-MM').
- Por padrão, o componente exibe o mês e ano atual ao abrir, a menos que um valor seja fornecido.
- O componente aplica automaticamente restrições de navegação baseadas nas propriedades minDate e maxDate.

<br>

### __Com Limites de Data__
O MonthAndYearPicker permite definir datas mínimas e máximas para restringir a seleção.

###### Funcionamento:
- As props minDate e maxDate limitam o período disponível para seleção.
- A navegação entre anos é automaticamente limitada com base nesses valores.
- Meses fora do intervalo permitido são desabilitados e não podem ser selecionados.
- Os valores de `minDate` e de `maxDate` devem ser fornecidos no formato ISO ('yyyy-MM-dd').

<PreviewContainer>
	<CdsMonthAndYearPicker
		label="Mês"
		variant="green"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="false"
		:floatingLabel="false"
		placeholder="Escolha um mês..."
		errorMessage="Campo obrigatório"
		tooltipIcon="info-outline"
		supportingText="supportingText"
		maxDate="2026-06-06"
		minDate="2023-01-01"
	/>
</PreviewContainer>

<br>

### __Floating Label__
Controla o estilo visual do input, ativando o comportamento de "label flutuante".

<PreviewContainer>
	<CdsMonthAndYearPicker
		label="Mês"
		variant="green"
		state="default"
		:required="false"
		:disabled="false"
		:fluid="false"
		:mobile="false"
		:floatingLabel="true"
		placeholder="Escolha um mês..."
		errorMessage="Campo obrigatório"
		tooltipIcon="info-outline"
		supportingText="supportingText"
	/>
</PreviewContainer>

### __Base__
Este é o modo de operação padrão do MonthAndYearPicker que permite ao usuário selecionar um mês e ano no seletor.

###### Funcionamento:
- O v-model recebe e retorna uma string no formato ('yyyy-MM').
- Ao clicar no input, um seletor de meses é exibido organizado em grade, com o ano atual no cabeçalho.
- O usuário pode navegar entre anos usando os botões de seta no cabeçalho.
- Ao selecionar um mês, o seletor fecha automaticamente e atualiza o valor.


## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsMonthAndYearPicker"
/>

---

## Props

<APITable
	name="CdsMonthAndYearPicker"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsMonthAndYearPicker"
	section="events"
/>

<br>

## Eventos

<APITable
	name="CdsMonthAndYearPicker"
	section="events"
/>

<br>

<script setup>
import { ref } from 'vue';
import CdsMonthAndYearPicker from '@/components/MonthAndYearPicker.vue';

const events = [
	'update:modelValue',
	'supportLinkClick',
	'blur',
	'change',
	'click',
	'focus',
	'keydown',
];

const args = ref({
	label: 'Mês',
	variant: 'green',
	state: 'default',
	required: false,
	disabled: false,
	fluid: false,
	mobile: false,
	floatingLabel: false,
	placeholder: 'Escolha um mês...',
	errorMessage: 'Campo obrigatório',
	tooltip: '',
	tooltipIcon: 'info-outline',
	supportingText: 'supportingText',
	supportLink: '',
	supportLinkUrl: '',
	maxDate: "2026-06-06",
	minDate: "2023-01-01"
});
</script>

