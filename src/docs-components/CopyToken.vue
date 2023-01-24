<template>
	<tooltip :value="value" :show="showTooltip" :target='target' @hide="showTooltip = false">
		<span> ✅ Token copiado!</span>
	</tooltip>
</template>

<script>
import Tooltip from './Tooltip.vue';
export default {
	components: {
		Tooltip,
	},

	props: {
		target: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			showTooltip: false,
		}
	},

	watch: {
		target(value) {
			if (!value) {
				this.showTooltip = false;
				return;
			}

			this.copyToken();
		},
	},

	methods: {
		copyToken() {
			this.showTooltip = true;

			const el = document.createElement('textarea');

			el.value = this.value;
			el.setAttribute('readonly', '');
			el.style.position = 'absolute';
			el.style.left = '-9999px';
			document.body.appendChild(el);
			const selected = document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			if (selected) {
				document.getSelection().removeAllRanges();
				document.getSelection().addRange(selected);
			}
		}
	},
}
</script>