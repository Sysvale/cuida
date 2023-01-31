<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span id="timeline">
		<div
			class="container"
		>
			<div
				v-for="(event, index) in history"
				:key="index"
			>
				<div class="event__row">
					<div>
						<p
							class="event__date"
						>
							{{ event.date }}
						</p>
					</div>
					<div
						class="timeline__container"
					>
						<span
							:class="event._dotStyle === 'hollowed' ? 'event__pin--hollowed' : 'event__pin--filled'"
						/>
						<div
							v-if="((index + 1) < history.length) && (history.length > 1)"
							class="timeline"
						/>
					</div>
					<div class="content__container">
						<div>
							<p
								class="content__title"
							>
								{{ event.title }}
							</p>
						</div>
						<span class="content__text">
							{{ event.text }}
						</span>
						<cds-divider
							v-if="(index + 1) < history.length"
						/>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import CdsDivider from './Divider.vue';

export default {
	components: {
		CdsDivider,
	},

	props: {
		/**
		 * O array que especifica os eventos que vão ser mostrados na timeline
		 */
		history: {
			type: Array,
			default: () => [],
			required: true,
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

#timeline .container {
	padding: pa(6) !important;
	overflow: auto;
	max-height: 350px;
	width: 100% !important;
	scrollbar-color: $n-100 $n-0;
	scrollbar-width: thin;
}

#timeline .container::-webkit-scrollbar {
	width: 0.35rem;
}

#timeline .container::-webkit-scrollbar-thumb {
	border-radius: 4px;
	background: $n-100 $n-0;
}

#timeline .content__container {
	width: 50% !important;
	margin: mt(n2);

	& > .divider__container {
		margin: my(3);
	}
}

#timeline .content__text {
	color: $n-600;
	margin: mt(1);
	margin: mb(2);
}

#timeline .event__date {
	font-weight: 400;
	color: $n-500;
	text-transform: Capitalize;
	align-self: flex-end;
	margin: mt(n1);
}

#timeline .event__pin {
	min-height: 12px !important;
	min-width: 12px !important;
	border-radius: 50% !important;
	box-sizing: content-box;

	&--filled {
		@extend .event__pin;
		background-color: $gp-500;
	}

	&--hollowed {
		@extend .event__pin;
		border: 2px solid $gp-500;
		box-sizing: border-box;
	}
}

#timeline .event__row {
	display: flex;
	justify-content: space-between;
}

#timeline .content__title {
	color: $n-900;
	font-weight: 600;
	margin: mb(2);
}

#timeline .timeline {
	height: 100% !important;
	width: 1px !important;
	background-color: $n-40;
}

#timeline .timeline__container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
