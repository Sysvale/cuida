<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<Doughnut
				ref="doughnut-chart"
				:data="localChartData"
				:options="chartOptions"
				@click="clickHandler"
			/>
		</div>
	</span>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

export default {
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
			localChartData: {},
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
				plugins: {
					legend: {
						display: true,
						labels: {
							usePointStyle: true,
							pointStyle: 'rectRounded',
						},
					},
				}
			},
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
			},
			immediate: true,
		},

		variant: {
			handler(newValue) {
				if (newValue === 'gray' || newValue === 'dark')  {
					this.deleteFirstTwoColors = true;
				} else {
					this.deleteFirstTwoColors = false;
				}
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
		this.mergeChartDataNoSelect(this.data);
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
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
		mergeChartDataNoSelect(data) {
			const mergedData = { labels: this.localLabels, datasets: [] };
			data.forEach(obj => {
				obj.datasets.forEach(state => {
					const dataset = {
						label: state.label,
						data: state.data,
						name: state.name,
						borderRadius: 5,
					};
					mergedData.datasets.push(dataset);
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
				dataset.borderRadius = 5;
			});
		},

		clickHandler(e) {
			const donutChartInstance = this.$refs['doughnut-chart'].chart;
			const elementClicked = donutChartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
			
			const sanitizedChartData = {
				index: elementClicked[0].index,
				data: elementClicked[0].element.$context.raw,
				x: elementClicked[0].element.x,
				y: elementClicked[0].element.y,
				backgroundColor: elementClicked[0].element.$context.element.options.backgroundColor.trim(),
			};
			
			this.$emit('chart-click', sanitizedChartData);
		}
	}
}
</script>

<style lang="scss" scoped>

.responsive-container{
	width: 100%;
	height: 100%;
}
</style>