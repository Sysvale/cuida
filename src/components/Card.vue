<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<cds-box padding="0">
		<div
			v-if="hasSlot($slots, 'image')"
			class="cds-timeline-item__title"
		>
			<slot name="image" />
		</div>

		<div
			v-else
			class="card__image"
		>
			<cds-image
				:src="imageSrc"
				:width="maxWidth"
				:height="`${maxWidth - 120}`"
			/>
		</div>

		<cds-spacer
			padding-top="5"
			padding-right="5"
			padding-bottom="5"
			padding-left="5"
			class="card__spacer"
		>
			<div
				v-if="hasSlot($slots, 'header')"
				class="card__header"
			>
				<slot name="header" />
			</div>
	
			<div
				v-if="hasSlot($slots, 'body')"
				class="card__body"
			>
				<slot name="body" />
			</div>
	
			<div
				v-if="hasSlot($slots, 'footer')"
				class="card__footer"
			>
				<slot name="footer" />
			</div>
		</cds-spacer>
	</cds-box>
</template>

<script>
import CdsBox from './Box.vue';
import CdsImage from './Image.vue';
import CdsSpacer from './Spacer.vue';

import hasSlot from '../utils/methods/hasSlot';

export default {
	components: {
		CdsBox,
		CdsImage,
		CdsSpacer,
	},

	props: {
		imageSrc: {
			type: String,
			default: 'https://images.pexels.com/photos/1968177/pexels-photo-1968177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		imageAlt: {
			type: String,
		},
		maxWidth: {
			type: [String, Number],
			default: 320,
		},
		imageMaxHeight: {
			type: [String, Number],
			default: 250,
		},
	},

	computed: {
		widthResolver() {
			return `${this.maxWidth}px`;
		},
	},

	methods: {
		hasSlot,
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.card__image {
	// margin: mTRBL(n4, n4, 0, n4);
}

.card__header {
	@include subheading-2;
	color: $n-700;
}

.card__body {
	@include body-2;
	line-height: 150%;
	color: $n-500;
	margin: mt(2);
}

.card__spacer {
	max-width: v-bind(widthResolver);
}

.card__footer {
	margin: mt(4);
}
</style>