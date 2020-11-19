<template>
	<span id="status-item">
		<div class="item__container">
			<div class="icon__container">
				<i
					:class="`material-icons icon--${variant}`"
				>
					{{ resolveIcon(variant) }}
				</i>
			</div>
			<div class="content__container">
				<div class="content__title">
					{{ title }}
				</div>
				<div
					v-if="subtitle"
					class="content__subtitle"
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
						class="action--clickable"
					>
						{{ actionText }}
					</span>
					<div
						v-if="actionSubtitle"
						class="action__subtitle"
					>
						{{ actionSubtitle }}
					</div>
				</div>
				<div
					v-else-if="showAlert"
					class="alert__container"
				>
					<b-alert
						show
						:class="`alert--${variant}`"
					>
						<!--
							Evento emitido quando ocorre o clique no alerta.
							Como se trata de uma ação customizável, nenhum dado específico é emitido.
							@event alert-clicked
							@type {Event}
						-->
						<span
							:class="clickableAlert ? 'alert--clickable' : ''"
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

	methods: {
		resolveIcon(variant) {
			switch (variant) {
				case 'success':
					return 'check_circle';
				case 'processing':
					return 'autorenew';
				default:
					return variant;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';
@import '../../node_modules/material-design-icons/iconfont/material-icons.css';

#status-item .item__container {
	display: flex;
	padding-top: 8px;
}

#status-item .icon__container {
	padding: 16px;
}

#status-item .icon {
	&--error {
		color: $vermelho-mario-base;
	}

	&--success {
		color: $verde-piccolo-base;
	}

	&--processing {
		color: $azul-bidu-base;
	}

	&--warning {
		color: $amarelo-pikachu-base;
	}
}

#status-item .content__container {
	width: 100%;
}

#status-item .content__title {
	font-size: 18px;
	font-weight: 700;
}

#status-item .content__subtitle {
	padding: 4px 0;
}

#status-item .action {
	font-weight: 400;
	color: $azul-bidu-dark-2;

	&--clickable {
		@extend .action;
		cursor: pointer;
	}
}

#status-item .action__subtitle {
	font-size: 14px;
	color: $cinza-6;
}

#status-item .alert__container {
	width: 100%;
	padding: 16px 0;
}

#status-item .alert {
	width: 75%;
	font-size: 14px;

	&--success {
		@extend .alert;
		color: $verde-piccolo-dark-2;
		background-color: $verde-piccolo-light-2;
		border-color: $verde-piccolo-light-2;
	}

	&--error {
		@extend .alert;
		color: $vermelho-mario-dark-2;
		background-color: $vermelho-mario-light-2;
		border-color: $vermelho-mario-light-2;
	}

	&--warning {
		@extend .alert;
		color: $amarelo-pikachu-dark-2;
		background-color: $amarelo-pikachu-light-2;
		border-color: $amarelo-pikachu-light-2;
	}

	&--processing {
		@extend .alert;
		color: $azul-bidu-dark-2;
		background-color: $azul-bidu-light-2;
		border-color: $azul-bidu-light-2;
	}

	&--clickable {
		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
}
</style>
