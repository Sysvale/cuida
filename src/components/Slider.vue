<template>
    <vue-slider 
        v-bind="attrs"
        v-model="value"
        :enable-cross="false"  
        :min="min"
	    :max="max"
        :tooltip="showMergeTooltip ? 'none' : 'always'"
        :dot-style="{ borderColor: '#3498db'}"
        :process-style="{ background: '#3498db' }"
    >
        <template v-slot:process="{ style }">
            <div 
                class="vue-slider-process" 
                :style="style"
            >
                <div 
                    v-if="showMergeTooltip"
                    :class="[
                        'merge-tooltip',
                        'vue-slider-dot-tooltip-inner',
                        'vue-slider-dot-tooltip-inner-top',
                    ]"
                >
                    {{ value[0] }} - {{ value[1] }}
                </div>
            </div>
        </template>
        <template v-slot:tooltip="tooltip">
            <!-- @slot Scoped slot para renderização customizada dos tooltips.
                A propriedade 'tooltip', que pode ser acessada através do slot,
                contém pos (posição do componente em %), index (o índice do slider),
                value (o valor do slider), focus (se o slider está no estado de focus ou não),
                disabled (se o slider está disabilitado ou não)
            -->
            <slot
                name="tooltip"
                :tooltip="tooltip"
            />
        </template>
    </vue-slider>
</template>
<script>


export default {
    props: {
		/**
		    * O valor mínimo do slider.
		*/
		min: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		    * O valor máximo do slider.
		*/
		max: {
			type: Number,
			default: 100,
			required: true,
		},
        /**
		    * Prop utilizada como v-model. Retorna as posições selecionadas no slider.
		*/
		value: {
			type: Array,
			default: () => [],
			required: true,
		},
	},
    computed: {
        attrs() {
			const {
				min,
				max,
				value,
				...attrs
			} = this.$attrs;

			return attrs;
		},
        showMergeTooltip() {
            return this.value[1] - this.value[0] < 10
        },
    },
}
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.vue-slider-dot {
	width: 16px!important;
	height: 16px!important;
}
.vue-slider-dot-handle {
	cursor: pointer;
	width: 100%;
	height: 100%;
	border: 2px solid $bn-200;
	border-radius: 50%;
	background-color: $bn-100;
	box-sizing: border-box;
	box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
}
.vue-slider-dot-handle {
	box-shadow: none !important;
}
.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
	box-shadow: none !important;
}
.vue-slider {
	height: 3px !important;
}
.vue-slider-dot-tooltip-inner {
	background-color: transparent;
	border-color: transparent;
	color: #000;
}
.merge-tooltip {
	position: absolute;
	left: 50%;
	bottom: 100%;
	transform: translate(-50%, -15px);
}
</style>
