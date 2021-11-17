<template>
	<span id="dropdown">
		<multiselect
			v-bind="$attrs"
			:options="internalOptions"
			v-model="selectedValue"
			multiple
			:group-values="groupValues"
			:group-label="groupLabel"
			:close-on-select="false"
			:clear-on-select="false"
			select-label=''
			deselect-label=''
			selected-label=''
			@close="handleClose"
			@select="selectItem"
			@remove="selectItem"
		>
			<template
				slot="option"
				slot-scope="{ option }"
			>
				<div
					v-if="option.$isLabel"
				>
					{{ option.$groupLabel }}
				</div>
				<div
					v-else
					class="dropdown__option"
				>
					<div class="option__checkbox">
						<input
							v-model="option.isSelected"
							type="checkbox"
							:id="`input-${option.title}`"
							:name="`input-${option.title}`"
							:value="true"
						/>
						<label
							:id="`checkbox-${option.title}`"
							:for="`input-${option.title}`"
							@click="addItemViaCustomCheckbox(option)"
							:class="{ 'option__checkbox--checked': option.isSelected }"
						/>
					</div>
					{{ option.title }}
				</div>
			</template>
			<template
				slot="selection"
				slot-scope="{ values, isOpen }"
			>
				<span
					v-if="values.length && !isOpen"
					class="multiselect__single"
				>
					{{ selectedFancyMessage(values.length) }}
				</span>
				<span v-else />
			</template>
		</multiselect>
	</span>
</template>

<script>

const SELECTED = 0;
const NOT_SELECTED = 1;

export default {
	data() {
		return {
			selectedValue: this.$attrs.value,
			internalOptions: _.cloneDeep(this.$attrs.options),
			groupValues: null,
			groupLabel: null,
		};
	},

	computed: {
		selectedFancyMessage() {
			return (qty) => {
				if (qty === 1) return '1 opção selecionada';
				return `${qty} opções selecionadas`;
			};
		},

		hasSelectedValues() {
			return this.selectedValue.length > 0;
		},

		flattenOptions() {
			if(this.internalOptions[SELECTED].status || this.internalOptions[NOT_SELECTED].status) {
				return [
					...this.internalOptions[SELECTED].options || [],
					...this.internalOptions[NOT_SELECTED].options || [],
				];
			}

			return this.internalOptions;
		},
	},

	mounted() {
		this.updateRenderOptions();
	},

	watch: {
		selectedValue(values) {
			const cleanedValues = _.cloneDeep(values);
			cleanedValues.forEach((val) => delete val.isSelected);

			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', cleanedValues);
		},
	},

	methods: {
		selectItem(option) {
			if(this.internalOptions[SELECTED].status || this.internalOptions[NOT_SELECTED].status) {
				this.internalOptions[SELECTED].options.forEach(item => {
					if (item[this.$attrs.label] === option[this.$attrs.label]) {
						item.isSelected = !item.isSelected;
					}
				});
				this.internalOptions[NOT_SELECTED].options.forEach(item => {
					if (item[this.$attrs.label] === option[this.$attrs.label]) {
						item.isSelected = !item.isSelected;
					}
				});
			} else {
				this.internalOptions.forEach(item => {
					if (item[this.$attrs.label] === option[this.$attrs.label]) {
						item.isSelected = !item.isSelected;
					}
				});
			}
		},

		addItemViaCustomCheckbox(option) {
			option.isSelected = !option.isSelected;
			this.selectedValue = [
				...this.selectedValue,
				option,
			];
		},

		handleClose() {
			this.updateRenderOptions();
		},

		updateRenderOptions() {
			if (!this.hasSelectedValues) {
				this.internalOptions = _.cloneDeep(this.$attrs.options);
				this.groupValues = null;
				this.groupLabel = null;
				return;
			}

			this.selectedValue.forEach((item) => {
				item.isSelected = true;
			});

			let rawOptions = _.cloneDeep(this.$attrs.options);
			rawOptions = rawOptions.map((item) => {
				const containsItem = this.selectedValue.some(
					value => value[this.$attrs.label] === item[this.$attrs.label]
				);

				if (containsItem) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}

				return item;
			});

			this.internalOptions = [
				{
					status: 'Selecionados',
					options: [],
				},
				{
					status: 'Não selecionados',
					options: [],
				},
			];

			this.$nextTick().then(() => {
				this.internalOptions[SELECTED]
					.options = this.selectedValue;
				this.internalOptions[NOT_SELECTED]
					.options = rawOptions.filter(item => !item.isSelected);

				this.groupValues = 'options';
				this.groupLabel = 'status';
			});
		},
	},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style lang="scss">
@import '../assets/sass/app.scss';

#dropdown .multiselect__option--highlight {
	background: $n-20;
	outline: none;
	color: $n-700;
}

#dropdown input[type=checkbox] {
	visibility: hidden;
}

.dropdown__option {
	display: flex;
	align-items: center;
}

#dropdown .option__checkbox {
	width: 15px;
	position: relative;
	margin-right: spacer(6);
	margin-left: spacer(n3);

	label {
		cursor: pointer;
		position: absolute;
		width: 15px;
		height: 15px;
		top: 0;
		border-radius: 4px;
		border: 0.5px solid $n-500;

		&:after {
			border: 1.5px solid $n-0;
			border-top: none;
			border-right: none;
			content: "";
			height: 5px;
			left: 3.1px;
			opacity: 0;
			position: absolute;
			top: 4.4px;
			transform: rotate(-45deg);
			width: 8px;
			border-radius: 0.4px;
		}
	}

	input[type=checkbox]:checked + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		opacity: 1;
	}
}

.option__checkbox--checked {
	background-color: $bn-700 !important;
	border: none !important;
}

#dropdown .multiselect__tag {
	background: $n-20;
	color: $n-700;
	border: 1px solid $n-100;
}

#dropdown .multiselect__tag-icon:after{
	color: $n-700;
}

#dropdown .multiselect__tag-icon:focus,
#dropdown .multiselect__tag-icon:hover {
	background: $n-40;
	color: $n-800;
}

#dropdown .multiselect__tag-icon:focus:after,
#dropdown .multiselect__tag-icon:hover:after {
	color: $n-800;
}

#dropdown .multiselect__option--selected.multiselect__option--highlight {
	background: $n-0;
	color: $n-800;
}
#dropdown .multiselect__option--selected.multiselect__option--highlight:after {
	background: $n-0;
	color: $n-800;
}

#dropdown .multiselect__option--selected {
	background: $n-0;
	color: $n-800;
	font-weight: 600;
}

#dropdown .multiselect--disabled {
	background: transparent;
}

#dropdown .multiselect--disabled .multiselect__tags {
	background: $n-300 !important;
}

#dropdown .multiselect__placeholder {
	color: $n-600;
}
</style>
