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
					<cds-button
						:id="`btn-${index + 1}`"
						:secondary="light"
						variant="dark"
						@click="$emit('click', action)"
					>
						<span>{{ action }}</span>
					</cds-button>
				</div>
			</div>

			<div
				v-if="dismissible"
				:class="light ? 'toolbar__icon--light' : 'toolbar__icon--dark'"
				@click="handleClose"
			>
				<cds-icon
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
@import '../assets/sass/tokens.scss';
.toolbar {
	align-items: center;
	border-radius: $border-radius-small;
	bottom: 72px;
	box-shadow: $shadow-md;
	display: flex;
	justify-content: space-between;
	min-width: 400px;
	padding: pYX(3, 4);
	width: fit-content;
	z-index: $z-index-toolbar;
	
	&__container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	&__buttons-container {
		display: flex;
		justify-content: space-between;
		margin: ml(3);
	}

	&__button {
		margin: mx(1);
		padding: px(2);
	}

	&--dark {
		background-color: $n-800;
		border: 1px solid $n-700;
		color: $n-10;
		
		@extend .toolbar;
	}

	&--light {
		background-color: $n-10;
		border: 1px solid $n-30;
		color: $n-800;
		
		@extend .toolbar;
	}

	&--fixed {
		position: fixed;
	}

	&__icon {
		&--dark {
			align-items: center;
			background-color: $n-800;
			border-radius: $border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: ml(1);
			padding: pa(1);
		}
		
		&--dark:hover {
			background-color: $n-900;
		}
		
		&--light {
			align-items: center;
			background-color: $n-30;
			border-radius: $border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: ml(1);
			padding: pa(1);
		}
		
		&--light:hover {
			background-color: $n-40;
		}
	}
}
</style>
