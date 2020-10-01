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
					v-else-if="variant === 'info'"
					class="material-icons info-icon"
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
				<div class="font-weight-bold fs-18">
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
					<span
						@click="$emit('action-clicked')"
						class="action clickable"
					>
						{{ actionText }}
					</span>
					<div
						v-if="actionSubtitle"
						class="action-subtitle fs-14"
					>
						{{ actionSubtitle }}
					</div>
				</div>
				<div
					v-else-if="showAlert"
					class="py-2 w-100"
				>
					<!--
						Evento emitido quando ocorre o clique no alerta.
						Como se trata de uma ação customizável, nenhum dado específico é emitido.
						@event alert-clicked
						@type {Event}
					-->
					<b-alert
						show
						class="w-75 fs-14"
						:class="`alert-${variant}`"
					>
						<span
							:class="clickableAlert ? 'clickable clickable-alert' : ''"
							v-html="alertText"
							@click="clickableAlert ? $emit('alert-clicked') : ''"
						/>
					</b-alert>
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
		* Opções são: success, error, warning e info.
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
		* Exibe uma mensagem de alerta, com o tema variando de acordo com a variante escolhida.
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
		/**
		* Define se o alerta será clicável, implicando na emissão de um evento.
		*/
		clickableAlert: {
			type: Boolean,
			default: false,
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

#statusItem .info-icon {
	color: $azul-bidu-base;
}

#statusItem .warning-icon {
	color: $amarelo-pikachu-base;
}

#statusItem .action {
	font-weight: 400;
	color: $azul-bidu-dark-2;
}

#statusItem .action-subtitle {
	font-size: 14px;
	color: $gray-6;
}

#statusItem .fs-18 {
	font-size: 18px;
}

#statusItem .fs-14 {
	font-size: 14px;
}

#statusItem .clickable {
	cursor: pointer;
}

#statusItem .alert {
	&-success {
		color: $verde-piccolo-dark-2;
		background-color: $verde-piccolo-light-2;
		border-color: $verde-piccolo-light-2;
	}
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
	&-info {
		color: $azul-bidu-dark-2;
		background-color: $azul-bidu-light-2;
		border-color: $azul-bidu-light-2;
	}
}

#statusItem .clickable-alert {
	&:hover {
		text-decoration: underline;
	}
}
</style>
