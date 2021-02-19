<template>
	<div>		
		<pre>{{month.format()}}</pre>
		<pre>{{startDay.format()}}</pre>
		<pre>{{endDay.format()}}</pre>
		<pre>{{calendar}}</pre>
	</div>
</template>
<script>
	import moment from 'moment'

	export default {
		props: ['monthIndex', 'year'],
		computed: {			
			month() {
				return moment().set({
					month: this.monthIndex,
					year: this.year
				})
			},
			startDay() {
				return this.month.clone().startOf('month').startOf('week')
			},
			endDay() {
				return this.month.clone().endOf('month').endOf('week')
			},
			calendar() {
				var calendar = [];
				var index = this.startDay.clone();

				while (index.isBefore(this.endDay, 'day')) {
				    calendar.push(
				        new Array(7).fill(0).map(
				            function(n, i) {
				                return {date: index.add(1, 'day').date()};
				            }
				        )
				    );
				}

				return calendar
			}
		}
	}
</script>