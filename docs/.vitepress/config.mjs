import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import vueDocgenPlugin from '../plugins/vueDocgen'

export default defineConfig({
	title: 'Cuida',
	description: 'A design system built by Sysvale, using Vue components',
	appearance: false,
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
			{ text: 'Fundação', link: '/foundation/principles' },
			{ text: 'Componentes', link: '/components/forms/base-input' },
			{ text: 'Utils', link: '/utils/documentation-guide' },
			// { text: 'ícones', link: '/utils/' },
			// { text: 'Brand', link: '/utils/' },
			{ text: 'Cuida 2', link: 'https://sysvale.github.io/cuidaV2/?path=/docs/funda%C3%A7%C3%A3o-princ%C3%ADpios--page' }
		],

		outline: {
			level: [1, 3],
			label: 'Nessa página'
		},

		sidebar: {
			'/components/': [
				{
					text: 'Forms',
					collapsed: false,
					items: [
						{ text: 'BaseInput', link: '/components/forms/base-input' },
						{ text: 'Button', link: '/components/forms/button' },
						{ text: 'Checkbox', link: '/components/forms/checkbox' },
						{ text: 'CheckboxGroup', link: '/components/forms/checkbox-group' },
						{ text: 'Chevron', link: '/components/forms/chevron' },
						{ text: 'ColorPicker', link: '/components/forms/color-picker' },
						{ text: 'Combobox', link: '/components/forms/combobox' },
						{ text: 'DateInput', link: '/components/forms/date-input' },
						{ text: 'DynamicInputList', link: '/components/forms/dynamic-input-list' },
						{ text: 'FileInput', link: '/components/forms/file-input' },
						{ text: 'FilterSelect <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/forms/filter-select' },
						{ text: 'FlatButton', link: '/components/forms/flat-button' },
						{ text: 'FloatingActionButton', link: '/components/forms/floating-action-button' },
						{ text: 'IconButton', link: '/components/forms/icon-button' },
						{ text: 'InlineDateInput <span class="docs-badge" type="danger">Deprecated</span>' , link: '/components/forms/inline-date-input' },
						{ text: 'Label', link: '/components/forms/label' },
						{ text: 'MonthAndYearPicker', link: '/components/forms/month-and-year-picker' },
						{ text: 'MultiFileInput', link: '/components/forms/multi-file-input' },
						{ text: 'Multiselect <Badge class="docs-badge"type="warning">WIP</Badge>', link: '/components/forms/multiselect' },
						{ text: 'NumberInput', link: '/components/forms/number-input' },
						{ text: 'PasswordInput', link: '/components/forms/password-input' },
						{ text: 'PinInput', link: '/components/forms/pin-input' },
						{ text: 'Radio', link: '/components/forms/radio' },
						{ text: 'RadioButtonGroup', link: '/components/forms/radio-button-group' },
						{ text: 'SearchInput', link: '/components/forms/search-input' },
						{ text: 'Select', link: '/components/forms/select' },
						{ text: 'Slider <Badge class="docs-badge"type="warning">WIP</Badge>', link: '/components/forms/slider' },
						{ text: 'StepperInput <Badge class="docs-badge"type="warning">WIP</Badge>', link: '/components/forms/stepper-input' },
						{ text: 'Switch', link: '/components/forms/switch' },
						{ text: 'TextArea', link: '/components/forms/text-area' },
						{ text: 'TextInput', link: '/components/forms/text-input' },
						{ text: 'Tile', link: '/components/forms/tile' },
						{ text: 'TimeInput', link: '/components/forms/time-input' },
						{ text: 'WebcamModal', link: '/components/forms/webcam-modal' },
					]
				},
				{
					text: 'Display',
					collapsed: false,
					items: [
						{ text: 'ActionBar', link: '/components/display/action-bar' },
						{ text: 'ActionsList', link: '/components/display/actions-list' },
						{ text: 'Avatar', link: '/components/display/avatar' },
						{ text: 'AvatarGroup', link: '/components/display/avatar-group' },
						{ text: 'Badge', link: '/components/display/badge' },
						{ text: 'CalloutCard', link: '/components/display/callout-card' },
						{ text: 'Carousel', link: '/components/display/carousel' },
						{ text: 'Chip', link: '/components/display/chip' },
						{ text: 'DataTable', link: '/components/display/data-table' },
						{ text: 'Dropdown', link: '/components/display/dropdown' },
						{ text: 'DropdownButton', link: '/components/display/dropdown-button' },
						{ text: 'EmptyState', link: '/components/display/empty-state' },
						{ text: 'FileViewer', link: '/components/display/file-viewer' },
						{ text: 'FloatingAssistant', link: '/components/display/floating-assistant' },
						{ text: 'Highlight <Badge class="docs-badge"type="warning">WIP</Badge>', link: '/components/display/highlight' },
						{ text: 'List', link: '/components/display/list' },
						{ text: 'ProgressBar', link: '/components/display/progress-bar' },
						{ text: 'ProgressCircular', link: '/components/display/progress-circular' },
						{ text: 'Stepper', link: '/components/display/stepper' },
						{ text: 'Table', link: '/components/display/table' },
						{ text: 'Timeline', link: '/components/display/timeline' },
						{ text: 'TimelineItem', link: '/components/display/timeline-item' },
						{ text: 'Tooltip <Badge class="docs-badge"type="warning">WIP</Badge>', link: '/components/display/tooltip' },
						{ text: 'Wizard', link: '/components/display/wizard' },
					]
				},
				{
					text: 'Overlay',
					collapsed: false,
					items: [
						{ text: 'BottomSheet', link: '/components/overlays/bottom-sheet' },
						{ text: 'InteractionBlockingOverlay', link: '/components/overlays/interaction-blocking-overlay' },
						{ text: 'Modal', link: '/components/overlays/modal' },
						{ text: 'Popover', link: '/components/overlays/popover' },
						{ text: 'QuickActionBar', link: '/components/overlays/quick-action-bar' },
						{ text: 'RichTooltip', link: '/components/overlays/rich-tooltip' },
						{ text: 'SideBar', link: '/components/overlays/side-bar' },
						{ text: 'SideSheet', link: '/components/overlays/side-sheet' },
					]
				},
				{
					text: 'Containers',
					collapsed: false,
					items: [

						{ text: 'Box', link: '/components/containers/box' },
						{ text: 'Card', link: '/components/containers/card' },
						{ text: 'CarouselController', link: '/components/containers/carousel-controller' },
						{ text: 'CollapsibleContainer', link: '/components/containers/collapsible-container' },
						{ text: 'DashboardCard', link: '/components/containers/dashboard-card' },
						{ text: 'Divider', link: '/components/containers/divider' },
						{ text: 'FlexBox', link: '/components/containers/flexbox' },
						{ text: 'TruncateContainer', link: '/components/containers/truncate-container' },
						{ text: 'Grid', link: '/components/containers/grid' },
						{ text: 'PanelCard', link: '/components/containers/panel-card' },
						{ text: 'Scrollable', link: '/components/containers/scrollable' },
					]
				},
				{
					text: 'Notificação',
					collapsed: false,
					items: [
						{ text: 'Alert', link: '/components/notificação/alert' },
						{ text: 'AlertCard', link: '/components/notificação/alert-card' },
						{ text: 'DialogModal', link: '/components/notificação/dialog-modal' },
						{ text: 'Pulsar', link: '/components/notificação/pulsar' },
						{ text: 'Toast', link: '/components/notificação/toast' },
						{ text: 'ToastContainer', link: '/components/notificação/toast-container' },
					]
				},
				{
					text: 'Navegação',
					collapsed: false,
					items: [
						{ text: 'Breadcrumb', link: '/components/navegação/breadcrumb' },
						{ text: 'InnerTabs', link: '/components/navegação/inner-tabs' },
						{ text: 'Link', link: '/components/navegação/link' },
						{ text: 'MobileNavbar', link: '/components/navegação/mobile-navbar' },
						{ text: 'MobileNavigation', link: '/components/navegação/mobile-navigation' },
						{ text: 'NavBar', link: '/components/navegação/nav-bar' },
						{ text: 'PageLayout', link: '/components/navegação/page-layout' },
						{ text: 'Pagination', link: '/components/navegação/pagination' },
						{ text: 'SegmentedControl', link: '/components/navegação/segmented-control' },
						{ text: 'SideBar', link: '/components/navegação/side-bar' },
						{ text: 'Tabs <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/navegação/tabs' },
					]
				},
				{
					text: 'Loaders',
					collapsed: false,
					items: [
						{ text: 'LoadingBar <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/loaders/loading-bar' },
						{ text: 'LoadingIndicator', link: '/components/loaders/loading-indicator' },
						{ text: 'OverlayLoader', link: '/components/loaders/overlay-loader' },
						{ text: 'Skeleton', link: '/components/loaders/skeleton' },
						{ text: 'SkeletonText <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/loaders/skeleton-text' },
						{ text: 'Spinner', link: '/components/loaders/spinner' },
					]
				},
				{
					text: 'Utils',
					collapsed: false,
					items: [
						{ text: 'Clickable <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/utils/clickable' },
						{ text: 'Image', link: '/components/utils/image' },
						{ text: 'Spacer', link: '/components/utils/spacer' },
						{ text: 'Truncate', link: '/components/utils/truncate' },
					]
				},
				{
					text: 'Charts',
					collapsed: false,
					items: [
						{ text: 'BarChart', link: '/components/charts/bar-chart' },
						{ text: 'DonutChart', link: '/components/charts/donut-chart' },
						{ text: 'GaugeChart', link: '/components/charts/gauge-chart' },
						{ text: 'LineChart', link: '/components/charts/line-chart' },
						{ text: 'PieChart <span class="docs-badge" type="danger">Deprecated</span>', link: '/components/charts/pie-chart' },
						{ text: 'PolarAreaChart', link: '/components/charts/polar-area-chart' },
						{ text: 'RadialBarChart', link: '/components/charts/radial-bar-chart' },
						{ text: 'StackedBarChart', link: '/components/charts/stacked-bar-chart' },
					]
				},
				{
					text: 'Estrutural',
					collapsed: false,
					items: [
						{ text: 'AppBar', link: '/components/estrutural/app-bar' },
						{ text: 'PageContainer', link: '/components/estrutural/page-container' },
						{ text: 'PageHeader', link: '/components/estrutural/page-header' },
						{ text: 'TopAppBar', link: '/components/estrutural/top-app-bar' },
					]
				},
				{
					text: 'Tipografia',
					collapsed: false,
					items: [
						{ text: 'Text', link: '/components/tipografia/text' },
					]
				},
			],
			'/foundation/': [
				{ text: 'Princípios', link: '/foundation/principles' },
				{ text: 'Cores', link: '/foundation/cores' },
				{ text: 'Tipografia', link: '/foundation/tipografia' },
				{ text: 'Peso da fonte', link: '/foundation/peso-fonte' },
				{ text: 'Espaçamento', link: '/foundation/espacamento' },
				{ text: 'Bordas', link: '/foundation/bordas' },
				{ text: 'Elevação', link: '/foundation/elevation' },
				{ text: 'Sombras', link: '/foundation/shadow' },
				{ text: 'Transições', link: '/foundation/transições' },
				{ text: 'Iconografia', link: '/foundation/iconografia' },
			],
			'/utils/': [
				{
					text: 'Componentes da documentação',
					collapsed: false,
					items: [
						{ text: 'Guia de Uso', link: '/utils/documentation-guide' },
						{ text: 'PreviewBuilder', link: '/utils/preview-builder' },
						{ text: 'APITable', link: '/utils/api-table' },
						{ text: 'FigmaFrame', link: '/utils/figma-frame' },
						{ text: 'PreviewContainer', link: '/utils/preview-container' },
						{ text: 'PlaygroundBuilder', link: '/utils/playground-builder' },
						{ text: 'LogBuilder', link: '/utils/log-builder' },
					]
				},
				{
					text: 'Composables',
					collapsed: false,
					items: [
						{ text: 'UseToast()', link: '/utils/use-toast' },
					]
				},
				{
					text: 'Diretivas',
					collapsed: false,
					items: [
						{ text: 'v-cds-tip', link: '/utils/cds-tip' },
						{ text: 'v-cds-floatify', link: '/utils/cds-floatify' },
					]
				},
				{
					text: 'Métodos',
					collapsed: false,
					items: [
						{ text: 'ContrastChecker()', link: '/utils/contrast-checker' },
						{ text: 'HasSlot() - deprecated', link: '/utils/has-slot' },
						{ text: 'IsDeviceType()', link: '/utils/is-device-type' },
						{ text: 'RemoveAccents()', link: '/utils/remove-accents' },
						{ text: 'Rouder()', link: '/utils/rounder' },
					]
				},
				{
					text: 'Sass',
					collapsed: false,
					items: [
						{ text: 'PaleteResolver()', link: '/utils/palete-resolver' },
						{ text: 'VariantResolver()', link: '/utils/variant-resolver' },
					]
				},
			]
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Sysvale/cuida' },
			{ icon: 'npm', link: 'https://www.npmjs.com/package/@sysvale/cuida' },
			{ icon: 'figma', link: 'https://www.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=3-0&p=f' },
			{ icon: 'chromatic', link: 'https://www.chromatic.com/library?appId=6168a1779cac8c003ab99c2d' },
			{ icon: 'storybook', link: 'https://main--6168a1779cac8c003ab99c2d.chromatic.com/?path=/docs/funda%C3%A7%C3%A3o-princ%C3%ADpios--page' }
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
