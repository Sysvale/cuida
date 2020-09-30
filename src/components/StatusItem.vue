<template>
	<span id="statusItem">
		<div class="d-flex pt-2">
			<div class="p-3">
				<i
					v-if="variant === 'success'"
					class="material-icons success-icon"
				>
					check_circle
				</i>
				<i
					v-else-if="variant === 'error'"
					class="material-icons error-icon"
				>
					error
				</i>
				<i
					v-else-if="variant === 'processing'"
					class="material-icons processing-icon"
				>
					autorenew
				</i>
				<i
					v-else-if="variant === 'warning'"
					class="material-icons warning-icon"
				>
					warning
				</i>
			</div>
			<div class="w-100">
				<div class="font-weight-bold title">
					{{ title }}
				</div>
				<div
					v-if="subtitle"
					class="py-1 subtitle"
				>
					<span v-html="subtitle" />
				</div>
				<div
					v-if="clickableAction"
					class="py-2"
				>
					<!--
						Evento emitido quando ocorre o clique no link da ação.
						Como se trata de uma ação customizável, nenhum dado específico é emitido.
						@event action-clicked
						@type {Event}
					-->
					<div
						@click="$emit('action-clicked')"
						class="action"
					>
						{{ actionText }}
					</div>
					<div
						v-if="actionSubtitle"
						class="action-subtitle"
					>
						{{ actionSubtitle }}
					</div>
				</div>
				<div
					v-else-if="showAlert && variant !== 'success'"
					class="py-2 w-100"
				>
					<b-alert
						show
						class="w-75"
						:class="`alert-${variant}`"
						v-html="alertText"
					/>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		* Texto central a ser exibido pelo componente.
		*/
		title: {
			type: String,
			default: '',
			required: true,
		},
		/**
		* Texto descritivo exibido abaixo do título (reconhece marcações HTML).
		*/
		subtitle: {
			type: String,
			default: '',
			required: false,
		},
		/**
		* Altera o ícone exibido, além de alterar o estilo das mensagens de alerta (caso existam).
		*
		* Opções são: success, error, warning e processing.
		*/
		variant: {
			type: String,
			default: 'success',
			required: true,
		},
		/**
		* Exibe um link de ação clicável, localizado na parte inferior do componente.
		*
		* O uso da ação clicável sobrepõe o da mensagem de alerta.
		*/
		clickableAction: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Texto exibido no link da clickableAction.
		*/
		actionText: {
			type: String,
			default: '',
			required: false,
		},
		/**
		* Texto menor exibido abaixo da clickableAction, caso haja a
		*  necessidade de exibição de informações adicionais.
		*/
		actionSubtitle: {
			type: String,
			default: '',
			required: false,
		},
		/**
		* Exibe uma mensagem de alerta, exceto na variante de sucesso.
		*
		* Seu uso pode ser sobreposto pelo uso da ação clicável.
		*/
		showAlert: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Texto exibido na mensagem de alerta.
		*/
		alertText: {
			type: String,
			default: '',
			required: false,
		},
	},
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/app.scss';
@import '../../node_modules/material-design-icons/iconfont/material-icons.css';

#statusItem .error-icon {
	color: $vermelho-mario-base;
}

#statusItem .success-icon {
	color: $verde-piccolo-base;
}

#statusItem .processing-icon {
	color: $azul-bidu-base;
}

#statusItem .warning-icon {
	color: $amarelo-pikachu-base;
}

#statusItem .title {
	font-size: 18px;
}

#statusItem .subtitle {
	font-size: 14px;
}

#statusItem .action {
	font-size: 16px;
	font-weight: 400;
	color: $azul-bidu-dark-2;
	cursor: pointer;
}

#statusItem .action-subtitle {
	font-size: 14px;
	color: $gray-6;
}

#statusItem .alert {
	font-size: 14px;
	&-error {
		color: $vermelho-mario-dark-2;
		background-color: $vermelho-mario-light-2;
		border-color: $vermelho-mario-light-2;
	}
	&-warning {
		color: $amarelo-pikachu-dark-2;
		background-color: $amarelo-pikachu-light-2;
		border-color: $amarelo-pikachu-light-2;
	}
	&-processing {
		color: $azul-bidu-dark-2;
		background-color: $azul-bidu-light-2;
		border-color: $azul-bidu-light-2;
	}
}
</style>
