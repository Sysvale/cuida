<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="cds-timeline">
		<!-- @slot Conteúdo a ser colocar na Timeline. Suporta o `TimelineItem` como subcomponente.  -->
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		* Inverte a ordem dos elementos da Timeline.
		*/
		reverse: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			oppositeSlotMaxWidth: '0',
		};
	},

	computed: {
		directionResolver() {
			return this.reverse ? 'column-reverse' : 'column';
		},

		oppositeSlotWidthResolver() {
			return `${this.oppositeSlotMaxWidth}px`;
		},
	},

	mounted() {
		let oppositeSlots = document.querySelectorAll('.cds-timeline-item__opposite');

		oppositeSlots.forEach(slot => {
			let slotWidth = slot.getClientRects()[0].width;
			if (this.oppositeSlotMaxWidth < slotWidth) {
				this.oppositeSlotMaxWidth = slotWidth;
			}
		});
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';
.cds-timeline {
	padding: pa(5);
	display: flex;
	flex-direction: v-bind(directionResolver);
}

.cds-timeline > .cds-timeline-item > .cds-timeline-item__opposite {
	min-width: v-bind(oppositeSlotWidthResolver);
}
</style>
