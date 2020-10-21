
import { addParameters } from "@storybook/vue";
import CuidaTheme from './theme';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Multiselect from 'vue-multiselect';

import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;

import {
	ProgressBar,
	ActionsList,
	StatusItem,
	RadioButtonGroup,
	Timeline,
	NavBar,
	Popover,
	SideSheet,
	DropDown,
	EmptyState,
	Badge,
	UploadInput,
	Stepper,
	ProgressCircular,
} from '../src/components';

import Palete from '../src/Palete.vue';
import TypographyList from '../src/TypographyList.vue';

Vue.use(BootstrapVue);

Vue.component('multiselect', Multiselect);
Vue.component('palete', Palete);
Vue.component('actions-list', ActionsList);
Vue.component('status-item', StatusItem);
Vue.component('progress-bar', ProgressBar);
Vue.component('actions-list', ActionsList);
Vue.component('radio-button-group', RadioButtonGroup);
Vue.component('timeline', Timeline);
Vue.component('nav-bar', NavBar);
Vue.component('popover', Popover);
Vue.component('side-sheet', SideSheet);
Vue.component('dropdown', DropDown);
Vue.component('empty-state', EmptyState);
Vue.component('badge', Badge);
Vue.component('typography-list', TypographyList);
Vue.component('upload-input', UploadInput);
Vue.component('stepper', Stepper);
Vue.component('progress-circular', ProgressCircular);

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
