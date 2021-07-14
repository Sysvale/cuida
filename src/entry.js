import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { directive as onClickOutside } from 'vue-on-click-outside';
import * as components from './components/index';

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) return;

	install.installed = true;

	Vue.directive('on-click-outside', onClickOutside);

	Vue.component('vueSlider', vueSlider);

	Object.keys(components).forEach((componentName) => {
		Vue.component(
			`cds-${componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
			components[componentName],
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
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;
// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
