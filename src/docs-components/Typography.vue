<template>
	<div>
		<copy-token :target="target" :value="targetWithInclude" />

		<cds-table
			:items="items"
			:fields="fields"
			hover
		>
			<template #table-item="{ data, field }">
				<div
					v-if="field === 'token'"
					@click="target = data.name"
					:id="data.name"
					class="copy-clip"
				>
					<cds-icon
						height="20"
						width="20"
						name="copy-outline"
						class="copy-clip__icon"
					/>

					<div> {{ data.name }} </div>
				</div>

				<div
					v-if="field === 'value'"
				>
					<small>font-size: {{ data.fontSize }}px;</small><br>
					<small>font-weight: {{ data.fontWeight }};</small><br>
					<small>letter-spacing: {{ data.letterSpacing }}px;</small><br>
				</div>

				<div
					v-if="field === 'sample'"
				>
					<div
						v-if="!data.isAButtonSample"
						class="text-sample"
						:style="dynamicStyle(data)"
					>
						{{ data.sample }}
					</div>
					<cds-button
						v-else
						secondary
						class="button-sample"
						:style="dynamicStyle(data)"
					>
						Botão
					</cds-button>
				</div>
			</template>
		</cds-table>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsButton from '../components/Button.vue';
import CdsTable from '../components/Table.vue';
import CopyToken from '../docs-components/CopyToken.vue';

export default {
	components: {
		CdsIcon,
		CdsTable,
		CopyToken,
		CdsButton,
	},
	data() {
		return {
			target: '',
			fields: [
				{
					key: 'token',
					label: 'Token',
					tdClass: 'w-25',
				},
				{
					key: 'value',
					label: 'Características',
					tdClass: 'w-25',
				},
				{
					key: 'sample',
					label: 'Exemplo',
					tdClass: 'w-50',
				},
			],
			items: [
				{
					name: 'heading-1',
					fontSize: 45,
					fontWeight: 700,
					letterSpacing: 0.15,
					sample: 'Não entre em pânico',
				},
				{
					name: 'heading-2',
					fontSize: 33,
					fontWeight: 700,
					letterSpacing: 0.1,
					sample: 'Não entre em pânico',
				},
				{
					name: 'heading-3',
					fontSize: 29,
					fontWeight: 650,
					letterSpacing: 0,
					sample: 'Não entre em pânico',
				},
				{
					name: 'subheading-1',
					fontSize: 25,
					fontWeight: 600,
					letterSpacing: 0.15,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'subheading-2',
					fontSize: 21,
					fontWeight: 600,
					letterSpacing: 0,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'subheading-3',
					fontSize: 17,
					fontWeight: 600,
					letterSpacing: 0,
					sample: 'Existe uma segunda teoria que diz que isso já aconteceu.',
				},
				{
					name: 'body-1',
					fontSize: 17,
					fontWeight: 430,
					letterSpacing: 0,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituído por algo 
						ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que isso já aconteceu.`,
				},
				{
					name: 'body-2',
					fontSize: 15,
					fontWeight: 430,
					letterSpacing: 0,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituído por algo 
						ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que isso já aconteceu.`,
				},
				{
					name: 'caption',
					fontSize: 13.5,
					fontWeight: 470,
					letterSpacing: 0.1,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituído por algo 
						ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que isso já aconteceu.`,
				},
				{
					name: 'overline',
					fontSize: 11.5,
					fontWeight: 650,
					letterSpacing: 0.15,
					sample: `Existe uma teoria que diz que, se um dia alguém descobrir exatamente para que serve o
						Universo e por que ele está aqui, ele desaparecerá instantaneamente e será substituído por algo 
						ainda mais estranho e inexplicável. Existe uma segunda teoria que diz que isso já aconteceu.`,
				},
				{
					name: 'button-1',
					fontSize: 16,
					fontWeight: 750,
					letterSpacing: 0.2,
					sample: `Button`,
					isAButtonSample: true,
				},
				{
					name: 'button-2',
					fontSize: 14,
					fontWeight: 700,
					letterSpacing: 0.15,
					sample: `Button`,
					isAButtonSample: true,
				},
				{
					name: 'button-3',
					fontSize: 12,
					fontWeight: 700,
					letterSpacing: 0.15,
					sample: `Button`,
					isAButtonSample: true,
				},
			],
		}
	},

	computed: {
		targetWithInclude() {
			return `@include ${this.target};`;
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
@import './../assets/sass/tokens.scss';

.text-sample {
	color: $n-900;
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
}

.button-sample {
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
}

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $gp-400;
	}
}

.copy-clip {
	width: fit-content;
	padding: pYX(2, 3);
	border-radius: 16px;
	border: 1px solid $n-0;
	transition: all .15s ease-in-out;
	display: flex;
	align-items: center;

	&__icon {
		margin: mr(3);
		color: $n-500;
	}
}

.copy-clip:hover {
	border: 1px solid $gp-300;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
