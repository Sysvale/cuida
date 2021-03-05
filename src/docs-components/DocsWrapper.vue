<template>
	<div
		class="storybook-canvas d-flex"
	>
		<div
			class="docs-container"
		>
			<b-container class="">
				<div class="">
					<div class="preview">
						<slot name="component-preview" />
					</div>
					<div
						class="w-100 d-flex justify-content-end"
						@click="showCode"
					>
						<button
							v-b-toggle.exampleOfUse
							class="small m-0 copy-button"
						>
							{{ showCodeButtonText }}
						</button>
					</div>
				</div>

				<div class="info-body">
					<div
						class="summary"
						:v-html="exampleSourceCode"
					/>
					<b-collapse id="exampleOfUse">
						<div class="usage code">
							<div v-highlight>
								<pre>
									<code class="html">
										{{ exampleSourceCode }}
									</code>
								</pre>
							</div>

							<div class="d-flex justify-content-end align-self-end">
								<button
									class="small m-0 copy-code"
									@click="copyCode"
								>
									{{ copyCodeButtonText }}
								</button>
							</div>
						</div>
					</b-collapse>

				</div>
			</b-container>
		</div>
	</div>
</template>

<script>
import hljs from 'highlight.js';
import marked from 'marked';
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
			showCodeButtonText: 'Show code',
			copyCodeButtonText: 'Copy code',
			formattedProps: [],
			formattedEvents: [],
			formattedSlots: [],
			activeSection: 'component-header',
			navigationItems: [
				'Component-header',
				'Usage',
				'Preview',
			],
		};
	},
	computed: {
		summary() {
			if (!this.exampleSourceCode) {
				return '';
			}
			const renderer = new marked.Renderer();
			/* eslint-disable no-unused-expressions */
			renderer.code = (code, lang) => {
				`<pre>
					<code class="html">
						${hljs.highlightAuto(code, lang ? [lang] : undefined).value}
					</code>
				</pre>`;
			};
			marked.setOptions({ renderer });
			return marked(this.exampleSourceCode);
		},
	},
	mounted() {
		this.highlight();
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/nord.min.css');
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
		scrollTo(id) {
			document.getElementById(id).scrollIntoView({
				behavior: 'smooth'
			});
			this.activeSection = id;
		},
		loweredCaseWord(word) {
			return word.charAt(0).toLowerCase() + word.slice(1);
		},
		highlight() {
			if (!this.$refs.usage) {
				return;
			}
			hljs.highlightBlock(this.$refs.usage, {
				languages: ['html'],
			});
		},
		copyCode() {
			const el = document.createElement('textarea');
			this.copyCodeButtonText = 'Copied';
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
			setTimeout(() => {
				this.copyCodeButtonText = 'Copy code';
			}, 100);
			this.showCodeButtonText = this.showCodeButtonText === 'Hide Code' ? 'Show Code' : 'Hide Code';
		},
	},
};
</script>

<style>
.code {
	background-color: #2e3440;
	display: flex;
	justify-content: space-between;
	font-weight: 300 !important;
}

.hljs-section, .hljs-strong, .hljs-tag {
	font-weight: 400 !important;
}

.copy-code {
	background-color: #20242d;
	color: #f0f0f0;
	border: none;
	border-radius: 4px;
}

.copy-button {
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 3px;
	background-color: #ffffff;
	cursor: pointer;
	font-size: 12.8px;
	padding: 3px 10px;
	margin: 10px;
}
</style>