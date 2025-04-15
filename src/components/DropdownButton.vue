<template>
	<div>
		<cds-button
			:id="id"
			:variant="variant"
			:size="size"
			:text="text"
			:secondary="secondary"
			:ghost="ghost"
			@click="activeSelection"
		>
			<template #append>
				<cds-chevron
					animate
					size="sm"
					:light="!secondary && !ghost"
					:direction="isActive ? 'bottom' : 'top'"
				/>
			</template>
		</cds-button>

		<div
			v-if="isActive"
			ref="dropdownRef"
			:style="dynamicStyle"
			class="dropdown-button__dropdown"
		>
			<div
				v-for="(item, index) in items"
				:key="index"
			>
				<!--
					Evento emitido quando as ações do Dropdown são clicadas.
					@event action-click
					@type {Event}
				-->
				<div
					class="dropdown__container"
					@click="handleOptionClick(item.name, index)"
				>
					<cds-icon
						class="dropdown__icon"
						height="22"
						width="22"
						:name="item.icon"
					/>
					<span class="dropdown__text">{{ item.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CdsButton from './Button.vue';
import CdsChevron from './Chevron.vue';
import CdsIcon from './Icon.vue';

export default {
	components: {
		CdsButton,
		CdsIcon,
		CdsChevron,
	},

	props: {
		/**
		* Define a lista dos itens do DropdownButton a serem
		* mostrados. Os itens da lista devem ser
		* objetos com path ou route, e com uma label
		*/
		items: {
			type: Array,
			default: () => ([]),
			required: true,
		},
		/**
		* A variante do DropdownButton . São 9 variantes: 'turquoise', 'green', 'blue',
		* 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		*/
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		* Especifica se a versão do DropdownButton é a secundária. Essa propriedade tem
		* maior prevalência que a prop `variant`.
		*/
		secondary: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica se o componente deve ser exibido na sua versão ghost.
		*/
		ghost: {
			type: Boolean,
			default: false,
		},
		/**
		* Conteúdo do Dropdown.
		*/
		text: {
			type: String,
			default: 'Conteúdo',
			required: true,
		},
		/**
		* Controla o tamanho do popover do Dropdown (em pixels).
		* O tamanho nunca é menor que a largura do botão.
		*/
		dropdownWidth: {
			type: Number,
			default: 0,
		},
		/**
		 * Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
			validator(value) {
				return ['sm', 'md', 'lg'].includes(value);
			},
		},
	},

	data() {
		return {
			id: null,
			isActive: false,
		};
	},

	computed: {
		dynamicStyle() {
			const filterPillDomReference = document.getElementById(this.id);

			if (!filterPillDomReference) {
				return null;
			}

			const filterWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);

			if (filterWidth > this.dropdownWidth) {
				return {
					'--width': `${filterWidth}px`,
				};
			}

			return {
				'--width': `${this.dropdownWidth}px`,
			};
		},
	},

	mounted() {
		this.id = `dropdown-button$-${this._uid}`;

		document.querySelector('body').addEventListener('click', this.closeDropdownButton);
	},

	methods: {
		activeSelection() {
			if (this.disabled) {
				return;
			}

			this.isActive = !this.isActive;

			/**
			* Evento que indica que o DropdownButton foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('button-click', true);
		},

		hide() {
			this.isActive = !this.isActive;
		},

		handleOptionClick(actionName, index) {
			this.isActive = !this.isActive;
			this.$emit('action-click', [actionName, index]);
		},

		closeDropdownButton(event) {
			if (
				this.$refs.dropdownRef
				&& !this.$refs.dropdownRef.contains(event.target)
				&& this.$refs.dropdownButtonRef
				&& !this.$refs.dropdownButtonRef.contains(event.target)
			) {
				this.hide();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.dropdown-button {
	&__dropdown {
		min-width: var(--width);
		background-color: $n-0;
		padding: pa(2);
		border-radius: $border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba($n-900, .08);
		outline: 1px solid $n-30;
		z-index: 999999999;
		color: $n-700;
		position: absolute;
		margin: mt(2);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
}

.dropdown {
	&__container {
		display: flex;
		gap: 12px;
		align-items: center;
		cursor: pointer;
		border-radius: 6px;
		padding: pa(2);

		&:hover {
			background-color: $n-20;
		}
	}

	&__text {
		color: $n-600;
		@include body-2;
		padding: py(1)
	}

	&__icon {
		color: $n-600;
	}
}

</style>
