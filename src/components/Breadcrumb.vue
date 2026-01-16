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
						:class="`breadcrumb__link breadcrumb__link--${variant}`"
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

						<CdsSpacer margin-left="2">
							{{ item.label }}
						</CdsSpacer>
					</router-link>
				</CdsClickable>

				<CdsSpacer
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
						:class="`breadcrumb__link breadcrumb__link--${variant}`"
					>
						<CdsClickable :clickable="index !== items.length - 1">
							{{ item.label }}
						</CdsClickable>
					</router-link>
				</CdsSpacer>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import CdsIcon from './Icon.vue';
import CdsSpacer from './Spacer.vue';
import CdsClickable from './Clickable.vue';
import isEmpty from 'lodash.isempty';

defineOptions({ name: 'CdsBreadcrumb' });

defineProps({
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
	/**
	 * A variante de cor. São 10 variantes:
	* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'blue',
	},
});

function resolveRoute({ route, path }) {
	const to = isEmpty(route) ? path : route;
	return to instanceof String ? { path: to } : to;
}

function routerPushTo(item) {
	return resolveRoute(item) ? resolveRoute(item).path : null;
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.breadcrumb {
	@include tokens.caption;
	display: flex;
	align-items: center;
	padding: tokens.pa(0);

	&__item {
		@extend .breadcrumb;
	}

	&__link {
		@extend .breadcrumb;
		border-radius: tokens.$border-radius-lil;
		padding: tokens.pa(1);
		transition: tokens.$hover;
		color: tokens.$n-600;

		@include tokens.variantResolver using (
			$color-name,
			$shade-50,
			$shade-100,
			$shade-200,
			$shade-300,
			$base-color,
			$shade-500,
			$shade-600
		) {
			&:hover,
			&:hover svg {
				background-color: $shade-50;
				color: $shade-600;
				transition: tokens.$hover;
			}
		}
	}

	&__separator {
		color: tokens.$n-600;
	}
}
</style>
