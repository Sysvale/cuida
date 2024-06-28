<template>
	<div class="file-viewer">
		<div class="file-viewer__image">
			<span class="file-viewer__extension">.jpg</span>
		</div>
		<div class="file-viewer__info">
			<div class="file-viewer__info--label">Label</div>
			<div class="file-viewer__info--name">nome_arquivo.jpg</div>
			<div class="file-viewer__info--download">Baixar arquivo</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.file-viewer {
	width: fit-content;
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

		&--name {
			@include body-2;
			color: $n-700;
		}

		&--download {
			@include body-2;
			color: $bn-400;
			cursor: pointer;
		}
	}
}

</style>