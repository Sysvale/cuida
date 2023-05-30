<!-- eslint-disable vue/multi-word-component-names -->
<template> 
	<div
		v-if="localSelect"
		id="cds-multiselect"
	>	
		<cds-multiselect
			v-bind="field"
			v-model="selectedOptions"
			:options="multiOptions"
			:label="label"
			:options-field="options.name"
			@input="handleSelectedValues"
		/>
	</div>
	<div
		id="cds-chart"
	>
		<component
			:is="chartType"
			v-if="localChartType === chartType"
			:data="computedDataSet"
			:options="chartOptions"
		/>
	</div>
</template>
  
<script>
import { Bar, Line, Pie, Doughnut, PolarArea, Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Chart, registerables } from 'chart.js';
import CdsMultiselect from './Multiselect.vue';

// Registrar o elemento "point" no registro (Torna-se necessário para Line e Pie que necessita de marcações de ponto)
Chart.register(...registerables);

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
	components: {
		Bar,
		// eslint-disable-next-line vue/no-reserved-component-names
		Line,
		Pie,
		Doughnut,
		PolarArea,
		Radar,
		CdsMultiselect,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
			default: () => ({
				datasets: [
					{
						label: 'teste',
						data: [],
					}
				]
			})
		},
		/**
         * Define configurações gerais par o gráfico.
         */
		chartOptions: {
			type: Object,
			required: true,
			default: () => ({
				responsive: true,
				maintainAspectRatio: false,
			})
		},
		/**
		* Escolha entre "bar" (gráfico de barras), "line" (gráfico de linha), "pie" (gráfico de pizza), "doughnut" (gráfico de rosquinha), "polarArea" (gráfico de área polar) e "radar" (gráfico de radar). Essa escolha influenciará a aparência da exibição dos dados.
		*/
		chartType: {
			type: String,
			required: true,
			default: 'bar',
			validator: (value) => {
				return ['bar','line','pie','doughnut', 'polarArea', 'radar', 'scatter', 'pizza'].includes(value);
			}
		},
		/**
		 * A variante de cor. São 9 variantes implementadas: 'random', 'green', 'turquoise',
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
         * Ativa ou desativa o componente multiselect
         */
		choiceMultiselect: {
			type: Boolean,
			default: true
		},
	},
	data() {
		return {
			localChartType: '',
			localChartData: {},
			localLabels: [],
			localVariant: '',
			palletColors: [
				{
					name: 'green',
					colorHex: ['#ABEDD9', '#6DDFBC', '#2AC092', '#239F78', '#1B795B', '#126349'],
					colorToken: ['$gp-200','$gp-300','$gp-400','$gp-500','$gp-600','$gp-700'],
				},
				{
					name: 'turquoise',
					colorHex: ['#C2EDFF', '#7BD0F4', '#42AAD7', '#1F86B2', '#18698B', '#13526D'],
					colorToken: ['$ts-200','$ts-300','$ts-400','$ts-500','$ts-600','$ts-700'],
				},
				{
					name: 'blue',
					colorHex: ['#B6D1F7', '#83ADE7', '#4B88DD', '#2C70CD', '#1A55A8', '#174382'],
					colorToken: ['$bn-200', '$bn-300', '$bn-400', '$bn-500', '$bn-600', '$bn-700']
				},
				{
					name: 'indigo',
					colorHex: ['#CED6FD', '#AAB7F8', '#7080D2', '#4D5DAC', '#384584', '#353D64'],
					colorToken: ['$in-200', '$in-300', '$in-400', '$in-500', '$in-600', '$in-700'],
				},
				{
					name: 'violet',
					colorHex: ['#E6D2F9', '#CEABED', '#A975D7', '#8955B9', '#6B3A98', '#4F2673'],
					colorToken: ['$vr-200', '$vr-300', '$vr-400', '$vr-500', '$vr-600', '$vr-700'],
				},
				{
					name: 'pink',
					colorHex: ['#F9C8E2', '#EF8FC0', '#DA629F', '#BE377C', '#A12663', '#701A48'],
					colorToken: ['$pp-200', '$pp-300', '$pp-400', '$pp-500', '$pp-600', '$pp-700'],
				},
				{
					name: 'red',
					colorHex: ['#FABDC5', '#F98B98', '#F3596C', '#E03E52', '#C92C3F', '#A42333'],
					colorToken: ['$rc-200', '$rc-300', '$rc-400', '$rc-500', '$rc-600', '$rc-700'],
				},
				{
					name: 'orange',
					colorHex: ['#FFD6CC', '#FDAF9B', '#FF8567', '#F06442', '#D64B29', '#AB3C21'],
					colorToken: ['$og-200', '$og-300', '$og-400', '$og-500', '$og-600', '$og-700'],
				},
				{
					name: 'amber',
					colorHex: ['#FFE2B8', '#FDCD87', '#FFB952', '#EEA22F', '#D38817', '#A56A12'],
					colorToken: ['$al-200', '$al-300', '$al-400', '$al-500', '$al-600', '$al-700'],
				},
				{
					name: 'mid',
					colorHex: ['#d6dce3', '#c3ccd5', '#acb8c3', '#99a6b2', '#8794a1'],
					colorToken: ['$n-50', '$n-100', '$n-200',  '$n-300', '$n-400'],
				},
				{
					name: 'dark',
					colorHex: ['#647382', '#52616f', '#3b4754', '#28333e', '#1d262f'],
					colorToken: ['$n-500', '$n-600', '$n-700',  '$n-800', '$n-900'],
				}
			],
			localSelect: false,
			//Label do multiselect
			label: 'Exames',
			//Options do multiselect
			options: [
				{ 
					name: 'Ecocardiograma',
					chartData: {
						datasets: [
							{
								label: 'Realizado',
								data: [50, 50, 50, 50, 50],
							},
							{
								label: 'Pendente',
								data: [200, 180, 250, 190, 280],
							},
							{
								label: 'Não realizado',
								data: [38, 84, 120, 90, 185],
							}
						]
					},	
				},
				{ 
					name: 'Raio-X',
					chartData: {
						datasets: [
							{
								label: 'Realizado',
								data: [120, 220, 180, 320, 150],
							},
							{
								label: 'Pendente',
								data: [98, 145, 160, 190, 175],
							},
							{
								label: 'Não realizado',
								data: [49, 84, 120, 78, 130],
							}
						]
					}
				},
				{ 
					name: 'Tomografia',
					chartData: {
						datasets: [
							{
								label: 'Realizado',
								data: [55, 40, 33, 90, 120],
							},
							{
								label: 'Pendente',
								data: [25, 30, 90, 45, 20],
							},
							{
								label: 'Não realizado',
								data: [38, 84, 120, 90, 45],
							}
						]
					}
				}
			],
			value: [],
			selectedOptions: [],
			selectedValues: [],
		}
	},
	computed: {
		multiOptions() {
			const tab = [];
			this.options.forEach((element) => {
				tab.push({ value: element.name });
			});

			return tab;
		},
		computedDataSet() {
			return this.localSelect ? this.localChartData : this.chartData;
		},
	},
	watch: {
		chartType: {
			handler(newValue) {
				this.localChartType = newValue;
			},
			immediate: true,
		},
		choiceMultiselect: {
			handler(newValue) {
				this.localSelect = newValue;
				if (newValue === false) {
					this.mergeChartDataNoSelect(this.chartData)
				}
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

		// Para quando choiceMultiSelect é falso é definido as labels do chartData
		if (!this.choiceMultiselect) {
			this.mergeChartDataNoSelect(this.chartData);
		}
	},

	methods: {
		// Responsável por lidar com os valores selecionados do multiselect, mapeando cada valor para encontrar os dados correspondentes nas opções disponíveis;
		// Em seguida define setColors para definir as cores dos datasets das opções selecionadas;
		// Chama a função mergeChartData para mesclar os dados das opções selecionadas para atualizar localChartData
		handleSelectedValues(selectedValues) {
			this.selectedValues = selectedValues;
			if (Array.isArray(selectedValues)) {
				const newData = selectedValues.map(selected => {
					const option = this.options.find(element => element.name === selected.value);
					if (option) {
						console.log(selectedValues)

						if (selectedValues.length === 1 && selectedValues.value === option.label) {
							console.log('igual')
							console.log(option.chartData)
							// this.mergeChartDataNoSelect(option)
							
						}
						const backgroundColor = this.generateBackgroundColor();
						this.setColors(option.chartData.datasets, backgroundColor);
						return option.chartData;
					}
					return null;
				});

				this.localChartData = this.mergeChartData(newData);
			} else {
				this.localChartData = {};
			}
		},
  
		// Função que recebe uma matriz de dados dos gráficos das opções selecionadas e mescla em um único objeto de dados. (MultiSelect: True)
		mergeChartData(data) {
			return data.reduce((mergedData, chartData) => {
				if (chartData) {
					mergedData.datasets.push(...chartData.datasets);
				}
				return mergedData;
			}, { labels: this.localLabels, datasets: [] });
		},

		// Função que recebe uma matriz de dados dos gráfico. (MultiSelect: False)
		mergeChartDataNoSelect(data) {
			data.labels = this.localLabels;
			const backgroundColor = this.generateBackgroundColor();
			this.setColors(data.datasets, backgroundColor);
		},

		// Função responsável por gerar uma cor de fundo aleatória, gera uma cor de fundo aleatória. Caso contrário gera mesma cor de fundo para todos os datasets
		// OBS: Corrigir esse ponto para gerar valores de cores aleatorios dentro do proprio dataset
		generateBackgroundColor() {
			const palletColor = this.palletColors.find(color => color.name === this.variant);
			if (palletColor) {
				return palletColor.colorHex;
			}
			// Se variant for definido como 'random', vai gerar hex aleatório para cada rótulo
			return [
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16),
				'#' + Math.floor(Math.random() * 16777215).toString(16)
			];
		},
  
		// Função responsável por setar backgroundColor, bordeWidth
		setColors(datasets, backgroundColor) {
			datasets.forEach((dataset, index) => {
				const colorIndex = index % backgroundColor.length;
				const color = backgroundColor[colorIndex];
				dataset.backgroundColor = color;
				dataset.borderRadius = 4;
			});
		},

		generateRandomColor() {
			const palletColor = this.palletColors.find(color => color.name === this.variant);
			if (palletColor) {
				return palletColor.colorHex;
			}
			return ['#' + Math.floor(Math.random() * 16777215).toString(16)];
		},
	}
}
</script>
  
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

#cds-multiselect {
	width: 300px;
}

#teste{
	background-color: $rc-500;
}
</style>