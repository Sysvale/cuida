// .storybook/manager.js

import { addons } from '@storybook/addons';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  showRoots: true,
});