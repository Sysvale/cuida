<template>
	<div
	>
		<div
			class="d-flex"
		>
			<v-date-picker
				v-model="notificationDateInterval"
				mode="range"
				color="gray"
				is-inline
				locale="pt-BR"
				:columns="1"
				:attributes="computedAttributes"
				:from-date="firstDate"
				:max-date="new Date()"
				is-range
			/>

			<div
				v-if="selectedHour === ''"
				class="schedule__grid"
			>
				<div
					v-for="(item, idx) in scheduleAttributes"
					:key="idx"
					class="schedule__time-interval"
					@click="selectHour(idx, item.length)"
				>
					<div
						class="schedule__time-text"
						:class="{'schedule__unavailable-interval': item.length === 0}"
					>
						<div class="schedule__hour">{{ idx }}</div>
						<span class="schedule__available-invertals">{{ item.length }} horários disponíveis</span>
					</div>
				</div>
			</div>



			<div
				v-if="selectedHour !== ''"
			>
				<div
					class="schedule__minutes-container"
				>
					<div
						class="minutes-container__header"
					>
						<div
							@click="selectedHour = ''"
							class="minutes-container__back-buton"
						>
							Voltar
						</div>
						<div
							class="minutes-container__header-text"
						>
							<div>
								{{ selectedHour }} - {{ selectedHour.replace('00',  '') + '59' }}
							</div>
							<div>
								{{ scheduleAttributes[selectedHour].length }} horários disponíveis
							</div>
						</div>
					</div>

					<div
						class="schedule__grid-hour"
					>
						<div
							v-for="item in minutesInverval"
							:key="item"
							class="schedule__time-interval"
						>
							<div
								class="time-interval__minutes"
								@click="selectedMinute =  !scheduleAttributes[selectedHour].some((s) => s === ((selectedHour.toString().replace('00',  '') + (item - 1) * 5) + (item < 3 ? '0' : ''))) ? '' : (selectedHour.toString().replace('00',  '') + (item - 1) * 5) + (item < 3 ? '0' : '')"
								:class="{
									'schedule__grid-hour--unavailable': !scheduleAttributes[selectedHour].some((s) => s === ((selectedHour.toString().replace('00',  '') + (item - 1) * 5) + (item < 3 ? '0' : ''))),
									'schedule__grid-hour--selected': selectedMinute === (selectedHour.toString().replace('00',  '') + (item - 1) * 5) + (item < 3 ? '0' : ''),
								}"
							>
								<div>
									{{
										(selectedHour.toString().replace('00',  '') + (item - 1) * 5) + (item < 3 ? '0' : '')
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
moment.locale('pt-br');

export default {
	data() {
		return {
			days: [],
			notificationDateInterval: null,
			attributes: [],
			selectedHour: '',
			selectedMinute: '',
			minutesInverval: 12,

			selectedSchedule: {
				dates: [],
				hour: '',
				minute: '',
			}
		}
	},
	props: {
		scheduleAttributes : {
			type: Object,
			default: () => {},
			description: 'The text that will be displayed inside the badge.',
			required: true,
		},
	},

	computed: {
		hourRange() {
			return this.endingHour - this.startingHour + 1;
		},

		dates() {
			return this.days.map(day => day.date);
		},

		computedAttributes() {
			return this.attributes.map((date) => {
				const day = moment(date, 'YYYY-MM-DD');
				return {
					key: date,
					highlight: 'blue',
					dates: day.toDate(),
					order: 1,
				};
			});
		},

		firstDate() {
			return moment(_.min(this.attributes), 'YYYY-MM-DD').toDate();
		},
	},

	methods: {
		selectHour(idx, length) {
			if (length > 0) {
				this.selectedHour = idx;
			}
		},

		onDayClick(day) {
			console.log(this.days);
		const idx = this.days.findIndex(d => d.id === day.id);
		if (idx >= 0) {
			this.days.splice(idx, 1);
		} else {
			this.days.push({
			id: day.id,
			date: day.date,
			});
		}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.schedule {
	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-left: 20px;
		grid-gap: 12px;
	}

	&__grid-hour {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 12px;
		padding: 20px;

		&--selected {
			background-color: $azul-sonic-base;
			color: $branco;
			border: 1px solid $azul-sonic-base !important;
		}

		&--unavailable {
			color: $cinza-4;
			@include botao-1;
			border: 1px solid $cinza-4 !important;
			cursor: default;
		}
	}

	&__time-text {
		padding: 8px 24px;
		border-radius: 8px;
		border: 1px solid $cinza-6;
		text-align: center;
	}

	&__unavailable-interval {
		color: $cinza-3 !important;
		@include botao-1;
		border: 1px solid $cinza-3 !important;
		cursor: default;
	}

	&__hour {
		@include botao-2;
		// color: $cinza-6;
	}

	&__available-invertals {
		@include legenda;
		// color: $cinza-6;
	}

	&__time-interval {
		text-align: center;
		cursor: pointer;
	}


	&__minutes-container {
		padding: 20px;
		border: 1px solid $cinza-5;
		margin-left: 20px;
		border-radius: 8px
	}
}

.minutes-container__back-buton {
	cursor: pointer;
	@include botao-2;
	color: $azul-sonic-base;
}

.minutes-container__back-buton:hover {
	text-decoration: underline
}

.minutes-container__header-text {
	text-align: center;
	width: -webkit-fill-available;
}

.time-interval__minutes {
	padding: 8px 24px;
	border-radius: 8px;
	border: 1px solid $cinza-6;
}

.minutes-container__header {
	display: flex;
}
</style>
