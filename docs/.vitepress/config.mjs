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
			level: [1, 3],
			label: 'Nessa página'
		},

		sidebar: {
			'/components/': [
				{
					text: 'Forms',
					collapsed: false,
					items: [
						{ text: 'Button <Badge class="badge" type="info">ready</Badge>', link: '/components/forms/button' },
						{ text: 'FlatButton <Badge class="badge" type="info">ready</Badge>', link: '/components/forms/flat-button' },
						{ text: 'BaseInput', link: '/components/forms/base-input' },
						{ text: 'BaseMobileInput', link: '/components/forms/base-mobile-input' },
						{ text: 'Checkbox', link: '/components/forms/checkbox' },
						{ text: 'CheckboxGroup', link: '/components/forms/checkbox-group' },
						{ text: 'Chevron', link: '/components/forms/chevron' },
						{ text: 'ColorPicker', link: '/components/forms/color-picker' },
						{ text: 'Combobox', link: '/components/forms/combobox' },
						{ text: 'DateInput', link: '/components/forms/date-input' },
						{ text: 'DynamicInputList', link: '/components/forms/dynamic-input-list' },
						{ text: 'FileInput', link: '/components/forms/file-input' },
						{ text: 'FilterSelect', link: '/components/forms/filter-select' },
						{ text: 'FloatingActionButton', link: '/components/forms/floating-action-button' },
						{ text: 'IconButton', link: '/components/forms/icon-button' },
						{ text: 'InlineDateInput', link: '/components/forms/inline-date-input' },
						{ text: 'Label', link: '/components/forms/label' },
						{ text: 'MonthAndYearPicker', link: '/components/forms/month-and-year-picker' },
						{ text: 'MultiFileInput', link: '/components/forms/multi-file-input' },
						{ text: 'Multiselect', link: '/components/forms/multiselect' },
						{ text: 'NumberInput', link: '/components/forms/number-input' },
						{ text: 'PasswordInput', link: '/components/forms/password-input' },
						{ text: 'PinInput', link: '/components/forms/pin-input' },
						{ text: 'Radio', link: '/components/forms/radio' },
						{ text: 'RadioButtonGroup', link: '/components/forms/radio-button-group' },
						{ text: 'RequiredIndicator', link: '/components/forms/required-indicator' },
						{ text: 'SearchInput', link: '/components/forms/search-input' },
						
						{ text: 'Select', link: '/components/forms/select' },
						{ text: 'Slider', link: '/components/forms/slider' },
						{ text: 'Stepper', link: '/components/forms/stepper' },
						{ text: 'StepperInput', link: '/components/forms/stepper-input' },
						{ text: 'Switch', link: '/components/forms/switch' },
						{ text: 'TextArea', link: '/components/forms/text-area' },
						{ text: 'TextInput', link: '/components/forms/text-input' },
						{ text: 'TimeInput', link: '/components/forms/time-input' },
						{ text: 'WebcamModal', link: '/components/forms/webcam-modal' },
						{ text: 'Tile', link: '/components/containers/tile' },
					]
				},
				{
					text: 'Display',
					collapsed: false,
					items: [
						{ text: 'ActionBar <Badge class="badge" type="info">ready</Badge>', link: '/components/display/action-bar' },
						{ text: 'ActionsList <Badge class="badge" type="info">ready</Badge>', link: '/components/display/actions-list' },
						{ text: 'Avatar <Badge class="badge" type="info">ready</Badge>', link: '/components/display/avatar' },
						{ text: 'AvatarGroup <Badge class="badge" type="info">ready</Badge>', link: '/components/display/avatar-group' },
						{ text: 'Badge <Badge class="badge" type="info">ready</Badge>', link: '/components/display/badge' },
						{ text: 'CalloutCard <Badge class="badge" type="info">ready</Badge>', link: '/components/display/callout-card' },
						{ text: 'Carousel <Badge class="badge" type="info">ready</Badge>', link: '/components/display/carousel' },
						{ text: 'Chip', link: '/components/display/chip' },
						{ text: 'DataTable', link: '/components/display/data-table' },
						{ text: 'Dropdown', link: '/components/display/dropdown' },
						{ text: 'DropdownButton', link: '/components/display/dropdown-button' },
						{ text: 'EmptyState <Badge class="badge" type="info">ready</Badge>', link: '/components/display/empty-state' },
						{ text: 'FileViewer', link: '/components/display/file-viewer' },
						{ text: 'Highlight', link: '/components/display/highlight' },
						{ text: 'Icon', link: '/components/display/icon' },

						{ text: 'List', link: '/components/display/list' },
						{ text: 'ProgressBar', link: '/components/display/progress-bar' },
						{ text: 'ProgressCircular', link: '/components/display/progress-circular' },
						{ text: 'Table', link: '/components/display/table' },
						{ text: 'Timeline', link: '/components/display/timeline' },
						{ text: 'TimelineItem', link: '/components/display/timeline-item' },
						{ text: 'Tooltip', link: '/components/display/tooltip' },
					]
				},
				{
					text: 'Containers',
					collapsed: false,
					items: [
						
						{ text: 'Box <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/box' },
						{ text: 'Card <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/card' },
						{ text: 'CarouselController <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/carousel-controller' },
						{ text: 'CollapsibleContainer <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/collapsible-container' },
						{ text: 'DashboardCard <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/dashboard-card' },
						{ text: 'Divider <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/divider' },
						{ text: 'FlexBox <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/flexbox' },
						{ text: 'Grid <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/grid' },


						{ text: 'PanelCard <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/panel-card' },
						{ text: 'Scrollable <Badge class="badge" type="info">ready</Badge>', link: '/components/containers/scrollable' },
						
						
						
						
						// { text: 'Dialog', link: '/components/overlays/dialog' },
						// { text: 'DialogModal', link: '/components/overlays/dialog-modal' },
						// { text: 'FloatingAssistant', link: '/components/overlays/floating-assistant' },
						// { text: 'Toast', link: '/components/overlays/toast' },
						// { text: 'ToastContainer', link: '/components/overlays/toast-container' },
						// { text: 'TopAppBar', link: '/components/overlays/top-app-bar' },
					]
				},
				{
					text: 'Overlay',
					collapsed: false,
					items: [
						{ text: 'BottomSheet <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/bottom-sheet' },
						{ text: 'InteractionBlockingOverlay <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/interaction-blocking-overlay' },
						{ text: 'Modal <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/modal' },
						{ text: 'Popover <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/popover' },
						{ text: 'QuickActionBar <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/quick-action-bar' },
						{ text: 'RichTooltip <Badge class="badge" type="info">ready</Badge>', link: '/components/forms/rich-tooltip' },
						{ text: 'SideSheet <Badge class="badge" type="info">ready</Badge>', link: '/components/overlays/side-sheet' },
					]
				},
				{
					text: 'Loaders',
					collapsed: false,
					items: [
						{ text: 'LoadingBar <Badge class="badge" type="info">ready - deprecated</Badge>', link: '/components/loaders/loading-bar' },
						{ text: 'LoadingIndicator <Badge class="badge" type="info">ready</Badge>', link: '/components/loaders/loading-indicator' },
						{ text: 'OverlayLoader <Badge class="badge" type="info">ready</Badge>', link: '/components/loaders/overlay-loader' },
						{ text: 'Skeleton <Badge class="badge" type="info">ready</Badge>', link: '/components/loaders/skeleton' },
						{ text: 'SkeletonText <Badge class="badge" type="info">ready - deprecated</Badge>', link: '/components/loaders/skeleton-text' },
						{ text: 'Spinner <Badge class="badge" type="info">ready</Badge>', link: '/components/loaders/spinner' },
					]
				},
				{
					text: 'Utils',
					collapsed: false,
					items: [
						{ text: 'Clickable <Badge class="badge" type="info">ready - deprecated</Badge>', link: '/components/utils/clickable' },
						{ text: 'Image <Badge class="badge" type="info">ready</Badge>', link: '/components/utils/image' },
						{ text: 'Spacer', link: '/components/utils/spacer' },
						{ text: 'Truncate <Badge class="badge" type="info">ready</Badge>', link: '/components/utils/truncate' },
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
						{ text: 'PieChart', link: '/components/charts/pie-chart' },
						{ text: 'PolarAreaChart', link: '/components/charts/polar-area-chart' },
						{ text: 'RadialBarChart', link: '/components/charts/radial-bar-chart' },
						{ text: 'StackedBarChart', link: '/components/charts/stacked-bar-chart' },
					]
				},
				{
					text: 'Notificação',
					collapsed: false,
					items: [
						{ text: 'Alert <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/alert' },
						{ text: 'AlertCard <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/alert-card' },
						{ text: 'DialogModal <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/dialog-modal' },
						{ text: 'Pulsar <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/pulsar' },
						{ text: 'Toast <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/toast' },
						{ text: 'ToastContainer <Badge class="badge" type="info">ready</Badge>', link: '/components/notificação/toast-container' },
					]
				},
				{
					text: 'Estrutural',
					collapsed: false,
					items: [
						{ text: 'AppBar <Badge class="badge" type="info">ready</Badge>', link: '/components/estrutural/app-bar' },
						{ text: 'PageContainer <Badge class="badge" type="info">ready</Badge>', link: '/components/estrutural/page-container' },
						{ text: 'PageHeader <Badge class="badge" type="info">ready</Badge>', link: '/components/estrutural/page-header' },
						{ text: 'TopAppBar <Badge class="badge" type="info">ready</Badge>', link: '/components/estrutural/top-app-bar' },
					]
				},
				{
					text: 'Tipografia',
					collapsed: false,
					items: [
						{ text: 'Text <Badge class="badge" type="info">ready</Badge>', link: '/components/tipografia/text' },
					]
				},
				{
					text: 'Navegação',
					collapsed: false,
					items: [
						{ text: 'Breadcrumb <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/breadcrumb' },
						{ text: 'InnerTabs <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/inner-tabs' },
						{ text: 'Link <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/link' },
						
						{ text: 'MobileNavbar <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/mobile-navbar' },
						{ text: 'MobileNavigation <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/mobile-navigation' },
						// { text: 'MobileStepperInput', link: '/components/navegação/mobile-stepper-input' },
						{ text: 'NavBar <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/nav-bar' },
						{ text: 'PageLayout <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/page-layout' },
						{ text: 'Pagination <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/pagination' },
						// { text: 'SecondaryNavigation', link: '/components/navegação/secondary-navigation' },
						{ text: 'SegmentedControl <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/segmented-control' },
						{ text: 'SideBar <Badge class="badge" type="info">ready</Badge>', link: '/components/navegação/side-bar' },
						{ text: 'Tabs <Badge class="badge" type="info">ready - deprecated</Badge>', link: '/components/navegação/tabs' },
						// { text: 'Wizard', link: '/components/navegação/wizard' },
					]
				},
			]
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
