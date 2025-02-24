import Wizard from "../../components/Wizard.vue";
import TextInput from "../../components/TextInput.vue";

const Template = (args) => ({
  components: { CdsWizard: Wizard, CdsTextInput: TextInput },
  setup() {
    return { args };
  },
  data() {
    return {
      activeStep: 0,
    };
  },
  /*html*/
  template: `<cds-wizard
			v-bind="args"
			:active-step="activeStep"
			@step-change="handleStepChange"
			@next-action="handleNextAction"
			@cancel-action="handleCancelAction"
		>
			<template #step-1>
				<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
					<cds-text-input
						fluid
						label="Nome"
					/>
					<cds-text-input
						fluid
						label="Sobrenome"
					/>
					<cds-text-input
						fluid
						label="Nome da mãe"
					/>
				</div>
			</template>
			<template #step-2>
				<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
					<cds-text-input
						fluid
						label="CEP"
					/>
					<cds-text-input
						fluid
						label="Rua"
					/>
					<cds-text-input
						fluid
						label="Bairro"
					/>
					<cds-text-input
						fluid
						label="Cidade"
					/>
				</div>
			</template>
			<template #step-3>
				<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
					<cds-text-input
						fluid
						label="Modalidade"
					/>
					<cds-text-input
						fluid
						label="URL do site"
					/>
					<cds-text-input
						fluid
						label="Informação Complementar"
					/>
				</div>
			</template>
		</cds-wizard>
		<br>
		`,
  methods: {
    handleStepChange(value) {
      console.info("%c@step-change: ", "color: #2C70CD;", value);
      this.activeStep = value;
    },
    handleNextAction(value) {
      console.info("%c@next-action: ", "color: #2C70CD;", value.nextStep);
      this.activeStep = value.nextStep;
    },
    handleCancelAction(value) {
      console.info("%c@cancel-action: ", "color: #2C70CD;", value);
    },
  },
});

const steps = [
  {
    title: "Informações gerais",
    subtitle: "Insira as informações de identificação",
  },
  {
    title: "Endereço de entrega",
  },
  {
    title: "Informações complementares",
    subtitle: "Adicione informações complementares para triagem",
    image:
      "https://static.vecteezy.com/system/resources/previews/011/537/753/non_2x/box-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg",
  },
];

export default {
  title: "Componentes/Display/Wizard",
  component: Wizard,

  argTypes: {
    activeStep: {
      control: {
        type: "range",
        min: 0,
        max: 2,
        step: 1,
      },
    },

    nextButtonVariant: {
      control: {
        type: "select",

        options: [
          "green",
          "teal",
          "turquoise",
          "blue",
          "indigo",
          "violet",
          "pink",
          "red",
          "orange",
          "amber",
          "dark",
        ],
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

        code: `<cds-wizard
	:steps="steps"
>
	<template #step-1>
		Etapa 1
	</template>
	<template #step-2>
		Etapa 2
	</template>
</cds-wizard>
`,
      },
    },
  },
};

export const Wizard = {
  render: Template.bind({}),
  name: "Wizard",

  args: {
    steps,
    nextButtonVariant: "blue",
  },
};
