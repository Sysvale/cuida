<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-for="(item, index) in items"
		:key="index"
		class="list"
		@click="resolveListClick(item)"
	>
		<!-- @slot Slot utilizado para renderização de conteúdo de listagem. -->
		<slot
			v-if="useHasSlot('item')"
			name="item"
			:item="item"
		/>
		<template v-else>
			<div class="list__body">
				<div
					class="list__title"
					:class="`list__title--${variant}`"
				>
					{{ item.title }}
				</div>
				<div class="list__content">
					{{ item.content }}
				</div>
			</div>
		</template>
		<div class="list__actions">
			<icon
				v-if="isMobile"
				height="24"
				width="24"
				name="caret-right-outline"
			/>
			<div v-else>
				<!-- @slot Slot utilizado para renderização de botões de ação para listagem desktop. -->
				<slot
					name="actions"
					:item="item"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { colorOptions } from '../utils/constants/colors';
import { useHasSlot } from '../utils/composables/useHasSlot';
import Icon from './Icon.vue';
import useIsMobile from '../utils/composables/useIsMobile';

const { isMobile } = useIsMobile();

const emit = defineEmits([
	/**
	 * Evento que indica que um item da listagem foi clicado. A prop __clickable__ tem que estar definida como __true__.
	 */
	'click'
]);

const props = defineProps({
	/**
	 * Lista de itens a serem exibidos no componente. Cada item deve seguir o formato padrão:
	 *
	 * ```js
	 * { title: 'Título do item', content: 'Conteúdo do item' }
	 * ```
	 *
	 * Esse formato permite o uso da listagem no layout padrão, onde cada item
	 * será exibido com um título e um conteúdo.
	 *
	 * Caso deseje utilizar uma estrutura personalizada, você pode fornecer os
	 * itens no formato desejado e personalizar a exibição dentro do slot `item`.
	 */
	items: {
		type: Array,
		required: true,
		default: () => ([]),
	},

	/**
	 * A variante de cor do título são 10 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange','amber' e 'white'.
	 */
	variant: {
		type: String,
		default: 'blue',
		validator: (value) => colorOptions.includes(value),
	},
	/**
	 * Indica se o componente deve ser clicável ou não.
	 */
	clickable: {
		type: Boolean,
		default: false,
	},
});

const resolveHover = computed(() => props.clickable ? 'pointer' : '');

function resolveListClick(item) {
	if (!props.clickable && !isMobile.value) {
		return;
	}

	emit('click', item);
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.list {
	border-bottom: none;
	padding: tokens.pYX(7, 3);
	display: flex;
	justify-content: space-between;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background: tokens.$n-10;
		cursor: v-bind(resolveHover);
	}

    &__body {
		@include tokens.caption;
		color: tokens.$n-800;
		padding: tokens.px(2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: tokens.spacer(2);
		width: 100%;
	}

	&__title {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		display: flex;
		gap: tokens.spacer(2);

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-600;
		}
	}

	&__content {
		@include tokens.body-2;
	}

    &__actions {
		justify-self: flex-end;
		align-self: center;
		margin: tokens.mr(3);
		color: tokens.$n-700;
		width: 170px;
    }
}

@media screen and (max-width: 450px) {
	.list {
		padding: tokens.pYX(7, 0);
		border-bottom: 1px solid #E7EDF3;
		cursor: pointer;
	}

	.list:hover {
		background: none;
	}

	.list__title {
		gap: tokens.spacer(1);
	}

	.list__body {
		min-width: 250px;
	}

	.list__actions {
		width: 25px;
	}
}

@media screen and (min-width: 450px) {
	.list__actions {
		display: flex;
		justify-content: end;
	}
}

</style>
