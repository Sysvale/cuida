import { computed, type Ref, type ComputedRef } from 'vue';

interface AriaLabelArgs {
	text: Ref<string> | string;
	loading: Ref<boolean> | boolean;
	disabled: Ref<boolean> | boolean;
	loadingText?: string;
	disabledText?: string;
}

/**
 * Composable genérico para gerar aria-label acessível
 * Funciona com qualquer componente que necessite de labels acessíveis
 *
 * @param args - Objeto contendo todos os parâmetros
 * @param args.text - Texto principal do componente
 * @param args.loading - Indica se o componente está em estado de carregamento
 * @param args.disabled - Indica se o componente está desabilitado
 * @param args.loadingText - Texto customizável para estado de carregamento
 * @param args.disabledText - Texto customizável para estado desabilitado
 * @returns aria-label reativo
 */
export function useAriaLabel(args: AriaLabelArgs): ComputedRef<string> {
	const {
		text,
		loading,
		disabled,
		loadingText = 'carregando',
		disabledText = 'desabilitado',
	} = args;

	return computed(() => {
		const baseText = typeof text === 'object' && text.value !== undefined ? text.value : text;
		const isLoading = typeof loading === 'object' && loading.value !== undefined ? loading.value : loading;
		const isDisabled = typeof disabled === 'object' && disabled.value !== undefined ? disabled.value : disabled;

		if (!baseText) {
			return '';
		}

		const parts: any[] = [baseText];

		if (isLoading) {
			parts.push(loadingText);
		}

		if (isDisabled) {
			parts.push(disabledText);
		}

		return parts.join(', ');
	});
}