<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<Line
				:data="localChartData"
				:options="chartOptions"
			/>
		</div>
	</span>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';
import 'chartjs-adapter-luxon';

// Registrar o elemento "point" no registro (Torna-se necessário para marcações de ponto)
Chart.register(...registerables);

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Line,
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
		* Define os intervalos máximo e mínimo sugeridos para o eixo X.
		* Caso os valores do dataset ultrapassem os intervalos sugeridos, 
		* estes serão desconsiderados, prevalencendo o dataset.
		*/
		xAxisRange: {
			type: Array,
			default: () => [0, 100],
		},
		/**
		* Define os intervalos máximo e mínimo sugeridos para o eixo Y.
		* Caso os valores do dataset ultrapassem os intervalos sugeridos, 
		* estes serão desconsiderados, prevalencendo o dataset.
		*/
		yAxisRange: {
			type: Array,
			default: () => [0, 100],
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
				return ['green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			}
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
		 * Defina o texto a ser exibido para a legenda. Quando definido como verdadeiro
		 * (true), espera-se que exiba o nome do data. Quando definido
		 * como falso (false), será definido o nome do dataset
		*/
		showLabelName: {
			type: Boolean,
			required: true,
			default: true,
		},
		/**
		 * Defina se deve ser aplicado preenchimento ao gráfico.
		*/
		fill: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defina se deve transformar o gráfico de linhas sólidas em linhas tracejadas.
		*/
		isDashed: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defina efeito de linha tracejada. Especificamente, o valor [a, b] define o padrão
		 * de traços da linha, onde `a` representa o comprimento de cada traço sólido e `b`
		 * representa o comprimento de cada espaço entre os traços.
		 */
		borderDash: {
			type: Array,
			default: () => [],
		},
		/**
		 * Defina o nível de suavização das linhas do gráfico.
		 */
		smoothing: {
			type: Number,
			default: 0.3,
		},
		/**
		* Objeto de configuação de animation. O objeto sobrescreve a configuração padrão.
		*/
		scales: {
			type: Object,
			default: () => ({}),
		},
		/**
		* Objeto de configuação de animation. O objeto sobrescreve a configuração padrão.
		*/
		animation: {
			type: Object,
			default: () => ({}),
		},
		/**
		* Objeto de configuação de plugins. O objeto sobrescreve a configuração padrão.
		*/
		plugins : {
			type: Object,
			default: () => ({}),
		}
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {},
			localLabels: [],
			palletColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsável por garantir que as cores gray e dark da paleta não serão removidos os dois primeiros elementos
			chartOptions: {
				interaction: {
					intersect: false,
				},
				scales: {
					x: {
						suggestedMin: this.xAxisRange[0],
						suggestedMax: this.xAxisRange[1],
						display: true,
						title: {
							display: true
						},
					},
					y: {
						suggestedMin: this.yAxisRange[0],
						suggestedMax: this.yAxisRange[1],
						display: true,
						title: {
							display: true,
						},
					},
					...this.scales,
				},
				tension: this.smoothing,
				responsive: true,
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
					...this.plugins,
				},
				fill: this.fill,
				animation: {
					...this.animation,
				}
			},
		}
	},

	watch: {
		labels: {
			handler(newValue) {
				this.localLabels = newValue
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

		isDashed: {
			handler(newValue) {
				if (newValue === true) {
					this.checkDashed();
				}
			},
			immediate: true,
		},
	},

	mounted() {
		console.log('🚀 -> file: LineChart.vue:257 -> this.scales:', this.scales);

		this.chartOptions = {
			...this.chartOptions,
			...this.scales,
		}
		console.log('🚀 -> file: LineChart.vue:256 -> chartOptions:', this.chartOptions);
	},

	methods: {
		paleteBuilder,

		palete() {
			if (this.theme.length) {
				this.palletColors = this.paleteBuilder(this.sassColorVariables.chartThemes);
			} else {
				this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
				this.removeFirstTwoElements();
			}
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
						label: this.showLabelName ? state.name :state.label,
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
		// Para definição da opacidade é aplicado hexadecimal (80 = 50%)
		generateBackgroundColor() {
			let variantLowercase = this.variant.toLowerCase();

			if (this.theme.length) {
				variantLowercase = this.theme.toLowerCase();
			}

			const palletColor = this.palletColors.find(color => {
				return color.variantName.toLowerCase() === variantLowercase
			});

			if (palletColor) {
				if (this.fill) {
					const withOpacity = palletColor.colorShades.map(color => color + '80');
					return withOpacity;
				}
				return palletColor.colorShades;
			}
			return [];
		},

		// NOTE: Função responsável por setar backgroundColor
		// Ocorre essa verificação para garantir que o mesmo conjunto de dados para mais de um item selecionado tenha a mesma cor
		setColors(datasets, backgroundColor) {
			const colors = {};

			datasets.forEach((dataset, index) => {
				const objectName = dataset.name;

				if (!colors[objectName]) {
					colors[objectName] = backgroundColor.slice();
				}

				if (dataset.data.length > 0) {
					dataset.backgroundColor = colors[objectName][index % colors[objectName].length];
					dataset.borderColor = colors[objectName][index % colors[objectName].length];
				}

				dataset.borderRadius = 6;
			});
		},

		checkDashed() {
			this.chartOptions.borderDash = [this.borderDash[0], this.borderDash[1]];
		}
	}
}
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';
.responsive-container{
	width: 100%;
	height: 100%;
}
</style>