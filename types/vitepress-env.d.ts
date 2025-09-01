/// <reference types="vitepress/client" />

import type { Component } from "vue";
import type { DefineComponent } from "vue";
import type { PreviewBuilderType } from "../docs/docgen/PreviewBuilder.vue";
import type { PreviewContainerType } from "../docs/docgen/PreviewContainer.vue";
import type { PlaygroundBuilderType } from "../docs/docgen/PlaygroundBuilder.vue";

// Aqui você declara todos os componentes globais que quer autocomplete
declare module "vue" {
	export interface GlobalComponents {
		CdsButton: Component;
		CdsInput: Component;
		CdsSpinner: Component;
		CdsCard: Component;
		APITable: Component;
		PreviewContainer: PreviewContainerType;
		PlaygroundBuilder: PlaygroundBuilderType;
		FigmaFrame: Component;
		PreviewBuilder: PreviewBuilderType;
	}
}
