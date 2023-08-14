<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span id="cds-bar-chart">
		<div
			v-if="localSelect"
			id="cds-multiselect"
		>	
			<cds-multiselect
				v-model="selectedValues"
				:options="multiOptions"
				:label="label"
				:options-field="options.name"
				@input="handleSelectedValues"
			/>
		</div>
		<div
			class="responsive-container"
		>
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
import paleteBuilder from '../utils/methods/paleteBuilder.js';

// Registrar o elemento "point" no registro (Torna-se necessário para Line e Pie que necessita de marcações de ponto)
Chart.register(...registerables);
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
	components: {
		Bar,
		CdsMultiselect,
	},
	props: {
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
		 * `green`,`turquoise`, `blue`, `indigo`, `violet`, `pink`, `red`, `orange`, `amber`, `mid`, `dark`.
		 */
		variant: {
			type: String,
			required: true,
			default: 'green',
			validator: (value) => {
				return ['green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'mid', 'dark'].includes(value);
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
         * Ativa ou desativa o componente multiselect. Quando definido como verdadeiro (true), espera-se que 'chartData' seja uma lista de objetos. Quando definido como falso (false), espera-se apenas um objeto.
         */
		withSelect: {
			type: Boolean,
			default: true
		},
		/**
         * Label do MultiSelect.
         */
		selectLabel: {
			type: String,
			default: 'Label'
		},
		/**
         * Configura a porcentagem ocupada pela barra do gráfico. (0.1-1).
         */
		barWidth: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			sassColorVariables,
			chartInstance: null,
			localChartData: {},
			localLabels: [],
			palletColors: [],
			localSelect: '',
			label: '', // NOTE: Label do multiselect
			options: [], // NOTE: Options do multiselect
			selectedValues: [],
			deleteFirstTwoColors: false, //NOTE: Responsável por garantir que as cores mid e dark da paleta não serão removidos os dois primeiros elementos
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false, // NOTE: Caso true manterá aspecto de proporção original, caso false, será dimensionado para preencher completamente o contêiner (Isso pode fazer com que o gráfico pareça distorcido se o container tiver proporção de aspecto diferente do gráfico original)
				categoryPercentage: null, //NOTE: Configura a porcentagem ocupada pela barra do gráfico. (0-1)
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
			if (Array.isArray(this.data)) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.multiOptions[0].isSelected = true;
				const selectedOption = {
					value: this.multiOptions[0].value,
				};
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.selectedValues = [selectedOption];
				return this.localChartData;
			}
			return this.data;
		},
	},

	watch: {
		withSelect: {
			handler(newValue) {
				this.localSelect = newValue;
			},
			immediate: true,
		},

		selectLabel: {
			handler(newValue) {
				this.label = newValue
			},
			immediate: true,
		},

		data: {
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

		selectedValues: {
			handler(newValue) {
				this.handleSelectedValues(newValue);
			},
			deep: true,
			immediate: true,
		},

		labels: {
			handler(newValue) {
				this.localLabels = newValue
			},
			immediate: true,
		},

		barWidth: {
			handler(newValue) {
				if (newValue >= 0.1 && newValue <= 1) {
					this.chartOptions.categoryPercentage = newValue;
				} else {
					this.chartOptions.categoryPercentage = 1;
				}
			},
			immediate: true,
		},

		variant: {
			handler(newValue) {
				if (newValue === 'mid' || newValue === 'dark')  {
					this.deleteFirstTwoColors = true;
				} else {
					this.deleteFirstTwoColors = false;
				}
			},
			immediate: true,
		},
	},

	mounted() {
		this.addDataSetNames();
		this.palete();
	},

	created() {
		if (this.withSelect && this.multiOptions.length > 0) {
			this.multiOptions[0].isSelected = true;
			const selectedOption = {
				value: this.multiOptions[0].value,
			};
			this.selectedValues = [selectedOption];
		} else {
			this.selectedValues = [];
		}
		this.typeOfData(this.data);
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
		},

		// NOTE: Função responsável por remover os dois primeiros elementos da paleta para quando não é Mid ou Dark Neutrals
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

		// NOTE: Verifica o tipo de dado que está sendo inserido
		typeOfData(chartData) {
			if (!Array.isArray(chartData) && !this.localSelect) {
				// Redireciona para a função de merge do objeto quando o multiselect está desativado
				this.mergeChartDataNoSelect(chartData);
			}
		},

		// NOTE: Responsável por lidar com os valores selecionados do multiselect, mapeando cada valor para encontrar os dados correspondentes nas opções disponíveis;
		// Em seguida define setColors para atribuir as cores dos datasets das opções selecionadas;
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

		// NOTE: Função responsável por buscar a cor na paleta
		generateBackgroundColor() {
			const variantLowercase = this.variant.toLowerCase();
			const palletColor = this.palletColors.find(color => color.colorName.toLowerCase().includes(variantLowercase));
			if (palletColor) {
				return palletColor.colorShades;
			}
			return [];
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

.responsive-container{
    width: 100%;
    height: 100%;
}
</style>