<!-- eslint-disable vue/multi-word-component-names -->
<template> 
	<div
		v-if="localSelect"
		id="cds-multiselect"
	>	
		<cds-multiselect
			v-bind="field"
			v-model="selectedOptions"
			:value="value"
			:options="multiOptions"
			:label="label"
			:options-field="options.name"
			@input="handleSelectedValues"
		/>
	</div>
	<div id="teste">
		<h1>TESTE</h1>
	</div>
	<div
		id="cds-chart"
	>
		<Bar
			:is="chartType"
			v-if="localChartType === 'bar'"
			:data="computedDataSet"
			:options="chartOptions"
		/>
		<Line
			:is="chartType"
			v-else-if="localChartType === 'line'"
			:data="computedDataSet"
			:options="chartOptions"
		/>
		<Pie
			:is="chartType"
			v-else-if="localChartType === 'pie'"
			:data="computedDataSet"
			:options="chartOptions"
		/>
		<Doughnut
			:is="chartType"
			v-else-if="localChartType === 'doughnut'"
			:data="computedDataSet"
			:options="chartOptions"
		/>
		<PolarArea
			:is="chartType"
			v-else-if="localChartType === 'polarArea'"
			:data="computedDataSet"
			:options="chartOptions"
		/>
		<Radar
			:is="chartType"
			v-else-if="localChartType === 'radar'"
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
			type: Array,
			required: true,
			default: () => [
				{
					datasets: [
						{
							label: 'teste',
							data: [],
						}
					]
				}
			]
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
			predefinedColors: [
				{
					name: 'random',
				},
				{
					name: 'green',
					pallet: ['$gp-50', '$gp-100', '$gp-200', '$gp-300', '$gp-400', '$gp-500', '$gp-600', '$gp-700']
				},
				{
					name: 'turquoise',
					pallet: ['$ts-50', '$ts-100', '$ts-200', '$ts-300', '$ts-400', '$ts-500', '$ts-600', '$ts-700']
				},
				{
					name: 'blue',
					pallet: ['$bn-50', '$bn-100', '$bn-200', '$bn-300', '$bn-400', '$bn-500', '$bn-600', '$bn-700']
				},
				{
					name: 'indigo',
					pallet: ['$in-50', '$in-100', '$in-200', '$in-300', '$in-400', '$in-500', '$in-600', '$in-700']
				},
				{
					name: 'violet',
					pallet: ['$vr-50', '$vr-100', '$vr-200', '$vr-300', '$vr-400', '$vr-500', '$vr-600', '$vr-700']
				},
				{
					name: 'pink',
					pallet: ['$pp-50', '$pp-100', '$pp-200', '$pp-300', '$pp-400', '$pp-500', '$pp-600', '$pp-700']
				},
				{
					name: 'red',
					pallet: ['$rc-50', '$rc-100', '$rc-200', '$rc-300', '$rc-400', '$rc-500', '$rc-600', '$rc-700']
				},
				{
					name: 'orange',
					pallet: ['$og-50', '$og-100', '$og-200', '$og-300', '$og-400', '$og-500', '$og-600', '$og-700']
				},
				{
					name: 'amber',
					pallet: ['$al-50', '$al-100', '$al-200', '$al-300', '$al-400', '$al-500', '$al-600', '$al-700']
				},
				{
					name: 'light',
					pallet: ['$n-0', '$n-10', '$n-20', '$n-30', '$n-40']
				},
				{
					name: 'mid',
					pallet: ['$n-50', '$n-100', '$n-200', '$n-300', '$n-400']
				},
				{
					name: 'dark',
					pallet: ['$n-500', '$n-600', '$n-700', '$n-800', '$n-900']
				},
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
		}
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
			if (selectedValues !== null) {
				const newData = selectedValues.map(selected => {
					const option = this.options.find(element => element.name === selected.value);
					option.chartData.datasets.forEach(dataset => {
						const label = dataset.label;
						console.log(label); // Imprime cada rótulo individualmente
					});
					if (option) {
						console.log(option.chartData.datasets.length)
						const backgroundColor = this.generateBackgroundColor(selectedValues);
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
		generateBackgroundColor(selectedValues) {
			if (selectedValues.length === 1) {
				return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
			} else {
				return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
			}
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
		'--green': (
			'active': $gp-400,
			'disabled': $gp-300,
		),
		'--blue': (
			'active': $bn-400,
			'disabled': $bn-300,
		),
		'--indigo': (
			'active': $in-400,
			'disabled': $in-300,
		),
		'--violet': (
			'active': $vr-400,
			'disabled': $vr-300,
		),
		'--pink': (
			'active': $pp-400,
			'disabled': $pp-300,
		),
		'--red': (
			'active': $rc-400,
			'disabled': $rc-300,
		),
		'--orange': (
			'active': $og-400,
			'disabled': $og-300,
		),
		'--amber': (
			'active': $al-400,
			'disabled': $al-300,
		),
		'--dark': (
			'active': $n-700,
			'disabled': $n-500,
		),
	);

</style>