<template>	
	<base-card
		:date="date"
		v-on:mode-changed="$emit('mode-changed', $event)"
		v-on:date-changed="$emit('date-changed', $event)">
		<table class="calendar-table">
		  <tr>
		    <th v-for="(day, index) in daysOfWeek">
		    	<span 
		    		class="text-light calendar-item">{{day}}</span>
		    	</th>
		  </tr>
		  <tr v-for="(week, index) in calendar">
		    <td 
		    	v-for="(cellDay, index) in week">
		    	<div 
		    		class="calendar-item-wrapper" 
			    	:class="{
			    		'range-in': isBetweenRange(cellDay),
			    		'range-start': cellDay.isSame(dateFrom) && isRangeDates,
			    		'range-end': cellDay.isSame(dateTo) && isRangeDates,
			    	}">
			    	<a 
			    		href="#"
			    		@click.prevent="setDates(cellDay)"
			    		class="calendar-item pill"
				    	:class="{
				    		'text-dark': cellDay.month() == date.month(),
				    		'text-light': cellDay.month() != date.month(),
				    		'active': isActive(cellDay),
				    		'range-point': isActive(cellDay) && isRangeDates,
				    	}">
			    		{{cellDay.format('D')}}
			    	</a>
			    </div>
		    </td>
		  </tr>
		</table>
	</base-card>
</template>
<script>
	import moment from 'moment'
	import BaseCard from './Base'
	import {MONTH_TYPE, MONTHS_MODE, YEARS_MODE} from './../Calendar'

	export default {
		components: {BaseCard},
		props: ['date', 'value'],
		data() {
			return {
				model: [...this.value] || [],
			}
		},
		watch: {
			model(model) {
				if (model.length == 2) {
					this.$emit('input', model)
				}
			}
		},
		computed: {		
			MONTHS_MODE: () => MONTHS_MODE,
			YEARS_MODE: () => YEARS_MODE,
			startDay() {
				return this.date.clone().startOf('month').startOf('week')
			},
			endDay() {
				return this.date.clone().endOf('month').endOf('week')
			},
			calendar() {
				var calendar = [];
				let date = this.startDay.clone().subtract(1, 'day');

				while (date.isBefore(this.endDay, 'day')) {
				    calendar.push(Array(7).fill(0).map(() => date.add(1, 'day').clone()))
				}

				return calendar
			},
			daysOfWeek() {
				let date = this.startDay.clone().subtract(1, 'day');

				return Array(7).fill(0).map(() => date.add(1, 'day').format('ddd'))
			},
			modelDates() {
				return this.model.map((date) => date.format(this.compareFormat))
			},
			isRangeDates() {
				return this.model.length == 2
			},
			compareFormat() {
				return 'YYYY-MM-DD'
			},
			dateFrom() {
				return this.model[0] || moment()
			},
			dateTo() {
				return this.model[1] || moment()
			},
		},
		methods: {
			setDates(date) {
				var model = this.model

				if (model.length == 1) {

					var firstDate = model[0]

					if (firstDate.isBefore(date)) {
						this.model.push(date)
					} else if (firstDate.isAfter(date)) {						
						this.model.unshift(date)
					}
				} else if (model.length == 0) {
					this.model.push(date)
				} else if (this.isRangeDates) {
					this.model = []
					this.model.push(date)
				}
			},
			isActive(day) {
				return this.modelDates.includes(day.format(this.compareFormat));
			},
			isBetweenRange(day) {
				return this.isRangeDates && day.isBetween(this.dateFrom, this.dateTo);
			}
		}
	}
</script>