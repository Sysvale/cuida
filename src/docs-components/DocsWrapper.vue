<template>
	<div
		class="storybook-canvas d-flex"
	>
		<div
			class="docs-container"
		>
			<div>
				<div>
					<div class="preview">
						<slot name="component-preview" />
					</div>
					<div
						class="button-container"
						@click="showCode"
					>
						<button
							id="showCode-button"
							class="small m-0 copy-button"
						>
							{{ showCodeButtonText }}
						</button>
					</div>
				</div>

				<div
					:class="isCodeBeignShown ? 'inactive' : 'active'"
					class="info-body"
				>
					<div class="usage code">
						<div v-highlight>
							<pre
								:class="isCodeBeignShown ? 'inactive' : 'active'"
							>
								<code class="html">
									{{ exampleSourceCode }}
								</code>
							</pre>
						</div>

						<div class="copied-button d-flex justify-content-end align-self-end">
							<button
								class="small m-0 copy-code"
								@click="copyCode"
							>
								{{ copyCodeButtonText }}
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import hljs from 'highlight.js';
export default {
	props: {
		componentData: {
			type: Object,
			required: true,
			default: () => {},
		},
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
				document.getElementById('showCode-button').style.borderRadius = '4px 4px 12px 4px';
				this.isCodeBeignShown = true;
			} else {
				document.getElementById('showCode-button').style.borderRadius = '4px';
				this.isCodeBeignShown = false;
			}
			setTimeout(() => {
				this.copyCodeButtonText = 'Copiar código';
			}, 100);
			this.showCodeButtonText = this.showCodeButtonText === 'Esconder código' ? 'Mostrar Código' : 'Esconder código';
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';
.hljs-section, .hljs-strong, .hljs-tag {
	font-weight: 400 !important;
}

.copy-code {
	background-color: #20242d;
	color: #f0f0f0;
	border: none;
	border-radius: 4px;
}

.active {
	opacity: 1;
	/* margin-top: 26px !important; */
	height: 100%;
	transition: all .5s ease-in-out;
}

.inactive {
	opacity: 0;
	/* margin-top: -140px !important; */
	height: 0px;
	transition: all .5s ease-in-out;
}

.copy-button {
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 4px 4px 12px 4px;
	background-color: #ffffff;
	cursor: pointer;
	font-size: 12.8px;
	padding: 3px 10px;
	margin: 10px;
	transform: all .3s ease-in-out;
}

.copy-button:focus {
	outline: none !important;
	box-shadow: $verde-piccolo-light-1 0px -3px 0px -1px inset;
}

.docs-container {
	width: 100%;
}

.button-container {
	position: absolute;
    right: 9px;
	z-index: 9999999;
}

.info-body {
	margin-top: 26px;
    margin-left: -20px;
    width: 998px;
	transition: all .3s ease-in-out;
}

pre {	
	margin: 0 !important;
	font-size: 75%;
	display: flex;
	border-radius: 0px 0px 12px 12px;
	transition: all .3s ease-in-out;
	font-weight: 400 !important;
}

code {
	width: 100%;
	font-weight: 400 !important;
}

.copied-button {
	position: absolute;
	right: 10px;
    bottom: 9px;
}

.preview {
	padding: 12px 0px;
}
</style>