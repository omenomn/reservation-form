<template>
	<base-card
		:date="date"
		v-on:mode-changed="$emit('mode-changed', $event)"
		v-on:date-changed="$emit('date-changed', $event)">	
		<table class="calendar-table">
			<tr v-for="(row, index) in calendar">
				<td v-for="(month, index) in row">
					<a 
						href="#"
		    		class="calendar-item text-dark">
			    	{{month.format('MMMM')}}
			    </a>
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
		props: ['date'],
		computed: {		
			MONTHS_MODE: () => MONTHS_MODE,
			YEARS_MODE: () => YEARS_MODE,
			calendar() {
				var calendar = [];
				let date = moment().clone();

				var index = 0
				while (index < 11) {
				    calendar.push(Array(3).fill(0).map(() => {
				    	var monthIndex = index
				    	index++
				    	return date.month(monthIndex).clone()
				    }))
				}

				return calendar
			},
		}
	}
</script>