
import { addParameters } from "@storybook/vue";
import CuidaTheme from './theme';


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
