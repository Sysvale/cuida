import dedent from "ts-dedent";

import Card from "../../components/Card.vue";
import Button from "../../components/Button.vue";
import Badge from "../../components/Badge.vue";
import Icon from "../../components/Icon.vue";

const TemplateStandard = (args) => ({
  components: { CdsCard: Card, CdsButton: Button, CdsBadge: Badge },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-card
			v-bind="args"
			@cardClick="logClick"
		>
			<template #header>
				<div style="margin-bottom: 12px">
					Card Title
				</div>
			</template>
			<template #extra>
				<cds-badge>Action</cds-badge>
			</template>
			<template #body>
				Some quick example text to build on the card title and make up the bulk of the card's content.
			</template>
			<template #footer>
				<cds-button size="md" style="margin-top: 16px">
					Action 1
				</cds-button>
			</template>
		</cds-card>
	`,
  methods: {
    logClick(event) {
      console.info("logClick: ", event);
    },
  },
});

const SimpleCardTemplate = (args) => ({
  components: { CdsCard: Card, CdsButton: Button, CdsBadge: Badge },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-card
			v-bind="args"
		>
		</cds-card>
	`,
});

const withSlotsTemplate = (args) => ({
  components: { CdsCard: Card, CdsButton: Button, CdsBadge: Badge },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-card
			v-bind="args"
		>
			<template #header>45 <small>gestantes</small></template>
			<template #extra>
				<cds-badge variant="red">Alerta</cds-badge>
			</template>
			<template #body>
				Não realizam consulta há mais de 30 dias
			</template>
			<template #footer>
				<div class="d-flex justify-content-end">
					<small><strong>VER LISTA</strong></small>
				</div>
			</template>
		</cds-card>
	`,
});

const withIconTemplate = (args) => ({
  components: { CdsCard: Card, CdsButton: Button, CdsIcon: Icon },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-card
			v-bind="args"
		>
			<template #icon>
				<div class="d-flex align-items-center justify-content-center" style="background: #ecf1fe; height: 48px; width: 48px; border-radius: 8px">
					<cds-icon name="home-outline" color="#1A55A8"/>
				</div>
			</template>
			<template #header>
				<div style="font-size: 24px; margin-bottom: 4px"> 32 </div>
			</template>
			<template #body>
				UBSs com dados atualizados
			</template>
		</cds-card>
	`,
});

const horizontalPropTemplate = (args) => ({
  components: { CdsCard: Card, CdsButton: Button, CdsBadge: Badge },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-card
			v-bind="args"
		>
		</cds-card>
	`,
});

export default {
  title: "Componentes/Containers/Card",
  component: Card,

  argTypes: {
    imageWidth: {
      control: {
        type: "range",
        min: 150,
        max: 550,
        step: 10,
      },
    },

    imageHeight: {
      control: {
        type: "range",
        min: 150,
        max: 550,
        step: 10,
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

        code: `<cds-card
	imageWidth="300"
	imageHeight="180"
	imageSrc="https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
	@cardClick="logClick"
>
	<template #header>
		<div style="margin-bottom: 12px">
			Card Title
		</div>
	</template>
	<template #extra>
		<cds-badge>Action</cds-badge>
	</template>
	<template #body>
		Some quick example text to build on the card title and make up the bulk of the card's content.
	</template>
	<template #footer>
		<cds-button size="md" style="margin-top: 16px">
			Action 1
		</cds-button>
	</template>
</cds-card>`,
      },
    },
  },
};

export const CardStandard = {
  render: TemplateStandard.bind({}),
  name: "Card-standard",

  args: {
    imageWidth: 300,
    imageHeight: 180,
    clickable: false,
    horizontal: false,
    imageSrc:
      "https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
};

export const SimpleCard = {
  render: SimpleCardTemplate.bind({}),
  name: "simple-card",

  args: {
    title: "Card Title",
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
};

export const CardWithSlots = {
  render: withSlotsTemplate.bind({}),
  name: "Card-with-slots",
};

export const CardWithIcon = {
  render: withIconTemplate.bind({}),
  name: "Card-with-icon",

  args: {
    horizontal: true,
  },
};

export const CardWithHorizontalProp = {
  render: horizontalPropTemplate.bind({}),
  name: "Card-with-horizontal-prop",

  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    horizontal: true,
    imageWidth: 200,
    title: "Card Title",
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
};
