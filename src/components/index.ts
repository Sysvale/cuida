import ActionBar from './ActionBar.vue';
import ActionsList from './ActionsList.vue';
import Alert from './Alert.vue';
import AlertCard from './AlertCard.vue';
import AppBar from './AppBar.vue';
import Avatar from './Avatar.vue';
import AvatarGroup from './AvatarGroup.vue';
import Badge from './Badge.vue';
import BarChart from './BarChart.vue';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
import PolarAreaChart from './PolarAreaChart.vue';
import StackedBarChart from './StackedBarChart.vue';
import Box from './Box.vue';
import Breadcrumb from './Breadcrumb.vue';
import Button from './Button.vue';
import Card from './Card.vue';
import CalloutCard from './CalloutCard.vue';
import CarouselController from './CarouselController.vue';
import Checkbox from './Checkbox.vue';
import Chevron from './Chevron.vue';
import Clickable from './Clickable.vue';
import CollapsibleContainer from './CollapsibleContainer.vue';
import ColorPicker from './ColorPicker.vue';
import DashboardCard from './DashboardCard.vue';
import DateInput from './DateInput.vue';
import DialogModal from './DialogModal.vue';
import Divider from './Divider.vue';
import Dropdown from './Dropdown.vue';
import DonutChart from './DonutChart.vue';
import EmptyState from './EmptyState.vue';
import FileInput from './FileInput.vue';
import FlatButton from './FlatButton.vue';
import FloatingAssistant from './FloatingAssistant.vue';
import GaugeChart from './GaugeChart.vue';
import Highlight from './Highlight.vue';
import Icon from './Icon.vue';
import IconButton from './IconButton.vue';
import InnerTabs from './InnerTabs.vue';
import Image from './Image.vue';
import Link from './Link.vue';
import LoadingBar from './LoadingBar.vue';
import MobileNavigation from './MobileNavigation.vue';
import Modal from './Modal.vue';
import Multiselect from './Multiselect.vue';
import NavBar from './NavBar.vue';
import NumberInput from './NumberInput.vue';
import PageContainer from './PageContainer.vue';
import PageLayout from './PageLayout.vue';
import PageHeader from './PageHeader.vue';
import Pagination from './Pagination.vue';
import PanelCard from './PanelCard.vue';
import PinInput from './PinInput.vue';
import Popover from './Popover.vue';
import ProgressBar from './ProgressBar.vue';
import ProgressCircular from './ProgressCircular.vue';
import Pulsar from './Pulsar.vue';
import Radio from './Radio.vue';
import RadioButtonGroup from './RadioButtonGroup.vue';
import Spacer from './Spacer.vue';
import Scrollable from './Scrollable.vue';
import SearchInput from './SearchInput.vue';
import SegmentedControl from './SegmentedControl.vue';
import Select from './Select.vue';
import SideBar from './SideBar.vue';
import SideSheet from './SideSheet.vue';
import Skeleton from './Skeleton.vue';
import SkeletonText from './SkeletonText.vue';
import Slider from './Slider.vue';
import Spinner from './Spinner.vue';
import Stepper from './Stepper.vue';
import StepperInput from './StepperInput.vue';
import Switch from './Switch.vue';
import Table from './Table.vue';
import Tabs from './Tabs.vue';
import TextArea from './TextArea.vue';
import TextInput from './TextInput.vue';
import TimeInput from './TimeInput.vue';
import Timeline from './Timeline.vue';
import TimelineItem from './TimelineItem.vue';
import Tooltip from './Tooltip.vue';
import Truncate from './Truncate.vue';
import PasswordInput from './PasswordInput.vue';
import Wizard from './Wizard.vue';

import Cdstip from '../utils/directives/cdstip';
import CdsFloatify from "../utils/directives/cdsFloatify";

