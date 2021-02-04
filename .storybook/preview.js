
import { addParameters } from "@storybook/vue";
import CuidaTheme from './theme';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Multiselect from 'vue-multiselect';
import VCalendar from 'v-calendar';

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
	AlertCard,
	StepperInput,
	ExpansionCard,
	Highlight,
	Scrollable,
	Calendar,
	FilterPill,
} from '../src/components';

import Palete from '../src/Palete.vue';
import TypographyList from '../src/TypographyList.vue';
import Space from '../src/Space.vue';
import { longClickDirective } from 'vue-long-click'

const longClickInstance = longClickDirective({delay: 400, interval: 50});
Vue.directive('longclick', longClickInstance);

Vue.use(BootstrapVue);
Vue.use(VCalendar, {
	locales: {
		'pt-BR': {
			firstDayOfWeek: 1,
			masks: {
				L: 'YYYY-MM-DD',
			},
		},
	},
});

Vue.component('multiselect', Multiselect);
Vue.component('palete', Palete);
Vue.component('space', Space);
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
Vue.component('alert-card', AlertCard);
Vue.component('stepper-input', StepperInput);
Vue.component('expansion-card', ExpansionCard);
Vue.component('highlight', Highlight);
Vue.component('scrollable', Scrollable);
Vue.component('calendar', Calendar);
Vue.component('filter-pill', FilterPill);

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
		storySort: {
			order: ['Fundação', 'Componentes'],
		},
	},
});
