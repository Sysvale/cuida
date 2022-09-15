<template>
	<div
		id="resume-grid-card"
		class="p-3 d-flex flex-column"
	>
		<div class="d-flex justify-content-between">
			<div class="mt-n2">
				<span
					id="resume-grid-card-value"
					class="heading-3 mr-1"
				>
					{{ valueText }}
				</span>

				<!-- <span
					id="resume-grid-card-target"
					class="subheading-3"
				>
					{{ targetText }}
				</span> -->

				<div
					id="resume-grid-card-description"
					class="caption"
				>
					{{ description }}
				</div>
			</div>
			<ion-icon
				v-b-tooltip.hover="{
					title: tooltip.text,
				}"
				:name="tooltip.type == 'danger' ? 'alert-circle':'information-circle'"
				:class="`mr-n2 mt-n1 border-circle ${tooltip.type}`"
			/>
		</div>
		<span
			v-if="showMetricsListButton"
			class="view-more"
			@click="$emit('getList')"
		>
			VER LISTA
		</span>
	</div>
</template>

<script>
export default {
	props: {
		description: {
			type: String,
			default: 'Default text',
		},

		valueText: {
			type: String,
			default: '##',
		},

		targetText: {
			type: String,
			default: 'Target',
		},

		tooltip: {
			type: Object,
			default: () => {},
		},

		showAction: {
			type: Boolean,
			default: false,
		}
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#resume-grid-card {
	border-radius: $border-radius-small;
	border: 1px solid $n-40;
	min-height: 100%;
	justify-content: space-between;

	div {
		width: 100%;
	}
}

#resume-grid-card-description {
	color: $n-600;
}

#resume-grid-card-value {
	color: $n-900;
	font-weight: 500;
}

#resume-grid-card-target {
	color: $n-700;
}

.heading-3 {
	@include heading-3;
}

.subheading-3 {
	@include subheading-3;
}

.caption {
	@include caption;
}

.border-circle {
	visibility: visible;
	height: 29px;
	width: 29px;
}

.danger {
	color: $rc-500;
}

.info {
	color: $bn-400;
}

::v-deep .tooltip-inner {
	max-width: 350px;
	padding: 8px;
	color: $n-30;
	text-align: left;
	line-height: 16px;
	font-weight: 400;
	background-color: $n-800;
	opacity: 1;
}

::v-deep .arrow::before {
	border-top-color: $n-800;
}

.tooltip.b-tooltip {
	opacity: 1;
}

.view-more {
	align-self: flex-end;
	margin-top: 5px;
	cursor: pointer;
	font-weight: 600;
	font-size: 12px;
}

</style>
