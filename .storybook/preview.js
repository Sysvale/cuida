
import { addParameters } from "@storybook/vue";
import CuidaTheme from './theme';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;

import {
	ProgressBar,
	Palete,
	ActionsList,
	RadioButtonGroup,
	Timeline,
} from '../src/components';

Vue.use(BootstrapVue);

Vue.component('palete', Palete);
Vue.component('cds-progress-bar', ProgressBar);
Vue.component('cds-actions-list', ActionsList);
Vue.component('cds-radio-button-group', RadioButtonGroup);
Vue.component('cds-timeline', Timeline);

addParameters({
	options: {
		isFullscreen: false,
		showPanel: true,
		panelPosition: 'right',
		showAddonPanel: true,
		addonPanelInRight: false,
		sidebarAnimations: true,
		isToolshown: true,
		enableShortcuts: false,
		theme: CuidaTheme,
		showRoots: true,
		showNav: true,
		initialActive: 'sidebar',
		selectedPanel: 'controls',
		showCanvas: false,
	},
});
