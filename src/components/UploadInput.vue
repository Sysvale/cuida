<template>
	<div
		class="upload-input text-center py-3 px-5"
		:class="{
			'upload-input--drag-state': isOnDragEnterState,
		}"
		@dragover.prevent.stop="isOnDragEnterState = true"
		@dragenter.prevent.stop="isOnDragEnterState = true"
		@dragleave.prevent.stop="isOnDragEnterState = false"
		@dragend.prevent.stop="isOnDragEnterState = false"
		@drop="dropHandler"
	>
		<div class="text-center px-3 py-5" >
			<b-form-file
				v-show="false"
				v-model="file"
				:accept="accept"
				ref="fileInput"
			/>
			<div v-if="!file">
				<img src="../assets/images/upload-icon.svg"/>
				<div class="mt-3 upload-input__title">
					<div v-if="!isOnDragEnterState">
						Arraste o arquivo aqui ou
						<a
							href="javascript:void(0)"
							class="upload-input__search-link font-weight-bold"
							@click="linkClick"
						>
							pesquise no seu computador
						</a>
					</div>
					<div v-else>
						Solte aqui o seu arquivo
					</div>
				</div>
			</div>
			<div v-else>
				<img src="../assets/images/file-icon.svg"/>
				<div class="mt-3 upload-input__title">
					<div v-if="!isOnDragEnterState">
						<div>{{ file.name }}</div>
						<div>
							<div>
								<a
									href="javascript:void(0)"
									class="upload-input__search-link font-weight-bold"
									@click="file = null"
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
export default {
	props: {
		/**
		 * O conteúdo do arquivo upado.
		 */
		value: {
			type: Object,
			default: () => ({}),
			description: 'The value that represents the uploaded file.',
			required: true,
		},
		/**
		 * Tipo de arquivos aceitos (Ref.: https://cutt.ly/fgkC0nU)
		 */
		accept: {
			type: String,
			default: null,
			description: `The accept prop defines what kind of file is accepted by
				the current instance of UploadInput.
				Reference to valid options: https://www.iana.org/assignments/media-types/
			`,
		},
	},

	data() {
		return {
			file: _.isEmpty(this.value) ? null :  this.value,
			isOnDragEnterState: false,
		};
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
			this.isOnDragEnterState = false;

			// Prevent the browser default behavior (open the file)
			ev.preventDefault();

			if (ev.dataTransfer.items) {
				if (ev.dataTransfer.items[0].kind === 'file') {
					this.file = ev.dataTransfer.items[0].getAsFile();
				}
			}
		},
		linkClick() {
			// A lot of nested operations are needed because b-form-file wraps the input tag with a div
			this.$refs['fileInput'].$el.childNodes[0].click();
		}
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';


.upload-input {
  border: 2px dashed $cinza-4;
	border-radius: 16px;
	box-sizing: border-box;

	&__title {
		@include titulo-3;
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
