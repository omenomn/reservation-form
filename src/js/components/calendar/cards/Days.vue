<template>	
	<base-card
		:date="date"
		v-on:mode-changed="$emit('mode-changed', $event)"
		v-on:date-changed="$emit('date-changed', $event)">
		<pre>{{ranges}}</pre>
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
			    <day
			    	:model="model"
			    	:ranges="rangesDates"
			    	:day="cellDay"
			    	:date="date"
			    	:is-range-dates="isRangeDates"
			    	v-on:selected="setDates(cellDay)"/>
		    </td>
		  </tr>
		</table>
	</base-card>
</template>
<script>
	import moment from 'moment'
	import BaseCard from './Base'
	import {MONTH_TYPE, MONTHS_MODE, YEARS_MODE} from './../Calendar'
	import Day from './Day'

	export default {
		components: {BaseCard, Day},
		props: ['date', 'value', 'ranges'],
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
			isRangeDates() {
				return this.model.length == 2
			},
			rangesDates() {
				return this.ranges.map(
					(range) => {
						return range
						.map((date) => moment(date))
						.sort((date) => date.unix())
					}
				)
			},
		},
		methods: {
			setDates(date) {
				var model = this.model

				if (!this.checkDate(date)) {
					return
				}

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
			checkDate(date) {
				return this.rangesDates.filter((range) => {
					
				}).length == 0
			}
		}
	}
</script>