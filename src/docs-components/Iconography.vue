<template>
	<span>
		<div v-highlight>
			<pre>
				<code class="html code">
					{{ exampleSourceCode }}
				</code>
			</pre>
		</div>
		<div class="iframe__container">
			<iframe class="iframe" src="https://ionicons.com/" scrolling="no" />
		</div>
	</span>
</template>

<script>
export default {
	data() {
		return {
			exampleSourceCode: '<ion-icon name="heart" />',
		};
	},

	mounted() {
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/atom-one-light.min.css');
		link.dataset.saviHead = 'true';
		document.head.appendChild(link);
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
	border-radius: $border-radius-normal;
}

pre {
	display: flex;
	justify-content: center;
	margin-bottom: 2.5rem;
}

code {
	width: 80%;
	display: flex;
	justify-content: flex-start;
	padding: 2rem;
}
</style>
