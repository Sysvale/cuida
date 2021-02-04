<template>
	<div
		class="d-flex"
	>
		<v-date-picker
			v-bind="$attrs"
			v-model="date"
			is-inline
			locale="pt-BR"
			:attributes="attributes"
			@input="dayClicked()"
		/>
		<div
			v-if="timePicker"
		>
			<div
				v-if="!isEmpty(scheduleAttributes)"
			>

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
							<div
								:class="availableHours(hours) === 0 ? 'schedule__unavailable-hour' : 'schedule__available-hour'"
							>
								{{ index }}
							</div>

							<span
								:class="availableHours(hours) === 0 ? 'schedule__unavailable-intervals' : 'schedule__available-intervals'"
							>
								{{ availableHoursText(hours) }}
							</span>
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
									{{ availableHoursText(scheduleAttributes[selectedSchedule.hour]) }}
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

			<div
				v-else
			>
				<div
					class="schedule__grid"
				>
					<div
						v-for="index in 12"
						:key="index"
						class="schedule__time-interval"
					>
						<div class="schedule-skeleton"></div>
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
			date: null,
			attributes: [
				{
					key: 'today',
					dot: true,
					dates: new Date(),
				},
			],
			selectedSchedule: {
				dates: [],
				hour: '',
				minute: '',
				fancySchedule: '',
			}
		}
	},
	props: {
		/**
		 * Objeto de configuração utilizado para construção do timepicker.
		 */
		scheduleAttributes : {
			type: Object,
			default: () => {},
			required: true,
		},
		/**
		 * Prop que especifica se o timepicker vai ser mostrado ou não.
		 */
		timePicker: {
			type: Boolean,
			default: false,
			description: 'The text that will be displayed inside the badge.',
		}

	},

	methods: {
		isEmpty(object) {
			return Object.entries(object).length === 0
		},

		dayClicked() {
			this.selectedSchedule.dates = this.date;
			/**
			 * Evento emitido quando a data é selecionada no calendário.
			* @event daySelected
			* @type {Event}
			*/
			this.$emit('daySelected', this.date);
			this.$emit('scheduleSelected', this.selectedSchedule);
		},

		selectHour(hour, availableHours) {
			if (availableHours) {
				this.selectedSchedule.hour = hour;
			}
		},

		availableHours(hours) {
			return Object.values(hours).filter(hour => hour === true).length;
		},

		availableHoursText(hours) {
			const count = this.availableHours(hours);
			const complementText = count === 1 ? 'horário disponível' : 'horários disponíveis';
			return count === 0 ? 'Indisponível' : `${count} ${complementText}`;
		},

		selectMinute(minute, availability) {
			if (availability) {
				this.selectedSchedule.minute = minute;
				this.selectedSchedule.fancySchedule = `${moment(this.selectedSchedule.dates).format("MM-DD-YYYY")} ${minute}`
				/**
				 * Evento utilizado para emitir um objeto contendo a data e hora selecionados.
				* @event scheduleSelected
				* @type {Event}
				*/
				this.$emit('scheduleSelected', this.selectedSchedule);
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
		padding: 8px 20px;
		border-radius: 8px;
		border: 1px solid $cinza-6;
		text-align: center;
	}

	&__available-hour {
		@include botao-2;
		color: $cinza-7;
		margin-bottom: -4px;
	}

	&__unavailable-hour {
		@include botao-2;
		color: $cinza-4;
		margin-bottom: -4px;
	}

	&__unavailable-interval {
		color: $cinza-3 !important;
		@include botao-1;
		border: 1px solid $cinza-3 !important;
		cursor: default;
	}

	&__available-intervals {
		font-size: 10px !important;
		color: $cinza-7;
	}

	&__unavailable-intervals {
		font-size: 10px !important;
		color: $cinza-4;
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

.minutes-container {
	&__back-buton {
		cursor: pointer;
		@include botao-2;
		color: $azul-sonic-base;

		&:hover {
			text-decoration: underline;
		}
	}

	&__header-text {
		text-align: center;
		width: -webkit-fill-available;
		width: -moz-available;
		width: fill-available;
	}
}

.minutes-container {
	&__header {
		display: flex;
	}

	&__header-hours {
		@include botao-2;
		color: $cinza-8;
	}

	&__header-available-hours {
		@include legenda;
		color: $cinza-6;
	}
}

.schedule-skeleton {
	box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
	border-radius: 4px;
	position: relative;
	overflow: hidden;
	width: 182.89px;
	height: 59px;
	border-radius: 8px;

	&::before {
		content: '';
		display: block;
		position: absolute;
		left: -150px;
		top: 0;
		height: 100%;
		width: 150px;
		background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
		animation: load 1.4s ease-in-out infinite;
	}
}

.time-interval__minutes {
	padding: 8px 20px;
	border-radius: 8px;
	border: 1px solid $cinza-6;
	color: $cinza-7;
}

@keyframes load {
	from {
		left: -150px;
	} to {
		left: 100%;
	}
}
</style>
