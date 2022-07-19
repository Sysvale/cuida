<template>
	<div class="link__container">
		<a :href="href">{{ text }}</a>
	</div>
</template>

<script>
export default {
	props: {
		/**
		*	URL de redirecionamento.
		*/
		href: {
			type: String,
			required: true,
		},
		/**
		*	Texto utilizado no endereço da URL para o usuário.
		*/
		text: {
        	type: String,
        	required: true,
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';

.link__container {
    display: inline;
    width: auto;
    height: 40px;
    padding: 4px;
    border-radius: 4px;

    a {
        font-size: 18px;
        color: $bn-500;
    }

    &:hover {
        background-color: $bn-100;
    }
}
</style>
