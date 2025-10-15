# InteractionBlockingOverlay

O InteractionBlockingOverlay é um componente utilizado para bloquear a interação do usuário em situações onde o sistema não está preparado para o uso, como em telas ou módulos que não possuem responsividade adequada para dispositivos móveis ou no modo paisagem (landscape).

---
<br>

## Quando usar:
- Quando uma tela ou módulo não possui uma versão responsiva para dispositivos móveis, garantindo que o usuário não interaja com elementos quebrados ou não funcionais.
- Quando um dispositivo móvel estiver em modo paisagem e o layout da aplicação não estiver adaptado para essa orientação.
- Em situações temporárias, onde uma funcionalidade ou conteúdo específico precisa ser desativado para manutenção ou atualização.

<br>

## Quando não usar:
- Quando o sistema já oferece uma versão responsiva ou uma alternativa viável para a interação em dispositivos móveis.
- Em casos onde a aplicação pode ajustar automaticamente o layout sem necessidade de bloqueio.
- Se o bloqueio da interação pode causar frustração ao usuário, especialmente em funcionalidades essenciais ou em fluxos críticos.

---

## Uso

```js
<CdsInteractionBlockingOverlay
	block-interaction="mobile"
	title="título"
	description="descrição"
	button-variant="green"
	button-text="Ir para o início"
	@button-click="handler"
/>
```

---

## Preview

<ClientOnly>
	<PreviewContainer
		:component="CdsInteractionBlockingOverlay"
		:events="cdsInteractionBlockingOverlayEvents"
	>
		<CdsFlexbox justify="center">
			<b>Teste o componente usando o devtools do navegador
			alterando a resolução da tela para mobile ou landscape.</b>
			<CdsInteractionBlockingOverlay v-bind="args"/>
		</CdsFlexbox>
	</PreviewContainer>
</ClientOnly>

<PlaygroundBuilder
	:args
	:component="InteractionBlockingOverlay"
/>

---

## Props

<APITable
	name="CdsInteractionBlockingOverlay"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsInteractionBlockingOverlay"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsInteractionBlockingOverlay from '@/components/InteractionBlockingOverlay.vue';

const cdsInteractionBlockingOverlayEvents = [
	'button-click'
];

const args = ref({});
</script>
