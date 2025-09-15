// docs/.vitepress/config.mjs
import { defineConfig } from "file:///home/rafael/sysvale/cuida-vite-press/node_modules/vitepress/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";

// docs/plugins/vueDocgen.js
import { parse } from "file:///home/rafael/sysvale/cuida-vite-press/node_modules/vue-docgen-api/dist/main.js";
import fs from "fs";
import path from "path";
import glob from "file:///home/rafael/sysvale/cuida-vite-press/node_modules/fast-glob/out/index.js";
function vueDocgenPlugin() {
  return {
    name: "vite-plugin-vue-docgen-generator",
    async buildStart() {
      const files = await glob("src/components/**/*.vue");
      const docs = {};
      for (const file of files) {
        try {
          const componentInfo = await parse(file, {
            alias: {},
            modules: [],
            jsx: false,
            validExtends: (fullFilePath) => !/[\\/]node_modules[\\/]/.test(fullFilePath)
          });
          const componentName = path.basename(file, ".vue");
          const enhancedInfo = await enhanceComponentInfo(file, componentInfo);
          docs[componentName] = enhancedInfo;
        } catch (e) {
          console.warn(`Erro ao parsear ${file}: ${e.message}`);
        }
      }
      fs.mkdirSync("docs/.docgen", { recursive: true });
      fs.writeFileSync("docs/.docgen/components.json", JSON.stringify(docs, null, 2));
    }
  };
}
async function enhanceComponentInfo(filePath, componentInfo) {
  const content = fs.readFileSync(filePath, "utf-8");
  const hasScriptSetup = /<script\s+setup/.test(content);
  const hasDefineModel = /defineModel\s*\(/.test(content);
  if (hasScriptSetup && hasDefineModel) {
    return await enhanceWithDefineModelEvents(filePath, componentInfo);
  }
  return componentInfo;
}
async function enhanceWithDefineModelEvents(filePath, componentInfo) {
  const content = fs.readFileSync(filePath, "utf-8");
  const defineModelRegex = /\/\*\*\s*([\s\S]*?)\*\/\s*const\s+\w+\s*=\s*defineModel\s*\(\s*['"`]([^'"`]+)['"`]/g;
  let match;
  const additionalEvents = [];
  while ((match = defineModelRegex.exec(content)) !== null) {
    const [, comment, modelName] = match;
    const eventInfo = parseJSDocComment(comment, modelName);
    if (eventInfo) {
      additionalEvents.push(eventInfo);
    }
  }
  if (additionalEvents.length > 0) {
    componentInfo.events = componentInfo.events || [];
    componentInfo.events.push(...additionalEvents);
  }
  return componentInfo;
}
function parseJSDocComment(comment, modelName) {
  const lines = comment.split("\n").map((line) => line.trim().replace(/^\*\s?/, ""));
  let description = "";
  let eventName = `update:${modelName}`;
  let type = "unknown";
  for (const line of lines) {
    if (line.startsWith("@event ")) {
      eventName = line.replace("@event ", "").trim();
    } else if (line.startsWith("@type ")) {
      type = line.replace("@type ", "").trim().replace(/[{}]/g, "");
    } else if (line && !line.startsWith("@")) {
      description += (description ? " " : "") + line;
    }
  }
  return {
    name: eventName,
    description: description || `Evento de atualiza\xE7\xE3o do v-model para ${modelName}`,
    type: {
      name: type
    },
    properties: []
  };
}

// docs/.vitepress/config.mjs
var __vite_injected_original_import_meta_url = "file:///home/rafael/sysvale/cuida-vite-press/docs/.vitepress/config.mjs";
var config_default = defineConfig({
  title: "Cuida",
  description: "A design system built by Sysvale, using Vue components",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
      }
    ]
  ],
  themeConfig: {
    search: {
      provider: "local"
    },
    nav: [
      { text: "Funda\xE7\xE3o", link: "/foundation/" },
      { text: "Componentes", link: "/components/" },
      { text: "Utils", link: "/utils/" },
      { text: "\xEDcones", link: "/utils/" },
      { text: "Brand", link: "/utils/" },
      { text: "GitHub", link: "https://github.com/Sysvale/cuida" }
    ],
    outline: {
      level: [1, 2, 3],
      label: "Nessa p\xE1gina"
    },
    sidebar: {
      "/foundation/": [
        {
          text: "Design Tokens",
          items: [
            { text: "Cores", link: "/foundation/cores" },
            { text: "Tipografia", link: "/foundation/tipografia" },
            { text: "Espa\xE7amento", link: "/foundation/espacamento" },
            { text: "Bordas", link: "/foundation/bordas" },
            { text: "Eleva\xE7\xE3o", link: "/foundation/elevation" },
            { text: "Sombras", link: "/foundation/shadow" },
            { text: "Transi\xE7\xF5es", link: "/foundation/transicoes" },
            { text: "Iconografia", link: "/foundation/iconografia" },
            { text: "Peso da Fonte", link: "/foundation/peso-fonte" },
            { text: "Princ\xEDpios", link: "/foundation/principles" }
          ]
        }
      ],
      "/components/": [
        {
          text: "Forms",
          items: [
            { text: "Button", link: "/components/forms/button" },
            { text: "BaseInput", link: "/components/forms/base-input" },
            { text: "TextInput", link: "/components/forms/text-input" },
            { text: "TextArea", link: "/components/forms/text-area" },
            { text: "Select", link: "/components/forms/select" },
            { text: "Checkbox", link: "/components/forms/checkbox" },
            { text: "Radio", link: "/components/forms/radio" },
            { text: "Switch", link: "/components/forms/switch" },
            { text: "Slider", link: "/components/forms/slider" }
          ]
        },
        {
          text: "Containers",
          items: [
            { text: "Box", link: "/components/containers/box" },
            { text: "card", link: "/components/containers/card" },
            { text: "Carousel controller", link: "/components/containers/carousel-controller" },
            { text: "Collapsible Container", link: "/components/containers/collapsible-container" },
            { text: "Dashboard Card", link: "/components/containers/dashboard-card" },
            { text: "Divider", link: "/components/containers/divider" },
            { text: "Flexbox", link: "/components/containers/flexbox" },
            { text: "Grid", link: "/components/containers/grid" },
            { text: "Panel Card", link: "/components/containers/panel-card" },
            { text: "Scrollable", link: "/components/containers/scrollable" }
          ]
        },
        {
          text: "Navigation",
          items: [
            { text: "NavBar", link: "/components/navbar" },
            { text: "SideBar", link: "/components/sidebar" },
            { text: "Breadcrumb", link: "/components/breadcrumb" },
            { text: "Tabs", link: "/components/tabs" },
            { text: "Pagination", link: "/components/pagination" }
          ]
        },
        {
          text: "Data Display",
          items: [
            { text: "Table", link: "/components/table" },
            { text: "DataTable", link: "/components/data-table" },
            { text: "Card", link: "/components/card" },
            { text: "List", link: "/components/list" },
            { text: "Avatar", link: "/components/avatar" },
            { text: "Badge", link: "/components/badge" }
          ]
        },
        {
          text: "Feedback",
          items: [
            { text: "Alert", link: "/components/alert" },
            { text: "Toast", link: "/components/toast" },
            { text: "Modal", link: "/components/modal" },
            { text: "Tooltip", link: "/components/tooltip" },
            { text: "Spinner", link: "/components/spinner" }
          ]
        }
      ],
      "/utils/": [
        {
          text: "Utilities",
          items: [
            { text: "CdsFloatify", link: "/utils/cds-floatify" },
            { text: "CdsTip", link: "/utils/cds-tip" },
            { text: "ContrastChecker", link: "/utils/contrast-checker" },
            { text: "HasSlot", link: "/utils/has-slot" },
            { text: "IsDeviceType", link: "/utils/is-device-type" },
            { text: "PaleteResolver", link: "/utils/palete-resolver" },
            { text: "RemoveAccents", link: "/utils/remove-accents" },
            { text: "Rounder", link: "/utils/rounder" },
            { text: "VariantResolver", link: "/utils/variant-resolver" }
          ]
        },
        {
          text: "Composables",
          items: [
            { text: "useToast", link: "/utils/use-toast" }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Sysvale/cuida" },
      { icon: "npm", link: "https://github.com/Sysvale/cuida" },
      { icon: "figma", link: "https://github.com/Sysvale/cuida" },
      { icon: "chromatic", link: "https://github.com/Sysvale/cuida" }
    ],
    footer: {
      message: "Released under the Apache-2.0 License.",
      copyright: "Copyright \xA9 2020-present Sysvale"
    },
    lastUpdated: {
      text: "\xDAltima atualiza\xE7\xE3o",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short"
      }
    },
    docFooter: {
      prev: false,
      next: false
    }
  },
  vite: {
    plugins: [vueDocgenPlugin()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", __vite_injected_original_import_meta_url))
      }
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("cds-")
      }
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tanMiLCAiZG9jcy9wbHVnaW5zL3Z1ZURvY2dlbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3JhZmFlbC9zeXN2YWxlL2N1aWRhLXZpdGUtcHJlc3MvZG9jcy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9yYWZhZWwvc3lzdmFsZS9jdWlkYS12aXRlLXByZXNzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3JhZmFlbC9zeXN2YWxlL2N1aWRhLXZpdGUtcHJlc3MvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XHJcbmltcG9ydCB2dWVEb2NnZW5QbHVnaW4gZnJvbSAnLi4vcGx1Z2lucy92dWVEb2NnZW4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHRpdGxlOiAnQ3VpZGEnLFxyXG5cdGRlc2NyaXB0aW9uOiAnQSBkZXNpZ24gc3lzdGVtIGJ1aWx0IGJ5IFN5c3ZhbGUsIHVzaW5nIFZ1ZSBjb21wb25lbnRzJyxcclxuXHJcblx0aGVhZDogW1xyXG5cdFx0W1xyXG5cdFx0XHQnbGluaycsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZWw6ICdzdHlsZXNoZWV0JyxcclxuXHRcdFx0XHRocmVmOiAnaHR0cHM6Ly9hcGkuZm9udHNoYXJlLmNvbS92Mi9jc3M/ZltdPXNhdG9zaGlAMSZkaXNwbGF5PXN3YXAnLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHRdLFxyXG5cclxuXHR0aGVtZUNvbmZpZzoge1xyXG5cdFx0c2VhcmNoOiB7XHJcblx0XHRcdHByb3ZpZGVyOiAnbG9jYWwnXHJcblx0XHR9LFxyXG5cdFx0bmF2OiBbXHJcblx0XHRcdHsgdGV4dDogJ0Z1bmRhXHUwMEU3XHUwMEUzbycsIGxpbms6ICcvZm91bmRhdGlvbi8nIH0sXHJcblx0XHRcdHsgdGV4dDogJ0NvbXBvbmVudGVzJywgbGluazogJy9jb21wb25lbnRzLycgfSxcclxuXHRcdFx0eyB0ZXh0OiAnVXRpbHMnLCBsaW5rOiAnL3V0aWxzLycgfSxcclxuXHRcdFx0eyB0ZXh0OiAnXHUwMEVEY29uZXMnLCBsaW5rOiAnL3V0aWxzLycgfSxcclxuXHRcdFx0eyB0ZXh0OiAnQnJhbmQnLCBsaW5rOiAnL3V0aWxzLycgfSxcclxuXHRcdFx0eyB0ZXh0OiAnR2l0SHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9TeXN2YWxlL2N1aWRhJyB9XHJcblx0XHRdLFxyXG5cclxuXHRcdG91dGxpbmU6IHtcclxuXHRcdFx0bGV2ZWw6IFsxLCAyLCAzXSxcclxuXHRcdFx0bGFiZWw6ICdOZXNzYSBwXHUwMEUxZ2luYSdcclxuXHRcdH0sXHJcblxyXG5cdFx0c2lkZWJhcjoge1xyXG5cdFx0XHQnL2ZvdW5kYXRpb24vJzogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRleHQ6ICdEZXNpZ24gVG9rZW5zJyxcclxuXHRcdFx0XHRcdGl0ZW1zOiBbXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0NvcmVzJywgbGluazogJy9mb3VuZGF0aW9uL2NvcmVzJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdUaXBvZ3JhZmlhJywgbGluazogJy9mb3VuZGF0aW9uL3RpcG9ncmFmaWEnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0VzcGFcdTAwRTdhbWVudG8nLCBsaW5rOiAnL2ZvdW5kYXRpb24vZXNwYWNhbWVudG8nIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0JvcmRhcycsIGxpbms6ICcvZm91bmRhdGlvbi9ib3JkYXMnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0VsZXZhXHUwMEU3XHUwMEUzbycsIGxpbms6ICcvZm91bmRhdGlvbi9lbGV2YXRpb24nIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1NvbWJyYXMnLCBsaW5rOiAnL2ZvdW5kYXRpb24vc2hhZG93JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdUcmFuc2lcdTAwRTdcdTAwRjVlcycsIGxpbms6ICcvZm91bmRhdGlvbi90cmFuc2ljb2VzJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdJY29ub2dyYWZpYScsIGxpbms6ICcvZm91bmRhdGlvbi9pY29ub2dyYWZpYScgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnUGVzbyBkYSBGb250ZScsIGxpbms6ICcvZm91bmRhdGlvbi9wZXNvLWZvbnRlJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdQcmluY1x1MDBFRHBpb3MnLCBsaW5rOiAnL2ZvdW5kYXRpb24vcHJpbmNpcGxlcycgfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0Jy9jb21wb25lbnRzLyc6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0ZXh0OiAnRm9ybXMnLFxyXG5cdFx0XHRcdFx0aXRlbXM6IFtcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQnV0dG9uJywgbGluazogJy9jb21wb25lbnRzL2Zvcm1zL2J1dHRvbicgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQmFzZUlucHV0JywgbGluazogJy9jb21wb25lbnRzL2Zvcm1zL2Jhc2UtaW5wdXQnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1RleHRJbnB1dCcsIGxpbms6ICcvY29tcG9uZW50cy9mb3Jtcy90ZXh0LWlucHV0JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdUZXh0QXJlYScsIGxpbms6ICcvY29tcG9uZW50cy9mb3Jtcy90ZXh0LWFyZWEnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1NlbGVjdCcsIGxpbms6ICcvY29tcG9uZW50cy9mb3Jtcy9zZWxlY3QnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0NoZWNrYm94JywgbGluazogJy9jb21wb25lbnRzL2Zvcm1zL2NoZWNrYm94JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdSYWRpbycsIGxpbms6ICcvY29tcG9uZW50cy9mb3Jtcy9yYWRpbycgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnU3dpdGNoJywgbGluazogJy9jb21wb25lbnRzL2Zvcm1zL3N3aXRjaCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnU2xpZGVyJywgbGluazogJy9jb21wb25lbnRzL2Zvcm1zL3NsaWRlcicgfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGV4dDogJ0NvbnRhaW5lcnMnLFxyXG5cdFx0XHRcdFx0aXRlbXM6IFtcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQm94JywgbGluazogJy9jb21wb25lbnRzL2NvbnRhaW5lcnMvYm94JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdjYXJkJywgbGluazogJy9jb21wb25lbnRzL2NvbnRhaW5lcnMvY2FyZCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQ2Fyb3VzZWwgY29udHJvbGxlcicsIGxpbms6ICcvY29tcG9uZW50cy9jb250YWluZXJzL2Nhcm91c2VsLWNvbnRyb2xsZXInIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0NvbGxhcHNpYmxlIENvbnRhaW5lcicsIGxpbms6ICcvY29tcG9uZW50cy9jb250YWluZXJzL2NvbGxhcHNpYmxlLWNvbnRhaW5lcicgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnRGFzaGJvYXJkIENhcmQnLCBsaW5rOiAnL2NvbXBvbmVudHMvY29udGFpbmVycy9kYXNoYm9hcmQtY2FyZCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnRGl2aWRlcicsIGxpbms6ICcvY29tcG9uZW50cy9jb250YWluZXJzL2RpdmlkZXInIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0ZsZXhib3gnLCBsaW5rOiAnL2NvbXBvbmVudHMvY29udGFpbmVycy9mbGV4Ym94JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdHcmlkJywgbGluazogJy9jb21wb25lbnRzL2NvbnRhaW5lcnMvZ3JpZCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnUGFuZWwgQ2FyZCcsIGxpbms6ICcvY29tcG9uZW50cy9jb250YWluZXJzL3BhbmVsLWNhcmQnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1Njcm9sbGFibGUnLCBsaW5rOiAnL2NvbXBvbmVudHMvY29udGFpbmVycy9zY3JvbGxhYmxlJyB9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0ZXh0OiAnTmF2aWdhdGlvbicsXHJcblx0XHRcdFx0XHRpdGVtczogW1xyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdOYXZCYXInLCBsaW5rOiAnL2NvbXBvbmVudHMvbmF2YmFyJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdTaWRlQmFyJywgbGluazogJy9jb21wb25lbnRzL3NpZGViYXInIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0JyZWFkY3J1bWInLCBsaW5rOiAnL2NvbXBvbmVudHMvYnJlYWRjcnVtYicgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnVGFicycsIGxpbms6ICcvY29tcG9uZW50cy90YWJzJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdQYWdpbmF0aW9uJywgbGluazogJy9jb21wb25lbnRzL3BhZ2luYXRpb24nIH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRleHQ6ICdEYXRhIERpc3BsYXknLFxyXG5cdFx0XHRcdFx0aXRlbXM6IFtcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnVGFibGUnLCBsaW5rOiAnL2NvbXBvbmVudHMvdGFibGUnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0RhdGFUYWJsZScsIGxpbms6ICcvY29tcG9uZW50cy9kYXRhLXRhYmxlJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdDYXJkJywgbGluazogJy9jb21wb25lbnRzL2NhcmQnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0xpc3QnLCBsaW5rOiAnL2NvbXBvbmVudHMvbGlzdCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQXZhdGFyJywgbGluazogJy9jb21wb25lbnRzL2F2YXRhcicgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQmFkZ2UnLCBsaW5rOiAnL2NvbXBvbmVudHMvYmFkZ2UnIH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRleHQ6ICdGZWVkYmFjaycsXHJcblx0XHRcdFx0XHRpdGVtczogW1xyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdBbGVydCcsIGxpbms6ICcvY29tcG9uZW50cy9hbGVydCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnVG9hc3QnLCBsaW5rOiAnL2NvbXBvbmVudHMvdG9hc3QnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ01vZGFsJywgbGluazogJy9jb21wb25lbnRzL21vZGFsJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdUb29sdGlwJywgbGluazogJy9jb21wb25lbnRzL3Rvb2x0aXAnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1NwaW5uZXInLCBsaW5rOiAnL2NvbXBvbmVudHMvc3Bpbm5lcicgfVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0Jy91dGlscy8nOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGV4dDogJ1V0aWxpdGllcycsXHJcblx0XHRcdFx0XHRpdGVtczogW1xyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdDZHNGbG9hdGlmeScsIGxpbms6ICcvdXRpbHMvY2RzLWZsb2F0aWZ5JyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdDZHNUaXAnLCBsaW5rOiAnL3V0aWxzL2Nkcy10aXAnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0NvbnRyYXN0Q2hlY2tlcicsIGxpbms6ICcvdXRpbHMvY29udHJhc3QtY2hlY2tlcicgfSxcclxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnSGFzU2xvdCcsIGxpbms6ICcvdXRpbHMvaGFzLXNsb3QnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0lzRGV2aWNlVHlwZScsIGxpbms6ICcvdXRpbHMvaXMtZGV2aWNlLXR5cGUnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1BhbGV0ZVJlc29sdmVyJywgbGluazogJy91dGlscy9wYWxldGUtcmVzb2x2ZXInIH0sXHJcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1JlbW92ZUFjY2VudHMnLCBsaW5rOiAnL3V0aWxzL3JlbW92ZS1hY2NlbnRzJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdSb3VuZGVyJywgbGluazogJy91dGlscy9yb3VuZGVyJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdWYXJpYW50UmVzb2x2ZXInLCBsaW5rOiAnL3V0aWxzL3ZhcmlhbnQtcmVzb2x2ZXInIH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRleHQ6ICdDb21wb3NhYmxlcycsXHJcblx0XHRcdFx0XHRpdGVtczogW1xyXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICd1c2VUb2FzdCcsIGxpbms6ICcvdXRpbHMvdXNlLXRvYXN0JyB9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cclxuXHRcdHNvY2lhbExpbmtzOiBbXHJcblx0XHRcdHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vU3lzdmFsZS9jdWlkYScgfSxcclxuXHRcdFx0eyBpY29uOiAnbnBtJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9TeXN2YWxlL2N1aWRhJyB9LFxyXG5cdFx0XHR7IGljb246ICdmaWdtYScsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vU3lzdmFsZS9jdWlkYScgfSxcclxuXHRcdFx0eyBpY29uOiAnY2hyb21hdGljJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9TeXN2YWxlL2N1aWRhJyB9XHJcblx0XHRdLFxyXG5cclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRtZXNzYWdlOiAnUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZS0yLjAgTGljZW5zZS4nLFxyXG5cdFx0XHRjb3B5cmlnaHQ6ICdDb3B5cmlnaHQgXHUwMEE5IDIwMjAtcHJlc2VudCBTeXN2YWxlJ1xyXG5cdFx0fSxcclxuXHJcblx0XHRsYXN0VXBkYXRlZDoge1xyXG5cdFx0XHR0ZXh0OiAnXHUwMERBbHRpbWEgYXR1YWxpemFcdTAwRTdcdTAwRTNvJyxcclxuXHRcdFx0Zm9ybWF0T3B0aW9uczoge1xyXG5cdFx0XHRcdGRhdGVTdHlsZTogJ3Nob3J0JyxcclxuXHRcdFx0XHR0aW1lU3R5bGU6ICdzaG9ydCdcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblxyXG5cdFx0ZG9jRm9vdGVyOiB7XHJcblx0XHRcdHByZXY6IGZhbHNlLFxyXG5cdFx0XHRuZXh0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHR2aXRlOiB7XHJcblx0XHRwbHVnaW5zOiBbdnVlRG9jZ2VuUGx1Z2luKCldLFxyXG5cdFx0cmVzb2x2ZToge1xyXG5cdFx0XHRhbGlhczoge1xyXG5cdFx0XHRcdCdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8uLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dnVlOiB7XHJcblx0XHR0ZW1wbGF0ZToge1xyXG5cdFx0XHRjb21waWxlck9wdGlvbnM6IHtcclxuXHRcdFx0XHRpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5zdGFydHNXaXRoKCdjZHMtJylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcmFmYWVsL3N5c3ZhbGUvY3VpZGEtdml0ZS1wcmVzcy9kb2NzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3JhZmFlbC9zeXN2YWxlL2N1aWRhLXZpdGUtcHJlc3MvZG9jcy9wbHVnaW5zL3Z1ZURvY2dlbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9yYWZhZWwvc3lzdmFsZS9jdWlkYS12aXRlLXByZXNzL2RvY3MvcGx1Z2lucy92dWVEb2NnZW4uanNcIjtpbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3Z1ZS1kb2NnZW4tYXBpJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBnbG9iIGZyb20gJ2Zhc3QtZ2xvYidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdnVlRG9jZ2VuUGx1Z2luKCkge1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICd2aXRlLXBsdWdpbi12dWUtZG9jZ2VuLWdlbmVyYXRvcicsXG5cdFx0YXN5bmMgYnVpbGRTdGFydCgpIHtcblx0XHRcdGNvbnN0IGZpbGVzID0gYXdhaXQgZ2xvYignc3JjL2NvbXBvbmVudHMvKiovKi52dWUnKVxuXHRcdFx0Y29uc3QgZG9jcyA9IHt9XG5cblx0XHRcdGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IGNvbXBvbmVudEluZm8gPSBhd2FpdCBwYXJzZShmaWxlLCB7XG5cdFx0XHRcdFx0XHRhbGlhczoge30sXG5cdFx0XHRcdFx0XHRtb2R1bGVzOiBbXSxcblx0XHRcdFx0XHRcdGpzeDogZmFsc2UsXG5cdFx0XHRcdFx0XHR2YWxpZEV4dGVuZHM6IChmdWxsRmlsZVBhdGgpID0+ICEvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL10vLnRlc3QoZnVsbEZpbGVQYXRoKSxcblx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0Y29uc3QgY29tcG9uZW50TmFtZSA9IHBhdGguYmFzZW5hbWUoZmlsZSwgJy52dWUnKVxuXG5cdFx0XHRcdFx0Y29uc3QgZW5oYW5jZWRJbmZvID0gYXdhaXQgZW5oYW5jZUNvbXBvbmVudEluZm8oZmlsZSwgY29tcG9uZW50SW5mbylcblxuXHRcdFx0XHRcdGRvY3NbY29tcG9uZW50TmFtZV0gPSBlbmhhbmNlZEluZm9cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgRXJybyBhbyBwYXJzZWFyICR7ZmlsZX06ICR7ZS5tZXNzYWdlfWApXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnMubWtkaXJTeW5jKCdkb2NzLy5kb2NnZW4nLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuXHRcdFx0ZnMud3JpdGVGaWxlU3luYygnZG9jcy8uZG9jZ2VuL2NvbXBvbmVudHMuanNvbicsIEpTT04uc3RyaW5naWZ5KGRvY3MsIG51bGwsIDIpKVxuXHRcdH1cblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBlbmhhbmNlQ29tcG9uZW50SW5mbyhmaWxlUGF0aCwgY29tcG9uZW50SW5mbykge1xuXHRjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKVxuXG5cdGNvbnN0IGhhc1NjcmlwdFNldHVwID0gLzxzY3JpcHRcXHMrc2V0dXAvLnRlc3QoY29udGVudClcblx0Y29uc3QgaGFzRGVmaW5lTW9kZWwgPSAvZGVmaW5lTW9kZWxcXHMqXFwoLy50ZXN0KGNvbnRlbnQpXG5cblx0aWYgKGhhc1NjcmlwdFNldHVwICYmIGhhc0RlZmluZU1vZGVsKSB7XG5cdFx0cmV0dXJuIGF3YWl0IGVuaGFuY2VXaXRoRGVmaW5lTW9kZWxFdmVudHMoZmlsZVBhdGgsIGNvbXBvbmVudEluZm8pXG5cdH1cblxuXHRyZXR1cm4gY29tcG9uZW50SW5mb1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbmhhbmNlV2l0aERlZmluZU1vZGVsRXZlbnRzKGZpbGVQYXRoLCBjb21wb25lbnRJbmZvKSB7XG5cdGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGYtOCcpXG5cblx0Y29uc3QgZGVmaW5lTW9kZWxSZWdleCA9IC9cXC9cXCpcXCpcXHMqKFtcXHNcXFNdKj8pXFwqXFwvXFxzKmNvbnN0XFxzK1xcdytcXHMqPVxccypkZWZpbmVNb2RlbFxccypcXChcXHMqWydcImBdKFteJ1wiYF0rKVsnXCJgXS9nXG5cblx0bGV0IG1hdGNoXG5cdGNvbnN0IGFkZGl0aW9uYWxFdmVudHMgPSBbXVxuXG5cdHdoaWxlICgobWF0Y2ggPSBkZWZpbmVNb2RlbFJlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgWywgY29tbWVudCwgbW9kZWxOYW1lXSA9IG1hdGNoXG5cblx0XHRjb25zdCBldmVudEluZm8gPSBwYXJzZUpTRG9jQ29tbWVudChjb21tZW50LCBtb2RlbE5hbWUpXG5cdFx0aWYgKGV2ZW50SW5mbykge1xuXHRcdFx0YWRkaXRpb25hbEV2ZW50cy5wdXNoKGV2ZW50SW5mbylcblx0XHR9XG5cdH1cblxuXHRpZiAoYWRkaXRpb25hbEV2ZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0Y29tcG9uZW50SW5mby5ldmVudHMgPSBjb21wb25lbnRJbmZvLmV2ZW50cyB8fCBbXVxuXHRcdGNvbXBvbmVudEluZm8uZXZlbnRzLnB1c2goLi4uYWRkaXRpb25hbEV2ZW50cylcblx0fVxuXG5cdHJldHVybiBjb21wb25lbnRJbmZvXG59XG5cbmZ1bmN0aW9uIHBhcnNlSlNEb2NDb21tZW50KGNvbW1lbnQsIG1vZGVsTmFtZSkge1xuXHRjb25zdCBsaW5lcyA9IGNvbW1lbnQuc3BsaXQoJ1xcbicpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpLnJlcGxhY2UoL15cXCpcXHM/LywgJycpKVxuXG5cdGxldCBkZXNjcmlwdGlvbiA9ICcnXG5cdGxldCBldmVudE5hbWUgPSBgdXBkYXRlOiR7bW9kZWxOYW1lfWBcblx0bGV0IHR5cGUgPSAndW5rbm93bidcblxuXHRmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcblx0XHRpZiAobGluZS5zdGFydHNXaXRoKCdAZXZlbnQgJykpIHtcblx0XHRcdGV2ZW50TmFtZSA9IGxpbmUucmVwbGFjZSgnQGV2ZW50ICcsICcnKS50cmltKClcblx0XHR9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnQHR5cGUgJykpIHtcblx0XHRcdHR5cGUgPSBsaW5lLnJlcGxhY2UoJ0B0eXBlICcsICcnKS50cmltKCkucmVwbGFjZSgvW3t9XS9nLCAnJylcblx0XHR9IGVsc2UgaWYgKGxpbmUgJiYgIWxpbmUuc3RhcnRzV2l0aCgnQCcpKSB7XG5cdFx0XHRkZXNjcmlwdGlvbiArPSAoZGVzY3JpcHRpb24gPyAnICcgOiAnJykgKyBsaW5lXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiBldmVudE5hbWUsXG5cdFx0ZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBFdmVudG8gZGUgYXR1YWxpemFcdTAwRTdcdTAwRTNvIGRvIHYtbW9kZWwgcGFyYSAke21vZGVsTmFtZX1gLFxuXHRcdHR5cGU6IHtcblx0XHRcdG5hbWU6IHR5cGVcblx0XHR9LFxuXHRcdHByb3BlcnRpZXM6IFtdXG5cdH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlVLFNBQVMsb0JBQW9CO0FBQ3RXLFNBQVMsZUFBZSxXQUFXOzs7QUNEaVMsU0FBUyxhQUFhO0FBQzFWLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFFRixTQUFSLGtCQUFtQztBQUN6QyxTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNLGFBQWE7QUFDbEIsWUFBTSxRQUFRLE1BQU0sS0FBSyx5QkFBeUI7QUFDbEQsWUFBTSxPQUFPLENBQUM7QUFFZCxpQkFBVyxRQUFRLE9BQU87QUFDekIsWUFBSTtBQUNILGdCQUFNLGdCQUFnQixNQUFNLE1BQU0sTUFBTTtBQUFBLFlBQ3ZDLE9BQU8sQ0FBQztBQUFBLFlBQ1IsU0FBUyxDQUFDO0FBQUEsWUFDVixLQUFLO0FBQUEsWUFDTCxjQUFjLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLEtBQUssWUFBWTtBQUFBLFVBQzVFLENBQUM7QUFFRCxnQkFBTSxnQkFBZ0IsS0FBSyxTQUFTLE1BQU0sTUFBTTtBQUVoRCxnQkFBTSxlQUFlLE1BQU0scUJBQXFCLE1BQU0sYUFBYTtBQUVuRSxlQUFLLGFBQWEsSUFBSTtBQUFBLFFBQ3ZCLFNBQVMsR0FBRztBQUNYLGtCQUFRLEtBQUssbUJBQW1CLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUFBLFFBQ3JEO0FBQUEsTUFDRDtBQUVBLFNBQUcsVUFBVSxnQkFBZ0IsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUNoRCxTQUFHLGNBQWMsZ0NBQWdDLEtBQUssVUFBVSxNQUFNLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDL0U7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxlQUFlLHFCQUFxQixVQUFVLGVBQWU7QUFDNUQsUUFBTSxVQUFVLEdBQUcsYUFBYSxVQUFVLE9BQU87QUFFakQsUUFBTSxpQkFBaUIsa0JBQWtCLEtBQUssT0FBTztBQUNyRCxRQUFNLGlCQUFpQixtQkFBbUIsS0FBSyxPQUFPO0FBRXRELE1BQUksa0JBQWtCLGdCQUFnQjtBQUNyQyxXQUFPLE1BQU0sNkJBQTZCLFVBQVUsYUFBYTtBQUFBLEVBQ2xFO0FBRUEsU0FBTztBQUNSO0FBRUEsZUFBZSw2QkFBNkIsVUFBVSxlQUFlO0FBQ3BFLFFBQU0sVUFBVSxHQUFHLGFBQWEsVUFBVSxPQUFPO0FBRWpELFFBQU0sbUJBQW1CO0FBRXpCLE1BQUk7QUFDSixRQUFNLG1CQUFtQixDQUFDO0FBRTFCLFVBQVEsUUFBUSxpQkFBaUIsS0FBSyxPQUFPLE9BQU8sTUFBTTtBQUN6RCxVQUFNLENBQUMsRUFBRSxTQUFTLFNBQVMsSUFBSTtBQUUvQixVQUFNLFlBQVksa0JBQWtCLFNBQVMsU0FBUztBQUN0RCxRQUFJLFdBQVc7QUFDZCx1QkFBaUIsS0FBSyxTQUFTO0FBQUEsSUFDaEM7QUFBQSxFQUNEO0FBRUEsTUFBSSxpQkFBaUIsU0FBUyxHQUFHO0FBQ2hDLGtCQUFjLFNBQVMsY0FBYyxVQUFVLENBQUM7QUFDaEQsa0JBQWMsT0FBTyxLQUFLLEdBQUcsZ0JBQWdCO0FBQUEsRUFDOUM7QUFFQSxTQUFPO0FBQ1I7QUFFQSxTQUFTLGtCQUFrQixTQUFTLFdBQVc7QUFDOUMsUUFBTSxRQUFRLFFBQVEsTUFBTSxJQUFJLEVBQUUsSUFBSSxVQUFRLEtBQUssS0FBSyxFQUFFLFFBQVEsVUFBVSxFQUFFLENBQUM7QUFFL0UsTUFBSSxjQUFjO0FBQ2xCLE1BQUksWUFBWSxVQUFVLFNBQVM7QUFDbkMsTUFBSSxPQUFPO0FBRVgsYUFBVyxRQUFRLE9BQU87QUFDekIsUUFBSSxLQUFLLFdBQVcsU0FBUyxHQUFHO0FBQy9CLGtCQUFZLEtBQUssUUFBUSxXQUFXLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDOUMsV0FBVyxLQUFLLFdBQVcsUUFBUSxHQUFHO0FBQ3JDLGFBQU8sS0FBSyxRQUFRLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLFNBQVMsRUFBRTtBQUFBLElBQzdELFdBQVcsUUFBUSxDQUFDLEtBQUssV0FBVyxHQUFHLEdBQUc7QUFDekMsc0JBQWdCLGNBQWMsTUFBTSxNQUFNO0FBQUEsSUFDM0M7QUFBQSxFQUNEO0FBRUEsU0FBTztBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sYUFBYSxlQUFlLCtDQUF5QyxTQUFTO0FBQUEsSUFDOUUsTUFBTTtBQUFBLE1BQ0wsTUFBTTtBQUFBLElBQ1A7QUFBQSxJQUNBLFlBQVksQ0FBQztBQUFBLEVBQ2Q7QUFDRDs7O0FEcEc4TSxJQUFNLDJDQUEyQztBQUkvUCxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFFYixNQUFNO0FBQUEsSUFDTDtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsUUFDQyxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsTUFDUDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFFQSxhQUFhO0FBQUEsSUFDWixRQUFRO0FBQUEsTUFDUCxVQUFVO0FBQUEsSUFDWDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0osRUFBRSxNQUFNLGtCQUFZLE1BQU0sZUFBZTtBQUFBLE1BQ3pDLEVBQUUsTUFBTSxlQUFlLE1BQU0sZUFBZTtBQUFBLE1BQzVDLEVBQUUsTUFBTSxTQUFTLE1BQU0sVUFBVTtBQUFBLE1BQ2pDLEVBQUUsTUFBTSxhQUFVLE1BQU0sVUFBVTtBQUFBLE1BQ2xDLEVBQUUsTUFBTSxTQUFTLE1BQU0sVUFBVTtBQUFBLE1BQ2pDLEVBQUUsTUFBTSxVQUFVLE1BQU0sbUNBQW1DO0FBQUEsSUFDNUQ7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNSLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ2YsT0FBTztBQUFBLElBQ1I7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNSLGdCQUFnQjtBQUFBLFFBQ2Y7QUFBQSxVQUNDLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNOLEVBQUUsTUFBTSxTQUFTLE1BQU0sb0JBQW9CO0FBQUEsWUFDM0MsRUFBRSxNQUFNLGNBQWMsTUFBTSx5QkFBeUI7QUFBQSxZQUNyRCxFQUFFLE1BQU0sa0JBQWUsTUFBTSwwQkFBMEI7QUFBQSxZQUN2RCxFQUFFLE1BQU0sVUFBVSxNQUFNLHFCQUFxQjtBQUFBLFlBQzdDLEVBQUUsTUFBTSxrQkFBWSxNQUFNLHdCQUF3QjtBQUFBLFlBQ2xELEVBQUUsTUFBTSxXQUFXLE1BQU0scUJBQXFCO0FBQUEsWUFDOUMsRUFBRSxNQUFNLG9CQUFjLE1BQU0seUJBQXlCO0FBQUEsWUFDckQsRUFBRSxNQUFNLGVBQWUsTUFBTSwwQkFBMEI7QUFBQSxZQUN2RCxFQUFFLE1BQU0saUJBQWlCLE1BQU0seUJBQXlCO0FBQUEsWUFDeEQsRUFBRSxNQUFNLGlCQUFjLE1BQU0seUJBQXlCO0FBQUEsVUFDdEQ7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsUUFDZjtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ04sRUFBRSxNQUFNLFVBQVUsTUFBTSwyQkFBMkI7QUFBQSxZQUNuRCxFQUFFLE1BQU0sYUFBYSxNQUFNLCtCQUErQjtBQUFBLFlBQzFELEVBQUUsTUFBTSxhQUFhLE1BQU0sK0JBQStCO0FBQUEsWUFDMUQsRUFBRSxNQUFNLFlBQVksTUFBTSw4QkFBOEI7QUFBQSxZQUN4RCxFQUFFLE1BQU0sVUFBVSxNQUFNLDJCQUEyQjtBQUFBLFlBQ25ELEVBQUUsTUFBTSxZQUFZLE1BQU0sNkJBQTZCO0FBQUEsWUFDdkQsRUFBRSxNQUFNLFNBQVMsTUFBTSwwQkFBMEI7QUFBQSxZQUNqRCxFQUFFLE1BQU0sVUFBVSxNQUFNLDJCQUEyQjtBQUFBLFlBQ25ELEVBQUUsTUFBTSxVQUFVLE1BQU0sMkJBQTJCO0FBQUEsVUFDcEQ7QUFBQSxRQUNEO0FBQUEsUUFDQTtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ04sRUFBRSxNQUFNLE9BQU8sTUFBTSw2QkFBNkI7QUFBQSxZQUNsRCxFQUFFLE1BQU0sUUFBUSxNQUFNLDhCQUE4QjtBQUFBLFlBQ3BELEVBQUUsTUFBTSx1QkFBdUIsTUFBTSw2Q0FBNkM7QUFBQSxZQUNsRixFQUFFLE1BQU0seUJBQXlCLE1BQU0sK0NBQStDO0FBQUEsWUFDdEYsRUFBRSxNQUFNLGtCQUFrQixNQUFNLHdDQUF3QztBQUFBLFlBQ3hFLEVBQUUsTUFBTSxXQUFXLE1BQU0saUNBQWlDO0FBQUEsWUFDMUQsRUFBRSxNQUFNLFdBQVcsTUFBTSxpQ0FBaUM7QUFBQSxZQUMxRCxFQUFFLE1BQU0sUUFBUSxNQUFNLDhCQUE4QjtBQUFBLFlBQ3BELEVBQUUsTUFBTSxjQUFjLE1BQU0sb0NBQW9DO0FBQUEsWUFDaEUsRUFBRSxNQUFNLGNBQWMsTUFBTSxvQ0FBb0M7QUFBQSxVQUNqRTtBQUFBLFFBQ0Q7QUFBQSxRQUNBO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTixFQUFFLE1BQU0sVUFBVSxNQUFNLHFCQUFxQjtBQUFBLFlBQzdDLEVBQUUsTUFBTSxXQUFXLE1BQU0sc0JBQXNCO0FBQUEsWUFDL0MsRUFBRSxNQUFNLGNBQWMsTUFBTSx5QkFBeUI7QUFBQSxZQUNyRCxFQUFFLE1BQU0sUUFBUSxNQUFNLG1CQUFtQjtBQUFBLFlBQ3pDLEVBQUUsTUFBTSxjQUFjLE1BQU0seUJBQXlCO0FBQUEsVUFDdEQ7QUFBQSxRQUNEO0FBQUEsUUFDQTtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ04sRUFBRSxNQUFNLFNBQVMsTUFBTSxvQkFBb0I7QUFBQSxZQUMzQyxFQUFFLE1BQU0sYUFBYSxNQUFNLHlCQUF5QjtBQUFBLFlBQ3BELEVBQUUsTUFBTSxRQUFRLE1BQU0sbUJBQW1CO0FBQUEsWUFDekMsRUFBRSxNQUFNLFFBQVEsTUFBTSxtQkFBbUI7QUFBQSxZQUN6QyxFQUFFLE1BQU0sVUFBVSxNQUFNLHFCQUFxQjtBQUFBLFlBQzdDLEVBQUUsTUFBTSxTQUFTLE1BQU0sb0JBQW9CO0FBQUEsVUFDNUM7QUFBQSxRQUNEO0FBQUEsUUFDQTtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ04sRUFBRSxNQUFNLFNBQVMsTUFBTSxvQkFBb0I7QUFBQSxZQUMzQyxFQUFFLE1BQU0sU0FBUyxNQUFNLG9CQUFvQjtBQUFBLFlBQzNDLEVBQUUsTUFBTSxTQUFTLE1BQU0sb0JBQW9CO0FBQUEsWUFDM0MsRUFBRSxNQUFNLFdBQVcsTUFBTSxzQkFBc0I7QUFBQSxZQUMvQyxFQUFFLE1BQU0sV0FBVyxNQUFNLHNCQUFzQjtBQUFBLFVBQ2hEO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNWO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTixFQUFFLE1BQU0sZUFBZSxNQUFNLHNCQUFzQjtBQUFBLFlBQ25ELEVBQUUsTUFBTSxVQUFVLE1BQU0saUJBQWlCO0FBQUEsWUFDekMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBCQUEwQjtBQUFBLFlBQzNELEVBQUUsTUFBTSxXQUFXLE1BQU0sa0JBQWtCO0FBQUEsWUFDM0MsRUFBRSxNQUFNLGdCQUFnQixNQUFNLHdCQUF3QjtBQUFBLFlBQ3RELEVBQUUsTUFBTSxrQkFBa0IsTUFBTSx5QkFBeUI7QUFBQSxZQUN6RCxFQUFFLE1BQU0saUJBQWlCLE1BQU0sd0JBQXdCO0FBQUEsWUFDdkQsRUFBRSxNQUFNLFdBQVcsTUFBTSxpQkFBaUI7QUFBQSxZQUMxQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCO0FBQUEsVUFDNUQ7QUFBQSxRQUNEO0FBQUEsUUFDQTtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ04sRUFBRSxNQUFNLFlBQVksTUFBTSxtQkFBbUI7QUFBQSxVQUM5QztBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBRUEsYUFBYTtBQUFBLE1BQ1osRUFBRSxNQUFNLFVBQVUsTUFBTSxtQ0FBbUM7QUFBQSxNQUMzRCxFQUFFLE1BQU0sT0FBTyxNQUFNLG1DQUFtQztBQUFBLE1BQ3hELEVBQUUsTUFBTSxTQUFTLE1BQU0sbUNBQW1DO0FBQUEsTUFDMUQsRUFBRSxNQUFNLGFBQWEsTUFBTSxtQ0FBbUM7QUFBQSxJQUMvRDtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ1o7QUFBQSxJQUVBLGFBQWE7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNkLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxNQUNaO0FBQUEsSUFDRDtBQUFBLElBRUEsV0FBVztBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1A7QUFBQSxFQUNEO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDTCxTQUFTLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxJQUMzQixTQUFTO0FBQUEsTUFDUixPQUFPO0FBQUEsUUFDTixLQUFLLGNBQWMsSUFBSSxJQUFJLGFBQWEsd0NBQWUsQ0FBQztBQUFBLE1BQ3pEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNKLFVBQVU7QUFBQSxNQUNULGlCQUFpQjtBQUFBLFFBQ2hCLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxXQUFXLE1BQU07QUFBQSxNQUNoRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
