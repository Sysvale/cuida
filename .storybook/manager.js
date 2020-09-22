import { addons } from '@storybook/addons';

addons.setConfig({
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
