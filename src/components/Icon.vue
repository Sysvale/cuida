<template>
	<svg xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		viewBox="0 0 24 24"
		:aria-labelledby="name"
		role="presentation"
	>
		<title
			:id="name"
			lang="en"
		>
			{{ name }} icon
		</title>
		<g v-html="iconPath" :fill="color" />
	</svg>
</template>

<script>
import { completeIconSet } from "@sysvale/cuida-icons/dist";

export default {
	props: {
		name: {
			type: String,
			default: 'box-outline'
		},
		width: {
			type: [Number, String],
			default: 24
		},
		height: {
			type: [Number, String],
			default: 24
		},
		color: {
			type: String,
			default: 'currentColor'
		}
	},

	data() {
		return {
			selectedIcon: '',
			iconPath: '',
		};
	},

	mounted() {
		this.selectedIcon = completeIconSet.find((i) => {
			return i.name === this.name
		});

		this.iconPath = this.selectedIcon.data.match(/<svg\b[^>]*?(?:viewBox="(\b[^"]*)")?>([\s\S]*?)<\/svg>/)[2];
	},
}
</script>
