<template>
	<modal
		v-model="showModal"
		size="lg"
		:title="title"
		no-footer
		@close="stopCamera"
		@ok="showModal = false"
	>
		<flexbox
			justify="center"
			direction="column"
			gap="3"
		>
			<div class="camera-container">
				<flexbox
					v-if="loading"
					class="camera-container__loading"
					align="center"
					justify="center"
				>
					<spinner
						:variant="variant"
						size="md"
					/>
				</flexbox>
				<div
					v-if="showErrorMessage"
					class="camera-container__failed"
				>
					<flexbox
						align="center"
						gap="2"
					>
						<CdsIcon
							height="26"
							width="26"
							name="warning-outline"
						/>
						<div>{{ errorMessageText }}</div>
					</flexbox>
				</div>
				<img
					v-show="!hasErrorMessage && photoUrl"
					class="camera-container__photo"
					alt="Sua Foto"
					:src="photoUrl"
				>
				<video
					v-show="!hasErrorMessage && !photoUrl"
					ref="videoRef"
					class="camera-container__video"
					playsinline
					autoplay
				/>
			</div>
			<CdsFlexbox
				class="camera-container__feedback-text"
				:class="{ 'camera-container__feedback-text--hidden': !filePhoto }"
				align="center"
			>
				{{ feedbackText }}
			</CdsFlexbox>
			<flexbox
				gap="2"
				class="camera-container__buttons"
			>
				<CdsButton
					v-if="!photoUrl"
					class="camera-container__button"
					size="lg"
					:variant="variant"
					:disabled="!isCameraActive"
					secondary
					@click.prevent="takePhoto"
				>
					{{ takePhotoButtonText }}
				</CdsButton>
				<CdsButton
					v-else
					class="camera-container__button"
					size="lg"
					:variant="variant"
					:disabled="!isCameraActive"
					secondary
					@click.prevent="removePhoto"
				>
					{{ takeAnotherPhotoButtonText }}
				</CdsButton>
				<CdsButton
					class="camera-container__button"
					size="lg"
					:variant="variant"
					:disabled="!photoUrl"
					@click.prevent="savePhoto"
				>
					{{ savePhotoButtonText }}
				</CdsButton>
			</flexbox>
		</flexbox>
		<canvas ref="canvasRef" />
	</modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CdsButton from './Button.vue';
import Flexbox from './Flexbox.vue';
import Modal from './Modal.vue';
import Spinner from './Spinner.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';

defineOptions({ name: 'CdsWebcamModal' });

const emit = defineEmits([
	/**
	* Evento emitido quando o valor do modal é atualizado
	* @event update:model-value
	* @type {Event}
	*/
	'update:model-value',

	/**
	* Evento emitido quando uma foto é salva, o evento retorna um File
	* @event on-take-photo
	* @type {Event}
	*/
	'on-take-photo'
]);

const props = defineProps({
	/**
	 * Valor recebido pelo v-model
	 */
	modelValue: {
		type: Boolean,
		required: true,
	},

	/**
	 * Título do modal do componente
	 */
	title: {
		type: String,
		default: 'Camera',
	},

	/**
	 * Texto de feedback ao tirar uma foto
	 */
	feedbackText: {
		type: String,
		default: 'Foto capturada',
	},

	/**
	 * Texto do botão de tirar uma foto
	 */
	takePhotoButtonText: {
		type: String,
		default: 'Tirar foto',
	},

	/**
	 * Texto do botão de tirar uma outra foto
	 */
	takeAnotherPhotoButtonText: {
		type: String,
		default: 'Tirar outra',
	},

	/**
	 * Texto do botão de salvar uma foto
	 */
	savePhotoButtonText: {
		type: String,
		default: 'Salvar foto',
	},

	/**
	 * Texto da mensagem de erro quando ocorrer um erro ao carregar a câmera
	 */
	errorMessageText: {
		type: String,
		default: 'Erro ao carregar a câmera',
	},

	/**
	 * Variante dos botões e do spinner
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'green',
	},
});

const loading = ref(true);
const videoRef = ref(null);
const canvasRef = ref(null);
const photoUrl = ref(null);
const isCameraActive = ref(false);
const filePhoto = ref(null);
const showModal = ref(false);
const showErrorMessage = ref(false);

const hasErrorMessage = computed(() => loading.value || showErrorMessage.value);

watch(() => props.modelValue, (value) => {
	if (value) {
		setTimeout(() => startCamera(), 100);
	}

	showModal.value = value;
}, { immediate: true });

watch(showModal, (value) => emit('update:model-value', value));

async function startCamera () {
	let stream = null;

	try {
		stream = await navigator.mediaDevices.getUserMedia({ video: true });
		videoRef.value.srcObject = stream;
		isCameraActive.value = true;
	} catch (error) {
		showErrorMessage.value = true;
		console.error('Erro ao acessar a câmera: ' + error.message);
	}

	loading.value = false;
}

function stopCamera() {
	if (videoRef.value && videoRef.value.srcObject) {
		const stream = videoRef.value.srcObject;
		const tracks = stream.getTracks();
		tracks.forEach((track) => track.stop());
		videoRef.value.srcObject = null;
	}

	isCameraActive.value = false;
	loading.value = true;
	removePhoto();
}

function takePhoto() {
	if (!videoRef.value || !canvasRef.value) {
		return
	}

	const canvas = canvasRef.value;
	const context = canvas.getContext('2d');
	canvas.width = videoRef.value.videoWidth;
	canvas.height = videoRef.value.videoHeight;
	context.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);

	canvas.toBlob((blob) => {
		const file = new File([blob], 'captured-photo.png', { type: 'image/png' });
		photoUrl.value = URL.createObjectURL(blob);
		filePhoto.value = file;
	});
}

function removePhoto() {
	photoUrl.value = null;
	filePhoto.value = null;
}

function savePhoto() {
	if (!filePhoto.value) {
		return;
	}

	emit('on-take-photo', filePhoto.value);
	showModal.value = false;
	stopCamera();
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.camera-container {
    width: 100%;
	height: 570px;
    transition: all .3s ease;
    border-radius: 20px;
    border: 2px dashed tokens.$n-40 !important;
	color: tokens.$n-300;
	padding: tokens.pa(2);

	&__feedback-text {
		margin: tokens.my(2);
		color: tokens.$n-600;
		font-style: italic;
		font-weight: tokens.$font-weight-semibold;
		@include tokens.caption;

		&--hidden {
			visibility: hidden;
		}
	}

    &__loading, &__failed {
        height: 450px;
    }

	&__failed {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 700;
		color: tokens.$rc-700;
	}

    &__photo, &__video {
        border-radius: 20px;
    }

	&__buttons {
		width: 100%;
	}

	&__button {
		width: calc(50% - 8px)
	}
}

video, img {
    width: 100%;
}

canvas {
	display: none;
}

</style>
