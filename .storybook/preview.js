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
import Cdstip from "../src/utils/directives/cdstip";
import CdsFloatify from "../src/utils/directives/cdsFloatify";

app.directive("cdstip", Cdstip);
app.directive("cds-floatify", CdsFloatify);
app.mount("#app");
