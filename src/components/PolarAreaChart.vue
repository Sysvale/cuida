<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<PolarArea
				:data="localChartData"
				:options="chartOptions"
			/>
		</div>
	</span>
</template>

<script>
import { PolarArea } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

// Registrar todos os elementos necessários do Chart.js
Chart.register(...registerables);


export default {
	name: 'CdsPolarAreaChart',
	components: {
		PolarArea,
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
				return ['green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			}
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
		 * Exibe o nome das labels centralizadas aos dados
		 */
		isVisiblePointNames: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defina o texto a ser exibido para a legenda. Quando definido como verdadeiro
		 * (true), espera-se que exiba o nome do data. Quando definido
		 * como falso (false), será definido o nome do dataset
		*/
		showLabelName: {
			type: Boolean,
			required: true,
			default: true,
		},
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {},
			localLabels: [],
			palletColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsável por garantir que as cores gray e dark da paleta não serão removidos os dois primeiros elementos
			chartOptions: {
				responsive: true,
				scales: {
					r: {
						pointLabels: {
							display: this.isVisiblePointNames,
							centerPointLabels: true,
							font: {
								size: 12
							}
						}
					}
				},
				maintainAspectRatio: false, // NOTE: Caso true manterá aspecto de proporção original, caso false, será dimensionado para preencher completamente o contêiner (Isso pode fazer com que o gráfico pareça distorcido se o container tiver proporção de aspecto diferente do gráfico original)
				pieceLabel: {
					mode: 'percentage',
					precision: 1
				},
				plugins: {
					tooltip: {
						callbacks: {
							beforeTitle: function (context) {
								return `${context[0].dataset.name}`;
							},
						}
					},
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

		data: {
			handler(newValue) {
				this.mergeChartDataNoSelect(newValue);
			},
			immediate: true,
		},

		isVisiblePointNames: {
			handler(newValue) {
				this.chartOptions = {
					...this.chartOptions,
					scales: {
						...this.chartOptions.scales,
						r: {
							...this.chartOptions.scales?.r,
							pointLabels: {
								...this.chartOptions.scales?.r?.pointLabels,
								display: newValue,
							},
						},
					},
				};
			},
			immediate: true,
		},
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
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

		// NOTE: Adiciona campo dataset.name com o nome do objeto respectivo
		addDataSetNames() {
			this.data.forEach(item => {
				item.datasets.forEach(dataset => {
					dataset.name = item.name;
				});
			});
		},

		// NOTE: Função que recebe uma matriz de dados dos gráfico.
		mergeChartDataNoSelect(data) {
			// data.labels = this.localLabels;
			const mergedData = { labels: this.localLabels, datasets: [] };
			this.addDataSetNames();
			data.forEach(obj => {
				obj.datasets.forEach(state => {
					const dataset = {
						label: this.showLabelName ? state.name : state.label,
						data: state.data,
						name: state.name,
						borderRadius: 6,
					};
					mergedData.datasets.push(dataset);
				});
			});
			this.palete();
			const backgroundColor = this.generateBackgroundColor();
			this.setColors(mergedData.datasets, backgroundColor);
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
				dataset.borderRadius = 6;
			});
		},
	}
}
</script>

<style lang="scss" scoped>

.responsive-container{
	width: 100%;
	height: 100%;
}
</style>