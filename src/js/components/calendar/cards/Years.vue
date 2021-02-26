<template>
	<base-card
		v-on:date-changed="changeDate($event)">	
		<template v-slot:header>			
			<span>
				<a 
					href="#"
					@click.prevent="$emit('mode-changed', YEARS_MODE)"
					class="calendar-btn">{{startYear}} - {{endYear}}</a>
			</span>
		</template>
		<table class="calendar-table">
			<tr v-for="(row, index) in calendar">
				<td v-for="(year, index) in row">
					<a 
						href="#"
		    		class="calendar-item text-dark">
			    	{{year}}
			    </a>
			  </td>
			</tr>
		</table>
	</base-card>
</template>
<script>
	import moment from 'moment'
	import BaseCard from './Base'
	import {
		MONTH_TYPE, 
		YEAR_TYPE, 
		MONTHS_MODE, 
		YEARS_MODE
	} from './../Calendar'

	export default {
		components: {BaseCard},
		props: ['date', 'period'],
		data() {
			return {
				startDate: moment().year(Math.floor(this.date.year()/10)*10)
			}
		},
		computed: {		
			MONTHS_MODE: () => MONTHS_MODE,
			YEARS_MODE: () => YEARS_MODE,
			startYear() {
				return this.startDate.year()
			},
			endYear() {
				return this.startDate.clone().add(this.period, 'year').year()
			},
			calendar() {
				var calendar = [];
				let startYear = this.startYear;

				while (startYear < this.endYear) {
			    calendar.push(Array(2).fill(0).map(() => {		
			    	return startYear++
			    }))
				}

				return calendar
			},
		},
		methods: {
			changeDate(
				method
			) {
				this.startDate = this.startDate.[method](this.period+1, YEAR_TYPE).clone()
			},
		},
	}
</script>