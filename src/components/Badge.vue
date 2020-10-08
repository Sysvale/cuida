<template>
	<div
		class="badge-container"
		:style="colorCodeMode ? styleVariables : ''"
		:class="!colorCodeMode ? predefinedStyle : ''"
	>
		<div>
			<small class="badge-content">
				{{ content }}
			</small>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * O texto que vai ser mostrado na badge.
		 */
		content: {
			type: String,
			default: 'Conteúdo da badge',
			description: 'The text that will be displayed inside the badge.',
			required: true,
		},
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'purple', 'pink', 'red', 'orange', 'yellow' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
			description: `Variant mode gives 6 predefined badges 
				to work with. Seting this property to 'true',
				you can use 'yellow', 'green', ... 'gray'
				to use the predefined badge styles.`,
		},
	},

	computed: {
		predefinedStyle() {
			let computedStyle = '';
			switch (this.variant) {
				case 'turquoise':
					computedStyle = 'turquoise';
					break;
				case 'green':
					computedStyle = 'green';
					break;
				case 'blue':
					computedStyle = 'blue';
					break;
				case 'purple':
					computedStyle = 'purple';
					break;
				case 'pink':
					computedStyle = 'pink';
					break;
				case 'red':
					computedStyle = 'red';
					break;
				case 'orange':
					computedStyle = 'orange';
					break;
				case 'yellow':
					computedStyle = 'yellow';
					break;
				case 'gray':
					computedStyle = 'gray';
					break;
				default:
					computedStyle = 'gray';
					break;
			}

			return computedStyle;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.badge-container {
	border-radius: 50px !important;
	width: fit-content;
	background-color: var(--bg-color);
	color: var(--color);
	padding: 0px 8px;
}

.badge-content {
	font-weight: 600 !important;
}

.turquoise {
	color: $turquesa-perry-dark-2;
	background-color: $turquesa-perry-light-2;
	border: 1px solid $turquesa-perry-light-1;
}

.green {
	color: $verde-piccolo-dark-2;
	background-color: $verde-piccolo-light-2;
	border: 1px solid $verde-piccolo-light-1;
}

.blue {
	color: $azul-sonic-dark-2;
	background-color: $azul-sonic-light-2;
	border: 1px solid $azul-sonic-light-1;
}

.purple {
	color: $roxo-thanos-dark-2;
	background-color: $roxo-thanos-light-2;
	border: 1px solid $roxo-thanos-light-1;
}

.pink {
	color: $pantera-cor-de-rosa-dark-2;
	background-color: $pantera-cor-de-rosa-light-2;
	border: 1px solid $pantera-cor-de-rosa-light-1;
}

.red {
	color: $vermelho-mario-dark-2;
	background-color: $vermelho-mario-light-2;
	border: 1px solid $vermelho-mario-light-1;
}

.orange {
	color: $laranja-naruto-dark-2;
	background-color: $laranja-naruto-light-2;
	border: 1px solid $laranja-naruto-light-1;
}

.yellow {
	color: $amarelo-pikachu-dark-2;
	background-color: $amarelo-pikachu-light-2;
	border: 1px solid $amarelo-pikachu-light-1;
}

.gray {
	color: $cinza-9;
	background-color: $cinza-2;
	border: 1px solid $cinza-5;
}
</style>
