<template>
	<span>
		<div
			class="source-code__container mt-3"
		>
			<div class="pre-container" v-highlight>
				<pre
					class="active"
				>
					<code class="html code-h">
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

		<p class="mt-4 lista">Lista de ícones:</p>

		<div class="iframe__container">
			<iframe class="iframe" src="https://ionicons.com/" scrolling="no" />
		</div>
	</span>
</template>

<script>
export default {
	data() {
		return {
			exampleSourceCode: '<ion-icon name="help-circle-outline" />',
			copyCodeButtonText: 'Copiar código',
		};
	},

	mounted() {
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/atom-one-light.min.css');
		link.dataset.saviHead = 'true';
		document.head.appendChild(link);
	},

	methods: {
		copyCode() {
			const el = document.createElement('textarea');
			this.copyCodeButtonText = '✅ Código copiado';

			setTimeout(() => {
				this.	 = 'Copiar código';
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
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.iframe {
	position: absolute;
	top: -500px;
	width: 800px;
	height: 4850px;
	border: none;

	&__container {
		width: 800px;
		height: 4400px;
		overflow: hidden;
		position: relative;
		margin: auto;
	}
}

.code {
	border: 1px solid $cinza-4;
	border-radius: $border-radius-pequeno;
}

pre {
	display: flex;
	justify-content: start;
	margin-bottom: 2.5rem;
	border-radius: $border-radius-pequeno;
}

code {
	border-radius: $border-radius-pequeno;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: 2rem;
}

.source-code__container {
	border: 1px solid $cinza-4;
	border-radius: $border-radius-pequeno;
	display: flex;
	background-color: #fafafa;
	height: 80px;
}

.inactive {
	opacity: 0;
	height: 0px;
	transition: all .5s ease-in-out;
}

.source-code__button {
	background-color: $cinza-9;
	color: $branco;
	border: none;
	border-radius: 4px 0px 12px 4px;
	padding: 3px 10px;
	@include legenda;
	transition: all .3s ease-in-out;
	align-self: flex-end;
	width: 150px;
}

.pre-container {
	width: 100%;
}

.code-h {
	height: 70px;
}

.lista {
	font-size: 20px;
}
</style>
