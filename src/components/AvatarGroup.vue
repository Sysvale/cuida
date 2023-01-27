<template>
	<div class="avatar--group__container">
		<slot />
	</div>
</template>
<script>

export default {
	props: {
		/**
		 * A variante de cor. São 10 variantes implementadas: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange','amber' e 'white'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Especifica o tamanho do avatar. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * src da imagem do avatar. Tem prioridade maior que as props de iniciais de nome.
		 */
		src: {
			type: String,
			default: '',
		},
		/**
		 * Recebe as iniciais do usuário cujas informações vão ser mostradas no Avatar.
		 * As iniciais são exibidas apenas quando nenhuma imagem é especificada.
		 */
		initials: {
			type: String,
			default: null,
		},
		/**
		 * Recebe o nome do usuário cujas informações vão ser mostradas no Avatar.
		 * Do nome são extraídas as duas primeiras iniciais para exibição no componente
		 * quando nenhuma imagem é especificada.
		 */
		name: {
			type: String,
			default: null,
		},
		clickable: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		computedInitials() {
			if (this.initials) {
				return this.initials;
			}

			if (this.name) {
				return this.name.replace(/(\S+)(\s*)/gi, (p1) => p1[0].toUpperCase()).slice(0, 2);
			}

			return 'UND';
		},

		avatarContainerClasses() {
			let className = '';

			switch (this.variant) {
				case 'teal':
					className = 'avatar__container--teal';
					break;
				case 'green':
					className = 'avatar__container--green';
					break;
				case 'blue':
					className = 'avatar__container--blue';
					break;
				case 'indigo':
					className = 'avatar__container--indigo';
					break;
				case 'violet':
					className = 'avatar__container--violet';
					break;
				case 'pink':
					className = 'avatar__container--pink';
					break;
				case 'red':
					className = 'avatar__container--red';
					break;
				case 'orange':
					className = 'avatar__container--orange';
					break;
				case 'amber':
					className = 'avatar__container--amber';
					break;
				case 'gray':
					className = 'avatar__container--gray';
					break;
				case 'white':
					className = 'avatar__container--white';
					break;
				default:
					className = 'avatar__container--gray';
					break;
			}

			switch (this.size) {
				case 'sm':
					className += ' avatar__container--sm';
					break;
				case 'md':
					className += ' avatar__container--md';
					break;
				case 'lg':
					className += ' avatar__container--lg';
					break;
			}

			return className;
		}
	}
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.avatar--group__container {
	display: flex;

	& > .avatar__container:not(:first-child) {
		margin: ml(n3);
	}

	& > .avatar__container:nth-child(2) {
		outline: 4px solid $n-0;
		z-index: 2;
	}

	& > .avatar__container:nth-child(3) {
		outline: 4px solid $n-0;
		z-index: 3;
	}

}

</style>
