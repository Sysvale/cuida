<template>
	<div
		class="storybook-canvas"
	>
		<div
			class="wrapper__container"
		>
			<div>
				<div class="preview__conainter">
					<slot name="component-preview" />
				</div>

				<button
					id="show-code-button"
					class="preview__button"
					@click="showCode"
				>
					{{ showCodeButtonText }}
				</button>
			</div>

			<div
				:class="isCodeBeignShown ? 'inactive' : 'active'"
				class="source-code__container"
			>
				<div v-highlight>
					<pre
						:class="isCodeBeignShown ? 'inactive' : 'active'"
					>
						<code class="html">
							{{ exampleSourceCode }}
						</code>
					</pre>
				</div>

				<button
					class="source-code__button"
					@click="copyCode"
				>
					{{ copyCodeButtonText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import hljs from 'highlight.js';
export default {
	props: {
		exampleSourceCode: {
			type: String,
			required: true,
			default: '',
		},
	},

	data() {
		return {
			isCodeBeignShown: 'false',
			showCodeButtonText: 'Mostrar código',
			copyCodeButtonText: 'Copiar código',
		};
	},

	mounted() {
		this.highlight();
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/atom-one-light.min.css');
		link.dataset.saviHead = 'true';
		document.head.appendChild(link);
	},

	beforeDestroy() {
		const link = document.head.querySelector('link[data-savi-head]');

		if (link) {
			document.head.removeChild(link);
		}
	},

	methods: {
		highlight() {
			if (!this.$refs.usage) {
				return;
			}
		},

		copyCode() {
			const el = document.createElement('textarea');
			this.copyCodeButtonText = '✅ Código copiado';

			setTimeout(() => {
				this.copyCodeButtonText = 'Copiar código';
			}, 1200);

			el.value = this.exampleSourceCode;
			el.setAttribute('readonly', '');
			el.style.position = 'absolute';
			el.style.left = '-9999px';

			document.body.appendChild(el);
			const selected = document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);

			if (selected) {
				document.getSelection().removeAllRanges();
				document.getSelection().addRange(selected);
			}
		},

		showCode() {
			if (!this.isCodeBeignShown) {
				document.getElementById('show-code-button').style.borderRadius = '4px 4px 12px 4px';
				this.isCodeBeignShown = true;
			} else {
				document.getElementById('show-code-button').style.borderRadius = '4px';
				this.isCodeBeignShown = false;
			}

			setTimeout(() => {
				this.copyCodeButtonText = 'Copiar código';
			}, 300);

			this.showCodeButtonText = this.showCodeButtonText === 'Esconder código' ? 'Mostrar Código' : 'Esconder código';
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';

.wrapper__container {
	width: 100%;
}

.preview__container {
	padding: 12px 0px;
}

.preview__button {
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 4px 4px 12px 4px;
	background-color: $n-0;
	cursor: pointer;
	@include legenda;
	padding: 3px 10px;
	transition: all .3s ease-in-out;
	position: absolute;
	right: 9px;
	z-index: 9;
}

.preview__button:focus {
	outline: none !important;
	box-shadow: $gp-300 0px -3px 0px -1px inset;
}

.source-code__container {
	margin-top: 25px;
	margin-left: -20px;
	width: 998px;
	transition: all .3s ease-in-out;
}

.active {
	opacity: 1;
	height: 100%;
	transition: all .5s ease-in-out;
}

.inactive {
	opacity: 0;
	height: 0px;
	transition: all .5s ease-in-out;
}

.source-code__button {
	background-color: $n-900;
	color: $n-0;
	border: none;
	border-radius: 4px 0px 12px 4px;
	padding: 3px 10px;
	@include legenda;
	transition: all .3s ease-in-out;
	position: absolute;
	right: 10px;
	bottom: 9px;
}

pre {
	margin: 0 !important;
	@include legenda;
	display: flex;
	border-radius: 0px 0px 12px 12px;
	transition: all .3s ease-in-out;
}

code {
	width: 100%;
}
</style>
