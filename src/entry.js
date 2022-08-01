import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VCalendar from 'v-calendar';
import _ from 'lodash';
import * as components from './components/index';

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) return;

	install.installed = true;

	Vue.component('vueSlider', vueSlider);

	Object.defineProperty(Vue.prototype, '_', { value: _ });

	Object.keys(components).forEach((componentName) => {
		Vue.component(
			`cds-${componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
			components[componentName]
		);
	});
}

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

	GlobalVue.use(VCalendar, {
		locales: {
			'pt-BR': {
				firstDayOfWeek: 1,
				masks: {
					L: 'YYYY-MM-DD',
				},
			},
		},
	});
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;
// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
