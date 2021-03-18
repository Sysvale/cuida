<template>
	<div>
		<copy-token :target="target" />

		<b-table
			:items="items"
			:fields="fields"
			class="align-middle"
		>
			<template class="align-middle" #cell(token)="row">
				<div
					@click="target = row.item.name"
					:id="row.item.name"
					class="copy-clip d-flex align-middle align-items-center"
				>
					<copy-icon size="1.1x" class="text-secondary mr-3"></copy-icon>
					<div class="align-middle"> {{ row.item.name }} </div>
				</div>
			</template>
			<template class="align-middle" #cell(value)="row">
				<div>
					<small class="font-weight-bold mr-4">font-size: {{ row.item.fontSize }}px;</small><br>
					<small class="font-weight-bold mr-4">font-weight: {{ row.item.fontWeight }};</small><br>
					<small class="font-weight-bold">letter-spacing: {{ row.item.letterSpacing }}px;</small><br>
				</div>
			</template>
			<template class="align-middle" #cell(sample)="row">
				<div
					v-if="!row.item.isAButtonSample"
					class="text-sample"
					:style="dynamicStyle(row.item)"
				>
					{{ row.item.sample }}
				</div>
				<button
					v-else
					class="button-sample"
					:style="dynamicStyle(row.item)"
				>
					Botão
				</button>
			</template>
		</b-table>
	</div>
</template>

<script>
import { CopyIcon } from 'vue-feather-icons'
import CopyToken from './CopyToken.vue';
export default {
	components: {
		CopyIcon,
		CopyToken,
	},
	data() {
		return {
			target: '',
			fields: [
				{
					key: 'token',
					label: 'Token',
				},
				{
					key: 'value',
					label: 'Características',
				},
				{
					key: 'sample',
					label: 'Exemplo',
				},
			],
			items: [
				{
					name: 'titulo-1',
					fontSize: 47,
					fontWeight: 400,
					letterSpacing: 0,
					sample: 'Não entre em pânico',
				},
				{
					name: 'titulo-2',
					fontSize: 33,
					fontWeight: 400,
					letterSpacing: 0.25,
					sample: 'Não entre em pânico',
				},
				{
					name: 'titulo-3',
					fontSize: 23,
					fontWeight: 400,
					letterSpacing: 0,
					sample: 'Não entre em pânico',
				},
				{
					name: 'subtitulo-1',
					fontSize: 22,
					fontWeight: 500,
					letterSpacing: 0.15,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'subtitulo-2',
					fontSize: 16,
					fontWeight: 500,
					letterSpacing: 0.1,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'subtitulo-3',
					fontSize: 14,
					fontWeight: 400,
					letterSpacing: 0.1,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'corpo-1',
					fontSize: 16,
					fontWeight: 400,
					letterSpacing: 0.5,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituídopor al
						go ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que 
						isso já aconteceu.`,
				},
				{
					name: 'corpo-2',
					fontSize: 14,
					fontWeight: 400,
					letterSpacing: 0.25,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituídopor al
						go ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que 
						isso já aconteceu.`,
				},
				{
					name: 'legenda',
					fontSize: 12,
					fontWeight: 400,
					letterSpacing: 0.4,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituídopor al
						go ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que 
						isso já aconteceu.`,
				},
				{
					name: 'botao-1',
					fontSize: 16,
					fontWeight: 600,
					letterSpacing: 0.25,
					sample: `Botão.`,
					isAButtonSample: true,
				},
				{
					name: 'botao-2',
					fontSize: 14,
					fontWeight: 600,
					letterSpacing: 0.15,
					sample: `Botão.`,
					isAButtonSample: true,
				},
			],
		}
	},
	methods: {
		dynamicStyle(item) {
			return {
				'--fontSize': `${item.fontSize}px`,
				'--fontWeight': item.fontWeight,
				'--letterSpacing': `${item.letterSpacing}px`,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';

.text-sample {
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
	width: 40%;
}

.button-sample {
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
	border: 1px solid #ABB5BF;
	padding: 8px 20px;
	border-radius: 4px;
	background: #FFFFFF;
}

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $verde-piccolo-base;
	}
}

.copy-clip {
    width: fit-content;
    padding: 8px 12px;
    border-radius: 16px;
	border: 1px solid $branco;
	transition: all .15s ease-in-out;
}

.copy-clip:hover {
	border: 1px solid $verde-piccolo-light-1;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
