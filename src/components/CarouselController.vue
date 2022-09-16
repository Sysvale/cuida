<template>
	<div >
		<div
			class="carousel-controller"
			:class="{ 'carousel-controller--fluid': fluid }"
		>
			<span
				:class="{
					'carousel-controller__previous-button--disabled': disabledback,
					'carousel-controller__previous-button': !disabledback
				}"
				@click="handleClickBack"
			/>

			<div>
				<span v-if="!simple" class="text">
					{{ currentNumberOfItemsMin }}-{{ currentNumberOfItemsMax }} de {{ total }}
				</span>
				<span v-else class="text">
					{{ currentNumberOfItemsMin }} de {{ numberOfPages }}
				</span>
	
				<span class="value"> {{ propertyName }} </span>
			</div>

			<span
				@click="handleClickForward"
				:class="{
					'carousel-controller__next-button--disabled': disabledForward,
					'carousel-controller__next-button': !disabledForward
				}"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			propertyName: {
				type: String,
				default: 'Dados',
				required: false,
			},

			perPage: {
				type: Number,
				required: true,
			},

			total: {
				type: Number,
				required: true,
			},

			simple: {
				type: Boolean,
				default: false,
				required: false,
			},

			fluid: {
				type: Boolean,
				default: false,
				required: false,
			},
		},

		data() {
			return {
				currentNumberOfItemsMin: 1,
				currentNumberOfItemsMax: this.perPage,
			};
		},

		computed: {
			numberOfPages() {
				return Math.ceil(this.total / this.perPage);
			},

			disabledForward() {
				return (this.currentNumberOfItemsMax >= this.total) 
				|| (this.simple && (this.currentNumberOfItemsMin >= this.numberOfPages));
			},

			disabledback() {
				return this.currentNumberOfItemsMin === 1;
			}
		},

		methods: {
			handleClickBack() {
				if (this.simple && (this.currentNumberOfItemsMin > 1)) {
					this.currentNumberOfItemsMin -= 1;
					this.$emit('click-back');
					return;
				} else if (this.simple && (this.currentNumberOfItemsMin === 1)) {
					return;
				}

				if (this.currentNumberOfItemsMin - this.perPage <= 0) {
					this.currentNumberOfItemsMin = 1;
					this.currentNumberOfItemsMax = this.perPage;
				} else {
					this.currentNumberOfItemsMin -= this.perPage;
					this.currentNumberOfItemsMax -= this.perPage;
					this.$emit('click-back');
				}
			},

			handleClickForward() {
				if (this.simple && (this.currentNumberOfItemsMin < this.numberOfPages)) {
					this.currentNumberOfItemsMin += 1;
					this.$emit('click-forward');
					return;
				} else if (this.simple && (this.currentNumberOfItemsMin === this.numberOfPages)) {
					return;
				}

				if ((this.currentNumberOfItemsMax + this.perPage) > this.total) {
					this.currentNumberOfItemsMax = this.total;
				} else {
					this.currentNumberOfItemsMin = this.currentNumberOfItemsMax;
					this.currentNumberOfItemsMax += this.perPage;
					this.$emit('click-forward');
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';
.text {
	margin: ml(7);
	font-size: 14px;
	color: $n-500;
	font-weight: $font-weight-semibold;
}

.value {
	margin: mTRBL(0, 7, 0, 2);
	font-size: 14px;
	color: $n-800;
	font-weight: $font-weight-semibold;
}
.carousel-controller {
	position: relative;
	width: fit-content;
	display: flex;
	align-items: center;

	&--fluid {
		width: 100%;
		justify-content: space-between;
	}
}
.carousel-controller__previous-button {
	display: block;
	height: 32px;
	width: 32px;
	cursor: pointer;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-200;
		border-radius: $border-radius-small;
		transition: all 100ms ease-in-out;
		transform: rotate(-90deg);
	}
}

.carousel-controller__previous-button--disabled {
	display: block;
	height: 32px;
	width: 32px;
	cursor: default;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-40;
		border-radius: $border-radius-small;
		transition: all 100ms ease-in-out;
		transform: rotate(-90deg);
	}
}

.carousel-controller__next-button {
	display: block;
	height: 32px;
	width: 32px;
	cursor: pointer;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-200;
		border-radius: $border-radius-small;
		transition: all 100ms ease-in-out;
		transform: rotate(90deg);
	}
}

.carousel-controller__next-button--disabled {
	display: block;
	height: 32px;
	width: 32px;
	cursor: default;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-40;
		border-radius: $border-radius-small;
		transition: all 100ms ease-in-out;
		transform: rotate(90deg);
	}
}
</style>