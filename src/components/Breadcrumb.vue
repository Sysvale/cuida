<template>
	<nav>
		<ul class="breadcrumb">
			<li
				v-for="(item, index) in items"
				:key="`${index}-${item.name}-item`"
				role="presentation"
			>
				<cds-clickable
					v-if="index === 0"
					clickable
				>
					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<cds-icon
							v-if="items.length <= 2"
							height="16"
							width="16"
							name="arrow-left-outline"
						/>

						<cds-icon
							v-else
							height="15"
							width="15"
							name="home-outline"
						/>

						<cds-spacer margin-left="2">
							{{ item.label }}
						</cds-spacer>
					</router-link>
				</cds-clickable>

				<cds-spacer
					v-else
					class="breadcrumb__item"
					margin-right="1"
					margin-left="1"
				>
					<cds-icon
						height="16"
						width="16"
						name="caret-right-outline"
						class="breadcrumb__separator"
					/>

					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<cds-clickable clickable>
							{{ item.label }}
						</cds-clickable>
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
@import '../assets/sass/tokens.scss';

.breadcrumb {
	display: flex;
	align-items: center;
	padding: pa(0);

	&__item {
		@extend .breadcrumb;
	}

	&__link {
		@extend .breadcrumb;
		@include caption;
		color: $n-600;
		border-radius: $border-radius-lil;
		padding: pa(1);
		transition: $hover;

		&:hover,
		&:hover svg {
			background-color: $bn-50;
			color: $bn-600;
			transition: $hover;
		}
	}

	&__separator {
		color: $n-600;
	}
}
</style>
