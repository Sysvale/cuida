<template>
	<div class="file-viewer">
		<div class="file-viewer__image">
			<span class="file-viewer__extension">.jpg</span>
		</div>
		<div class="file-viewer__info">
			<div class="file-viewer__info--label">{{ label }}</div>
			<div class="file-viewer__info--file-name">{{ fileName }}</div>
			<div class="file-viewer__info--download">Baixar arquivo</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	label: {
		type: String,
		default: 'Arquivo anexado',
	},
	fileName: {
		type: String,
		default: 'nome_do_arquivo.jpg',
	},
})


</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.file-viewer {
	width: fit-content;
	min-width: 280px;
	max-width: 350px;
	padding: pa(3);
	border-radius: 12px;
	border: 1px solid $n-30;
	background: $n-0;
	display: flex;
	gap: spacer(3);

	&__image {
		width: 66px;
		height: 66px;
		flex-shrink: 0;
		background-color: $n-20;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__extension {
		@include body-1;
		color: $n-700;
		font-weight: $font-weight-bold;
		justify-items: center;
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: spacer(1);

		&--label {
			@include body-2;
			font-weight: $font-weight-semibold;
			color: $n-800;
		}

		&--file-name {
			@include body-2;
			color: $n-700;
			width: 100%;
			max-width: 246px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&--download {
			@include body-2;
			color: $bn-400;
			cursor: pointer;
		}
	}
}

</style>