<template>
	<div class="iframe__container">
		<iframe class="iframe" src="https://ionicons.com/" scrolling="no" />
	</div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.iframe {
	position: absolute;
	top: -500px;
	width: 800px;
	height: 4850px;
	border: none;

	&__container {
		width: 800px;
		height: 4850px;
		overflow: hidden;
		position: relative;
		margin: auto;
	}
}
</style>
