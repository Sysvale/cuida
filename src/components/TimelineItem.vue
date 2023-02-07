<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span class="cds-timeline">
		<div
			class="container"
		>
			<div>
				<div class="event__row">
					<div class="event__date">
						<slot name="opposite" />
					</div>

					<div
						class="timeline__container"
					>
						<span
							v-if="!loading"
							:class="`event__pin--${variant}`"
						/>
						<cds-spinner
							v-else
							size="sm"
							class="spinner"
							:variant="variant"
						/>

						<div
							:class="(loading || hollowed) ? 'timeline--dashed' : 'timeline'"
						/>
					</div>

					<div class="content__container">
						<div class="content__title">
							<slot name="title" />
						</div>

						<span class="content__text">
							<slot name="content" />
						</span>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import CdsSpinner from './Spinner.vue';

export default {
	components: {
		CdsSpinner,
	},

	props: {
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		reverse: {
			type: Boolean,
			default: false,
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		hollowed: {
			type: Boolean,
			default: false,
		},
		opposite: {
			type: String,
			default: null,
		},
		title: {
			type: String,
			default: null,
		},
		content: {
			type: String,
			default: null,
		},
	},

	data() {
		return {
			innerHistory: this.reverse ? this.history.slice().reverse() : this.history,
		};
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.cds-timeline {
	.container {
		// padding: pa(5) !important;
	}
	
	.content__container {
		// width: 50% !important;
		margin-top: spacer(n1);
		margin-left: spacer(6);
		margin-bottom: spacer(10);
		
		& > .divider__container {
			margin: my(3);
		}
	}

	.content__title {
		color: $n-900;
		font-weight: 600;
		margin: mb(2);
	}
	
	.content__text {
		@include caption;
		font-weight: $font-weight-regular;
		color: $n-600;
		margin: mt(1);
		margin: mb(2);
	}
	
	.event__date {
		color: $n-600;
		@include body-2;
		margin: mTRBL(n1, 6, 0, 0);
	}
	
	.event__pin {
		min-height: 16px !important;
		min-width: 16px !important;
		border-radius: $border-radius-circle;

		@include variantResolver using ($color-name, $base-color, $disabled, $muted, $hover) {
			background-color: $base-color;
			@extend .event__pin;
		}
	
		&--filled {
			@extend .event__pin;
			background-color: $gp-500;
		}
	
		&--hollowed {
			@extend .event__pin;
			border: 4px solid $gp-500;
			box-sizing: border-box;
		}
	}
	
	.event__row {
		display: flex;
		// justify-content: space-between;
	}
	
	.timeline {
		height: 100% !important;
		width: 2px !important;
		background-color: $n-40;
	}

	.timeline--dashed {
		height: 100% !important;
		width: 2px !important;
		border: 1px dashed $n-40;
	}
	
	.timeline__container {
		// background-color: rgb(231, 143, 143);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}

.spinner {
	min-height: 16px !important;
	min-width: 16px !important;
}

</style>
