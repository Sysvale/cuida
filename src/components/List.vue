<template>
	<div
		v-for="(item, index) in items"
		:key="index"
		class="list"
		@click="resolveListClick"
	>
		<!-- @slot Slot utilizado para renderização de conteúdo de listagem. -->
		<slot
			v-if="useHasSlot('item')"
			name="item"
			:item="item"
		/>
		<template v-else>
			<div class="list__body">
				<div :class="`list__title--${variant}`">
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
				<slot name="actions" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { colorOptions } from '../utils/constants/colors';
import { useHasSlot } from '../utils/composables/useHasSlot';
import Icon from './Icon.vue';
import useIsMobile from '../utils/composables/useIsMobile';

const { isMobile } = useIsMobile();

const emit = defineEmits([
	/**
	 * Evento que indica que um item da listagem foi clicado
	 * (emitido apenas no mobile).
	 */
	'on-item-click'
]);

defineProps({
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
});

function resolveListClick(item) {
	if (!isMobile.value) {
		return;
	}

	emit('on-item-click', item);
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.list {
    border-bottom: none;
	padding: pYX(7, 3);
    display: flex;
    justify-content: space-between;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background: $n-10;
	}

    &__body {
        @include caption;
        padding: px(2);
        display: flex;
        flex-direction: column;
		justify-content: center;
        gap: spacer(2);
		width: 100%;
	}

	&__title {
		@include body-2;
		color: $bn-500;
		font-weight: $font-weight-semibold;
		display: flex;
		gap: spacer(2);

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-600;
		}
	}

	&__content {
		@include body-2;
	}

    &__actions {
        justify-self: flex-end;
        align-self: center;
        margin: mr(3);
		color: $n-700;
		width: 170px;
    }
}

@media screen and (max-width: 450px) {
	.list {
		padding: pYX(7, 0);
        border-bottom: 1px solid #E7EDF3;
		cursor: pointer;
	}

	.list:hover {
		background: none;
	}

	.list__title {
		gap: spacer(1);
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
