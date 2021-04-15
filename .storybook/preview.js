
import { addParameters } from "@storybook/vue";
import CuidaTheme from './theme';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Multiselect from 'vue-multiselect';
import VCalendar from 'v-calendar';
import vueHljs from "vue-hljs";
import hljs from "highlight.js";
import "vue-hljs/dist/style.css";


import { directive as onClickOutside } from 'vue-on-click-outside' 
Vue.directive('on-click-outside', onClickOutside)

import vueSlider from 'vue-slider-component/src/vue2-slider.vue';

import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

import {
	ProgressBar,
	ActionsList,
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
	PanelCard,
	ExpansionCard,
	Highlight,
	Scrollable,
	Calendar,
	FilterPill,
	Slider,
	Totalizer,
	Tooltip,
	ToggleSwitch,
} from '../src/components';

import {
	Palete,
	TypographyList,
	Space,
	Iconography,
	BorderBuilder,
	SourceCodeWrapper,
	CopyToken,
} from '../src/docs-components';

import { longClickDirective } from 'vue-long-click'

const longClickInstance = longClickDirective({delay: 400, interval: 50});
Vue.directive('longclick', longClickInstance);

Vue.use(vueHljs, { hljs });
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
Vue.component('iconography', Iconography);
Vue.component('space', Space);
Vue.component('actions-list', ActionsList);
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
Vue.component('panel-card', PanelCard);
Vue.component('expansion-card', ExpansionCard);
Vue.component('highlight', Highlight);
Vue.component('scrollable', Scrollable);
Vue.component('border', BorderBuilder);
Vue.component('copy-token', CopyToken);
Vue.component('calendar', Calendar);
Vue.component('filter-pill', FilterPill);
Vue.component('slider', Slider);
Vue.component('totalizer', Totalizer);
Vue.component('vueSlider', vueSlider);
Vue.component('tooltip', Tooltip);
Vue.component('source-code-wrapper', SourceCodeWrapper);
Vue.component('toggle-switch', ToggleSwitch);

addParameters({
	options: {
		isFullscreen: false,
		showPanel: true,
		panelPosition: 'right',
		showAddonPanel: true,
		addonPanelInRight: false,
		sidebarAnimations: true,
		isToolshown: true,
		enableShortcuts: true,
		theme: CuidaTheme,
		showRoots: true,
		showNav: true,
		initialActive: 'sidebar',
		selectedPanel: 'controls',
		showCanvas: false,
		storySort: {
			order: ['Fundação', ['Principios', 'Tipografia', 'Peso da Fonte', 'Cores', 'Espaçamento', 'Bordas'], 'Componentes'],
		},
	},
});
