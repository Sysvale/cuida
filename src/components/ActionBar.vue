<template>
	<div
		v-if="internalShow"
		class="toolbar__container"
	>
		<div
			:class="{
				'toolbar--fixed': float,
				'toolbar--light': light,
				'toolbar--dark': !light,
			}"
		>
			<!-- @slot Slot utilizado para renderização de texto no componente.-->
			<slot
				name="description"
			/>

			<div
				v-if="hasActionSlot"
				class="toolbar__buttons-container"
			>
				<!-- @slot Slot para renderização de botões na ActionBar.-->
				<slot
					name="actions"
				/>
			</div>

			<div
				v-else
				class="toolbar__buttons-container"
			>
				<div
					v-for="(action, index) in actions"
					:key="index"
					class="toolbar__button"
				>
					<!--
						Evento emitido quando os botões são clicados.
						@event click
						@type {Event}
					-->
					<CdsButton
						:id="`btn-${index + 1}`"
						:secondary="light"
						variant="dark"
						@click="$emit('click', action)"
					>
						<span>{{ action }}</span>
					</CdsButton>
				</div>
			</div>

			<div
				v-if="dismissible"
				:class="light ? 'toolbar__icon--light' : 'toolbar__icon--dark'"
				@click="handleClose"
			>
				<CdsIcon
					name="x-outline"
					height="20"
					width="20"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsButton from '../components/Button.vue';

export default {
	name: 'ActionBar',
	components: {
		CdsIcon,
		CdsButton,
	},

	props: {
		/**
		 *  Controla a exibição do modal.
		 */
		show: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Faz com que a ActionBar flutue acima do conteúdo da view,
		* sendo colocada na parte inferior da página
		*/
		float: {
			type: Boolean,
			default: false,
		},
		/**
		 * Prop que exibe botão de fechamento da ActionBar.
		 */
		dismissible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica se a versão da ActionBar é a light.
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indica os botões a serem exibidos na ActionBar.
		 */
		actions: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			internalShow: false,
		}
	},

	computed: {
		hasActionSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'actions');
		},
	},

	watch: {
		show(value) {
			this.internalShow = value;
		},
	},

	mounted() {
		this.internalShow = this.show;
	},

	methods: {
		handleClose() {
			this.internalShow = false;

			/**
			* Evento emitido quando o botão "X" é clicado.
			* @event close
			* @type {Event}
			*/
			this.$emit('close', true);
		},
	}
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.toolbar {
	align-items: center;
	border-radius: tokens.$border-radius-small;
	bottom: 72px;
	box-shadow: tokens.$shadow-md;
	display: flex;
	justify-content: space-between;
	min-width: 400px;
	padding: tokens.pYX(3, 4);
	width: fit-content;
	z-index: tokens.$z-index-toolbar;
	
	&__container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	&__buttons-container {
		display: flex;
		justify-content: space-between;
		margin: tokens.ml(3);
	}

	&__button {
		margin: tokens.mx(1);
		padding: tokens.px(2);
	}

	&--dark {
		background-color: tokens.$n-800;
		border: 1px solid tokens.$n-700;
		color: tokens.$n-10;
		
		@extend .toolbar;
	}

	&--light {
		background-color: tokens.$n-10;
		border: 1px solid tokens.$n-30;
		color: tokens.$n-800;
		
		@extend .toolbar;
	}

	&--fixed {
		position: fixed;
	}

	&__icon {
		&--dark {
			align-items: center;
			background-color: tokens.$n-800;
			border-radius: tokens.$border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: tokens.ml(1);
			padding: tokens.pa(1);
		}
		
		&--dark:hover {
			background-color: tokens.$n-900;
		}
		
		&--light {
			align-items: center;
			background-color: tokens.$n-30;
			border-radius: tokens.$border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: tokens.ml(1);
			padding: tokens.pa(1);
		}
		
		&--light:hover {
			background-color: tokens.$n-40;
		}
	}
}
</style>
