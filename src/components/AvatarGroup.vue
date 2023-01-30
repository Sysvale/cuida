<template>
	<div class="avatar--group__container">
		<cds-tooltip
			v-for="(avatarData, index) in listAvatars"
			:key="index"
			position="bottom"
			:text="avatarData.name"
		>
			<cds-avatar
				v-bind="avatarData"
				:size="size"
				:clickable="false"
			/>
		</cds-tooltip>

		<cds-avatar
			v-if="showAvatarCounter"
			:size="size"
			:clickable="false"
			:name="avatarCounterText"
			variant="gray"
			class="avatar--group__counter"
		/>
	</div>
</template>
<script>
import CdsAvatar from './Avatar.vue';
import CdsTooltip from './Tooltip.vue';
export default {
	components: {
		CdsAvatar,
		CdsTooltip,
	},

	props: {
		size: {
			type: String,
			default: 'md',
		},
		avatars: {
			type: Array,
			default: () => [],
		},
		maxCount: {
			type: Number,
			default: 4,
		},
	},

	data() {
		return {
			listAvatars: this.avatars.slice(0, this.maxCount),
		};
	},

	computed: {
		showAvatarCounter() {
			return this.maxCount < this.avatars.length;
		},

		avatarCounterText() {
			return `+ ${this.avatars.length - this.maxCount}`;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.avatar--group {
	&__container {
		display: flex;
	
		//FIXME: Número fixo. Se encontrarmos uma solução
		//que não seja hardcoded, vale trocar aqui
		@for $i from 20 to 0 {
			& > .tp:nth-child(#{$i - 1}) {
				z-index: ($i - 20) * -1;
			}
		}
	
		& > .tp:not(:first-child) {
			margin: ml(n1);
		}
	
		& > * {
			outline: 2px solid $n-0;
		}
	}

	&__counter {
		margin: ml(n1);
	}
}

.tp {
	border-radius: 100px;
}
</style>
