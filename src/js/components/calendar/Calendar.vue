<template>
	<div>
		<p>Calendar {{id}}</p>
		<p>{{dateFrom}}</p>
		<p>{{dateTo}}</p>
		<div class="calendar-wrapper">
			<div class="calendar-fields">
				<input 
					v-model="dateFrom"
					type="text"
					placeholder="Check in" 
					class="calendar-field field"/>
				<div class="calendar-field-arrow">
					<i class="fas fa-arrow-right"></i>
				</div>
				<input 
					v-model="dateTo"
					type="text"
					placeholder="Check out"
					class="calendar-field field" />
			</div>
			<days-card 
				:key="monthCardKey"
				v-on:month-changed="changeMonth($event)"
				:date="date"/>
			</div>
		</div>
	</div>
</template>
<script>
	import {makeId} from './../../helpers'
	import moment from 'moment'
	import DaysCard from './cards/Days'

	export default {
		components: {DaysCard},
		data() {
			return {
				dateFrom: '',
				dateTo: '',	
				date: moment(),
				monthCardKey: 0,
			}
		},
		computed: {
			id() {
				return makeId()
			},
		},
		methods: {
			changeMonth(type) {
				this.date.[type](1, 'month')
				this.monthCardKey++
			}
		}
	}
</script>