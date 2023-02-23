<template>
	<div
		class="app-bar__container"
		:style="appBarDynamicStyle"
	>
		<img
			v-if="csBrand"
			class="app-bar__logo--cs"
			:style="logoDynamicStyle"
			src="https://framerusercontent.com/images/LqVj4DBbWvH0zr04qwYMlSPvEBY.svg"
			alt="logo do Cidade Saudável"
		>

		<img
			v-else-if="sysvaleBrand"
			class="app-bar__logo--sv"
			:style="logoDynamicStyle"
			src="https://framerusercontent.com/images/djNYjj5IdpsZL50hF8HEDt5Wbg.svg"
			alt="logo da Sysvale"
		>

		<!-- @slot Slot utilizado para renderização da logo no AppBar.-->
		<slot
			class="app-bar__logo"
			:style="logoDynamicStyle"
			name="brand"
		/>

		<div class="app-bar__icons-grid">
			<cds-clickable
				v-if="!hideNotification"
				clickable
				@click="handleClick('notification')"
			>
				<cds-icon
					height="24"
					width="24"
					light
					name="notification-bell-outline"
				/>
			</cds-clickable>

			<cds-clickable
				v-if="!hideHelp"
				clickable
				@click="handleClick('help')"
			>
				<cds-icon
					height="24"
					width="24"
					light
					name="help-outline"
				/>
			</cds-clickable>

			<cds-clickable
				v-if="!hideSettings"
				clickable
				@click="handleClick('settings')"
			>
				<cds-icon
					height="24"
					width="24"
					light
					name="settings-outline"
				/>
			</cds-clickable>

			<!-- @slot Slot utilizado para adição de informações sobre o usuário no AppBar.-->
			<slot
				v-if="hasUserInfoSlot"
				name="user-info"
				class="user-info__container"
			/>

			<div
				v-else
				class="user-info__avatar-container"
			>
				<div class="user-info__container">
					<span class="user-info__name">{{ userName }}</span>
					<span class="user-info__description">{{ userDescription }}</span>
				</div>
	
				<cds-avatar
					:name="userName"
					variant="white"
					size="md"
					clickable
					@click="handleClick('avatar')"
				>
					<template #dropdown-content>
						<!-- @slot Slot utilizado para renderização do conteúdo do dropdown do Avatar.-->
						<slot name="dropdown-content" />
					</template>
				</cds-avatar>
			</div>

			<div
				v-if="!hideAppSwitcher"
				class="app-switcher__container"
			>
				<cds-divider
					vertical
					width="30"
				/>
	
				<cds-clickable
					clickable
					@click="handleClick('app-switcher')"
				>
					<cds-icon
						height="24"
						width="24"
						light
						name="grid-outline"
					/>
				</cds-clickable>
			</div>
		</div>

		<!-- @slot Slot utilizado para renderização de ícone de módulos.-->
		<div
			v-if="hasAppSlot"
			class="app-switcher"
		>
			<slot name="app-info" />
		</div>
	</div>
</template>

<script>
import CdsIcon from './Icon.vue';
import CdsDivider from './Divider.vue';
import CdsAvatar from './Avatar.vue';
import CdsClickable from './Clickable.vue';

export default {
	components: {
		CdsIcon,
		CdsAvatar,
		CdsDivider,
		CdsClickable,
	},

	props: {
		/**
		 * Controla a exibição do ícone de settings.
		 */
		hideSettings: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla a exibição do ícone de ajuda.
		 */
		hideHelp: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla a exibição do ícone de notificação.
		 */
		hideNotification: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla a exibição do ícone de notificação.
		 */
		hideAppSwitcher: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indica se a logo a ser exibida é da Sysvale.
		 */
		sysvaleBrand: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indica se a logo a ser exibida é do Cidade Saudável.
		 */
		csBrand: {
			type: Boolean,
			default: false,
		},
		/**
		 * Nome do usuário exibido no Avatar.
		 */
		userName: {
			type: String,
			default: null,
		},
		/**
		 * Descrição do usuário mostrada embaixo do nome.
		 */
		userDescription: {
			type: String,
			default: null,
		},
	},

	computed: {
		//NOTE: Essas computadas foram modularizadas no Cuida 3
		hasAppSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'app-info');
		},

		hasUserInfoSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'user-info');
		},

		appBarDynamicStyle() {
			return {
				'--template-areas': this.hasAppSlot ? "'app logo icons'" : "'logo icons'",
				'--template-columns': this.hasAppSlot ? '1fr 1fr 1fr' : '1fr 1fr',
			};
		},

		logoDynamicStyle() {
			return {
				'--logo-alignment': this.hasAppSlot ? 'center' : 'flex-start',
			};
		},
	},

	methods: {
		handleClick(element) {
			/**
			* Evento emitido quando os elementos da AppBar são clicados.
			* Esse emit é dinâmico, gerando os eventos:
			*
			* `settings-click`
			*
			* `help-click`
			*
			* `notification-click`
			*
			* `avatar-click`
			*
			* `app-switcher-click`
			* @event `${element}-click`
			* @type {Event}
			*/
			this.$emit(`${element}-click`, true);
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

.app-bar {
	&__container {
		align-items: center;
		background-color: #576169;
		display: grid;
		grid-template-areas: var(--template-areas);
		grid-template-columns: var(--template-columns);
		height: 60px;
		padding: px(4);
	}

	&__logo {
		grid-area: logo;
		height: 40px;
		justify-self: var(--logo-alignment);

		&--cs {
			@extend .app-bar__logo;
		}

		&--sv {
			@extend .app-bar__logo;
			height: 28px;
		}
	}

	&__icons-grid {
		align-items: center;
		display: flex;
		gap: spacer(2);
		grid-area: icons;
		justify-self: end;
	}
}

.user-info {
	&__avatar-container {
		display: contents;
	}
	
	&__container{
		align-items: flex-end;
		color: $n-0;
		display: flex;
		flex-direction: column;
		margin: ml(4)
	}
	
	&__name {
		@include caption;
		font-weight: $font-weight-semibold;
	}
	
	&__description {
		font-size: 12px;
		font-weight: $font-weight-regular;
	}
}

.app-switcher {
	& > div {
		align-items: center;
		display: flex;
		grid-area: icons;
	}

	&__container {
		display: contents;
	}
}

.app-name {
	color: $n-0;
	font-weight: $font-weight-regular;
	margin: mTRBL(1, 0, 0, 2);
	@include caption;
}
</style>
