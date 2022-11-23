<template>
	<span>
		<span class="source-code__title">Exemplo de uso:</span>

		<div
			class="source-code__container"
		>
			<div class="pre__container" v-highlight>
				<pre>
					<code class="html code__content">
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

		<div class="source-code__title">Lista de ícones:</div>

		<div
			class="icon__grid"
		>
			<div
				v-for="category in iconsData"
				class="icon__category"
			>
				<h6 class="icon__category-title"> {{ category.categoryName }} </h6>
				<br>
				<div
					v-for="icon in category.icons"
					class="icon__tile"
				>
					<cds-icon
						height="40"
						width="40"
						color="#36424E"
						:name="icon"
					/>
		
					<p class="icon__name">{{ icon }}</p>
	
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import { completeIconSet } from "@sysvale/cuida-icons/dist";
import { iconsData } from '../utils/constants/iconsData.js';
import CdsIcon from '../components/Icon.vue';

export default {
	data() {
		return {
			selectedIcon: '',
			iconPath: '',
			set: completeIconSet,
			exampleSourceCode: `
<cds-icon
	name="box-outline"
	height="40"
	width="40"
	color="#36424E"
/>
			`,
			copyCodeButtonText: 'Copiar código',
			iconsData: iconsData,
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
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';
.code {
	border: 1px solid $n-400;
	border-radius: $border-radius-small;
}

pre {
	display: flex;
	justify-content: start;
	margin: mb(10);
	border-radius: $border-radius-small;
}

code {
	border-radius: $border-radius-small;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: pa(8);
}

.source-code {
	&__container {
		border: 1px solid $n-30;
		border-radius: $border-radius-small;
		display: flex;
		background-color: #fafafa;
		height: 200px;
		margin: mt(4);
	}

	&__title {
		font-size: 20px;
		margin: mt(6);
	}

	&__title {
		font-size: 20px;
		margin: mt(12);
	}
}

.source-code__button {
	background-color: $n-900;
	color: $n-0;
	border: none;
	border-radius: 4px 0px 12px 4px;
	padding: pYX(1, 2);
	@include caption;
	transition: all .3s ease-in-out;
	align-self: flex-end;
	width: 150px;
}


.icon {
	&__tile {
		width: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__name {
		font-size: 12px;
		color: $n-400;
		text-align: center;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: stretch;
		gap: 32px;
		margin: mt(12);
		row-gap: 150px;
	}

	&__category {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		width: fit-content;
		gap: 20px;
		align-content: baseline;
	}

	&__category-title {
		grid-column: span 3;
	}
}

.pre__container {
	width: 100%;
}

.code__content {
	height: 180px;
}


</style>
