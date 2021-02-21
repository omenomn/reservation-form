<template>
	<base-card v-on:date-changed="$emit('month-changed', $event)">
		<template v-slot:calendar-header>
			<span>
				<a 
					href="#"
					class="calendar-btn">{{date.format('MMMM')}}</a> 
				<a 
					href="#"
					class="calendar-btn">{{date.year()}}</a></span>
		</template>
		<template v-slot:calendar-body>			
			<table class="calendar-table">
			  <tr>
			    <th v-for="(day, index) in daysOfWeek">{{day}}</th>
			  </tr>
			  <tr v-for="(week, index) in calendar">
			    <td v-for="(cday, index) in week">
			    	<a 
			    		href="#"
			    		@click.prevent=""
			    		class="calendar-btn-day"
			    		:class="{
			    			'calendar-current-month': cday.month() == date.month(),
			    		}">
			    		{{cday.format('D')}}
			    	</a>
			    </td>
			  </tr>
			</table>
		</template>
	</base-card>
</template>
<script>
	import moment from 'moment'
	import BaseCard from './Base'

	export default {
		components: {BaseCard},
		props: ['date'],
		computed: {		
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
			}
		}
	}
</script>