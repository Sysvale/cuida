<template>
	<div>
		<div
			class="file-input text-center"
			:class="{
				'file-input--drag-state': isOnDragEnterState,
				'file-input--without-data': !file,
				'file-input--sm': size === 'sm',
				'file-input--md': size === 'md',
				'file-input--lg': size === 'lg',
				'file-input--valid': state === 'valid',
				'file-input--invalid': state === 'invalid' || !isValid,
				'file-input--disabled': disabled === true,
			}"
			@dragover.prevent.stop="isOnDragEnterState = true"
			@dragenter.prevent.stop="isOnDragEnterState = true"
			@dragleave.prevent.stop="isOnDragEnterState = false"
			@dragend.prevent.stop="isOnDragEnterState = false"
			@drop.prevent="dropHandler"
			@click="linkClick"
		>
			<input
				v-show="false"
				ref="fileInput"
				type="file"
				:accept="acceptString"
				@change="handleFormFileChange"
			>

			<div
				v-if="!file"
				class="file-input__container"
			>
				<cds-icon
					name="upload-cloud-outline"
					:class="{
						'icon-upload--sm': size === 'sm',
						'icon-upload--md': size === 'md',
						'icon-upload--lg': size === 'lg',
						'icon-upload--disabled': disabled === true,
					}"
				/>

				<div
					:class="`file-input__title--${size}`"
				>
					<div v-if="!isOnDragEnterState">
						Arraste o arquivo aqui ou
						<a
							href="javascript:void(0)"
							class="file-input__search-link"
							:class="{
								'file-input__search-link--disabled': disabled === true,
							}"
						>
							pesquise no seu dispositivo
						</a>
					</div>

					<div v-else>
						Solte aqui o seu arquivo
					</div>
				</div>
			</div>

			<div
				v-else
				class="file-input__container"
			>
				<div
					v-if="showPreview"
					class="file-input__preview"
					:class="{
						'file-input__preview--sm': size === 'sm',
						'file-input__preview--md': size === 'md',
						'file-input__preview--lg': size === 'lg',
						'file-input__preview--disabled': disabled === true,
					}"
					:style="`background-image: url(${filePreview})`"
				/>

				<cds-icon
					v-if="!showPreview"
					height="24"
					width="24"
					:name="fileIcon"
					:class="{
						'icon-document--sm': size === 'sm',
						'icon-document--md': size === 'md',
						'icon-document--lg': size === 'lg',
						'icon-document--disabled': disabled === true,
					}"
				/>

				<div
					:class="`file-input__title--${size}`"
				>
					<div
						v-if="!isOnDragEnterState"
						class="on-drag-content__container"
						:class="{'on-drag-content__container--disabled': disabled === true}"
					>
						<div class="file-input__text-container">
							<div class="file-input__name">
								<cds-truncate width="250">
									{{ fileName }}
								</cds-truncate>
								{{ fileType }}
							</div>
							<div
								class="file-input__size"
							>
								{{ fileSize }}
							</div>
						</div>
						<div
							class="x-icon__container"
							@click.stop="handleRemove"
						>
							<cds-icon
								height="18"
								width="18"
								name="x-outline"
								class="file-input__close-button"
								:class="{
									'file-input__close-button--sm': size === 'sm',
									'file-input__close-button--md': size === 'md',
									'file-input__close-button--lg': size === 'lg',
									'file-input__close-button--disabled': disabled === true,
								}"
							/>
						</div>
					</div>
					<div v-else>
						Solte aqui o seu arquivo
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		v-if="internalState === 'invalid'"
		class="file-input__alert-container"
	>
		{{ computedAllowedMessage }}
	</div>
</template>

<script>
import isEmpty from 'lodash.isempty';
import CdsIcon from './Icon.vue';
import CdsTruncate from './Truncate.vue';

