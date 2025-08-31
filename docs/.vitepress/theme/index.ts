import DefaultTheme from 'vitepress/theme-without-fonts';
import Layout from './Layout.vue';
import './style.css';
import Cdstip from '../../../src/utils/directives/cdstip';

import APITable from '../../docgen/APITable.vue';
import PreviewContainer from '../../docgen/PreviewContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

import CdsAvatar from '@/components/Avatar.vue';
import CdsBadge from '@/components/Badge.vue';
import CdsBox from '@/components/Box.vue';
import CdsButton from '@/components/Button.vue';
import CdsCheckbox from '@/components/Checkbox.vue';
import CdsChevron from '@/components/Chevron.vue';
import CdsClickable from '@/components/Clickable.vue';
import CdsDivider from '@/components/Divider.vue';
import CdsFlexbox from '@/components/Flexbox.vue';
import CdsIcon from '@/components/Icon.vue';
import CdsIconButton from '@/components/IconButton.vue';
import CdsImage from '@/components/Image.vue';
import CdsPopover from '@/components/Popover.vue';
import CdsRichTooltip from '@/components/RichTooltip.vue';
import CdsScrollable from '@/components/Scrollable.vue';
import CdsSkeleton from '@/components/Skeleton.vue';
import CdsSpacer from '@/components/Spacer.vue';
import CdsSpinner from '@/components/Spinner.vue';
import CdsTable from '@/components/Table.vue';

export default {
	extends: DefaultTheme,
	Layout: Layout,
	enhanceApp({ app }) {
		app.component('APITable', APITable);
		app.component('PreviewContainer', PreviewContainer);
		app.component('FigmaFrame', FigmaFrame);
		app.directive("cdstip", Cdstip);

		app.component('CdsAvatar', CdsAvatar);
		app.component('CdsBox', CdsBox);
		app.component('CdsBadge', CdsBadge);
		app.component('CdsButton', CdsButton);
		app.component('CdsCheckbox', CdsCheckbox);
		app.component('CdsChevron', CdsChevron);
		app.component('CdsClickable', CdsClickable);
		app.component('CdsDivider', CdsDivider);
		app.component('CdsFlexbox', CdsFlexbox);
		app.component('CdsIcon', CdsIcon);
		app.component('CdsIconButton', CdsIconButton);
		app.component('CdsImage', CdsImage);
		app.component('CdsPopover', CdsPopover);
		app.component('CdsRichTooltip', CdsRichTooltip);
		app.component('CdsScrollable', CdsScrollable);
		app.component('CdsSkeleton', CdsSkeleton);
		app.component('CdsSpacer', CdsSpacer);
		app.component('CdsSpinner', CdsSpinner);
		app.component('CdsTable', CdsTable);
	}
}