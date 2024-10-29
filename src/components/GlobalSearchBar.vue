<template>
	<div
		v-if="modelValue"
		class="global-search-bar"
	>
		<div class="global-search-bar__backdrop">
			<cds-flexbox
				gap="3"
				class="global-search-bar__input"
				align="center"
			>
				<cds-icon
					height="24"
					width="24"
					name="search-outline"
					class="global-search-bar__search-icon"
				/>

				<input
					type="text"
					placeholder="Buscar por nome, CPF ou CNS..."
				>

				<span
					class="global-search-bar__clear"
				>
					Limpar
				</span>
			</cds-flexbox>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CdsIcon from '../components/Icon.vue';
import CdsFlexbox from '../components/Flexbox.vue';

defineProps({
	modelValue: {
		type: Boolean,
		default: false,
		required: false,
	}
})

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.global-search-bar {

	&__backdrop {
		position: fixed;
		padding-top: 170px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: $z-index-modal;
		animation: zoom-in ease .3s;
	}

	&__search-icon {
		color: $n-400;
	}

	&__input {
		width: 70%;
		padding: pa(4);
		background-color: $n-0;
		border-radius: $border-radius-medium;
		border: 1px solid $n-30;
		background-color: $n-0;

		input {
			font-family: 'Satoshi', sans-serif;
			@include subheading-3;
			font-weight: $font-weight-regular;
			color: $n-800;
			border: none;
			flex-grow: 1;

			&:focus {
				outline: none;
			}
		}
	}

	&__clear {
		@include overline;
		font-weight: $font-weight-semibold;
		color: $n-300;
		cursor: pointer;
	}
}
</style>
