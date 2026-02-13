<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<div class="legend__container">
				<div
					v-for="legend in localChartData.datasets"
					:key="legend.label"
					class="legend__item"
					@click="handleLegendClick(legend)"
				>
	
					<div
						class="legend__square"
						:style="`background-color: ${legend.backgroundColor}`"
					/>
					<span
						:class="{
							'legend__text--strikethrough' : legend.hidden
						}">
						{{ legend.label }}
					</span>
				</div>
			</div>

			<Doughnut
				ref="radial-bar-chart"
				:key="key"
				:data="localChartData"
				:options="chartOptions"
				@click="clickHandler"
			/>
		</div>
	</span>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

// Registrar todos os elementos necessários do Chart.js
Chart.register(...registerables);

export default {
	name: 'CdsRadialBarChart',
	components: {
		Doughnut,
	},

	props: {
		/**
		* Define o conjunto de dados a serem mostrados no gráfico.
		* O objeto deve conter o parâmetro `name` (para identificar o conjunto de dados)
		* e `datasets`, array de objetos que apresentará `label` (indicar o rótulo do dado) e
		* `data` (array com os valores númericos).
		*/
		data: {
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
		* Personaliza a paleta de cores do gráfico. São 11 variantes implementadas:
		* `green`, `teal`, `turquoise`, `blue`, `indigo`, `violet`, `pink`, `red`, `orange`, `amber`, `gray`, `dark`.
		* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
		*/
		variant: {
			type: String,
			required: true,
			default: 'green',
			validator: (value) => {
				return ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			},
		},
		/**
		* Define o tema do gráfico.
		*/
		theme: {
			type: String,
			required: false,
			default: '',
			validator: (value) => {
				return ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			},
		},
		/**
		* Defina as labels do gráfico
		*/
		labels: {
			type: Array,
			required: true,
			default: () => [],
		},
		/**
		* Defina as cores do gráfico. Essa prop sobrescreve as shades da variante.
		* A prop espera um Array de variantes de cor. Ex.: ['green', 'turquoise']
		*/
		colors: {
			type: Array,
			default: () => [],
			validator: (value) => {
				const variants = ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'];
				return value.every((color) => variants.includes(color));
			},
		},
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {
				datasets: [
					{hidden: false,}
				],
				labels: [],
			},
			localLabels: [],
			palletColors: [],
			themeColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsável por garantir que as cores gray e dark da paleta não serão removidos os dois primeiros elementos
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false, // NOTE: Caso true manterá aspecto de proporção original, caso false, será dimensionado para preencher completamente o contêiner (Isso pode fazer com que o gráfico pareça distorcido se o container tiver proporção de aspecto diferente do gráfico original)
				pieceLabel: {
					mode: 'percentage',
					precision: 1
				},
				// cutout: `${90 - (this.data.length * 15)}%`,
				plugins: {
					legend: {
						display: false,
						labels: {
							usePointStyle: true,
							pointStyle: 'rectRounded',
						},
					},
				}
			},
			key: 0,
			largestValue: 100,
			largestValueDegree: 360 - ((15 / 100) * 360),
		}
	},

	computed: {
		isColorsSet() {
			return this.colors && this.colors.length > 0;
		},

		// NOTE: Função responsável por buscar a cor na paleta
		computedBackgroundColors() {
			return this.colors.map((bgColor) => {
				const palletColor = this.palletColors.find(color => color.variantName.toLowerCase().includes(bgColor));
				if (palletColor) {
					return palletColor.color400;
				}
			});
		},
	},

	watch: {
		labels: {
			handler(newValue) {
				this.localLabels = newValue;
				this.mergeChartDataNoSelect(this.data);
			},
			immediate: true,
		},

		variant: {
			handler(newValue) {
				if (newValue === 'gray' || newValue === 'dark') {
					this.deleteFirstTwoColors = true;
				} else {
					this.deleteFirstTwoColors = false;
				}

				this.mergeChartDataNoSelect(this.data);
			},
			immediate: true,
		},

		theme: {
			handler() {
				this.mergeChartDataNoSelect(this.data);
			},
			immediate: true,
		},

		colors: {
			handler() {
				this.mergeChartDataNoSelect(this.data);
			},
			immediate: true,
		},

		data: {
			handler(newValue) {
				this.mergeChartDataNoSelect(newValue);
			},
			immediate: true,
		},
	},

	mounted() {

		this.data.forEach(item => {
			if (item.datasets[0].data[0] > this.largestValue) {
				this.largestValue = item.datasets[0].data[0];
			}
			
		})

		this.mergeChartDataNoSelect(this.data);
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
		},

		computedCutout() {
			let cutout;
			let length = this.localChartData.datasets.reduce((acc, curr) => {
				return acc + (curr.hidden !== true ? 1 : 0);
			}, 0);

			switch (length) {
				case 1:
					cutout = 82;
					break;
				case 2:
					cutout = 55;
					break;
				case 3:
					cutout = 40;
					break;
				case 4:
					cutout = 30;
					break;
				default:
					cutout = 20;
					break;
			}

			this.localChartData.datasets.forEach(dataset => {
				dataset.cutout = `${cutout}%`;
			});
		},

		themeResolver() {
			this.themeColors = this.paleteBuilder(this.sassColorVariables.chartThemes);
		},

		// NOTE: Função responsável por remover os dois primeiros elementos da paleta para quando não é gray ou Dark Neutrals
		removeFirstTwoElements() {
			for (let i = 0; i < this.palletColors.length; i++) {
				const color = this.palletColors[i];

				if (this.deleteFirstTwoColors === false) {
					color.colorShades.splice(0, 2);
					color.colorTokens.splice(0, 2);
					color.colorData.splice(0, 2);
				}
			}
		},

		

		// NOTE: Função que recebe uma matriz de dados dos gráfico.
		mergeChartDataNoSelect(chartData) {
			const mergedData = { labels: this.localLabels, datasets: [] };

			chartData.forEach(radialBarData => {
				radialBarData.datasets.forEach(state => {
					const dataset = {
						label: state.label,
						data: state.data,
						circumference: (this.largestValueDegree * state.data / this.largestValue),
						borderRadius: 16,
						hidden: false,
					};

					mergedData.datasets.push(dataset);
					this.computedCutout();
					this.key++;
				});
			});

			if (this.theme.length && this.colors.length === 0) {
				this.themeResolver();
				const backgroundColor = this.isColorsSet ? this.computedBackgroundColors : this.generateBackgroundColorWithTheme();
				this.setColors(mergedData.datasets, backgroundColor);
			} else {
				this.palete();
				const backgroundColor = this.isColorsSet ? this.computedBackgroundColors : this.generateBackgroundColor();
				this.setColors(mergedData.datasets, backgroundColor);
			}
	
			this.localChartData = mergedData;
		},

		// NOTE: Função responsável por buscar a cor na paleta
		generateBackgroundColor() {
			const variantLowercase = this.variant.toLowerCase();
			const palletColor = this.palletColors.find(color => color.variantName.toLowerCase().includes(variantLowercase));
			if (palletColor) {
				return palletColor.colorShades;
			}
			return [];
		},

		generateBackgroundColorWithTheme() {
			const variantLowercase = this.theme.toLowerCase();
			const palletColor = this.themeColors.find(color => color.variantName.toLowerCase().includes(variantLowercase));
			if (palletColor) {
				return palletColor.colorShades;
			}
			return [];
		},

		// NOTE: Função responsável por setar backgroundColor
		// Ocorre essa verificação para garantir que o mesmo conjunto de dados para mais de um item selecionado tenha a mesma cor
		setColors(datasets, backgroundColor) {
			const colors = {};

			datasets.forEach(dataset => {
				const objectName = dataset.name;

				if (!colors[objectName]) {
					colors[objectName] = backgroundColor.slice();
				}

				dataset.backgroundColor = colors[objectName].splice(0, dataset.data.length);
				dataset.borderRadius = 16;
			});
		},

		clickHandler(e) {
			const donutChartInstance = this.$refs['radial-bar-chart'].chart;
			const elementClicked = donutChartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)

			const sanitizedChartData = {
				index: elementClicked[0].index,
				data: elementClicked[0].element.$context.raw,
				x: elementClicked[0].element.x,
				y: elementClicked[0].element.y,
				backgroundColor: elementClicked[0].element.$context.element.options.backgroundColor.trim(),
			};
			
			this.$emit('chart-click', sanitizedChartData);
		},

		handleLegendClick(legend) {
			this.localChartData.datasets.forEach(dataset => {
				if (dataset.label === legend.label) {
					dataset.hidden = !dataset.hidden;
				}
			});

			this.computedCutout();
			this.key++;
		}
	}
}
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;
.responsive-container{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.legend {
	&__square {
		height: 16px;
		width: 16px;
		border-radius: 4px;
		outline: 3px solid tokens.$n-0;
	}
	
	&__item {
		display: flex;
		gap: 8px;
		align-items: center;
		@include tokens.caption;
		font-weight: tokens.$font-weight-regular;
		color: tokens.$n-500;
		cursor: pointer;
	}
	
	&__container{
		display: flex;
		gap: 12px;
	}
	
	&__text--strikethrough  {
		text-decoration: line-through;
		text-decoration-thickness: 2px;
	}
}

</style>
