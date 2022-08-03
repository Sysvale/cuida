<template>
	<span id="alert">
		<div
			class="alert"
			:class="{
				'alert__container--info': variant === 'info',
				'alert__container--warning': variant === 'warning',
				'alert__container--danger': variant === 'danger',
			}"
		>
			<div class="d-flex">
				<div>
					<ion-icon
						:name="icon"
						:class="{
							'alert__icon--info': variant === 'info',
							'alert__icon--warning': variant === 'warning',
							'alert__icon--danger': variant === 'danger',
						}"
					/>
				</div>

				<span v-if="text.length > 0" class="alert__text">
					{{ text }}
				</span>

				<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
				<span v-else class="alert__text">
					<slot />
				</span>
			</div>

			<div v-if="dismissible" @click="close" class="alert__close-button">
				<ion-icon
					name="close"
					:class="{
						'alert__icon--info': variant === 'info',
						'alert__icon--warning': variant === 'warning',
						'alert__icon--danger': variant === 'danger',
					}"
				/>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * A variante do Alert. São 3 variantes implementadas: 'info', 'warning'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
			required: false,
		},
		/**
		 * O título do alerta. O título também pode ser usado com o slot.
		 */
		text: {
			type: String,
			default: 'Título do AlertCard',
			required: false,
		},
		dismissible: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			isSelected: this.value,
			icon: 'warning',
		};
	},

	methods: {
		close() {
			this.$emit('close');
		},
	},

	watch: {
		variant(value) {
			switch (value) {
				case 'info':
					this.icon = 'information-circle';
					break;
				case 'warning':
					this.icon = 'warning';
					break;
				case 'danger':
					this.icon = 'alert-circle';
					break;
				default:
					this.icon = 'alert-circle';
					break;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#alert .alert {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: pa(4);
	border-radius: $border-radius-extra-small;

	&__container {
		@extend .alert;

		&--info {
			@extend .alert__container;
			outline: 2px solid $bn-100;
			background-color: $bn-50;
			color: $bn-600;
		}

		&--warning {
			@extend .alert__container;
			outline: 2px solid $al-100;
			background-color: $al-50;
			color: $al-700;
		}

		&--danger {
			@extend .alert__container;
			outline: 2px solid $rc-100;
			background-color: $rc-50;
			color: $rc-600;
		}
	}

	&__icon {
		margin: mr(2);

		&--info {
			@extend .alert__icon;
			color: $bn-600;
		}

		&--warning {
			@extend .alert__icon;
			color: $al-700;
		}

		&--danger {
			@extend .alert__icon;
			color: $rc-600;
		}
	}

	&__text {
		@include subheading-3;
		font-weight: $font-weight-medium;
	}

	&__close-button {
		cursor: pointer;
	}
}
</style>
