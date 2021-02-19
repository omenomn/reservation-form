<template>
	<div class="calendar">
		<div class="calendar-header">
			<button
				@click="$emit('month-changed', 'subtract')"
				type="button"
				class="calendar-btn calendar-btn-chevron float-left">
				<i class="fas fa-chevron-left"></i>
			</button>
			<button
				@click="$emit('month-changed', 'add')"
				type="button"
				class="calendar-btn calendar-btn-chevron float-right">
				<i class="fas fa-chevron-right"></i>
			</button>
			<span>
				<a 
					href="#"
					class="calendar-btn">{{date.format('MMMM')}}</a> 
				<a 
					href="#"
					class="calendar-btn">{{date.year()}}</a></span>
		</div>
		<div class="calendar-body">
			<table class="calendar-table">
			  <tr>
			    <th v-for="(day, index) in daysOfWeek">{{day}}</th>
			  </tr>
			  <tr v-for="(week, index) in calendar">
			    <td v-for="(cday, index) in week">{{cday.format('D')}}</td>
			  </tr>
			</table>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'

	export default {
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
				var index = this.startDay.clone();

				while (index.isBefore(this.endDay, 'day')) {
			    calendar.push(
		        new Array(7).fill(0).map(
	            function(n, i) {
	                return index.add(1, 'day').clone();
	            }
		        )
			    );
				}

				return calendar
			},
			daysOfWeek() {
				return this.calendar[0].map(
          function(date, i) {
            return date.format('ddd');
          }
        )
			}
		}
	}
</script>