<template>
	<span id="dropdown">
		<multiselect
			v-bind="$attrs"
			v-model="selectedValue"
			select-label=''
			deselect-label=''
			selected-label=''
			:options="internalOptions"
			:close-on-select="false"
			:multiple="true"
			:taggable="true"
			:clear-on-select="false"
			:searchable="false"
			@select="selectItem"
			@remove="selectItem"
		>
			<template
				slot="option"
				slot-scope="internalOptions"
			>
				<div
					class="dropdown__option"
				>
					<div class="option__checkbox">
						<input
							v-model="internalOptions.option.is_selected"
							type="checkbox"
							:id="`input-${internalOptions.option.title}`"
							:name="`input-${internalOptions.option.title}`"
							:value="true"
						/>
						<label
							:id="`checkbox-${internalOptions.option.title}`"
							:for="`input-${internalOptions.option.title}`"
							@click="addItemViaCustomCheckbox(internalOptions.option)"
							:class="{ 'option__checkbox--checked': internalOptions.option.is_selected }"
						/>
					</div>
					{{ internalOptions.option.title }}
					</span>
				</div>
			</template>
		</multiselect>
	</span>
</template>

<script>
export default {
	data() {
		return {
			selectedValue: this.$attrs.value,
			internalOptions: _.cloneDeep(this.$attrs.options),
		};
	},

	mounted() {
		this.selectedValue.forEach((item) => {
			item.is_selected = true;
		});

		this.internalOptions.forEach((item) => {
			const containsItem = this.selectedValue.some(
				value => value[this.$attrs.label] === item[this.$attrs.label]
			);

			if (containsItem) {
				item.is_selected = true;
			} else {
				item.is_selected = false;
			}
		});
	},

	watch: {
		selectedValue(values) {
			const cleanedValues = _.cloneDeep(values);
			cleanedValues.forEach((val) => delete val.is_selected);

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
			this.internalOptions.forEach(item => {
				if (item.title === option.title) {
					item.is_selected = !item.is_selected;
				}
			});
		},

		addItemViaCustomCheckbox(option) {
			option.is_selected = !option.is_selected;
			this.selectedValue.push(option);
		},
	},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style lang="scss">
@import '../assets/sass/app.scss';

#dropdown .multiselect__option--highlight {
	background: $cinza-2;
	outline: none;
	color: $cinza-8;
}

input[type=checkbox] {
	visibility: hidden;
}

.dropdown__option {
	display: flex;
	align-items: center;
}

.option__checkbox {
	width: 15px;
	position: relative;
	margin-left: -12px;

	label {
		cursor: pointer;
		position: absolute;
		width: 15px;
		height: 15px;
		top: 0;
		border-radius: 4px;
		border: 0.5px solid $cinza-5;

		&:after {
			border: 1.5px solid $branco;
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
	background-color: $azul-bidu-dark-2 !important;
	border: none !important;
}

#dropdown .multiselect__tag {
	background: $cinza-2;
	color: $cinza-8;
	border: 1px solid $cinza-5;
}

#dropdown .multiselect__tag-icon:after{
	color: $cinza-8;
}

#dropdown .multiselect__tag-icon:focus,
#dropdown .multiselect__tag-icon:hover {
	background: $cinza-4;
	color: $cinza-8;
}

#dropdown .multiselect__tag-icon:focus:after,
#dropdown .multiselect__tag-icon:hover:after {
	color: $cinza-8;
}

#dropdown .multiselect__option--selected.multiselect__option--highlight {
	background: $branco;
	color: $cinza-8;
}
#dropdown .multiselect__option--selected.multiselect__option--highlight:after {
	background: $branco;
	color: $cinza-8;
}

#dropdown .multiselect__option--selected {
	background: $branco;
	color: $cinza-8;
	font-weight: 600;
}

#dropdown .multiselect--disabled {
	background: transparent;
}

#dropdown .multiselect--disabled .multiselect__tags {
	background: $cinza-3 !important;
}

#dropdown .multiselect__placeholder {
	color: $cinza-6;
}
</style>
