import Grid from "../../components/Grid.vue";
import GridItem from "../../components/GridItem.vue";
import Spacer from "../../components/Spacer.vue";

const ColsTemplate1 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem, CdsSpacer: Spacer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			:cols="3"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">1fr</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">1fr</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">1fr</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const ColsTemplate2 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem, CdsSpacer: Spacer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="minmax(auto, 50%) 1fr minmax(100px, 300px)"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">minmax(auto, 50%)</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">1fr</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">minmax(100px, 300px)</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const ColsTemplate3 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			:cols="['200px', '6rem', '50%']"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">200px</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">6rem</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">50%</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const ColSpan = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			:cols="6"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item colSpan="1">
				<div class="docs-grid-cell">col-span="1"</div>
			</cds-grid-item>
			<cds-grid-item colSpan="3">
				<div class="docs-grid-cell">col-span="2"</div>
			</cds-grid-item>
			<cds-grid-item colSpan="2">
				<div class="docs-grid-cell">col-span="3"</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const ColStart = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			:cols="6"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item colSpan="1" colStart="3">
				<div class="docs-grid-cell">col-start="3"</div>
			</cds-grid-item>
			<cds-grid-item colSpan="1" colStart="5">
				<div class="docs-grid-cell">col-start="5"</div>
			</cds-grid-item>
			<cds-grid-item colSpan="2" colStart="4">
				<div class="docs-grid-cell">col-start="4"</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const RowsTemplates = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			:cols="1"
			:rows="['32px', '3.2rem', '40%']"
			gap="4px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">32px</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">3.2rem</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">40%</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const AutoRows = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			rows="50px 50px"
			autoRows="120px"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">50px</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">50px</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">120px</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">120px</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const RowSpan = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			:cols="3"
			:rows="2"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item rowSpan="2">
				<div class="docs-grid-cell">row-span="2"</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">--</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">--</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const RowStart = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			:rows="6"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item rowStart="2">
				<div class="docs-grid-cell">row-start="2"</div>
			</cds-grid-item>
			<cds-grid-item rowStart="3">
				<div class="docs-grid-cell">row-start="3"</div>
			</cds-grid-item>
			<cds-grid-item rowStart="6">
				<div class="docs-grid-cell">row-start="6"</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GapTemplate1 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			:cols="2"
			gap="8px"
			class="grid-background"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">02</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">03</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">04</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GapTemplate2 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
			<cds-grid
				:cols="2"
				rowGap="30px"
				colGap="120px"
				class="grid-background"
			>
				<cds-grid-item>
					<div class="docs-grid-cell">01</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">02</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">03</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">04</div>
				</cds-grid-item>
			</cds-grid>
	`,
});

const GridJustify1 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
				cols="100px 100px 100px"
				gap="20px"
				class="grid-background"
				justify="space-between"
			>
				<cds-grid-item>
					<div class="docs-grid-cell">01</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">02</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">03</div>
				</cds-grid-item>
			</cds-grid>
	`,
});

const GridJustify2 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="100px 100px 100px"
			gap="20px"
			class="grid-background"
			justify="center"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">02</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">03</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GridJustify3 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="100px 100px 100px"
			gap="20px"
			class="grid-background"
			justify="end"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">02</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">03</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GridAlign1 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="100px 100px 100px"
			rows="100px"
			gap="20px"
			class="grid-background"
			align="start"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">02</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">03</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GridAlign2 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="100px 100px 100px"
			rows="100px"
			gap="20px"
			class="grid-background"
			align="center"
		>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">02</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">03</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const GridAlign3 = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
			<cds-grid
				cols="100px 100px 100px"
				rows="100px"
				gap="20px"
				class="grid-background"
				align="end"
			>
				<cds-grid-item>
					<div class="docs-grid-cell">01</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">02</div>
				</cds-grid-item>
				<cds-grid-item>
					<div class="docs-grid-cell">03</div>
				</cds-grid-item>
			</cds-grid>
	`,
});

const ItemJustify = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem, CdsSpacer: Spacer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			cols="200px"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item justify="start">
				<div class="docs-grid-cell">justify="start"</div>
			</cds-grid-item>
			<cds-grid-item  justify="center">
				<div class="docs-grid-cell">justify="center"</div>
			</cds-grid-item>
			<cds-grid-item  justify="end">
				<div class="docs-grid-cell">justify="end"</div>
			</cds-grid-item>
			<cds-grid-item justify="stretch">
				<div class="docs-grid-cell">justify="stretch"</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const ItemAlign = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			cols="200px 200px 200px 200px"
			rows="200px"
			gap="20px"
			class="grid-background"
		>
			<cds-grid-item align="start">
				<div class="docs-grid-cell">align="start"</div>
			</cds-grid-item>
			<cds-grid-item  align="center">
				<div class="docs-grid-cell">align="center"</div>
			</cds-grid-item>
			<cds-grid-item  align="end">
				<div class="docs-grid-cell">align="end"</div>
			</cds-grid-item>
			<cds-grid-item align="stretch">
				<div class="docs-grid-cell">align="stretch"</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const SubGrid = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			cols="250px 250px 250px"
			rows="100px"
			gap="20px"
			class="grid-background"
			justify="space-between"
		>
			<cds-grid-item subGrid direction="column">
				<div class="docs-grid-cell">I</div>
				<div class="docs-grid-cell">II</div>
				<div class="docs-grid-cell">III</div>
			</cds-grid-item>
			<cds-grid-item subGrid>
				<div class="docs-grid-cell">A</div>
				<div class="docs-grid-cell">B</div>
			</cds-grid-item>
			<cds-grid-item>
				<div class="docs-grid-cell">01</div>
			</cds-grid-item>
		</cds-grid>
	`,
});

