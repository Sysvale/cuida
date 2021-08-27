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
							class="event__pin"
						/>
						<div
							v-if="((index + 1) < history.length) && (history.length > 1)"
							class="timeline"
						/>
					</div>
					<div class="content__container">
						<div>
							<p
								class="content__title">
								{{ event.title }}
							</p>
						</div>
						<span class="content__text">
							{{ event.text }}
						</span>
						<hr
							v-if="(index + 1) < history.length"
						>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
export default {
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
@import '../assets/sass/app.scss';

#timeline .container {
	padding: 24px !important;
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
	margin-top: -8px;
}

#timeline .content__text {
	color: $n-600;
	margin-top: 4px;
}

#timeline .event__date {
	font-weight: 400;
	color: $n-500;
	text-transform: Capitalize;
	align-self: flex-end;
	margin-top: -4px;
	margin-bottom: 0px;

}

#timeline .event__pin {
	min-height: 12px !important;
	min-width: 11.5px !important;
	border-radius: 50% !important;
	background-color: $gp-400;
	border: 1px solid $gp-400;
}

#timeline .event__row {
	display: flex;
	justify-content: space-between;
}

#timeline .content__title {
	color: $n-900;
	font-weight: 600;
	margin-bottom: 0;
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
