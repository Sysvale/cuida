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
						<div class="content__text">
							{{ event.text }}
						</div>
						<hr
							class="event-row-divider"
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
	scrollbar-color: $cinza-1 $branco;
	scrollbar-width: thin;
}

#timeline .container::-webkit-scrollbar {
	width: 0.35rem;
}

#timeline .container::-webkit-scrollbar-thumb {
	border-radius: 4px;
	background: $cinza-1 $branco;
}

#timeline .content__container {
	width: 50% !important;
	margin-top: -8px;
}

#timeline .content__text {
	color: $cinza-5;
	margin-top: 16px;
}

#timeline .event__date {
	font-weight: 400;
	color: $cinza-5;
	text-transform: Capitalize;
	align-self: flex-end;
	margin-top: -4px;
	margin-bottom: 0px;

}

#timeline .event__pin {
	min-height: 12px !important;
	min-width: 11.5px !important;
	border-radius: 50% !important;
	background-color: $verde-piccolo-base;
	border: 1px solid $verde-piccolo-base;
}

#timeline .event__row {
	display: flex;
	justify-content: space-between;
}

#timeline .event__title {
	color: $cinza-9;
	font-weight: 600;
	margin-bottom: 0;
}

#timeline .timeline {
	height: 100% !important;
	width: 1px !important;
	background-color: $cinza-3;
}

#timeline .timeline__container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
