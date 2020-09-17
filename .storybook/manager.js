// .storybook/manager.js

import { addons } from '@storybook/addons';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  sidebarAnimations: true,
  enableShortcuts: false,
  isToolshown: true,
  selectedPanel: 'controls',
  initialActive: 'sidebar',
  showRoots: true,
  previewTabs: {
    'storybook/docs/panel': {
        index: -1,
        title: 'Dox'
    },
    'canvas': {
      hidden: true,
    },
  },
});
