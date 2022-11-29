import { addParameters } from '@storybook/vue';
import CuidaTheme from './theme';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Multiselect from 'vue-multiselect';
import { setupCalendar } from 'v-calendar';
import vueHljs from 'vue-hljs';
import hljs from 'highlight.js';
import 'vue-hljs/dist/style.css';

import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

import {
	ProgressBar,
	ActionsList,
	RadioButtonGroup,
	Radio,
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
	Tooltip,
	ToggleSwitch,
	CollapsibleContainer,
	Select,
	Checkbox,
	Link,
	Spinner,
	Button,
	IconButton,
	Alert,
	Loader,
	ClusteredMultiselect,
	LoadingBar,
	Table,
	SkeletonText,
	CalloutCard,
	Tabs,
	TimeInput,
	InnerTabs,
	DashboardCard,
	CarouselController,
	TextInput,
	Pagination,
	Modal,
	DateInput,
	Icon,
	TextArea,
} from '../src/components';

import {
	Palete,
	TypographyList,
	Space,
	Iconography,
	BorderBuilder,
	SourceCodeWrapper,
	CopyToken,
	Shadows,
} from '../src/docs-components';

import { longClickDirective } from 'vue-long-click';

const longClickInstance = longClickDirective({ delay: 400, interval: 50 });
Vue.directive('longclick', longClickInstance);

Vue.use(vueHljs, { hljs });
Vue.use(BootstrapVue);

setupCalendar({
	locales: {
		'pt-BR': {
			firstDayOfWeek: 1,
			masks: {
				L: 'YYYY-MM-DD',
			},
		},
	},
});

//Dependency components
Vue.component('multiselect', Multiselect);
Vue.component('vueSlider', vueSlider);

//Internal components (Docs)
Vue.component('palete', Palete);
Vue.component('border', BorderBuilder);
Vue.component('shadow-builder', Shadows);
Vue.component('copy-token', CopyToken);
Vue.component('tooltip', Tooltip);
Vue.component('typography-list', TypographyList);
Vue.component('space', Space);
Vue.component('iconography', Iconography);
Vue.component('source-code-wrapper', SourceCodeWrapper);

//External components (library)
Vue.component('cds-actions-list', ActionsList);
Vue.component('cds-progress-bar', ProgressBar);
Vue.component('cds-actions-list', ActionsList);
Vue.component('cds-radio-button-group', RadioButtonGroup);
Vue.component('cds-radio', Radio);
Vue.component('cds-timeline', Timeline);
Vue.component('cds-nav-bar', NavBar);
Vue.component('cds-popover', Popover);
Vue.component('cds-side-sheet', SideSheet);
Vue.component('cds-dropdown', DropDown);
Vue.component('cds-empty-state', EmptyState);
Vue.component('cds-badge', Badge);
Vue.component('cds-upload-input', UploadInput);
Vue.component('cds-stepper', Stepper);
Vue.component('cds-progress-circular', ProgressCircular);
Vue.component('cds-alert-card', AlertCard);
Vue.component('cds-stepper-input', StepperInput);
Vue.component('cds-panel-card', PanelCard);
Vue.component('cds-expansion-card', ExpansionCard);
Vue.component('cds-highlight', Highlight);
Vue.component('cds-scrollable', Scrollable);
Vue.component('cds-calendar', Calendar);
Vue.component('cds-filter-pill', FilterPill);
Vue.component('cds-slider', Slider);
Vue.component('cds-toggle-switch', ToggleSwitch);
Vue.component('cds-checkbox', Checkbox);
Vue.component('cds-link', Link);
Vue.component('cds-spinner', Spinner);
Vue.component('cds-button', Button);
Vue.component('cds-icon-button', IconButton);
Vue.component('cds-loader', Loader);
Vue.component('cds-clustered-multiselect', ClusteredMultiselect);
Vue.component('cds-collapsible-container', CollapsibleContainer);
Vue.component('cds-select', Select);
Vue.component('cds-alert', Alert);
Vue.component('cds-loading-bar', LoadingBar);
Vue.component('cds-table', Table);
Vue.component('cds-skeleton-text', SkeletonText);
Vue.component('cds-callout-card', CalloutCard);
Vue.component('cds-tabs', Tabs);
Vue.component('cds-time-input', TimeInput);
Vue.component('cds-inner-tabs', InnerTabs);
Vue.component('cds-dashboard-card', DashboardCard);
Vue.component('cds-carousel-controller', CarouselController);
Vue.component('cds-text-input', TextInput);
Vue.component('cds-pagination', Pagination);
Vue.component('cds-modal', Modal);
Vue.component('cds-date-input', DateInput);
Vue.component('cds-icon', Icon);
Vue.component('cds-text-area', TextArea);

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
			order: [
				'Fundação',
				['Princípios', 'Tipografia', 'Peso da Fonte', 'Cores', 'Espaçamento', 'Bordas'],
				'Componentes',
			],
		},
	},
});
