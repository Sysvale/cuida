<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span id="cds-bar-chart">
		<div
			v-if="localSelect"
			id="cds-multiselect"
		>	
			<cds-multiselect
				v-model="selectedOptions"
				:options="multiOptions"
				:label="label"
				:options-field="options.name"
				@input="handleSelectedValues"
			/>
		</div>
		<div>
			<Bar
				:is="'bar'"
				:data="computedDataSet"
				:options="chartOptions"
			/>
		</div>
	</span>
</template>
  
<script>
import { Chart, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import CdsMultiselect from './Multiselect.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';

// Registrar o elemento "point" no registro (Torna-se necessário para Line e Pie que necessita de marcações de ponto)
Chart.register(...registerables);

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
	components: {
		Bar,
		CdsMultiselect,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
			default: () => ({
				datasets: [
					{
						label: '',
						data: [],
					}
				]
			})
		},
		/**
		 * A variante de cor. São 12 variantes implementadas: 'random', 'green', 'turquoise',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'mid', 'dark'.
		 */
		variant: {
			type: String,
			required: true,
			default: 'green',
			validator: (value) => {
				return ['random', 'green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'mid', 'dark'].includes(value);
			}
		},
		/**
		 * Defina a labels do gráfico
		 */
		chartLabels: {
			type: Array,
			required: true,
			default: () => [],
		},
		/**
         * Ativa ou desativa o componente multiselect. Quando definido como verdadeiro (true), espera-se que 'chartData' seja uma lista de objetos. Quando definido como falso (false), espera-se apenas um objeto.
         */
		choiceMultiselect: {
			type: Boolean,
			default: true
		},
		/**
         * Label do MultiSelect.
         */
		labelSelect: {
			type: String,
			default: 'Label'
		},
		/**
         * Configura o eixo de exibição do gráfico. (x ou y)
         */
		indexAxis: {
			type: String,
			default: 'x'
		},
		/**
		 * Configura a porcentagem ocupada pela barra do gráfico. (0.1-1).
		 */
		categoryPercentage: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			sassColorVariables,
			localChartData: {},
			localLabels: [],
			localVariant: '',
			palletColors: [
				{
					name: 'green',
					colorHex: ['ABEDD9', '6DDFBC', '2AC092', '239F78', '1B795B', '126349'],
					colorToken: ['gp200','gp300','gp400','gp500','gp600','gp700'],
				},
				{
					name: 'turquoise',
					colorHex: ['C2EDFF', '7BD0F4', '42AAD7', '1F86B2', '18698B', '13526D'],
					colorToken: ['ts200','ts300','ts400','ts500','ts600','ts700'],
				},
				{
					name: 'blue',
					colorHex: ['B6D1F7', '83ADE7', '4B88DD', '2C70CD', '1A55A8', '174382'],
					colorToken: ['bn200', 'bn300', 'bn400', 'bn500', 'bn600', 'bn700']
				},
				{
					name: 'indigo',
					colorHex: ['CED6FD', 'AAB7F8', '7080D2', '4D5DAC', '384584', '353D64'],
					colorToken: ['in200', 'in300', 'in400', 'in500', 'in600', 'in700'],
				},
				{
					name: 'violet',
					colorHex: ['E6D2F9', 'CEABED', 'A975D7', '8955B9', '6B3A98', '4F2673'],
					colorToken: ['vr200', 'vr300', 'vr400', 'vr500', 'vr600', 'vr700'],
				},
				{
					name: 'pink',
					colorHex: ['F9C8E2', 'EF8FC0', 'DA629F', 'BE377C', 'A12663', '701A48'],
					colorToken: ['pp200', 'pp300', 'pp400', 'pp500', 'pp600', 'pp700'],
				},
				{
					name: 'red',
					colorHex: ['FABDC5', 'F98B98', 'F3596C', 'E03E52', 'C92C3F', 'A42333'],
					colorToken: ['rc200', 'rc300', 'rc400', 'rc500', 'rc600', 'rc700'],
				},
				{
					name: 'orange',
					colorHex: ['FFD6CC', 'FDAF9B', 'FF8567', 'F06442', 'D64B29', 'AB3C21'],
					colorToken: ['og200', 'og300', 'og400', 'og500', 'og600', 'og700'],
				},
				{
					name: 'amber',
					colorHex: ['FFE2B8', 'FDCD87', 'FFB952', 'EEA22F', 'D38817', 'A56A12'],
					colorToken: ['al200', 'al300', 'al400', 'al500', 'al600', 'al700'],
				},
				{
					name: 'mid',
					colorHex: ['d6dce3', 'c3ccd5', 'acb8c3', '99a6b2', '8794a1'],
					colorToken: ['n50', 'n100', 'n200',  'n300', 'n400'],
				},
				{
					name: 'dark',
					colorHex: ['647382', '52616f', '3b4754', '28333e', '1d262f'],
					colorToken: ['n500', 'n600', 'n700',  'n800', 'n900'],
				}
			],
			localSelect: '',
			// NOTE: Label do multiselect
			label: '',
			// NOTE: Options do multiselect
			options: [],
			value: [],
			selectedOptions: [],
			selectedValues: [],
			chartOptions: {
				responsive: true,
				maintainAspectRatio: true, //NOTE: Caso true manterá aspecto de proporção original, caso false, será dimensionado para preencher completamente o contêiner (Isso pode fazer com que o gráfico pareça distorcido se o container tiver proporção de aspecto diferente do gráfico original)
				indexAxis: this.indexAxis, //NOTE: Configura o eixo do gráfico.
				categoryPercentage: this.categoryPercentage, //NOTE: Configura a porcentagem ocupada pela barra do gráfico. (0-1)
				plugins: {
					tooltip: {
						callbacks: {
							beforeTitle: function (context) {
								return `${context[0].dataset.name}`;
							}
						}
					},
				}
			},
		}
	},
	computed: {
		// NOTE: Computada do multiselect responsável para exibir lista dos options pelo name
		multiOptions() {
			return this.options.map(option => ({ value: option.name }));
		},


		// NOTE: Computada responsável por definir qual tipo de dado vai ser exibido de acordo com o multiSelect ativado ou desativado
		computedDataSet() {
			return this.localSelect ? this.localChartData : this.verify;
		},

		// NOTE: Como modo de segurança, caso utilize um array de objetos irá exibir o primeiro objeto, caso não seja irá retornar somente o objeto passado	
		verify() {
			if (Array.isArray(this.chartData)) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.multiOptions[0].isSelected = true;
				const selectedOption = {
					value: this.multiOptions[0].value,
				};
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.selectedOptions = [selectedOption];
				return this.localChartData;
			}
			return this.chartData;
		},
	},

	watch: {
		choiceMultiselect: {
			handler(newValue) {
				this.localSelect = newValue;
			},
			immediate: true,
		},

		labelSelect: {
			handler(newValue) {
				this.label = newValue
			},
			immediate: true,
		},

		chartData: {
			handler(newValue, oldValue) {
				this.options = newValue;
				if (newValue === oldValue && Array.isArray(newValue) && newValue.length > 0) {
					this.options = newValue[0];
					return;
				}
				this.localChartData = newValue;
			},
			immediate: true,
		},

		selectedOptions: {
			handler(newValue) {
				this.handleSelectedValues(newValue);
			},
			deep: true,
			immediate: true,
		},

		chartLabels: {
			handler(newValue) {
				this.localLabels = newValue
			},
			immediate: true,
		},

		variant: {
			handler(newValue) {
				this.localVariant = newValue;
			},
			immediate: true,
		},
	},

	mounted() {
		this.addDataSetNames();
		this.replaceColorsFromSass();
	},

	created() {
		if (this.choiceMultiselect && this.multiOptions.length > 0) {
			this.multiOptions[0].isSelected = true;
			const selectedOption = {
				value: this.multiOptions[0].value,
			};
			this.selectedOptions = [selectedOption];
		} else {
			this.selectedOptions = [];
		}
		this.typeOfData(this.chartData);
	},

	methods: {
		// NOTE: Método que itera sobre palletColors e atualiza hex em acordo com o sassColorVariables
		replaceColorsFromSass() {
			this.palletColors.forEach((color) => {
				color.colorToken.forEach((token, i) => {
					const hex = this.sassColorVariables[token];

					if (hex) {
						const formattedHex = `${hex}`;
						color.colorHex[i] = formattedHex;
					}
				});
			});
		},

		// NOTE: Adiciona campo dataset.name com o nome do objeto respectivo
		addDataSetNames() {
			this.chartData.forEach(item => {
				item.datasets.forEach(dataset => {
					dataset.name = item.name;
				});
			});
		},

		// NOTE: Verifica o tipo de dado que está sendo inserido
		typeOfData(chartData) {
			if (typeof chartData === 'object') {
				if (!Array.isArray(chartData)) {
					if (!this.localSelect) {
						// Redireciona para função de merge do Objeto quando multiselect desativado
						this.mergeChartDataNoSelect(chartData);
					}
				}
			}
		},

		// NOTE: Responsável por lidar com os valores selecionados do multiselect, mapeando cada valor para encontrar os dados correspondentes nas opções disponíveis;
		// Em seguida define setColors para definir as cores dos datasets das opções selecionadas;
		// Chama a função mergeChartData para mesclar os dados das opções selecionadas para atualizar localChartData
		handleSelectedValues(selectedValues) {
			this.selectedValues = selectedValues;
			let mergedData = { labels: this.localLabels, datasets: [] };

			if (Array.isArray(selectedValues)) {
				const selectedDatasets = selectedValues.flatMap(selected => {
					const option = this.options.find(element => element.name === selected.value);
					return option ? option.datasets : [];
				});

				const backgroundColor = this.generateBackgroundColor();
				this.setColors(selectedDatasets, backgroundColor);

				mergedData.datasets = selectedDatasets;
			}

			this.localChartData = mergedData;
		},
  
		// NOTE: Função que recebe a matriz de dados dos gráficos das opções selecionadas e mescla em um único objeto de dados. (MultiSelect: True)
		mergeChartData(data) {
			return data.reduce((mergedData, chartData) => {
				if (chartData) {
					mergedData.datasets.push(...chartData.datasets);
				}
				return mergedData;
			}, { labels: this.localLabels, datasets: [] });
		},

		// NOTE: Função que recebe uma matriz de dados dos gráfico. (MultiSelect: False)
		mergeChartDataNoSelect(data) {		
			data.labels = this.localLabels;
			const backgroundColor = this.generateBackgroundColor();
			this.setColors(data.datasets, backgroundColor);
			this.localChartData = data;
		},

		// NOTE: Função responsável por gerar uma cor de fundo aleatória. Caso contrário gera mesma cor de fundo para todos os datasets (Quando 'variant' for definido como random)
		generateBackgroundColor() {
			const palletColor = this.palletColors.find(color => color.name === this.variant);
			if (palletColor) {
				return palletColor.colorHex;
			}

			const backgroundColor = [];
			const selectedValuesCount = Array.isArray(this.selectedValues) ? this.selectedValues.length : 0;
			for (let i = 0; i < selectedValuesCount; i++) {
				backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
			}
			return backgroundColor;
		},
  
		// NOTE: Função responsável por setar backgroundColor, bordeWidth e name
		// Ocorre essa verificação para garantir que o mesmo conjunto de dados para mais de um item selecionado tenha a mesma cor
		setColors(datasets, backgroundColor) {
			if (this.selectedValues.length > 1) {
				const colors = {};

				datasets.forEach(dataset => {
					const objectName = dataset.name;

					if (!colors[objectName]) {
						const colorIndex = Object.keys(colors).length % backgroundColor.length;
						colors[objectName] = backgroundColor[colorIndex];
					}

					dataset.backgroundColor = colors[objectName];
					dataset.borderRadius = 4;
				});
			} else {
				datasets.forEach((dataset, index) => {
					const colorIndex = index % backgroundColor.length;
					const color = backgroundColor[colorIndex];
					dataset.backgroundColor = color;
					dataset.borderRadius = 4;
				});
			}
		},
	}
}
</script>
  
<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

#cds-multiselect {
	width: 300px;
}
</style>