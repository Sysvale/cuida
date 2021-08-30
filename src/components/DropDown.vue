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
