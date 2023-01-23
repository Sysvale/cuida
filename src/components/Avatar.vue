<template>
	<cds-clickable :clickable="clickable">
		<div class="avatar__container">
			<div
				:class="avatarContainerClasses"
			>
				<span
					v-if="!src"
					:class="{
						'avatar__initials--sm': size === 'sm',
						'avatar__initials--md': size === 'md',
						'avatar__initials--lg': size === 'lg',
					}"
				>
					{{ computedInitials }}
				</span>
				<img
					v-else
					:src="src"
					:alt="name"
					:class="{
						'avatar__image--sm': size === 'sm',
						'avatar__image--md': size === 'md',
						'avatar__image--lg': size === 'lg',
					}"
				>
			</div>

			<cds-chevron
				v-if="clickable"
				size="sm"
				class="avatar__chevron"
				direction="bottom"
			/>
		</div>
	</cds-clickable>
</template>
<script>
import CdsChevron from './Chevron.vue';
import CdsClickable from './Clickable.vue';

export default {
	components: {
		CdsChevron,
		CdsClickable,
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
		clickable: {
			type: Boolean,
			default: false,
		}
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

		avatarContainerClasses() {
			let className = '';

			switch (this.variant) {
				case 'teal':
					className = 'avatar__container--teal';
					break;
				case 'green':
					className = 'avatar__container--green';
					break;
				case 'blue':
					className = 'avatar__container--blue';
					break;
				case 'indigo':
					className = 'avatar__container--indigo';
					break;
				case 'violet':
					className = 'avatar__container--violet';
					break;
				case 'pink':
					className = 'avatar__container--pink';
					break;
				case 'red':
					className = 'avatar__container--red';
					break;
				case 'orange':
					className = 'avatar__container--orange';
					break;
				case 'amber':
					className = 'avatar__container--amber';
					break;
				case 'gray':
					className = 'avatar__container--gray';
					break;
				case 'white':
					className = 'avatar__container--white';
					break;
				default:
					className = 'avatar__container--gray';
					break;
			}

			switch (this.size) {
				case 'sm':
					className += ' avatar__container--sm';
					break;
				case 'md':
					className += ' avatar__container--md';
					break;
				case 'lg':
					className += ' avatar__container--lg';
					break;
			}

			return className;
		}
	}
}
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

$baseColors: (
	'teal': $ts-400,
	'green': $gp-400,
	'blue': $bn-400,
	'indigo': $in-400,
	'violet': $vr-400,
	'pink': $pp-400,
	'red': $rc-400,
	'orange': $og-400,
	'amber': $al-400,
	'dark': $n-600,
	'white': $n-0,
);

.avatar {
	&__chevron {
		margin: ml(1);
	}

	&__container {
		align-items: center;
		border-radius: $border-radius-circle;
		display: flex;
		justify-content: center;

		@each $colorName, $color in $baseColors {
			&--#{$colorName} {
				background-color: $color;
				color: $n-0;

				@if ($colorName == 'white') {
					color: $n-700;
				} @else {
					color: $n-0;
				}
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
			height: 64px;
			width: 64px;

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
			height: 65px;
			width: 65px;

			@extend .avatar__image;
		}
	}

	&__initials {
		&--sm {
			@include caption;
		}

		&--md {
			@include body-2;
			font-weight: $font-weight-semibold;
		}

		&--lg {
			@include subheading-2;
		}
	}
}
</style>
