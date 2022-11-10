import { themes } from '@storybook/theming';

// NOTE: nem todos os parâmetros estão funcionando aqui

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	options: {
		isFullscreen: false,
		showPanel: true,
		panelPosition: 'right',
		showAddonPanel: true,
		addonPanelInRight: false,
		sidebarAnimations: true,
		isToolshown: true,
		enableShortcuts: true,
		showToolbar: false,
		showRoots: true,
		showNav: true,
		initialActive: 'sidebar',
		selectedPanel: 'controls',
		showCanvas: false,
		viewMode: 'docs',
		previewTabs: { 
			canvas: { hidden: true } 
		},
		storySort: {
			order: [
				'Fundação',
				['Princípios', 'Tipografia', 'Peso da Fonte', 'Cores', 'Espaçamento', 'Bordas'],
				'Componentes',
			],
		},
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
