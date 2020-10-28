<template>
	<div
		class="upload-input text-center"
		:class="{
			'upload-input--drag-state': isOnDragEnterState,
			[sizeClass.holderPadding]: size,
		}"
		@dragover.prevent.stop="isOnDragEnterState = true"
		@dragenter.prevent.stop="isOnDragEnterState = true"
		@dragleave.prevent.stop="isOnDragEnterState = false"
		@dragend.prevent.stop="isOnDragEnterState = false"
		@drop="dropHandler"
	>
		<div class="text-center" :class="sizeClass.wrapperPadding">
			<b-form-file
				v-show="false"
				v-model="file"
				:accept="acceptString"
				ref="fileInput"
				@change="handleFormFileChange"
			/>
			<div v-if="!file">
				<svg :style="`transform: scale(${sizeClass.svgScale})`" width="103" height="96" viewBox="0 0 103 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M43.6196 87.2393C67.7101 87.2393 87.2393 67.7101 87.2393 43.6196C87.2393 19.5292 67.7101 0 43.6196 0C19.5292 0 0 19.5292 0 43.6196C0 67.7101 19.5292 87.2393 43.6196 87.2393Z" fill="#F0F5FF"/>
					<path d="M56.6196 93.2393C80.7101 93.2393 100.239 73.7101 100.239 49.6196C100.239 25.5292 80.7101 6 56.6196 6C32.5292 6 13 25.5292 13 49.6196C13 73.7101 32.5292 93.2393 56.6196 93.2393Z" stroke="#3A7EDF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M74.0675 49.6196L56.6196 32.1718L39.1718 49.6196" stroke="#3A7EDF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M56.6196 67.0675V32.1718" stroke="#3A7EDF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<div
					:class="{
						[sizeClass.inputTitle]: size,
						[sizeClass.contentPadding]: size,
					}"
				>
					<div v-if="!isOnDragEnterState">
						<div>
							Arraste o arquivo aqui ou
							<a
								href="javascript:void(0)"
								class="upload-input__search-link font-weight-bold"
								@click="linkClick"
							>
								pesquise no seu computador
							</a>
						</div>
						<div v-if="isValid === false" class="upload-input__alert py-2 mt-3">
							<div class="d-flex align-items-center justify-content-center">
								<alert-triangle-icon
									class="mr-2"
								/> {{ computedAllowedMessage }}
							</div>
						</div>
					</div>
					<div v-else>
						Solte aqui o seu arquivo
					</div>
				</div>
			</div>
			<div v-else>
				<svg :style="`transform: scale(${sizeClass.svgScale})`" width="103" height="96" viewBox="0 0 103 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M43.6196 87.2393C67.7101 87.2393 87.2393 67.7101 87.2393 43.6196C87.2393 19.5292 67.7101 0 43.6196 0C19.5292 0 0 19.5292 0 43.6196C0 67.7101 19.5292 87.2393 43.6196 87.2393Z" fill="#F0F5FF"/>
					<path d="M56.6196 93.2393C80.7101 93.2393 100.239 73.7101 100.239 49.6196C100.239 25.5292 80.7101 6 56.6196 6C32.5292 6 13 25.5292 13 49.6196C13 73.7101 32.5292 93.2393 56.6196 93.2393Z" stroke="#3A7EDF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M45 70.5H69C72.032 70.5 74.5 68.0343 74.5 65V35C74.5 31.9657 72.032 29.5 69 29.5H45C41.968 29.5 39.5 31.9657 39.5 35V65C39.5 68.0343 41.968 70.5 45 70.5ZM42.5 35C42.5 33.6221 43.6221 32.5 45 32.5H69C70.3779 32.5 71.5 33.6221 71.5 35V65C71.5 66.3779 70.3779 67.5 69 67.5H45C43.6221 67.5 42.5 66.3779 42.5 65V35Z" fill="#3A7EDF" stroke="#3A7EDF"/>
					<path d="M49 56.5H65C65.8281 56.5 66.5 55.8281 66.5 55C66.5 54.1719 65.8281 53.5 65 53.5H49C48.1719 53.5 47.5 54.1719 47.5 55C47.5 55.8281 48.1719 56.5 49 56.5Z" fill="#3A7EDF" stroke="#3A7EDF"/>
					<path d="M49 64.5H65C65.8281 64.5 66.5 63.8281 66.5 63C66.5 62.1719 65.8281 61.5 65 61.5H49C48.1719 61.5 47.5 62.1719 47.5 63C47.5 63.8281 48.1719 64.5 49 64.5Z" fill="#3A7EDF" stroke="#3A7EDF"/>
					<path d="M49 48.5H65C65.8281 48.5 66.5 47.8281 66.5 47C66.5 46.1719 65.8281 45.5 65 45.5H49C48.1719 45.5 47.5 46.1719 47.5 47C47.5 47.8281 48.1719 48.5 49 48.5Z" fill="#3A7EDF" stroke="#3A7EDF"/>
					<path d="M49 40.5H65C65.8281 40.5 66.5 39.8281 66.5 39C66.5 38.1719 65.8281 37.5 65 37.5H49C48.1719 37.5 47.5 38.1719 47.5 39C47.5 39.8281 48.1719 40.5 49 40.5Z" fill="#3A7EDF" stroke="#3A7EDF"/>
				</svg>
				<div
					:class="{
						[sizeClass.inputTitle]: size,
						[sizeClass.contentPadding]: size,
					}"
				>
					<div v-if="!isOnDragEnterState">
						<div>{{ file.name }}</div>
						<div>
							<div>
								<a
									href="javascript:void(0)"
									class="upload-input__search-link font-weight-bold"
									@click="handleRemove"
								>
									Remover
								</a>
							</div>
						</div>
					</div>
					<div v-else>
						Solte aqui o seu arquivo
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { AlertTriangleIcon } from 'vue-feather-icons';

