<template>
	<span>
		<div class="source-code__title">Lista de ícones:</div>

		<cds-search-input
			v-model="typedIcon"
			fluid
			class="icon__search-input"
			placeholder="Pesquise pelo nome do ícone"
		/>

		<copy-token :target="target" :value="value" />

		<div
			class="icon__grid"
		>
			<div
				v-for="category in filteredCategories(iconsData)"
				:key="category.categoryName"
			>
				<div
					class="icon__category"
				>
					<h6 class="icon__category-title"> {{ category.categoryName }} </h6>
					<br>
					<div
						v-for="(icon, index) in filteredIcons(category.icons)"
						:key="index"
						@click="handleClipBoardContent(icon)"
					>
						<div
							:id="icon"
							class="icon__tile"
						>
							<cds-icon
								height="16"
								width="16"
								color="#36424E"
								name="copy-outline"
								class="copy-icon"
							/>

							<cds-icon
								:key="`${index}-${typedIcon}`"
								height="32"
								width="32"
								color="#36424E"
								:name="icon"
							/>
							<p class="icon__name">{{ icon }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import { completeIconSet } from '@sysvale/cuida-icons/dist';
import { iconsData } from '../utils/constants/iconsData.js';
import CdsIcon from '../components/Icon.vue';
import CdsSearchInput from '../components/SearchInput.vue';
import CopyToken from '../docs-components/CopyToken.vue';

export default {
	components: {
		CdsIcon,
		CopyToken,
		CdsSearchInput,
	},

	data() {
		return {
			target: '',
			value: '',
			text: '',
			selectedIcon: '',
			iconPath: '',
			set: completeIconSet,
			typedIcon: '',
			exampleSourceCode: `
<cds-icon
	name="box-outline"
	height="40"
	width="40"
	color="#36424E"
/>
			`,
			copyCodeButtonText: 'Copiar código',
			iconsData: iconsData,
		};
	},

	methods: {
		handleClipBoardContent(icon) {
			this.target = icon;
			this.value = `
<cds-icon
	height="32"
	width="32"
	name="${icon}"
/>`;
		},

		filteredIcons(icons) {
			return icons.filter(icon => {
				return icon.includes(this.typedIcon)
			});
		},

		filteredCategories(categories) {
			return categories.filter(category => {
				return category.icons.some(icon => icon.includes(this.typedIcon))
			});
		},
	},
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
.code {
	border: 1px solid tokens.$n-400;
	border-radius: tokens.$border-radius-small;
}

pre {
	display: flex;
	justify-content: start;
	margin: mb(10);
	border-radius: tokens.$border-radius-small;
}

code {
	border-radius: tokens.$border-radius-small;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: pa(8);
}

.copy-icon {
	position: absolute;
	margin-bottom: 66px;
	margin-right: 66px;
	opacity: 0;
	transition: all .2s ease-in-out;
}

.source-code {
	&__container {
		border: 1px solid tokens.$n-30;
		border-radius: tokens.$border-radius-small;
		display: flex;
		background-color: #fafafa;
		height: 200px;
		margin: mt(4);
	}

	&__title {
		font-size: 20px;
		margin: my(4) !important;
	}

	&__title {
		font-size: 20px;
		margin: mt(12);
	}
}

.source-code__button {
	background-color: tokens.$n-900;
	color: tokens.$n-0;
	border: none;
	border-radius: 4px 0px 12px 4px;
	padding: pYX(1, 2);
	@include tokens.caption;
	transition: all .3s ease-in-out;
	align-self: flex-end;
	width: 150px;
}

.icon {
	&__search-input {
		margin: mt(5);
	}

	&__tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px;
		cursor: pointer;
		height: 72px;
		justify-content: center;
		outline: 1px solid tokens.$n-0;
		border-radius: tokens.$border-radius-extra-small;
		transition: all .2s ease-in-out;
		box-sizing: content-box;
	}

	&__tile:hover > .copy-icon {
		opacity: 1;
		transition: all .2s ease-in-out;
	}

	&__tile:hover {
		padding: pa(2);
		border-radius: tokens.$border-radius-extra-small;
		transition: all .2s ease-in-out;
		outline: 1px solid tokens.$gp-300;
	}

	&__name {
		font-size: 12px;
		color: tokens.$n-400;
		text-align: center;
		margin: mt(2);
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: stretch;
		gap: 32px;
		margin: mt(12) !important;
		row-gap: 150px;
		column-gap: 120px;
	}

	&__category {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		width: fit-content;
		gap: 20px;
		align-content: baseline;
	}

	&__category-title {
		@include tokens.subheading-2;
		grid-column: span 3;
	}
}

.pre__container {
	width: 100%;
}

.code__content {
	height: 180px;
}
</style>