const Template = (args) => ({
  components: { CdsGrid: Grid, CdsGridItem: GridItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-grid
			v-bind="args"
			class="grid-background"
		>
			<cds-grid-item
				subGrid
				gap="32px"
				colSpan="3"
				rowSpan="1"
			>
				<div class="docs-grid-cell">
					Cell 1
				</div>
				<div class="docs-grid-cell">
					Cell 3
				</div>
			</cds-grid-item>
			<cds-grid-item
				colSpan="3"
				rowSpan="1"
				class="docs-grid-cell"
			>
				Cell 2
			</cds-grid-item>
			<cds-grid-item
				subGrid
				gap="32px"
				colSpan="4"
			>
				<cds-grid
					gap="32px"
					cols="minmax(250px, auto) 1fr"
				>
					<div class="docs-grid-cell">
						Cell 4
					</div>
					<div class="docs-grid-cell">
						Cell 5
					</div>
				</cds-grid>
				<div class="docs-grid-cell">
					Cell 6
				</div>
			</cds-grid-item>
			<cds-grid-item
				colSpan="2"
				class="docs-grid-cell"
			>
				Cell 7
			</cds-grid-item>
			<cds-grid-item
				colSpan="6"
				class="docs-grid-cell"
			>
				Cell 8
			</cds-grid-item>
		</cds-grid>
	`,
});

export default {
  title: "Componentes/Containers/Grid",
  component: Grid,

  argTypes: {
    gap: {
      control: {
        type: "range",
        min: 0,
        max: 32,
        step: 4,
      },
    },

    cols: {
      control: {
        type: "range",
        min: 1,
        max: 12,
        step: 1,
      },
    },
  },

  /*html*/
  parameters: {
    viewMode: "docs",

    previewTabs: {
      canvas: {
        hidden: true,
      },
    },

    docs: {
      source: {
        language: "html",
        format: true,

        code: `        <div class="grid-background">
			<cds-grid
				v-bind="args"
				class="grid-background"
			>
				<cds-grid-item
					subGrid
					gap="32px"
					colSpan="3"
					rowSpan="1"
				>
					<div class="docs-grid-cell">
						Cell 1
					</div>
					<div class="docs-grid-cell">
						Cell 3
					</div>
				</cds-grid-item>
				<cds-grid-item
					colSpan="3"
					rowSpan="1"
					class="docs-grid-cell"
				>
					Cell 2
				</cds-grid-item>
				<cds-grid-item
					subGrid
					gap="32px"
					colSpan="4"
				>
					<cds-grid
						gap="32px"
						cols="minmax(250px, auto) 1fr"
					>
						<div class="docs-grid-cell">
							Cell 4
						</div>
						<div class="docs-grid-cell">
							Cell 5
						</div>
					</cds-grid>
					<div class="docs-grid-cell">
						Cell 6
					</div>
				</cds-grid-item>
				<cds-grid-item
					colSpan="2"
					class="docs-grid-cell"
				>
					Cell 7
				</cds-grid-item>
				<cds-grid-item
					colSpan="6"
					class="docs-grid-cell"
				>
					Cell 8
				</cds-grid-item>
			</cds-grid>
		</div>`,
      },
    },
  },
};

export const GridTemplateColumns1 = {
  render: ColsTemplate1.bind({}),
  name: "grid-template-columns1",
};

export const GridTemplateColumns2 = {
  render: ColsTemplate2.bind({}),
  name: "grid-template-columns2",
};

export const GridTemplateColumns3 = {
  render: ColsTemplate3.bind({}),
  name: "grid-template-columns3",
};

export const ColSpan_ = {
  render: ColSpan.bind({}),
  name: "col-span",
};

export const ColStart_ = {
  render: ColStart.bind({}),
  name: "col-start",
};

export const GridTemplateRows = {
  render: RowsTemplates.bind({}),
  name: "grid-template-rows",
};

export const AutoRows_ = {
  render: AutoRows.bind({}),
  name: "auto-rows",
};

export const RowSpan_ = {
  render: RowSpan.bind({}),
  name: "row-span",
};

export const RowStart_ = {
  render: RowStart.bind({}),
  name: "row-start",
};

export const GridTemplate1 = {
  render: GapTemplate1.bind({}),
  name: "grid-template-1",
};

export const GridTemplate2 = {
  render: GapTemplate2.bind({}),
  name: "grid-template-2",
};

export const GridJustify1_ = {
  render: GridJustify1.bind({}),
  name: "grid-justify1",
};

export const GridJustify2_ = {
  render: GridJustify2.bind({}),
  name: "grid-justify2",
};

export const GridJustify3_ = {
  render: GridJustify3.bind({}),
  name: "grid-justify3",
};

export const GridAlign1_ = {
  render: GridAlign1.bind({}),
  name: "grid-align1",
};

export const GridAlign2_ = {
  render: GridAlign2.bind({}),
  name: "grid-align2",
};

export const GridAlign3_ = {
  render: GridAlign3.bind({}),
  name: "grid-align3",
};

export const ItemJustify_ = {
  render: ItemJustify.bind({}),
  name: "item-justify",
};

export const ItemAlign_ = {
  render: ItemAlign.bind({}),
  name: "item-align",
};

export const Subgrid = {
  render: SubGrid.bind({}),
  name: "subgrid",
};
