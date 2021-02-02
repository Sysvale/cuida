<template>
	<div
	>
		<div
			class="d-flex"
		>
			<v-date-picker
				v-bind="$attrs"
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
				v-if="selectedSchedule.hour === ''"
				class="schedule__grid"
			>
				<div
					v-for="(hours, index) in scheduleAttributes"
					:key="index"
					class="schedule__time-interval"
					@click="selectHour(index, availableHours(hours))"
				>
					<div
						class="schedule__time-text"
						:class="{'schedule__unavailable-interval': availableHours(hours) === 0}"
					>
						<div class="schedule__hour">{{ index }}</div>
						<span class="schedule__available-invertals">{{ availableHours(hours) }} horários disponíveis</span>
					</div>
				</div>
			</div>

			<div
				v-else
			>
				<div
					class="schedule__minutes-container"
				>
					<div
						class="minutes-container__header"
					>
						<div
							@click="selectedSchedule.hour = ''"
							class="minutes-container__back-buton"
						>
							Voltar
						</div>
						<div
							class="minutes-container__header-text"
						>
							<div
								class="minutes-container__header-hours"
							>
								{{ selectedSchedule.hour }} - {{ selectedSchedule.hour.replace('00',  '') + '59' }}
							</div>
							<div
								class="minutes-container__header-available-hours"
							>
								{{ availableHours(scheduleAttributes[selectedSchedule.hour]) }} horários disponíveis
							</div>
						</div>
					</div>

					<div
						class="schedule__grid-hour"
					>
						<div
							v-for="(availability, hour) in scheduleAttributes[selectedSchedule.hour]"
							:key="hour"
							class="schedule__time-interval"
						>
							<div
								class="time-interval__minutes"
								:class="{
									'schedule__grid-hour--unavailable': !availability,
									'schedule__grid-hour--selected': selectedSchedule.minute === hour,
								}"
								@click="selectMinute(hour, availability)"
							>
								{{ hour }}
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
		selectHour(hour, availableHours) {
			if (availableHours) {
				this.selectedSchedule.hour = hour;
			}
		},

		availableHours(hours) {
			return Object.values(hours).filter(hour => hour === true).length;
		},

		selectMinute(minute, availability) {
			if (availability) {
				this.selectedSchedule.minute = minute;
			}
		},

		onDayClick(day) {
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
			color: $branco !important;
			border: 1px solid $azul-sonic-base !important;
		}

		&--unavailable {
			color: $cinza-4 !important;
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

	&__hour {
		@include botao-2;
		color: $cinza-7;
		margin-bottom: -4px;
	}

	&__unavailable-interval {
		color: $cinza-3 !important;
		@include botao-1;
		border: 1px solid $cinza-3 !important;
		cursor: default;
	}

	&__available-invertals {
		@include legenda;
		color: $cinza-7;
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
	color: $cinza-7;
}

.minutes-container__header {
	display: flex;
}

.minutes-container__header-hours {
	@include botao-2;
	color: $cinza-8;
}

.minutes-container__header-available-hours {
	@include legenda;
	color: $cinza-6;
}
</style>
