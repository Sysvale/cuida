<template>
	<div
		ref="fileViewer"
		class="file-viewer"
		:class="`file-viewer--${variant}`"
		tabindex="0"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@click="handleClick"
		@keyup.esc="handleClose"
	>
		<div class="file-viewer__image">
			<div
				v-if="!isHovered"
				class="file-viewer__extension"
			>
				{{ fileExtension }}
			</div>
			<div
				v-else
				class="file-viewer__icon"
				:class="`file-viewer__icon--${variant}`"
			>
				<CdsIcon
					height="32"
					width="32"
					name="image-outline"
				/>
			</div>
		</div>
		<div class="file-viewer__info">
			<div class="file-viewer__label">
				{{ trimmedLabel }}
			</div>
			<div class="file-viewer__file-name">
				{{ fileUrl }}
			</div>
			<div>
				<a
					class="file-viewer__download"
					:class="`file-viewer__download--${variant}`"
					@click.stop="emit('download-click', true)"
				>
					Baixar arquivo
				</a>
			</div>
		</div>
	</div>
	<div
		v-if="openVisualizer"
		class="file-viewer__backdrop"
	>
		<div class="file-viewer__visualizer-header">
			<div class="file-viewer__visualizer-label">
				{{ trimmedLabel }}
			</div>
			<div class="file-viewer__visualizer-actions">
				<div
					class="file-viewer__visualizer-download"
					@click="emit('download-click', true)"
				>
					<CdsIcon
						height="24"
						width="24"
						name="download-cloud-outline"
					/>
					<span v-if="!isMobile"> Baixar arquivo </span>
				</div>
				<CdsIcon
					class="file-viewer__visualizer-close"
					height="24"
					width="24"
					name="x-outline"
					@click="handleClose"
				/>
			</div>
		</div>
		<div
			class="file-viewer__visualizer-image-container"
			@click="handleClose"
		>
			<CdsImage
				v-if="allowedExtensions.includes(fileExtension)"
				class="file-viewer__visualizer-image"
				:src="fileUrl"
				@click.stop=""
			/>
			<div
				v-else
				class="file-viewer__visualizer-empty-state"
			>
				<CdsImage
					src="https://i.imgur.com/d842Bek.png"
					:width="300"
					:height="300"
				/>
				Não foi possível gerar uma pré-visualização do arquivo.
			</div>
		</div>
	</div>
</template>

<script setup>

defineOptions({ name: 'FileViewer' });

import CdsIcon from '../components/Icon.vue';
import { get, last } from 'lodash';
import { computed, ref } from 'vue';
import { colors } from '../utils/constants/colors';
import CdsImage from '../components/Image.vue';

const emit = defineEmits(
	[
		/**
		* Evento que indica que o backdrop foi fechado.
		* @event close
		* @type {Event}
		*/
		'close',

		/**
		* Evento que indica que a ação de download foi acionada. O componente não implementa a lógica
		* de download. A lógica deve ser implementada pelo desenvolvedor.
		* @event download-click
		* @type {Event}
		*/
		'download-click'
	]
);

