import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import vueDocgenPlugin from '../plugins/vueDocgen'

export default defineConfig({
	title: 'Cuida',
	description: 'A design system built by Sysvale, using Vue components',

	head: [
		[
			'link',
			{
				rel: 'stylesheet',
				href: 'https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap',
			},
		],
	],

	themeConfig: {
		search: {
			provider: 'local'
		},
		nav: [
			// { text: 'Fundação', link: '/foundation/' },
			{ text: 'Componentes', link: '/components/' },
			// { text: 'Utils', link: '/utils/' },
			// { text: 'ícones', link: '/utils/' },
			// { text: 'Brand', link: '/utils/' },
			{ text: 'Cuida 2', link: 'https://sysvale.github.io/cuidaV2/?path=/docs/funda%C3%A7%C3%A3o-princ%C3%ADpios--page' }
		],

		outline: {
			level: [1, 2, 3],
			label: 'Nessa página'
		},

		sidebar: {
			// '/foundation/': [
			// 	{
			// 		text: 'Design Tokens',
			// 		items: [
			// 			{ text: 'Cores', link: '/foundation/cores' },
			// 			{ text: 'Tipografia', link: '/foundation/tipografia' },
			// 			{ text: 'Espaçamento', link: '/foundation/espacamento' },
			// 			{ text: 'Bordas', link: '/foundation/bordas' },
			// 			{ text: 'Elevação', link: '/foundation/elevation' },
			// 			{ text: 'Sombras', link: '/foundation/shadow' },
			// 			{ text: 'Transições', link: '/foundation/transicoes' },
			// 			{ text: 'Iconografia', link: '/foundation/iconografia' },
			// 			{ text: 'Peso da Fonte', link: '/foundation/peso-fonte' },
			// 			{ text: 'Princípios', link: '/foundation/principles' }
			// 		]
			// 	}
			// ],
			'/components/': [
				{
					text: 'Forms',
					items: [
						{ text: 'Button <Badge class="badge" type="info">ready</Badge>', link: '/components/forms/button' },
						{ text: 'FlatButton <Badge class="badge" type="info">ready</Badge>', link: '/components/forms/flat-button' },
						// { text: 'BaseInput', link: '/components/forms/base-input' },
						// { text: 'TextInput', link: '/components/forms/text-input' },
						// { text: 'TextArea', link: '/components/forms/text-area' },
						// { text: 'Select', link: '/components/forms/select' },
						// { text: 'Checkbox', link: '/components/forms/checkbox' },
						// { text: 'Radio', link: '/components/forms/radio' },
						{ text: 'Switch', link: '/components/forms/switch' },
						// { text: 'Slider', link: '/components/forms/slider' }
					]
				},
				{
					text: 'Display',
					items: [
						{ text: 'ActionBar <Badge class="badge" type="info">ready</Badge>', link: '/components/display/action-bar' },
						{ text: 'ActionsList <Badge class="badge" type="info">ready</Badge>', link: '/components/display/actions-list' },
						{ text: 'Avatar', link: '/components/display/avatar' },
						{ text: 'AvatarGroup', link: '/components/display/avatar-group' },
						{ text: 'Badge <Badge class="badge" type="info">ready</Badge>', link: '/components/display/badge' },
						{ text: 'CalloutCard', link: '/components/display/callout-card' },
						{ text: 'Carousel', link: '/components/display/carousel' },
						{ text: 'DataTable', link: '/components/display/data-table' },
						{ text: 'Dropdown', link: '/components/display/dropdown' },
						{ text: 'DropdownButton', link: '/components/display/dropdown-button' },
						{ text: 'EmptyState <Badge class="badge" type="info">ready</Badge>', link: '/components/display/empty-state' },
						{ text: 'Highlight', link: '/components/display/highlight' },
						// { text: 'Tooltip', link: '/components/display/tooltip' },
						{ text: 'Table', link: '/components/display/table' },
						{ text: 'Card', link: '/components/containers/card' },
					]
				},
				{
					text: 'Overlay',
					items: [
						{ text: 'QuickActionBar', link: '/components/overlays/quick-action-bar' },
					]
				},
				{
					text: 'Utils',
					items: [
						{ text: 'Image <Badge class="badge" type="info">ready</Badge>', link: '/components/utils/image' },
						{ text: 'Clickable', link: '/components/utils/clickable' },

					]
				},
				{
					text: 'Notificação',
					items: [
						{ text: 'Alert <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/alert' },
					]
				},
				{
					text: 'Tipografia',
					items: [
						{ text: 'Text <Badge class="badge" type="info">ready</Badge>', link: '/components/tipografia/text' },
					]
				},
				// {
				// 	text: 'Containers',
				// 	items: [
				// 		{ text: 'Box', link: '/components/containers/box' },
				// 		{ text: 'card', link: '/components/containers/card' },
				// 		{ text: 'Carousel controller', link: '/components/containers/carousel-controller' },
				// 		{ text: 'Collapsible Container', link: '/components/containers/collapsible-container' },
				// 		{ text: 'Dashboard Card', link: '/components/containers/dashboard-card' },
				// 		{ text: 'Divider', link: '/components/containers/divider' },
				// 		{ text: 'Flexbox', link: '/components/containers/flexbox' },
				// 		{ text: 'Grid', link: '/components/containers/grid' },
				// 		{ text: 'Panel Card', link: '/components/containers/panel-card' },
				// 		{ text: 'Scrollable', link: '/components/containers/scrollable' }
				// 	]
				// },
				// {
				// 	text: 'Navigation',
				// 	items: [
				// 		{ text: 'NavBar', link: '/components/navbar' },
				// 		{ text: 'SideBar', link: '/components/sidebar' },
				// 		{ text: 'Breadcrumb', link: '/components/breadcrumb' },
				// 		{ text: 'Tabs', link: '/components/tabs' },
				// 		{ text: 'Pagination', link: '/components/pagination' }
				// 	]
				// },
				// {
				// 	text: 'Feedback',
				// 	items: [
				// 		{ text: 'Alert', link: '/components/alert' },
				// 		{ text: 'Toast', link: '/components/toast' },
				// 		{ text: 'Modal', link: '/components/modal' },
				// 		{ text: 'Tooltip', link: '/components/tooltip' },
				// 		{ text: 'Spinner', link: '/components/spinner' }
				// 	]
				// }
			],
			// '/utils/': [
			// 	{
			// 		text: 'Utilities',
			// 		items: [
			// 			{ text: 'CdsFloatify', link: '/utils/cds-floatify' },
			// 			{ text: 'CdsTip', link: '/utils/cds-tip' },
			// 			{ text: 'ContrastChecker', link: '/utils/contrast-checker' },
			// 			{ text: 'HasSlot', link: '/utils/has-slot' },
			// 			{ text: 'IsDeviceType', link: '/utils/is-device-type' },
			// 			{ text: 'PaleteResolver', link: '/utils/palete-resolver' },
			// 			{ text: 'RemoveAccents', link: '/utils/remove-accents' },
			// 			{ text: 'Rounder', link: '/utils/rounder' },
			// 			{ text: 'VariantResolver', link: '/utils/variant-resolver' }
			// 		]
			// 	},
			// 	{
			// 		text: 'Composables',
			// 		items: [
			// 			{ text: 'useToast', link: '/utils/use-toast' }
			// 		]
			// 	}
			// ]
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Sysvale/cuida' },
			{ icon: 'npm', link: 'https://github.com/Sysvale/cuida' },
			{ icon: 'figma', link: 'https://github.com/Sysvale/cuida' },
			{ icon: 'chromatic', link: 'https://github.com/Sysvale/cuida' }
		],

		footer: {
			message: 'Released under the Apache-2.0 License.',
			copyright: 'Copyright © 2020-present Sysvale'
		},

		lastUpdated: {
			text: 'Última atualização',
			formatOptions: {
				dateStyle: 'short',
				timeStyle: 'short'
			},
		},

		docFooter: {
			prev: false,
			next: false
		},
	},

	vite: {
		plugins: [vueDocgenPlugin()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('../../src', import.meta.url))
			}
		}
	},

	vue: {
		template: {
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith('cds-')
			}
		}
	}
});
