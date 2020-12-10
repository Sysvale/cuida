<template>
	<div
		class="expansion-card"
		:class="expansionCardContainerStyle"
		@mouseover="!isExpanded ? toggleCardStyle('hover') : null"
		@mouseleave="!isExpanded ? toggleCardStyle() : null"
		@click.self="isHovering ? toggleCardStyle('expand') : null"
	>
		<div
			v-if="isHovering"
			class="expansion-card__expand-icon"
			@click="toggleCardStyle('expand')"
		>
			<b-icon-arrows-angle-expand />
		</div>
		<div
			v-if="isExpanded"
			class="expansion-card__contract-icon"
			@click="toggleCardStyle('contract')"
		>
			<b-icon-arrows-angle-contract />
		</div>
		<!--  -->
	</div>
</template>

<script>
import {
	BIcon,
	BIconArrowsAngleExpand,
	BIconArrowsAngleContract
} from 'bootstrap-vue';

export default {
	props: {
		/**
		 * Variante do ExpansionCard. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'purple', 'pink', 'red', 'orange', 'yellow' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
	},

	components: {
		BIcon,
		BIconArrowsAngleContract,
		BIconArrowsAngleExpand,
	},

	data() {
		return {
			isHovering: false,
			isExpanded: false,
		};
	},

	computed: {
		expansionCardContainerStyle() {
			let dynamicClass = this.variantStyle;

			if (this.isHovering) {
				dynamicClass += ' expansion-card--hover';	
			}
			if (this.isExpanded) {
				dynamicClass += ' expansion-card--expanded';	
			}

			return dynamicClass;
		},

		variantStyle() {
			switch (this.variant) {
				case 'turquoise':
					return 'expansion-card--turquoise';
				case 'green':
					return 'expansion-card--green';
				case 'blue':
					return 'expansion-card--blue';
				case 'purple':
					return 'expansion-card--purple';
				case 'pink':
					return 'expansion-card--pink';
				case 'red':
					return 'expansion-card--red';
				case 'orange':
					return 'expansion-card--orange';
				case 'yellow':
					return 'expansion-card--yellow';
				case 'gray':
				default:
					return 'expansion-card--gray';
			}
		},
	},

	methods: {
		toggleCardStyle(status) {
			this.isHovering = false;

			switch(status) {
			case 'hover':
				if (!this.isExpanded) {
					this.isHovering = true;
				}
				break;
			case 'expand':
			case 'contract':
				this.isExpanded = !this.isExpanded;
				this.$emit('expanded', this.isExpanded);
				break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.expansion-card {
	display: flex;
	align-items: center;
	@include padding(onidirecional, 3);
	border-radius: 16px;

	border: 1px solid $cinza-3;
	min-height: 130px;
	width: 255px;
	height: 130px;

	&--hover {
		transition: transform .2s;
		transform: scale(1.035);
		cursor: pointer;

		&.expansion-card {
			&--blue {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $azul-sonic-light-2;
				box-shadow: 0 0 2px $azul-sonic-base;
			}

			&--turquoise {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $turquesa-perry-light-2;
				box-shadow: 0 0 2px $turquesa-perry-base;
			}

			&--green {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $verde-piccolo-light-2;
				box-shadow: 0 0 2px $verde-piccolo-base;
			}

			&--purple {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $roxo-thanos-light-2;
				box-shadow: 0 0 2px $roxo-thanos-base;
			}

			&--pink {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $pantera-cor-de-rosa-light-2;
				box-shadow: 0 0 2px $pantera-cor-de-rosa-base;
			}

			&--red {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $vermelho-mario-light-2;
				box-shadow: 0 0 2px $vermelho-mario-base;
			}

			&--orange {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $laranja-naruto-light-2;
				box-shadow: 0 0 2px $laranja-naruto-base;
			}

			&--yellow {
				transition: box-shadow .2s ease-in-out;
				border: 1px solid $amarelo-pikachu-light-2;
				box-shadow: 0 0 2px $amarelo-pikachu-base;
			}

			&--gray {
				transition: box-shadow .2s ease-in-out;
				box-shadow: 0 0 2px $cinza-5;
			}
		}
	}

	&--expanded {
		transition: all .2s linear;
		width: 100%;
		height: auto;
	}

	&__expand-icon {
		display: flex;
		align-self: flex-start;
		margin-left: auto;
		color: $cinza-5;
	}

	&__contract-icon {
		@extend .expansion-card__expand-icon;

		& .b-icon {
			cursor: pointer;
		}
	}
}
</style>
