<template>
	<div>
		<div
			class="image-upload-wrap text-center py-3 px-5"
			:class="{
				'drag-enter': isOnDragEnterState,
			}"
			@dragenter="dragEnterHandler"
			@drop="dropHandler"
			@dragover="dragOverHandler"
		>
			<b-form-file
				v-show="false"
				v-model="file"
				:accept="accept"
				ref="fileInput"
			/>
			<div class="drag-text px-3 py-5">
				<span v-if="!file">
					<img src="../assets/images/upload-icon.svg"/>
					<div class="mt-3 title">
						<span v-if="!isOnDragEnterState">
							Arraste o arquivo aqui ou
							<a
								href="javascript:void(0)"
								class="search-link font-weight-bold"
								@click="linkClick"
							>
								pesquise no seu computador
							</a>
						</span>
						<span v-else>
							Solte aqui o seu arquivo
						</span>
					</div>
				</span>
				<span v-else>
					<img src="../assets/images/file-icon.svg"/>
					<div class="mt-3 title">
						<span v-if="!isOnDragEnterState">
							<span>{{ file.name }}</span>
							<div>
								<small>
									<a
										href="javascript:void(0)"
										class="search-link font-weight-bold"
										@click="file = null"
									>
										Remover
									</a>
								</small>
							</div>
						</span>
						<span v-else>
							Solte aqui o seu arquivo
						</span>
					</div>
				</span>
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
		dragOverHandler(ev) {
			ev.preventDefault();
		},
		dragEnterHandler() {
			this.isOnDragEnterState = true;
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

.title {
	@include titulo-3;
}

.search-link {
	color: $azul-sonic-base;
}

.search-link:hover {
	text-decoration: underline;
}

.file-upload {
  background-color: white;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.image-upload-wrap {
  margin-top: 20px;
  border: 2px dashed $cinza-4;
  position: relative;
	border-radius: 16px;
}

.drag-text {
  text-align: center;
}

.drag-text h3 {
  color: $cinza-6;
}

.drag-enter {
	background-color: $azul-sonic-light-2;
  border: 3px dashed $cinza-4;
}
</style>
