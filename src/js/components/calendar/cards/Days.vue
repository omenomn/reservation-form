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
			    <day
			    	:model="model"
			    	:ranges="occupiedRangesMoment"
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
		props: ['date', 'value', 'occupiedRanges', 'overlap'],
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
			occupiedRangesMoment() {
				return Array.isArray(this.occupiedRanges) ? this.occupiedRanges.map(
					(range) => range.map((date) => moment(date))
				) : []
			},
		},
		methods: {
			setDates(date) {
				var model = this.model

				if (!this.notBetweenOccupiedRanges(date) && !this.overlap) {
					return
				}

				if (model.length == 1) {

					var firstDate = model[0]

					if (this.overlapOccupiedRanges([firstDate, date]) && !this.overlap) {
						return
					}

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
			notBetweenOccupiedRanges(date) {
				return this.occupiedRangesMoment.filter(
					(range) => this.inRange(
						date.unix(), 
						...this.unixRange(range)
					)
				).length == 0
			},
			overlapOccupiedRanges(modelRange) {
				return this.occupiedRangesMoment.filter(
					(occupiedRange) => this.checkOverlap(
						...this.unixRange(modelRange),
						...this.unixRange(occupiedRange),
					)
				).length > 0
			},
			unixRange(range) {
				return range.map((d) => d.unix()).sort()
			},
			inRange(date, start, end) {
				return date >= start && date <= end
			},
			checkOverlap(startOne, endOne, startTwo, endTwo) {
				return startOne <= endTwo && endOne >= startTwo
			}
		}
	}
</script>