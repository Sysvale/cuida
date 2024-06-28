<template>
	<div
		class="file-viewer"
		:class="`file-viewer--${variant}`"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@click="handleClick"
	>
		<div class="file-viewer__image">
			<div
				v-if="!isHovered"
				class="file-viewer__extension"
			>
				.jpg
			</div>
			<div
				v-else
				class="file-viewer__icon"
				:class="`file-viewer__icon--${variant}`"
			>
				<cds-icon
					height="32"
					width="32"
					name="image-outline"
				/>
			</div>
		</div>
		<div class="file-viewer__info">
			<div class="file-viewer__label">
				{{ label }}
			</div>
			<div class="file-viewer__file-name">
				{{ fileName }}
			</div>
			<div
				class="file-viewer__download"
				:class="`file-viewer__download--${variant}`"
			>
				Baixar arquivo
			</div>
		</div>
	</div>
</template>

<script setup>
import CdsIcon from '../components/Icon.vue';
import { ref } from 'vue';
import { colors } from '../utils/constants/colors';

const isHovered = ref(false);

defineProps({
	label: {
		type: String,
		default: 'Arquivo anexado',
	},
	fileName: {
		type: String,
		default: 'nome_do_arquivo.jpg',
	},
	variant: {
		type: String,
		default: 'green',
		validator: (value) => colors.find((color) => color.name === value),
	},
})

const handleMouseEnter = () => {
	isHovered.value = true;
}

const handleMouseLeave = () => {
	isHovered.value = false;
}

const handleClick = () => {
	console.log('clicante');
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.file-viewer {
	width: fit-content;
	min-width: 280px;
	max-width: 350px;
	padding: pa(3);
	border-radius: 12px;
	border: 1px solid $n-30;
	background: $n-0;
	display: flex;
	gap: spacer(3);
	transition: 0.3s ease;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {

				&:hover {
					border: 1px solid $shade-300;
					cursor: pointer;
					transition: 0.3s ease;

				}
		}


	&__image {
		width: 66px;
		height: 66px;
		background-color: $n-20;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__extension {
		@include body-1;
		color: $n-700;
		font-weight: $font-weight-bold;
		justify-items: center;
	}

	&__icon {
		display: flex;
		align-items: center;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				color: $base-color;
			}
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: spacer(1);
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-800;
	}

	&__file-name {
		@include body-2;
		color: $n-700;
		width: 100%;
		max-width: 246px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__download {
		@include body-2;
		cursor: pointer;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $base-color;
		}
	}
}

</style>