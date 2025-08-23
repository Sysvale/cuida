<template>
	<nav>
		<ul class="breadcrumb">
			<li
				v-for="(item, index) in items"
				:key="`${index}-${item.name}-item`"
				role="presentation"
			>
				<CdsClickable
					v-if="index === 0"
					clickable
				>
					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<CdsIcon
							v-if="items.length <= 2"
							height="16"
							width="16"
							name="arrow-left-outline"
						/>

						<CdsIcon
							v-else
							height="15"
							width="15"
							name="home-outline"
						/>

						<cds-spacer margin-left="2">
							{{ item.label }}
						</cds-spacer>
					</router-link>
				</CdsClickable>

				<cds-spacer
					v-else
					class="breadcrumb__item"
					margin-right="1"
					margin-left="1"
				>
					<CdsIcon
						height="16"
						width="16"
						name="caret-right-outline"
						class="breadcrumb__separator"
					/>

					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<CdsClickable :clickable="index !== items.length - 1">
							{{ item.label }}
						</CdsClickable>
					</router-link>
				</cds-spacer>
			</li>
		</ul>
	</nav>
</template>

<script>
import CdsIcon from './Icon.vue';
import CdsSpacer from './Spacer.vue';
import CdsClickable from './Clickable.vue';
import isEmpty from 'lodash.isempty';

export default {
	name: 'Breadcrumb',
	components: {
		CdsIcon,
		CdsSpacer,
		CdsClickable,
	},
	props: {
		/**
		 * Define a lista dos itens do Breadcrumb a serem
		 * mostrados. Os itens da lista devem ser
		 * objetos com path ou route, e com uma label.
		 */
		items: {
			type: Array,
			default: () => ([]),
			required: true,
		},
	},

	methods: {
		resolveRoute({ route, path }) {
			const to = isEmpty(route) ? path : route;
			return to instanceof String ? { path: to } : to;
		},

		routerPushTo(item) {
			return this.resolveRoute(item) ? this.resolveRoute(item).path : null;
		},
	},
};
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.breadcrumb {
	display: flex;
	align-items: center;
	padding: tokens.pa(0);

	&__item {
		@extend .breadcrumb;
	}

	&__link {
		@extend .breadcrumb;
		@include tokens.caption;
		color: tokens.$n-600;
		border-radius: tokens.$border-radius-lil;
		padding: tokens.pa(1);
		transition: tokens.$hover;

		&:hover,
		&:hover svg {
			background-color: tokens.$bn-50;
			color: tokens.$bn-600;
			transition: tokens.$hover;
		}
	}

	&__separator {
		color: tokens.$n-600;
	}
}
</style>
