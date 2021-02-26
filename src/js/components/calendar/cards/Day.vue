<template>
	<div 
		class="calendar-item-wrapper" 
  	:class="{
  		'range-in': rangeIn(model),
  		'range-start': isSame(model, dateFrom(model)),
  		'range-end': isSame(model, dateTo(model)),
  		'range-in-occupied': rangesOthersIn,
  		'range-start-occupied': rangesOthersStart,
  		'range-end-occupied': rangesOthersEnd,
  	}">
  	<a 
  		href="#"
  		@click.prevent="$emit('selected')"
  		class="calendar-item pill"
    	:class="{
    		'text-dark': day.month() == date.month(),
    		'text-light': day.month() != date.month(),
    		'active': isActive(model) || 
    			rangesFilter((dates) => isActive(dates)),
    		'range-point': isActive(model) && isRange(model),
    		'range-point-occupied': rangesFilter((dates) => 
    				isActive(dates) && isRange(dates)
    			),
    	}">
  		{{day.format('D')}}
  	</a>
  </div>
</template>
<script>
	import moment from 'moment'

	export default {
		props: ['day', 'ranges', 'model', 'date', 'isRangeDates'],
		computed: {
			compareFormat() {
				return 'YYYY-MM-DD'
			},	
			dayFormat() {
				return this.day.format(this.compareFormat)
			},
			rangesOthersIn() {
				return this.rangesFilter((dates) => this.rangeIn(dates))
			},
			rangesOthersStart() {
				return this.rangesFilter((dates) => this.isSame(dates, this.dateFrom(dates)))
			},
			rangesOthersEnd() {
				return this.rangesFilter((dates) => this.isSame(dates, this.dateTo(dates)))
			},
			activeOthers() {
				return this.rangesFilter((dates) => this.isActive(dates))
			},
			rangePointOthers() {
				return this.rangesFilter((dates) => 
  				isActive(dates) && isRange(dates)
  			)
			}
		},
		methods: {	
			isRange(range) {
				return Array.isArray(range) && range.length == 2
			},
			isActive(range) {
				return range.map((date) => date.format(this.compareFormat)).includes(this.dayFormat)
			}, 
			rangeIn(range) {
				return this.isRange(range) && this.day.isBetween(range[0], range[1])
			},
			isSame(range, date) {
				return this.day.isSame(date) && this.isRange(range)
			},
			dateFrom(range) {
				return range[0]
			},
			dateTo(range) {
				return range[1]
			},
			rangesFilter(method) {
				return this.ranges.filter(method).length > 0
			}
		}
	}
</script>