export default {
	components: {
		AlertTriangleIcon,
	},
	props: {
		/**
		 * O conteúdo do arquivo upado.
		 */
		value: {
			default: null,
			description: 'Armazena o valor do arquivo upado (acessível via v-model)',
			required: true,
		},
		/**
		 * Lista com extensões de arquivos (separadas por vírgula) as quais o usuário pode selecionar.
		 * Ex.: jpg,png
		 */
		allowedExtensions: {
			type: String,
			default: null,
			description: `Define quais tipos de arquivos são permitidos nessa instância do UploadInput.
			`,
		},

		/**
		 * Define o tamanho do input [lg, md, sm]
		 */
		size: {
			type: String,
			default: 'md',
			description: `Define o tamanho do input: [lg, md (padrão), sm]`,
		},
	},

	data() {
		return {
			file: !!this.value && !_.isEmpty(this.value) ? this.value : null,
			isOnDragEnterState: false,
			isValid: null,
		};
	},

	computed: {
		sizeClass() {
			const classesObject = {
				inputTitle: `upload-input__title-${this.size}`,
				holderPadding: 'px-3',
				wrapperPadding: 'px-2 py-4',
				contentPadding: 'mt-3',
				svgScale: 1,
			};

			switch (this.size) {
				case 'lg':
					return {
						...classesObject,
						holderPadding: 'px-3 py-5',
						wrapperPadding: 'py-5 px-2',
						contentPadding: 'mt-5',
						svgScale: 1.3,
					};
				case 'sm':
					return {
						...classesObject,
						wrapperPadding: 'py-2',
						holderPadding: 'px-3 pb-2',
						contentPadding: 'mt-1',
						svgScale: 0.8,
					};
				default: // md
					return classesObject;
			}
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
			this.$emit('input', newValue);
		},
	},

	methods: {
		dropHandler(ev) {
			this.isValid = null;
			this.isOnDragEnterState = false;

			// Prevent the browser default behavior (open the file)
			ev.preventDefault();

			if (ev.dataTransfer.items) {
				if (ev.dataTransfer.items[0].kind === 'file') {
					const internalFile = ev.dataTransfer.items[0].getAsFile();
					if (this.isAValidExtension(internalFile.name)) {
						this.file = internalFile;
						this.isValid = true;
						return;
					}
					this.isValid = false;
					this.file = null;
				}
			}
		},
		linkClick() {
			// A lot of nested operations are needed because b-form-file wraps the input tag with a div
			this.$refs.fileInput.$el.childNodes[0].click();
		},
		isAValidExtension(fileName) {
			if (this.allowedExtensions !== null) {
				const alloweds = this.allowedExtensions.split(',');
				let uploaded = fileName.split('.');
				uploaded = uploaded[uploaded.length - 1].trim();
				return alloweds.filter((item) => item === uploaded).length > 0;
			}
			return true;
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
@import '../assets/sass/app.scss';

.upload-input {
	border: 2px dashed $cinza-4;
	border-radius: 16px;
	box-sizing: border-box;

	&__alert {
		background: $amarelo-pikachu-light-2;
		border: 1px solid $amarelo-pikachu-light-1;
		color: $amarelo-pikachu-dark-2;
		border-radius: 5px;
	}

	&__title-lg {
		@include subtitulo-1;
	}

	&__title-md {
		@include subtitulo-2;
	}

	&__title-sm {
		@include subtitulo-3;
	}

	&__search-link {
		color: $azul-sonic-base;

		&:hover {
			text-decoration: underline;
		}
	}

	&--drag-state {
		background-color: $azul-sonic-light-2;
		border: 3px dashed $cinza-4;
	}
}
</style>
