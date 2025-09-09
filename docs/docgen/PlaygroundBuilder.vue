<template>
	<div>
		<CdsFlexbox direction="column" gap="4" class="inputs-container">
			<template v-for="(data, index) in propsData">
				<template v-if="normalizedPropsData[index]">
					<CdsFlexbox
						v-if="data.type.name.includes('number')"
						justify="space-between"
						class="preview-line"
					>
						<CdsText class="prop-name">
							{{ capitalize(data.name) }}
						</CdsText>
	
						<div v-if="typeof data.min !== 'undefined' && typeof data.max !== 'undefined'">
							<CdsSlider
								v-model="normalizedPropsData[index][data.name]"
								:min="data.min"
								:max="data.max"
								:step="data.max / 20"
								withText
							/>
						</div>
	
						<CdsNumberInput
							v-else-if="Object.keys(normalizedPropsData).length > 0"
							label=""
							lazy
							v-model="normalizedPropsData[index][data.name]"
						/>
					</CdsFlexbox>

					<CdsFlexbox
						v-else-if="data.type.name.includes('string') && data.values"
						justify="space-between"
						gap="3"
						class="preview-line"
					>
						<CdsText class="prop-name">
							{{ capitalize(data.name) }}
						</CdsText>
		
						<CdsSelect
							v-if="Object.keys(normalizedPropsData).length > 0"
							label=""
							v-model="normalizedPropsData[index][data.name]"
							:options="formatOptions(data.values)"
							returnValue
						/>
					</CdsFlexbox>
		
					<CdsFlexbox
						v-else-if="data.type.name.includes('string')"
						justify="space-between"
						class="preview-line"
					>
						<CdsText class="prop-name">
							{{ capitalize(data.name) }}
						</CdsText>
		
						<CdsTextInput
							v-if="Object.keys(normalizedPropsData).length > 0"
							label=""
							lazy
							v-model="normalizedPropsData[index][data.name]"
						/>
					</CdsFlexbox>
		
					<CdsFlexbox
						v-if="data.type.name === 'boolean'"
						justify="space-between"
						class="preview-line"
					>
						<CdsText class="prop-name">
							{{ capitalize(data.name) }}
						</CdsText>
		
						<CdsSwitch
							v-if="Object.keys(normalizedPropsData).length > 0"
							v-model="normalizedPropsData[index][data.name]"
						/>
					</CdsFlexbox>
				</template>
			</template>
		</CdsFlexbox>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import componentsData from '../.docgen/components.json'
import CdsTextInput from '@/components/TextInput.vue';
import CdsNumberInput from '@/components/NumberInput.vue';
import CdsSelect from '@/components/Select.vue';
import CdsSwitch from '@/components/Switch.vue';
import CdsText from '@/components/Text.vue';
import CdsSlider from '@/components/SliderNext.vue';

const model = defineModel('args');

const props = defineProps<{
	/**
	* Nome do componente.
	*/
	component: string,
}>();

const emits = defineEmits(['update']);

const normalizedPropsData = ref({});
const test = ref(0);

const componentData = computed(() => componentsData[props.component] || {});
const propsData = computed(() => componentData.value?.props);

function formatOptions(val) {
	return val.map(v => {
		return {
			id: v.match(/'(\S+)'/) !== null ? v.match(/'(\S+)'/)[1] : v,
			value: v.match(/'(\S+)'/) !== null ? v.match(/'(\S+)'/)[1] : v,
		}
	})
}

watch(model, () => {
	nextTick(() => {
		normalizedPropsData.value = propsData.value.map((propData) => {
			let rawValue = propData.defaultValue?.value;
			let parsedValue;
	
			if (
				rawValue === 'null'
				|| rawValue === null
				|| typeof rawValue === 'undefined'
			) {
				parsedValue = '';
			} else if (rawValue === 'true') {
				parsedValue = true;
			} else if (rawValue === 'false') {
				parsedValue = false;
			} else if (rawValue === '[]') {
				parsedValue = '';
			} else if (typeof rawValue === 'string') {
				const match = rawValue.match(/'([^']+)'/);
				parsedValue = match ? match[1].replace(/['"]/g, '') : rawValue.replace(/['"]/g, '');
			} else {
				parsedValue = rawValue;
			}

			if (!isNaN(parsedValue) && !isNaN(parseFloat(parsedValue)) && isFinite(parsedValue)) {
				parsedValue = Number(parsedValue);
			}
	
			if (model.value?.[propData.name]) {
				return { [propData.name]: model.value?.[propData.name]};
			}
	
			return { [propData.name]: parsedValue };
		});
	
		normalizedPropsData.value.forEach((item) => {
			const [key, value] = Object.entries(item)[0];
	
			model.value[key] = value;
		});
	});

}, { immediate: true, deep: true})

function capitalize(str) {
	return str?.[0]?.toUpperCase() + str?.slice(1) ?? '';
}

watch(normalizedPropsData, () => {
	normalizedPropsData.value.forEach((item) => {
		const [key, value] = Object.entries(item)[0]
		model.value[key] = value;
	});
}, { deep: true})


export type PlaygroundBuilderType = typeof import("./PlaygroundBuilder.vue")["default"];
</script>

<style scoped>
:deep(.base-input__field) {
	height: 32px !important;
	font-size: 12px;
}

.inputs-container {
	padding: 4px 24px;
}

.prop-name {
	font-weight: 600;
}

.preview-line {
	height: 36px;
}
</style>