const props = defineProps({
	/**
	 * Especifica a label do arquivo. A label deve ter no máximo 50 caracteres.
	 */
	label: {
		type: String,
		required: true,
		default: 'Comprovante de residência',
	},

	/**
	 * Especifica a URL do arquivo. A URL deve conter a extensão do arquivo
	 * para que a pre-visualização seja gerada.
	 */
	fileUrl: {
		type: String,
		required: true,
		default: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
	},

	/**
	 * Especifica a variante de cor do componente.
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'green',
		validator: (value) => colors.find((color) => color.name === value),
	},
})

const isHovered = ref(false);
const openVisualizer = ref(false);
const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

const fileExtension = computed(() => {
	if (props.fileUrl) {
		const fileNameParts = last(props.fileUrl.split('/'));
		const matchedExtension = fileNameParts.match(/\.([A-Za-z]{3,4})/);
		const extension = get(matchedExtension, '1', null);

		if (extension) {
			return extension.toLowerCase();
		}
	}

	return 'file';
})

const trimmedLabel = computed(() => {
	if (props.label.length > 50) {
		return props.label.substring(0, 50);
	}

	return props.label;
})

const handleMouseEnter = () => {
	isHovered.value = true;
}

const handleMouseLeave = () => {
	isHovered.value = false;
}

const handleClick = () => {
	openVisualizer.value = !openVisualizer.value;
	mustDisableExternalScrolls(openVisualizer.value);
}

const handleClose = () => {
	openVisualizer.value = false;
	mustDisableExternalScrolls(openVisualizer.value);
	emit('close', true);
}

const mustDisableExternalScrolls = (value) => {
	document.body.style.overflow = value ? 'hidden' : 'auto';
}

const isMobile = computed(() => {
	return window.matchMedia('(max-width: 450px)').matches;
});

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.file-viewer {
	width: fit-content;
	min-width: 280px;
	max-width: 350px;
	padding: tokens.pa(3);
	border-radius: 12px;
	border: 1px solid tokens.$n-30;
	background: tokens.$n-0;
	display: flex;
	gap: tokens.spacer(3);
	transition: 0.3s ease;

	&:focus {
		outline: none;
	}

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {

				&:hover {
					border: 1px solid $shade-300;
					cursor: pointer;
					transition: 0.3s ease;

				}
		}

	&__image {
		width: 66px;
		height: 66px;
		min-width: 66px;
		background-color: tokens.$n-20;
		border-radius: tokens.$border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__extension {
		@include tokens.body-1;
		color: tokens.$n-700;
		font-weight: tokens.$font-weight-bold;
		justify-items: center;
	}

	&__icon {
		display: flex;
		align-items: center;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				color: $base-color;
			}
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: tokens.spacer(1);
		width: calc(100% - 66px - 12px);
	}

	&__label {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-800;
		width: 100%;
		max-width: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__file-name {
		@include tokens.body-2;
		color: tokens.$n-700;
		width: 100%;
		max-width: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__download {
		@include tokens.body-2;
		cursor: pointer;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $base-color;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	&__backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: tokens.$z-index-modal;
		background: rgba(0,0,0, 0.85);
		animation: ease .3s;
	}

	&__visualizer-header {
		height: 64px;
		width: 100%;
		padding: tokens.pYX(5, 8);
		background-color: rgba(0,0,0, 0.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: tokens.spacer(3);
	}

	&__visualizer-label {
		@include tokens.subheading-2;
		font-weight: tokens.$font-weight-bold;
		color: tokens.$n-0;
		max-width: 1000px;
	}

	&__visualizer-actions {
		display: flex;
		align-items: center;
		gap: tokens.spacer(4);
	}

	&__visualizer-download {
		display: flex;
		align-items: center;
		padding: tokens.pYX(2, 4);
		border-radius: tokens.$border-radius-lil;
		gap: tokens.spacer(2);
		@include tokens.body-1;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-0;
		cursor: pointer;

		&:hover {
			background-color: tokens.$n-900;
		}
	}

	&__visualizer-image-container {
		width: 100%;
		height: 90vh;
		padding: tokens.pa(5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__visualizer-image {
		max-height: 100%;
		object-fit: cover;
	}

	&__visualizer-close {
		cursor: pointer;
		color: tokens.$n-0;
	}

	&__visualizer-empty-state {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		gap: tokens.spacer(3);
		max-width: 250px;
		color: tokens.$n-0;
		@include tokens.subheading-3;
		font-weight: tokens.$font-weight-regular;
	}
}

@media (max-width: 450px) {
	.file-viewer {
		width: 100%;
		max-width: none;

		&__visualizer-label {
			width: 100%;
			max-width: none;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__visualizer-image-container {
			width: 100%;
			max-width: 100%;
			padding: tokens.pa(5);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__visualizer-image {
			max-height: 100%;
			max-width: 100%;
			object-fit: cover;
		}
	}

}

</style>
