<template>
	<div
		v-if="internalShow"
		class="toolbar__container"
	>
		<div
			:class="{
				'toolbar--fixed': float,
				'toolbar--dark': dark,
				'toolbar--light': !dark,
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
				class="toolbar__buttons-container"
				v-else
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
						:secondary="!dark"
						variant="dark"
						@click="$emit('click', action)"
					>
						<span>{{ action }}</span>
					</cds-button>
				</div>
			</div>

			<div
				v-if="dismissible"
				:class="dark ? 'toolbar__icon--dark' : 'toolbar__icon--light'"
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
		 * Especifica se a versão da ActionBar é a dark.
		 */
		dark: {
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

	mounted() {
		this.internalShow = this.show;
	},

	watch: {
		show(value) {
			this.internalShow = value;
		},
	},
	
	computed: {
		hasActionSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'actions');
		},
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
@import '../assets/sass/app.scss';
.toolbar {
	align-items: center;
	border-radius: $border-radius-extra-small;
	bottom: 72px;
	box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
	display: flex;
	padding: pYX(3, 4);
	z-index: 99;
	min-width: 400px;
	width: fit-content;
	justify-content: space-between;
	
	&__container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	&__buttons-container {
		display: flex;
		justify-content: space-between;
		margin: ml(2);
	}

	&__button {
		padding: px(2);
		margin: mx(1);
	}

	&--dark {
		background-color: $n-700;
		color: $n-10;
		border: 1px solid $n-600;
		@extend .toolbar;
	}

	&--light {
		background-color: $n-10;
		color: $n-800;
		border: 1px solid $n-30;
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
			padding: pa(1);
			margin: ml(1);
		}
		
		&--dark:hover {
			background-color: $n-900;
		}
		
		&--light {
			align-items: center;
			background-color: $n-30;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			justify-content: center;
			padding: pa(1);
			margin: ml(1);
		}
		
		&--light:hover {
			background-color: $n-40;
		}
	}
}
</style>
