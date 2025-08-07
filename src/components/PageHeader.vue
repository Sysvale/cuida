<template>
	<header
		:class="compact ? 'page-header__container--compact' : 'page-header__container'"
	>
		<div>
			<p class="page-header__title">
				{{ title }}
			</p>

			<div
				v-if="splitedSubtitle.length > 0"
				class="d-flex"
			>
				<span
					class="page-header__subtitle"
				>
					{{ splitedSubtitle[0] }}

					<cds-link
						:href="url"
						bold
					>
						{{ fancyUrl }}
					</cds-link>

					{{ splitedSubtitle[1] }}
				</span>
			</div>
			<div
				v-else
				class="page-header__subtitle"
			>
				{{ subtitle }}
			</div>
		</div>

		<div class="page-header__aside-slot">
			<slot
				name="aside"
			/>
		</div>
	</header>
</template>
<script>
import CdsLink from '../components/Link.vue';

export default {
	name: 'PageHeader',
	components: {
		CdsLink,
	},

	props: {
		/**
		* O título das páginas nas quais o PageHeader será utilizado.
		*/
		title: {
			type: String,
			required: true,
		},
		/**
		* O subtítulo das páginas nas quais o PageHeader será utilizado.
		*/
		subtitle: {
			type: String,
			default: null,
		},
		/**
		* Quando ativa, define a largura do PageHeader como 50% do container.
		*/
		compact: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			hasURL: false,
			url: '',
			splitedSubtitle: [],
		};
	},

	computed:{
		fancyUrl() {
			return this.url.split(/http:\/\/|https:\/\//)[1];
		},
	},

	mounted() {
		this.computedSubtitle();
	},

	methods: {
		computedSubtitle() {
			const urlRegex = /\b(?:http:\/\/|https:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/\S*)?/g;

			const urls = this.subtitle?.match(urlRegex);

			if (urls && urls.length > 0) {
				this.splitedSubtitle = this.subtitle.split(urls[0]);
				this.url = urls[0];
			}
		}
	}
};
</script>
<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;
	.page-header {
		&__container {
			display: flex;
			justify-content: space-between;
			margin: tokens.mt(3);

			&--compact {
				@extend .page-header__container;
				width: 50%;
			}
		}

		&__aside-slot {
			display: flex;
			align-items: flex-end;
			padding: tokens.pl(4);
		}

		&__title {
			@include tokens.heading-3;
			font-weight: tokens.$font-weight-bold;
			color: tokens.$n-900;
			margin: tokens.mb(2);
		}

		&__subtitle {
			@include tokens.subheading-3;
			font-weight: tokens.$font-weight-regular;
			color: tokens.$n-700;
			margin: tokens.ma(0);
		}
	}
</style>
