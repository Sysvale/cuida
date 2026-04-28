import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import {
	GetColorsPalleteHandler,
	GetFontWeightHandler,
	GetTypographyHandler,
	GetSpacingHandler,
	GetBordersHandler,
	GetElevationHandler,
	GetShadowsHandler,
	GetTransitionsHandler,
	GetIconographyHandler,
	GetPrinciplesHandler,
} from './handlers/index.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	get_colors_pallete: new GetColorsPalleteHandler(),
	get_typography: new GetTypographyHandler(),
	get_font_weight: new GetFontWeightHandler(),
	get_spacing: new GetSpacingHandler(),
	get_borders: new GetBordersHandler(),
	get_elevation: new GetElevationHandler(),
	get_shadows: new GetShadowsHandler(),
	get_transitions: new GetTransitionsHandler(),
	get_iconography: new GetIconographyHandler(),
	get_principles: new GetPrinciplesHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'token');

export function getFoundationTools(includeContributor: boolean = false) {
	return getToolsFromHandlers(handlers, includeContributor)
};

export async function handleFoundationToolCall(request: CallToolRequest): Promise<CallToolResult> {
	return baseHandler(request);
}
