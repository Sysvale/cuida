/// <reference types="vitepress/client" />

import type { Component } from "vue";

// Aqui você declara todos os componentes globais que quer autocomplete
declare module "vue" {
  export interface GlobalComponents {
	CdsButton: Component
	CdsInput: Component
	CdsSpinner: Component
	CdsCard: Component
	APITable: Component
	PreviewContainer: Component
	FigmaFrame: Component
  }
}
