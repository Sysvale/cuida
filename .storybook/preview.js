//NOTE: nem todos os parâmetros estão funcionando aqui
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  options: {
    previewTabs: {
      canvas: { hidden: true },
    },
    storySort: {
      order: [
        "Fundação",
        [
          "Princípios",
          "Cores",
          "Tipografia",
          "Peso da Fonte",
          "Espaçamento",
          "Bordas",
        ],
        "Componentes",
        [
          "Display",
          "Notificação",
          "Forms",
          "Navegação",
          "Containers",
          "Overlays",
          "Loaders",
          "Estrutural",
          "Utils",
        ],
      ],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import { app } from "@storybook/vue3";
import { longClickDirective } from "@sysvale/vue3-long-click";
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
import Cdstip from "../src/utils/directives/cdstip";

const longClickInstance = longClickDirective({ delay: 400, interval: 50 });

app.directive("longclick", longClickInstance);
app.directive("cdstip", Cdstip);
app.mount("#app");
