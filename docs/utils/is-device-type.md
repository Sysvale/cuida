# IsDeviceType()

Método utilizado para checar se o dispositivo é de um determinado tipo (Smartphone, Tablet, Tela HD, Tela Full HD, Tela Ultra HD).

<hr>
<br>

#### Argumentos

**(String):**
- Nome da classe de dispositivos que se deseja checar
- Obrigatória: *Sim*
- Valores válidos: _smartphone_, _tablet_, _hd-screen_, _fhd-screen_, _uhd-screen_;

<br>

#### Retorno

**(Boolean):** Indica se o dispositivo usado pertence àquele grupo ou não.

<br>

#### Exemplo

```js
	isDeviceType('smartphone');
```

<br>

#### Teste de uso
Use as ferramentas de desenvolvedor do navegador para testar resoluções de tela, clicando nos botões abaixo para chamar a função para a respectiva classe de dispositivos.

<PreviewContainer>
	<div :style="{ 'display': 'flex', 'grid-gap': '10px', 'margin-top': '20px' }">
		<CdsButton
			v-bind="args"
			@button-click="event => logButtonClick(event, 'smartphone')"
		>
			Smartphone
		</CdsButton>
		<CdsButton
			v-bind="args"
			@button-click="event => logButtonClick(event, 'tablet')"
		>
			Tablet
		</CdsButton>
		<CdsButton
			v-bind="args"
			@button-click="event => logButtonClick(event, 'hd-screen')"
		>
			HD Screen
		</CdsButton>
		<CdsButton
			v-bind="args"
			@button-click="event => logButtonClick(event, 'fhd-screen')"
		>
			Full HD Screen
		</CdsButton>
		<CdsButton
			v-bind="args"
			@button-click="event => logButtonClick(event, 'uhd-screen')"
		>
			Ultra HD Screen
		</CdsButton>
	</div>
	<div :style="{ 'margin-top': '12px', 'font-size': '14.2px' }">
		isDeviceType response: {{ methodResponse }}
	</div>
</PreviewContainer>

<script setup>
import { ref } from 'vue';
import CdsButton from '@/components/Button.vue';
import isDeviceTypeMethod from '@/utils/methods/isDeviceType';

const cdsButtonEvents = [
	'button-click'
];

const methodResponse = ref('');

const args = ref({
	variant: 'green',
	size: 'md',
	text: 'Button',
	block: false,
});

function logButtonClick(event, device) {
	methodResponse.value = isDeviceTypeMethod(device);
}
</script>
