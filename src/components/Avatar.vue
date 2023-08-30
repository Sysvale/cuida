<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<cds-clickable
		id="avatar-dropdown"
		:clickable="clickable"
		@click="toggleDropdown"
	>
		<div class="avatar__container">
			<div
				:class="`avatar__container--${variant} avatar__container--${size}`"
			>
				<span
					v-if="!src"
					:class="`avatar__initials--${size}`"
				>
					{{ computedInitials }}
				</span>

				<img
					v-else
					:src="src"
					:alt="name"
					:class="`avatar__image--${size}`"
				>
			</div>

			<cds-chevron
				v-if="clickable"
				size="sm"
				class="avatar__chevron"
				direction="bottom"
			/>
		</div>

		<cds-popover
			v-model="showPopover"
			target-id="avatar-dropdown"
			width="180"
			right-aligned
			vertical-fluid
		>
			<slot name="dropdown-content" />
		</cds-popover>
	</cds-clickable>
</template>
<script>
import CdsChevron from './Chevron.vue';
import CdsClickable from './Clickable.vue';
import CdsPopover from './Popover.vue';

export default {

	components: {
		CdsChevron,
		CdsClickable,
		CdsPopover
	},

	props: {
		/**
		 * A variante de cor. São 10 variantes implementadas: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange','amber' e 'white'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Especifica o tamanho do avatar. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * src da imagem do avatar. Tem prioridade maior que as props de iniciais de nome.
		 */
		src: {
			type: String,
			default: '',
		},
		/**
		 * Recebe as iniciais do usuário cujas informações vão ser mostradas no Avatar.
		 * As iniciais são exibidas apenas quando nenhuma imagem é especificada.
		 */
		initials: {
			type: String,
			default: null,
		},
		/**
		 * Recebe o nome do usuário cujas informações vão ser mostradas no Avatar.
		 * Do nome são extraídas as duas primeiras iniciais para exibição no componente
		 * quando nenhuma imagem é especificada.
		 */
		name: {
			type: String,
			default: null,
		},
		/**
		 * Ativa ou desativa o clique no componente
		 */
		clickable: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			showPopover: false,
		};
	},

	computed: {
		computedInitials() {
			if (this.initials) {
				return this.initials;
			}

			if (this.name) {
				return this.name.replace(/(\S+)(\s*)/gi, (p1) => p1[0].toUpperCase()).slice(0, 2);
			}

			return 'UND';
		},
	},

	methods: {
		toggleDropdown() {
			if (!this.clickable) {
				return;
			}
			this.showPopover = !this.showPopover;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.avatar {
	&__chevron {
		margin: ml(1);
	}

	&__container {
		align-items: center;
		border-radius: $border-radius-circle;
		display: flex;
		justify-content: center;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;

			@if ($color-name == 'white' or $color-name == 'gray') {
				color: $n-700;
			} @else {
				color: $n-0;
			}
		}

		&--sm {
			height: 28px;
			width: 28px;

			@extend .avatar__container;
		}

		&--md {
			height: 36px;
			width: 36px;

			@extend .avatar__container;
		}

		&--lg {
			height: 44px;
			width: 44px;

			@extend .avatar__container;
		}
	}

	&__image {
		clip-path: circle(50%);
		object-fit: cover;

		&--sm {
			height: 29px;
			width: 29px;

			@extend .avatar__image;
		}

		&--md {
			height: 37px;
			width: 37px;

			@extend .avatar__image;
		}

		&--lg {
			height: 45px;
			width: 45px;

			@extend .avatar__image;
		}
	}

	&__initials {
		&--sm {
			@include caption;
		}

		&--md {
			@include caption;
			font-weight: $font-weight-semibold;
		}

		&--lg {
			@include subheading-2;
		}
	}
}
</style>
