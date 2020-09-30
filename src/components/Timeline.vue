<template>
	<span id="timeline">
		<div
			class="panel-body-content"
		>
			<div
				v-for="(event, index) in history"
				:key="index"
			>
				<div class="event-row">
					<div>
						<p
							class="regular fs-14 text-secondary date-text"
						>
							{{ event.date }}
						</p>
					</div>
					<div
						class="timeline-container"
					>
						<span
							class="event-pin"
						/>
						<div
							v-if="((index + 1) < history.length) && (history.length > 1)"
							class="timeline"
						/>
					</div>
					<div class="event-info-container">
						<div>
							<p
								class="mb-0 event-title regular">
								{{ event.title }}
							</p>
						</div>
						<div class="text-muted fs-14 mt-1">
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
<style>
#timeline .panel-body-content {
	padding: 24px !important;
	overflow: auto;
	max-height: 350px;
	width: 100% !important;
	scrollbar-color: #CDCDCD #FFFFFF;
	scrollbar-width: thin;
}

#timeline .event-title {
	color: #182532;
	font-weight: 600;
}

#timeline .event-pin {
	min-height: 12px !important;
	min-width: 11.5px !important;
	border-radius: 50% !important;
	background-color: #2EB88D;
	border: 1px solid #2EB88D;
}

#timeline .timeline {
	height: 100% !important;
	width: 1px !important;
	background-color: #CDCDCD;
}

#timeline .timeline-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#timeline .event-row {
	display: flex;
	justify-content: space-between;
}

#timeline .event-info-container {
	width: 50% !important;
	margin-top: -8px;
}

#timeline .panel-body-content::-webkit-scrollbar {
	width: 0.35rem;
}

#timeline .panel-body-content::-webkit-scrollbar-thumb {
	border-radius: 4px;
	background: #CDCDCD#FFFFFF
}

#timeline .date-text {
	text-transform: Capitalize;
	align-self: flex-end;
	margin-top: -4px;
	margin-bottom: 0px;
}

#timeline .text-muted {
	color: #697580;
}
</style>
