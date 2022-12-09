import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { setupCalendar } from 'v-calendar';
import { longClickDirective } from 'vue-long-click';
import _ from 'lodash';
import * as components from './components/index';
import InputFacade from 'vue-input-facade';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Cdstip from '../src/utils/directives/cdstip';

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) return;

	install.installed = true;

	Vue.component('vueSlider', vueSlider);
	Vue.use(InputFacade);

	const longClickInstance = longClickDirective({ delay: 400, interval: 50 });
	Vue.directive('longclick', longClickInstance);
	
	Vue.directive('cdstip', Cdstip);

	Object.defineProperty(Vue.prototype, '_', { value: _ });

	Object.keys(components).forEach((componentName) => {
		const prefix = componentName.search('cds-') < 0 ? 'cds-' : '';

		Vue.component(
			`${prefix}${componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
			components[componentName]
		);
	});
}

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

// Create module definition for Vue.use()
const plugin = {
	install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;
// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
