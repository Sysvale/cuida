<template>
	<CdsFlexbox direction="column" gap="4" class="inputs-container">
		<template v-for="(data, index) in propsData">
			<CdsFlexbox
				v-if="data.type.name === 'string' && data.values"
				justify="space-between"
				gap="3"
				class="preview-line"
			>
				<CdsText class="prop-name">
					{{ capitalize(data.name) }}
				</CdsText>

				<CdsSelect
					label=""
					v-model="normalizedPropsData[index][data.name]"
					:options="formatOptions(data.values)"
					returnValue
				/>
			</CdsFlexbox>

			<CdsFlexbox
				v-else-if="data.type.name === 'string'"
				justify="space-between"
				class="preview-line"
			>
				<CdsText class="prop-name">
					{{ capitalize(data.name) }}
				</CdsText>

				<CdsTextInput
					label=""
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
					v-model="normalizedPropsData[index][data.name]"
				/>
			</CdsFlexbox>
		</template>
	</CdsFlexbox>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import componentsData from '../.docgen/components.json'
import CdsTextInput from '@/components/TextInput.vue';
import CdsSelect from '@/components/Select.vue';
import CdsSwitch from '@/components/Switch.vue';
import CdsText from '@/components/Text.vue';
import CdsFlexbox from '@/components/Flexbox.vue';
import CdsInnerTabs from '@/components/InnerTabs.vue';

const props = defineProps<{
	component: string
}>()

const emits = defineEmits(['update']);

const normalizedPropsData = ref({});
const payload = ref({});

const componentData = computed(() => componentsData[props.component] || {});
const propsData = computed(() => componentData.value?.props);

function formatOptions(val) {
	return val.map(v => {
		return {
			id: v.match(/'(\S+)'/)[1],
			value: v.match(/'(\S+)'/)[1],
		}
	})
}

normalizedPropsData.value = propsData.value.map((propData) => {
	let rawValue = propData.defaultValue.value;
	let parsedValue;

	if (rawValue === 'null') {
		parsedValue = '';
	} else if (rawValue === 'true') {
		parsedValue = true;
	} else if (rawValue === 'false') {
		parsedValue = false;
	} else if (typeof rawValue === 'string') {
		const match = rawValue.match(/'([^']+)'/);
		parsedValue = match ? match[1] : rawValue;
	} else {
		parsedValue = rawValue;
	}

	return { [propData.name]: parsedValue };
});

normalizedPropsData.value.forEach((item) => {
	const [key, value] = Object.entries(item)[0];

	payload.value[key] = value;
});

function capitalize(str) {
	return str?.[0]?.toUpperCase() + str?.slice(1) ?? '';
}

watch(normalizedPropsData, () => {
	normalizedPropsData.value.forEach((item) => {
		const [key, value] = Object.entries(item)[0]
		payload.value[key] = value;
	});

	emits('update', payload.value);
}, { deep: true})
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