export default {
	install: (app: any, options: any) => {
		app.directive('cdstip', Cdstip);
		app.directive("cds-floatify", CdsFloatify);

		app.component('CdsActionBar', ActionBar); //NOTE: Testado no SB
		app.component('CdsActionsList', ActionsList); //NOTE: Testado no SB
		app.component('CdsAlert', Alert); //NOTE: Testado no SB
		app.component('CdsAlertCard', AlertCard);
		app.component('CdsAppBar', AppBar); //NOTE: Testado no SB
		app.component('CdsAvatar', Avatar); //NOTE: Testado no SB
		app.component('CdsAvatarGroup', AvatarGroup); //NOTE: Testado no SB
		app.component('CdsBadge', Badge); //NOTE: Testado no SB
		app.component('CdsBarChart', BarChart);
		app.component('CdsBox', Box);
		app.component('CdsBreadcrumb', Breadcrumb);
		app.component('CdsButton', Button); //NOTE: Testado no SB
		app.component('CdsCard', Card);
		app.component('CdsCalloutCard', CalloutCard); //NOTE: Testado no SB
		app.component('CdsCarouselController', CarouselController);
		app.component('CdsCheckbox', Checkbox); //FIXME: Problema no SB de estilo
		app.component('CdsChevron', Chevron); //NOTE: Testado no SB
		app.component('CdsClickable', Clickable); //NOTE: Testado no SB
		app.component('CdsCollapsibleContainer', CollapsibleContainer); //NOTE: Testado no SB. !Reativo!
		app.component('CdsColorPicker', ColorPicker); //NOTE: Testado no SB.
		app.component('CdsDashboardCard', DashboardCard);
		app.component('CdsDateInput', DateInput); //NOTE: Testado no SB
		app.component('CdsDialogModal', DialogModal); //NOTE: Testado no SB
		app.component('CdsDivider', Divider); //NOTE: Testado no SB
		app.component('CdsDropdown', Dropdown); //NOTE: Testado no SB
		app.component('CdsDonutChart', DonutChart); //NOTE: Testado no SB
		app.component('CdsEmptyState', EmptyState); //NOTE: Testado no SB
		app.component('CdsFileInput', FileInput); //NOTE: Testado no SB
		app.component('CdsFlatButton', FlatButton); //NOTE: Testado no SB
		app.component('CdsFloatingAssistant', FloatingAssistant);
		app.component('CdsGaugeChart', GaugeChart); //NOTE: Testado no SB
		app.component('CdsHighlight', Highlight); //NOTE: Testado no SB
		app.component('CdsIcon', Icon); //NOTE: Testado no SB
		app.component('CdsIconButton', IconButton); //NOTE: Testado no SB
		app.component('CdsImage', Image);
		app.component('CdsInnerTabs', InnerTabs); //NOTE: Testado no SB
		app.component('CdsLineChart', LineChart);
		app.component('CdsLink', Link); //NOTE: Testado no SB
		app.component('CdsLoadingBar', LoadingBar); //NOTE: Testado no SB
		app.component('CdsMobileNavigation', MobileNavigation); //NOTE: Testado no SB
		app.component('CdsModal', Modal); //NOTE: Testado no SB
		app.component('CdsMultiselect', Multiselect); //FIXME: Problema no SB
		app.component('CdsNavBar', NavBar); //NOTE: Testado no SB
		app.component('CdsNumberInput', NumberInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsPageContainer', PageContainer); //NOTE: Testado no SB
		app.component('CdsPageLayout', PageLayout); //NOTE: Testado no SB
		app.component('CdsPageHeader', PageHeader); //NOTE: Testado no SB
		app.component('CdsPagination', Pagination); //NOTE: Testado no SB. !Reativo!
		app.component('CdsPanelCard', PanelCard); //NOTE: Testado no SB
		app.component('CdsPinInput', PinInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsPopover', Popover);
		app.component('CdsProgressBar', ProgressBar); //NOTE: Testado no SB
		app.component('CdsProgressCircular', ProgressCircular); //NOTE: Testado no SB
		app.component('CdsPulsar', Pulsar);
		app.component('CdsRadio', Radio); //NOTE: Testado no SB
		app.component('CdsRadioButtonGroup', RadioButtonGroup); //NOTE: Testado no SB
		app.component('CdsSpacer', Spacer);
		app.component('CdsScrollable', Scrollable); //FIXME: Problema no SB
		app.component('CdsSearchInput', SearchInput);
		app.component('CdsSegmentedControl', SegmentedControl);
		app.component('CdsSelect', Select); //NOTE: Testado no SB. !Reativo!
		app.component('CdsSideBar', SideBar);
		app.component('CdsSideSheet', SideSheet);
		app.component('CdsSkeleton', Skeleton);
		app.component('CdsSkeletonText', SkeletonText); //NOTE: Testado no SB
		// app.component('CdsSlider', Slider);
		app.component('CdsSpinner', Spinner); //NOTE: Testado no SB
		app.component('CdsStackedBarChart', StackedBarChart);
		app.component('CdsStepper', Stepper);
		app.component('CdsStepperInput', StepperInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsSwitch', Switch); //NOTE: Testado no SB
		app.component('CdsTable', Table); //NOTE: Testado no SB
		app.component('CdsTabs', Tabs); //NOTE: Testado no SB
		app.component('CdsTextArea', TextArea); //NOTE: Testado no SB. !Reativo!
		app.component('CdsTextInput', TextInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsTimeInput', TimeInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsTooltip', Tooltip); //NOTE: Testado no SB
		app.component('CdsTimeline', Timeline);
		app.component('CdsTimelineItem', TimelineItem);
		app.component('CdsTruncate', Truncate); //NOTE: Testado no SB
		app.component('CdsPasswordInput', PasswordInput);
		app.component('CdsPieChart', PieChart);
		app.component('CdsPolarAreaChart', PolarAreaChart);
		app.component('CdsWizard', Wizard);
	},
}