export default {
	components: {
		CdsIcon,
		CdsTruncate,
	},

	props: {
		/**
		* O conteúdo do arquivo upado.
		*/
		modelValue: {
			type: File,
			default: null,
			required: true,
		},
		/**
		* Lista com extensões de arquivos (separadas por vírgula) as quais o usuário pode selecionar.
		* Ex.: jpg,png
		*/
		allowedExtensions: {
			type: String,
			default: null,
		},
		/**
		* Define o tamanho do input [sm, md, lg]
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		* Mostra pré-visualização de imagens. Funciona apenas com arquivos nos formatos: `.png`, `.jpg` e `.svg`
		*/
		showImagePreview: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica o estado do Select. As opções são 'default', 'valid', 'loading' e 'invalid'.
		*/
		state: {
			type: String,
			default: 'default',
		},
		/**
		* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		*/
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		* Controla a disponibilidade do Select.
		*/
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			file: !!this.modelValue && !isEmpty(this.modelValue) ? this.modelValue : null,
			isOnDragEnterState: false,
			isValid: true,
			internalState: this.state,
			filePreview: null,
		};
	},

	computed: {
		sizeClass() {
			const classesObject = {
				inputTitle: `file-input__title--${this.size}`,
			};

			return classesObject;
		},

		acceptString() {
			if (this.allowedExtensions === null) return null;

			let formated = '';
			const splited = this.allowedExtensions.split(',');

			splited.forEach((item, index, arr) => {
				if (item && item.trim().length > 0) {
					formated += `.${item.trim()}${index !== arr.length - 1 ? ', ' : ''}`;
				}
			});

			return formated;
		},

		computedAllowedMessage() {
			if (this.allowedExtensions) {
				const splited = this.allowedExtensions.split(',');
				const s = splited.length === 1 ? '' : 's';
				const initial = `São aceitos apenas arquivo${s} do${s} seguinte${s} tipo${s}:`;
				return `${initial} ${this.acceptString}.`;
			} else if (this.state === 'invalid') {
				return this.errorMessage;
			}

			return null;
		},

		textAlignmentResolver() {
			return this.size === 'sm' ? 'flex-start' : 'center';
		},

		widthResolver() {
			return !this.file ? 'fit-content' : '100%';
		},

		fileSize() {
			let unit = this.file.size > 1000000 ? 'MB' : 'KB';

			if (unit === 'MB') {
				return `${Number((this.file.size / 1000000 * 0.95).toFixed(2)).toLocaleString('pt-BR')} MB`;

			}

			return `${Number((this.file.size / 1000 * 0.976).toFixed(2)).toLocaleString('pt-BR')} KB`;
		},

		fileType() {
			if (this.file !== null) {
				return this.splitNameAndType()[2];
			}

			return '';
		},

		fileName() {
			if (this.file !== null) {
				return this.splitNameAndType()[1];
			}

			return '';
		},

		showPreview() {
			let extensions = ['.png', '.jpg', '.svg', '.jpeg'];
			return this.showImagePreview && extensions.some(e => e === this.fileType)
		},

		fileIcon() {
			let extensions = ['.png', '.jpg', '.svg', '.jpeg'];
			let isImage = extensions.some(e => e === this.fileType);

			if (isImage) {
				return 'image-outline';
			}

			return 'document-text-outline';
		},

		textContainerResolver() {
			return this.size === 'sm' ? 'flex' : 'block';
		}
	},

	watch: {
		file(newValue) {
			/**
				* Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
			*/
			this.$emit('update:modelValue', newValue);
		},

		state: {
			handler(newValue) {
				this.internalState = newValue;
			},
			immediate: true,
		},

		isValid: {
			handler(newValue) {
				if (newValue) {
					this.internalState = 'invalid';
				} else {
					this.internalState = 'valid';
				}
			},
			immediate: true,
		},
	},

	methods: {
		splitNameAndType() {
			let expression = /(.*)(\..+)/;
			let regexExp = new RegExp(expression, 'gi');

			return regexExp.exec(this.file.name);
		},

		dropHandler(ev) {
			this.isValid = null;
			this.isOnDragEnterState = false;
			// Prevent the browser default behavior (open the file)
			ev.preventDefault();

			if (!ev.dataTransfer.items || ev.dataTransfer.items[0].kind !== 'file') return;

			if (this.disabled) return;

			const internalFile = ev.dataTransfer.items[0].getAsFile();

			if (this.isAValidExtension(internalFile.name)) {
				this.file = internalFile;
				this.isValid = true;
				
				this.loadImage(internalFile);

				return;
			}

			this.isValid = false;
			this.file = null;
		},

		linkClick() {
			if (this.disabled) return;

			this.$refs.fileInput.click();
		},

		isAValidExtension(fileName) {
			if (this.allowedExtensions === null) return true;

			const alloweds = this.allowedExtensions.split(',');
			let uploaded = fileName.split('.');
			uploaded = uploaded[uploaded.length - 1].trim();

			return alloweds.filter((item) => item === uploaded).length > 0;
		},

		loadImage(file) {
			var reader = new FileReader();

			reader.onload = e => {
				this.filePreview = e.target.result;
			}
			
			reader.readAsDataURL(file);
		},

		readURL(input) {
			if (input.files && input.files[0]) {
				this.loadImage(input.files[0]);
			}
		},

		handleFormFileChange(ev) {
			this.isValid = 'invalid';
			const [file] = ev.target.files || {};
			this.readURL(ev.target);

			if (this.isAValidExtension(file.name)) {
				this.file = file;
				this.isValid = true;
				return;
			}

			this.isValid = false;
			this.$nextTick().then(() => {
				this.file = null;
			});
		},

		handleRemove() {
			if (this.disabled) return;
			this.isValid = 'default';
			this.file = null;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.file-input {
	border: 2px dashed $n-40;
	box-sizing: border-box;
	justify-content: space-between;
	container-name: fileInput;
	container-type: inline-size;
	overflow: hidden;

	&--without-data {
		border: 2px dashed $n-40;
		box-sizing: border-box;
		display: flex;
		justify-content: v-bind(textAlignmentResolver) !important;
		overflow: hidden;
	}

	&__preview {
		background-position: center center;
		background-size: cover;
		border-radius: $border-radius-small;
		margin: mr(4);

		&--sm {
			border-radius: $border-radius-extra-small;
			height: 90%;
			max-width: 150px;
			min-width: 80px;
			width: 10%;
		}

		&--md {
			height: 200%;
			max-width: 220px;
			min-width: 150px;
			width: 30%;
		}

		&--lg {
			height: 300%;
			max-width: 300px;
			min-width: 200px;
			width: 30%;
		}
	}

	&__text-container {
		display: v-bind(textContainerResolver);
		gap: spacer(5);
	}

	&__name {
		align-items: center;
		color: $n-700;
		display: flex;
		@include body-1;
		font-weight: $font-weight-semibold;
	}

	&__size {
		color: $n-600;
		margin: mt(1);
		@include body-2;
		font-weight: $font-weight-regular;
	}

	&__container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: v-bind(widthResolver);
	}

	&--disabled {
		border: 2px dashed $n-40 !important;
		color: $n-300;
		cursor: default !important;
	}

	&--valid {
		border: 2px dashed $gp-200;
	}

	&--invalid {
		border: 2px dashed $rc-200;
	}

	&--sm {
		border-radius: $border-radius-small;
		display: flex;
		height: 40px;
		padding: px(2);
	}

	&--md {
		border-radius: $border-radius-small;
		display: flex;
		padding: pTRBL(6, 4, 6, 1);
	}

	&--lg {
		border-radius: $border-radius-small;
		display: flex;
		padding: pTRBL(12, 4, 12, 1);
	}

	&__alert {
		margin: mr(2);

		&-container {
			color: $rc-500;
			margin: mt(2);
			@include caption;
		}
	}

	&__title {
		&--disabled {
			color: $n-300;
			cursor: default !important;
		}

		&--lg {
			align-items: center;
			display: flex;
			margin: ml(2);
			width: 100%;
			@include subheading-2;
		}

		&--md {
			align-items: center;
			display: flex;
			margin: ml(2);
			width: 100%;
			@include subheading-3;
		}

		&--sm {
			align-items: center;
			display: flex;
			margin: ml(2);
			width: 100%;
			@include caption;
		}
	}

	&__search-link {
		color: $bn-400;
		cursor: pointer;
		font-weight: 700;

		&:hover {
			text-decoration: underline;
		}

		&--disabled {
			color: $bn-200 !important;
			cursor: default !important;
		}
		&--disabled:hover {
			text-decoration: none;
		}
	}

	&__close-button {
		color: $bn-400;
		cursor: pointer;
		transition: $hover;

		&--disabled {
			color: $bn-200 !important;
			cursor: default !important;
		}

		&--sm {
			height: 18px;
			width: 18px;
			@extend .file-input__close-button;
		}

		&--md {
			height: 22px;
			width: 22px;
			@extend .file-input__close-button;
		}

		&--lg {
			height: 24px;
			width: 24px;
			@extend .file-input__close-button;
		}

		&:hover {
			color: $bn-500;
			transition: $hover;
		}
	}

	&--drag-state {
		background-color: $n-10;
		border: 2px dashed $n-40;

		&--disabled {
			color: $bn-200 !important;
			cursor: default !important;
		}
	}
}

@container fileInput (max-width: 550px) {
	.file-input__name {
		@include body-2;
		font-weight: $font-weight-semibold;
	}

	.file-input__size {
		@include caption;
		margin-top: 2px;
	}
}

@container fileInput (max-width: 495px) {
	.truncate__container {
		max-width: 150px !important;
	}

	.file-input__preview {
		margin: mr(1)
	}
}

@container fileInput (max-width: 395px) {
	.file-input__size {
		display: none;
	}
}

.icon-document {
	color: $bn-500;

	&--disabled {
		color: $bn-200 !important;
		cursor: default !important;
	}

	&--sm {
		height: 24px;
		width: 24px;
		@extend .icon-document;
	}

	&--md {
		height: 28px;
		width: 28px;
		@extend .icon-document;
	}

	&--lg {
		height: 32px;
		width: 32px;
		@extend .icon-document;
	}
}

.icon-upload {
	color: $bn-500;

	&--disabled {
		color: $bn-200 !important;
		cursor: default !important;
	}

	&--sm {
		height: 24px;
		width: 24px;
		@extend .icon-upload;
	}

	&--md {
		height: 28px;
		width: 28px;
		@extend .icon-upload;
	}

	&--lg {
		height: 32px;
		width: 32px;
		@extend .icon-upload;
	}
}

.on-drag-content__container {
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 100%;

	&--disabled {
		color: $n-300;
		cursor: default !important;
	}
}

.x-icon__container {
	cursor: pointer;
	display: grid;
	padding: px(1);
}
</style>
