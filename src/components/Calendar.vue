<template>
	<div>
		<div
			v-if="screenWidth <= 770"
			class="calendar-tabs"
		>
			<div 
				:class="showInLowResesolution ? 'calendar-tabs__tab--inactive' : 'calendar-tabs__tab--active'"
			>
				<span @click="showInLowResesolution = false">Data</span>
			</div>

			<div 
				:class="showInLowResesolution ? 'calendar-tabs__tab--active' : 'calendar-tabs__tab--inactive'"
			>
				<span @click="showInLowResesolution = true">Hora</span>
			</div>
		</div>

		<div
			class="calendar-container"
		>
			<v-date-picker
				v-if="!showInLowResesolution"
				v-bind="$attrs"
				v-model="date"
				is-inline
				locale="pt-BR"
				:attributes="attributes"
				@input="dayClicked()"
			/>
			<div
				v-if="timePicker && (screenWidth > 770 || showInLowResesolution)"
			>
				<div
					v-if="!isEmpty(scheduleAttributes)"
					class="schedule__grid-container"
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
								:class="{
									'schedule__unavailable-interval': availableHours(hours) === 0,
									'schedule__grid-hour--selected': index.split(':')[0] === selectedSchedule.minute.split(':')[0],
								}"
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

								<chevron-left-icon
									size="1.46x"
									class="chevron-icon"
									@click="selectedSchedule.hour = ''"
								/>

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
							<div class="schedule-skeleton" />
						</div>
					</div>
				</div>
				
			</div>

		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { ArrowRightIcon  } from 'vue-feather-icons';
import { ChevronLeftIcon } from 'vue-feather-icons';
import { ChevronRightIcon  } from 'vue-feather-icons';
moment.locale('pt-br');

export default {
	components: {
		ArrowRightIcon,
		ChevronLeftIcon,
		ChevronRightIcon 
	},

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
			},
			screenWidth: screen.width,
			showInLowResesolution: false,
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
			if (this.screenWidth <= 770) {
				this.showInLowResesolution = true;
			}

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
	@media screen and (max-width: 770px) {
		&__grid {
			display: grid;
			grid-template-columns: 1fr;
			margin-left: 20px;
			grid-gap: 12px;
			width: 212px;
			padding-top: 16px;

			&-container {
				padding-bottom: 20px;
				height: 266px;
				overflow: scroll;
				width: 252px;
				border: 1px solid #cbd5e0;
				border-top: none;
				border-radius: 0px 0px 8px 8px;
				-ms-overflow-style: none;
				scrollbar-width: none;
			}

			&-container::-webkit-scrollbar {
				display: none;
			}
		}

		&__minutes-container {
			// padding: 20px;
			height: 266px;
			width: 252px;
			overflow: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;
			border-top: none;
			border-radius: 0px 0px 8px 8px;
			margin-top: 12px;
		}

		&__minutes-container::-webkit-scrollbar {
			display: none;
		}

		&__grid-hour {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 12px;
			padding: 20px;

			&--selected {
				background-color: $azul-sonic-base;
				color: $branco !important;
				border: 1px solid $azul-sonic-base !important;
				font-weight: 500;
			}

			&--unavailable {
				color: $cinza-5 !important;
				@include botao-1;
				border: 1px solid $cinza-4 !important;
				cursor: default;
				font-weight: 400;
			}
		}

	}

	@media screen and (min-width: 770px) {
		&__grid {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			margin-left: 20px;
			grid-gap: 12px;
		}

		&__minutes-container {
			padding: 20px;
			border: 1px solid $cinza-5;
			margin-left: 20px;
			border-radius: 8px
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
				font-weight: 500;
			}

			&--unavailable {
				color: $cinza-5 !important;
				@include botao-1;
				border: 1px solid $cinza-4 !important;
				cursor: default;
				font-weight: 400;
			}
	}

	}

	&__time-text {
		padding: 8px 12px;
		border-radius: 8px;
		border: 1px solid $cinza-6;
		text-align: center;
		color: $cinza-7;
	}

	&__available-hour {
		@include botao-2;
		margin-bottom: -4px;
	}

	&__unavailable-hour {
		@include botao-2;
		color: $cinza-5;
		margin-bottom: -4px;
	}

	&__unavailable-interval {
		color: $cinza-4 !important;
		@include botao-1;
		border: 1px solid $cinza-3 !important;
		cursor: default;
		font-weight: 400;
	}

	&__available-intervals {
		@include legenda;
	}

	&__unavailable-intervals {
		@include legenda;
		color: $cinza-5;
	}

	&__time-interval {
		text-align: center;
		cursor: pointer;
	}
}

.minutes-container {
	@media screen and (max-width: 770px) {
		&__back-buton {
			display: none;
		}

		&__header-text {
			text-align: center;
			width: 180px;
		}
	}

	@media screen and (min-width: 770px) {
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

}

.minutes-container {
	&__header {
		display: flex;
		justify-content: center;
	}

	&__header-hours {
		@include botao-2;
		font-weight: 700;
		color: $cinza-8;
	}

	&__header-available-hours {
		@include legenda;
		font-weight: 500;
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

@media screen and (max-width: 770px) {
	.vc-container {
		border-top: none !important;
		border-radius: 0px 0px 8px 8px;
	}

	.calendar-tabs {
		display: flex;
		border-radius: 8px 8px 0px 0px;
		border: 1px solid #cbd5e0;
		border-bottom: none;
		width: 252px;
		justify-content: space-around;
	}
}

@media screen and (min-width: 770px) {
	.chevron-icon {
		display: none;
	}
}

.chevron-icon {
	color: #718096;
}

.calendar-tabs__tab {
	padding: 16px 41px 8px;
	border-radius: 8px 8px 0px 0px;
	font-weight: 500;

	&--active {
		@extend .calendar-tabs__tab;
		color: $azul-bidu-dark-1;
		border-bottom: 2px solid $azul-bidu-base;
	}

	&--inactive {
		@extend .calendar-tabs__tab;
		color: rgba($azul-bidu-base, 0.75);
	}
}

.calendar-container {
	display: flex;
}
</style>
