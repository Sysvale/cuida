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
	<div id="teste">
		<h1>{{ localVariant }}</h1>
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
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'light-neutrals', 'mid-neutrals', 'dark-neutrals'.
		 */
		variant: {
			type: String,
			required: true,
			default: 'green',
			validator: (value) => {
				return ['random', 'green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'light-neutrals', 'mid-neutrals', 'dark-neutrals'].includes(value);
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
		// Para cada opção de cor selecionada, a função gera uma cor de fundo aleatória;
		// Em seguida define setColors para definir as cores dos datasets das opções selecionadas;
		// Chama a função mergeChartData para mesclar os dados das opções selecionadas para atualizar localChartData
		handleSelectedValues(selectedValues) {
			this.selectedValues = selectedValues;
			if (Array.isArray(selectedValues)) {
				const newData = selectedValues.map(selected => {
					const option = this.options.find(element => element.name === selected.value);
					if (option) {
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

  
		// Função responsável por gerar uma cor de fundo aleatória, se apenas um valor estiver selecionado, gera uma cor de fundo aleatória. Caso contrário gera mesma cor de fundo para todos os datasets
		// OBS: Corrigir esse ponto para gerar valores de cores aleatorios dentro do proprio dataset
		generateBackgroundColor() {
			return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
		},
  
		// Função responsável por setar backgroundColor, bordeWidth e borderColor
		setColors(datasets, backgroundColor) {
			datasets.forEach(dataset => {
				dataset.backgroundColor = backgroundColor;
				dataset.borderWidth = 1;
				const rgb = this.extractRGB(backgroundColor);
				dataset.borderColor = rgb;
				dataset.borderRadius = 4;
			});
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
			data.datasets.forEach(dataset => {
				const backgroundColor = this.generateRandomColor();
				dataset.backgroundColor = backgroundColor;
				dataset.borderWidth = 1;
				const rgb = this.extractRGB(backgroundColor);
				dataset.borderColor = rgb;
				dataset.borderRadius = 4;
			});
		},

		generateRandomColor() {
			return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
		},

  
		// Função para extrair os valores RGB de um RGBA para assir poder definir o borderColor.
		extractRGB(color) {
			const rgbaValues = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(',');
			const [r, g, b] = rgbaValues.map(value => parseInt(value.trim()));
			return `rgb(${r}, ${g}, ${b})`;
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

$colors: (
		'green': (
			'0': $gp-50,
			'1': $gp-100,
			'2': $gp-200,
			'3': $gp-300,
			'4': $gp-400,
			'5': $gp-500,
			'6': $gp-600,
			'7': $gp-700,
		),
		'turquoise': (
			'0': $ts-50,
			'1': $ts-100,
			'2': $ts-200,
			'3': $ts-300,
			'4': $ts-400,
			'5': $ts-500,
			'6': $ts-600,
			'7': $ts-700,
		),
		'blue': (
			'0': $bn-50,
			'1': $bn-100,
			'2': $bn-200,
			'3': $bn-300,
			'4': $bn-400,
			'5': $bn-500,
			'6': $bn-600,
			'7': $bn-700,
		),
		'indigo': (
			'0': $in-50,
			'1': $in-100,
			'2': $in-200,
			'3': $in-300,
			'4': $in-400,
			'5': $in-500,
			'6': $in-600,
			'7': $in-700,
		),
		'violet': (
			'0': $vr-50,
			'1': $vr-100,
			'2': $vr-200,
			'3': $vr-300,
			'4': $vr-400,
			'5': $vr-500,
			'6': $vr-600,
			'7': $vr-700,
		),
		'pink': (
			'0': $pp-50,
			'1': $pp-100,
			'2': $pp-200,
			'3': $pp-300,
			'4': $pp-400,
			'5': $pp-500,
			'6': $pp-600,
			'7': $pp-700,
		),
		'red': (
			'0': $rc-50,
			'1': $rc-100,
			'2': $rc-200,
			'3': $rc-300,
			'4': $rc-400,
			'5': $rc-500,
			'6': $rc-600,
			'7': $rc-700,
		),
		'orange': (
			'0': $og-50,
			'1': $og-100,
			'2': $og-200,
			'3': $og-300,
			'4': $og-400,
			'5': $og-500,
			'6': $og-600,
			'7': $og-700,
		),
		'amber': (
			'0': $al-50,
			'1': $al-100,
			'2': $al-200,
			'3': $al-300,
			'4': $al-400,
			'5': $al-500,
			'6': $al-600,
			'7': $al-700,
		),
		'light': (
			'0': $n-0,
			'1': $n-10,
			'2': $n-20,
			'3': $n-30,
			'4': $n-40,
		),
		'mid': (
			'0': $n-50,
			'1': $n-100,
			'2': $n-200,
			'3': $n-300,
			'4': $n-400,
		),
		'dark': (
			'0': $n-500,
			'1': $n-600,
			'2': $n-700,
			'3': $n-800,
			'4': $n-900,
		),
	);

	@each $color, $variants in $colors {
		$selector: unquote($color); // Converte a string "--cor" para "cor"
  
		.#{$selector} {
			@each $state, $color-value in $variants {
			&--#{$state} {
				background-color: $color-value;
			}
			}
		}
	}

</style>