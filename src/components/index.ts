import ActionBar from './ActionBar.vue';
import ActionsList from './ActionsList.vue';
import Alert from './Alert.vue';
import AlertCard from './AlertCard.vue';
import AppBar from './AppBar.vue';
import Avatar from './Avatar.vue';
import Badge from './Badge.vue';
import Button from './Button.vue';
import CalloutCard from './CalloutCard.vue';
import CarouselController from './CarouselController.vue';
import Checkbox from './Checkbox.vue';
import Chevron from './Chevron.vue';
import Clickable from './Clickable.vue';
import CollapsibleContainer from './CollapsibleContainer.vue';
import DashboardCard from './DashboardCard.vue';
import DateInput from './DateInput.vue';
import Dialog from './Dialog.vue';
import Divider from './Divider.vue';
import Dropdown from './Dropdown.vue';
import EmptyState from './EmptyState.vue';
import FileInput from './FileInput.vue';
import FlatButton from './FlatButton.vue';
import Highlight from './Highlight.vue';
import Icon from './Icon.vue';
import IconButton from './IconButton.vue';
import InnerTabs from './InnerTabs.vue';
import Link from './Link.vue';
import LoadingBar from './LoadingBar.vue';
import Modal from './Modal.vue';
import Multiselect from './Multiselect.vue';
import NavBar from './NavBar.vue';
import NumberInput from './NumberInput.vue';
import PageHeader from './PageHeader.vue';
import Pagination from './Pagination.vue';
import PanelCard from './PanelCard.vue';
import PinInput from './PinInput.vue';
import ProgressBar from './ProgressBar.vue';
import ProgressCircular from './ProgressCircular.vue';
import Radio from './Radio.vue';
import RadioButtonGroup from './RadioButtonGroup.vue';
import Scrollable from './Scrollable.vue';
import SearchInput from './SearchInput.vue';
import SegmentedControl from './SegmentedControl.vue';
import Select from './Select.vue';
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
import Tooltip from './Tooltip.vue';
import Truncate from './Truncate.vue';

import Cdstip from '../utils/directives/cdstip';

export default {
	install: (app: any, options: any) => {
		app.directive('cdstip', Cdstip);

		app.component('CdsActionBar', ActionBar); //NOTE: Testado no SB
		app.component('CdsActionsList', ActionsList); //NOTE: Testado no SB
		app.component('CdsAlert', Alert); //NOTE: Testado no SB
		app.component('CdsAlertCard', AlertCard);
		app.component('CdsAppBar', AppBar); //NOTE: Testado no SB
		app.component('CdsAvatar', Avatar); //NOTE: Testado no SB
		app.component('CdsBadge', Badge); //NOTE: Testado no SB
		app.component('CdsButton', Button); //NOTE: Testado no SB
		app.component('CdsCalloutCard', CalloutCard); //NOTE: Testado no SB
		app.component('CdsCarouselController', CarouselController);
		app.component('CdsCheckbox', Checkbox); //FIXME: Problema no SB de estilo
		app.component('CdsChevron', Chevron); //NOTE: Testado no SB
		app.component('CdsClickable', Clickable); //NOTE: Testado no SB
		app.component('CdsCollapsibleContainer', CollapsibleContainer); //NOTE: Testado no SB. !Reativo!
		app.component('CdsDashboardCard', DashboardCard);
		// app.component('CdsDateInput', DateInput);
		app.component('CdsDivider', Divider); //NOTE: Testado no SB
		// app.component('CdsDropdown', Dropdown);
		app.component('CdsEmptyState', EmptyState); //NOTE: Testado no SB
		// app.component('CdsFileInput', FileInput);
		app.component('CdsFlatButton', FlatButton); //NOTE: Testado no SB
		app.component('CdsHighlight', Highlight); //NOTE: Testado no SB
		app.component('CdsIcon', Icon); //NOTE: Testado no SB
		app.component('CdsIconButton', IconButton); //NOTE: Testado no SB
		// app.component('CdsInnerTabs', InnerTabs);
		app.component('CdsLink', Link); //NOTE: Testado no SB
		app.component('CdsLoadingBar', LoadingBar); //NOTE: Testado no SB
		// app.component('CdsModal', Modal);
		// app.component('CdsMultiselect', Multiselect);
		app.component('CdsNavBar', NavBar);
		// app.component('CdsNumberInput', NumberInput);
		app.component('CdsPageHeader', PageHeader); //NOTE: Testado no SB
		app.component('CdsPagination', Pagination);
		app.component('CdsPanelCard', PanelCard);
		app.component('CdsPinInput', PinInput);
		app.component('CdsProgressBar', ProgressBar); //NOTE: Testado no SB
		app.component('CdsProgressCircular', ProgressCircular); //NOTE: Testado no SB
		app.component('CdsRadio', Radio); //NOTE: Testado no SB
		app.component('CdsRadioButtonGroup', RadioButtonGroup); //NOTE: Testado no SB
		app.component('CdsScrollable', Scrollable); //FIXME: Problema no SB
		app.component('CdsSearchInput', SearchInput);
		app.component('CdsSegmentedControl', SegmentedControl);
		app.component('CdsSelect', Select);
		app.component('CdsSkeletonText', SkeletonText); //NOTE: Testado no SB
		// app.component('CdsSlider', Slider);
		app.component('CdsSpinner', Spinner); //NOTE: Testado no SB
		app.component('CdsStepper', Stepper);
		app.component('CdsStepperInput', StepperInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsSwitch', Switch); //NOTE: Testado no SB
		app.component('CdsTable', Table); //NOTE: Testado no SB
		// app.component('CdsTabs', Tabs);
		app.component('CdsTextArea', TextArea); //NOTE: Testado no SB. !Reativo!
		// app.component('CdsTextInput', TextInput);
		app.component('CdsTimeInput', TimeInput); //NOTE: Testado no SB. !Reativo!
		app.component('CdsTooltip', Tooltip); //NOTE: Testado no SB
		app.component('CdsTimeline', Timeline);
		app.component('CdsTruncate', Truncate); //NOTE: Testado no SB
	},
}
