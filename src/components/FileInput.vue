<template>
	<div>
		<div
			class="file-input text-center"
			:class="{
				'file-input--drag-state': isOnDragEnterState,
				'file-input--sm': size === 'sm',
				'file-input--md': size === 'md',
				'file-input--lg': size === 'lg',
				'file-input--valid': state === 'valid',
				'file-input--invalid': state === 'invalid' || !isValid,
				[sizeClass.holderPadding]: size,
			}"
			@dragover.prevent.stop="isOnDragEnterState = true"
			@dragenter.prevent.stop="isOnDragEnterState = true"
			@dragleave.prevent.stop="isOnDragEnterState = false"
			@dragend.prevent.stop="isOnDragEnterState = false"
			@drop="dropHandler"
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
				class="icon-p-text"
			>
				<cds-icon
					name="upload-cloud-outline"
					:class="{
						'icon-upload--sm': size === 'sm',
						'icon-upload--md': size === 'md',
						'icon-upload--lg': size === 'lg',
						[sizeClass.holderPadding]: size,
					}"
				/>
	
				<div
					:class="{
						[sizeClass.inputTitle]: size,
						[sizeClass.contentPadding]: size,
					}"
				>
					<div v-if="!isOnDragEnterState">
						Arraste o arquivo aqui ou
						<a
							href="javascript:void(0)"
							class="file-input__search-link"
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
				class="icon-p-text"
			>
				<cds-icon
					height="24"
					width="24"
					name="document-text-outline"
					:class="{
						'icon-document--sm': size === 'sm',
						'icon-document--md': size === 'md',
						'icon-document--lg': size === 'lg',
					}"
				/>

				<div
					:class="{
						[sizeClass.inputTitle]: size,
						[sizeClass.contentPadding]: size,
					}"
				>
					<div
						v-if="!isOnDragEnterState"
						class="df"
					>
						<div>{{ file.name }}</div>
						<div
							class="df2"
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

export default {
	components: {
		CdsIcon,
	},
	props: {
		/**
		 * O conteúdo do arquivo upado.
		 */
		modelValue: {
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
		 * Define o tamanho do input [lg, md, sm]
		 */
		size: {
			type: String,
			default: 'md',
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
	},

	data() {
		return {
			file: !!this.modelValue && !isEmpty(this.modelValue) ? this.modelValue : null,
			isOnDragEnterState: false,
			isValid: true,
			internalState: this.state,
		};
	},

	computed: {
		sizeClass() {
			const classesObject = {
				inputTitle: `file-input__title--${this.size}`,
				holderPadding: 'px-3',
				wrapperPadding: 'px-1 py-1',
				contentPadding: 'mt-3',
				svgScale: 1,
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
		dropHandler(ev) {
			this.isValid = null;
			this.isOnDragEnterState = false;

			// Prevent the browser default behavior (open the file)
			ev.preventDefault();

			if (!ev.dataTransfer.items || ev.dataTransfer.items[0].kind !== 'file') return;

			const internalFile = ev.dataTransfer.items[0].getAsFile();

			if (this.isAValidExtension(internalFile.name)) {
				this.file = internalFile;
				this.isValid = true;
				return;
			}

			this.isValid = false;
			this.file = null;
		},

		linkClick() {
			// A lot of nested operations are needed because b-form-file wraps the input tag with a div
			this.$refs.fileInput.click();
		},

		isAValidExtension(fileName) {
			if (this.allowedExtensions === null) return true;
			
			const alloweds = this.allowedExtensions.split(',');
			let uploaded = fileName.split('.');
			uploaded = uploaded[uploaded.length - 1].trim();

			return alloweds.filter((item) => item === uploaded).length > 0;
		},

		handleFormFileChange(ev) {
			this.isValid = null;
			const [file] = ev.target.files || {};

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
			this.isValid = null;
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

	&--valid {
		border: 2px dashed $gp-200;
	}
	
	&--invalid {
		border: 2px dashed $rc-200;
	}

	&--sm {
		height: 40px;
		border-radius: $border-radius-small;
		display: flex;
		padding: px(2);
	}

	&--md {
		padding: pYX(6, 4);
		border-radius: $border-radius-small;
		display: flex;
	}

	&--lg {
		padding: pYX(12, 12);
		border-radius: $border-radius-small;
		display: flex;
	}

	&__alert {
		margin: mr(2);

		&-container {
			@include caption;
			margin: mt(2);
			color: $rc-500;
		}
	}

	&__title {
		&--lg {
			margin: ml(2);
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			@include subheading-2;
		}

		&--md {
			margin: ml(2);
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			@include subheading-3;
		}

		&--sm {
			margin: ml(2);
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			@include caption;
		}
	}

	&__search-link {
		color: $bn-400;
		font-weight: 700;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}

	&__close-button {
		color: $bn-400;
		cursor: pointer;

		&--sm {
			@extend .file-input__close-button;
			height: 18px;
			width: 18px;
		}

		&--md {
			@extend .file-input__close-button;
			height: 22px;
			width: 22px;
		}

		&--lg {
			@extend .file-input__close-button;
			height: 24px;
			width: 24px;
		}
	}

	&--drag-state {
		background-color: $n-10;
		border: 2px dashed $n-40;
	}
}

.icon-document {
	color: $bn-500;

	&--sm {
		@extend .icon-document;
		height: 24px;
		width: 24px;
	}

	&--md {
		@extend .icon-document;
		height: 28px;
		width: 28px;
	}

	&--lg {
		@extend .icon-document;
		height: 32px;
		width: 32px;
	}
}

.icon-upload {
	color: $bn-500;

	&--sm {
		@extend .icon-upload;
		height: 24px;
		width: 24px;
	}

	&--md {
		@extend .icon-upload;
		height: 28px;
		width: 28px;
	}

	&--lg {
		@extend .icon-upload;
		height: 32px;
		width: 32px;
	}
}

.icon-p-text {
	display: flex;
	align-items: center;
	width: 100%;
}

.df {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.df2 {
	padding: px(1);
	cursor: pointer;
	display: grid;
}
</style>
