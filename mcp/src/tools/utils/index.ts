import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import {
	GetDocumentationGuideHandler,
	GetApiTableHandler,
	GetCdsFloatifyHandler,
	GetCdsTipHandler,
	GetContrastCheckerHandler,
	GetFigmaFrameHandler,
	GetHasSlotHandler,
	GetIsDeviceTypeHandler,
	GetLogBuilderHandler,
	GetPaleteResolverHandler,
	GetPlaygroundBuilderHandler,
	GetPreviewBuilderHandler,
	GetPreviewContainerHandler,
	GetRemoveAccentsHandler,
	GetRounderHandler,
	GetUseToastHandler,
	GetVariantResolverHandler,
} from './handlers/index.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	get_documentation_guide: new GetDocumentationGuideHandler(),
	get_api_table: new GetApiTableHandler(),
	get_cds_floatify: new GetCdsFloatifyHandler(),
	get_cds_tip: new GetCdsTipHandler(),
	get_contrast_checker: new GetContrastCheckerHandler(),
	get_figma_frame: new GetFigmaFrameHandler(),
	get_has_slot: new GetHasSlotHandler(),
	get_is_device_type: new GetIsDeviceTypeHandler(),
	get_log_builder: new GetLogBuilderHandler(),
	get_palete_resolver: new GetPaleteResolverHandler(),
	get_playground_builder: new GetPlaygroundBuilderHandler(),
	get_preview_builder: new GetPreviewBuilderHandler(),
	get_preview_container: new GetPreviewContainerHandler(),
	get_remove_accents: new GetRemoveAccentsHandler(),
	get_rounder: new GetRounderHandler(),
	get_use_toast: new GetUseToastHandler(),
	get_variant_resolver: new GetVariantResolverHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'token');

export function getUtilsTools() {
	return getToolsFromHandlers(handlers)
};

export async function handleUtilsToolCall(request: CallToolRequest): Promise<CallToolResult> {
	return baseHandler(request);
}
