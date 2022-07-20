<template>
	<div class="cds-link__container">
		<a :href="href" :target="newTab ? '_blank' : false">
			<!-- @slot Slot padrão para renderização de conteúdo customizado do texto do link. -->
			<slot class="cds-link__text">
				<span>
					{{ text }}
				</span>
			</slot>
		</a>
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
        *   Prop utilizada para o redirecionamento do link ser a partir de uma nova aba.
        */
		newTab: {
			type: Boolean,
			default: false,
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
