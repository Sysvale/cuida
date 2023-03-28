<template>
	<div class="floating-assistant">
		<cds-pulsar
			:id="pulsarId"
			:target-id="targetId"
		/>
		<div
			:id="containerId"
			v-cds-floatify:[position]="pulsarId"
			class="floating-assistant__container"
		>
			<div
				v-on-click-outside="collapse"
				class="floating-assistant__dropdown"
				@click="isExpanded = true"
			>
				<div>
					<span class="floating-assistant__title">
						{{ title }}
					</span>
					<span
						v-if="!isExpanded"
						class="floating-assistant__subtitle"
					>
						Clique para mais informações
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';
import CdsPulsar from './Pulsar.vue';

export default {
	components: {
		CdsPulsar,
	},

	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	props: {
		/**
		 * O título do FloatingAssistant, é o título do card
		 * flutuante que é exibido.
		 */
		title: {
			type: String,
			default: 'Nova funcionalidade!',
		},
		/**
		* Id do elemento que será referência para a renderização do FloatingAssistant.
		*/
		targetId: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			pulsarId: null,
			containerId: null,
			position: 'right',
			isExpanded: false,
		};
	},

	mounted() {
		this.pulsarId = `floating-assistant$-${this._uid}`;
		this.containerId = `floating-assistant-container$-${this._uid}`;
	},

	methods: {
		collapse() {
			this.isExpanded = false;
		},
	},
};
</script>


<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.floating-assistant {
	&__container {
		display: flex;
		align-items: center;
		width: 100%;
	}

	&__dropdown {
		@include overline;
		color: $n-500;
		background-color: $n-0;
		border-radius: $border-radius-small;
		outline: 1px solid $n-20;
		box-shadow: $shadow-md;
		position: absolute;
		margin: ml(3);
		padding: pYX(2, 5);
		z-index: 999999999;
	}

	&__title {
		display: block;
		@include caption;
		color: $gp-400;
		font-weight: $font-weight-bold;
	}

	&__subtitle {
		color: $n-400;
	}
}
</style>