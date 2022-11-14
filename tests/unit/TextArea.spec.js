import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import TextArea from '../../src/components/TextArea.vue';

const localVue = createLocalVue();

test('component is mounted properly', () => {
	const wrapper = mount(TextArea, {
		localVue,
		propsData: {
			label: 'Uma verdade difícil de engolir',
			value: `"O JavaScript me deu" pode ser usado desde a aquisição de uma casa,
            à um remedinho tarja preta.`,
		},
	});

	expect(wrapper.html()).toMatchSnapshot();
});

test('if fluid class is applied based on prop', async () => {
	const wrapper = shallowMount(TextArea, {
		localVue,
		propsData: {
			fluid: true,
		},
	});

	await flushPromises();

	expect(wrapper.find('.textarea--fluid').exists()).toBeTruthy();
});

test('if textarea is blocked when the prop disabled is true', async () => {
	const wrapper = shallowMount(TextArea, {
		localVue,
		propsData: {
			value: '',
			disabled: true,
		},
	});

	wrapper.find('#textarea').trigger('input');

	await flushPromises();

	expect(wrapper.emitted().input).toBeFalsy();
});

test('if the error message is displayed when state is invalid', () => {
	const wrapper = shallowMount(TextArea, {
		localVue,
		propsData: {
			value: '',
			state: 'invalid',
			errorMessage: 'O erro que você não esperava',
		},
	});

	expect(wrapper.find('.textarea__error-message').text()).toBe('O erro que você não esperava');
});

test('if as slot is correctly rendered', () => {
	const slotTextArea = {
		render() {
			return 'Custom content of slot for component';
		},
	};

	const wrapper = mount(TextArea, {
		localVue,
		value: '',
		slots: [slotTextArea],
	});

	expect(wrapper.findComponent(slotTextArea)).toBeTruthy();
});
